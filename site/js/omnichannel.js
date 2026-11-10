/**
 * omnichannel.js
 * Jardines Urbanos, S.A. (Panamá) - Enrutador Omnicanal WhatsApp, Trazabilidad UTM y DataLayer
 * 
 * Especificaciones:
 * - Teléfonos oficiales: WhatsApp Comercial (+507 6539-0949) y Fijo Central (+507 226-0494)
 * - Captura y persistencia de parámetros UTM y Click IDs (gclid, fbclid) en sessionStorage
 * - Fallback inteligente a 'Web Directo' en ausencia de campañas de pago
 * - Emisión de eventos normalizados 'whatsapp_lead_click' al window.dataLayer (GA4 / GTM)
 * - Generador de URLs WhatsApp con preservación de contexto agronómico y atribución
 * - Módulo UMD (Navegador: window.JUSA_Omnichannel, Node.js: module.exports)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JUSA_Omnichannel = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const OFFICIAL_WHATSAPP_PHONE = '50765390949';
  const OFFICIAL_WHATSAPP_DISPLAY = '+507 6539-0949';
  const OFFICIAL_LANDLINE_PHONE = '5072260494';
  const OFFICIAL_LANDLINE_DISPLAY = '+507 226-0494';
  const OFFICIAL_EMAIL_SALES = 'ventas@jardinesurbanos.com';
  const OFFICIAL_EMAIL_AGRO = 'xavier@jardinesurbanos.com';

  const UTM_STORAGE_KEY = 'jusa_lead_attribution_v1';
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

  // Cache en memoria para entornos sin sessionStorage (Node.js o navegación privada restrictiva)
  let memoryAttribution = null;

  /**
   * Captura parámetros UTM desde una cadena de consulta (query string).
   * @param {string} [searchString] - Cadena window.location.search opcional
   * @returns {Object} Diccionario con los parámetros UTM detectados
   */
  function captureUtms(searchString) {
    let query = searchString;
    if (typeof query === 'undefined' && typeof window !== 'undefined' && window.location) {
      query = window.location.search;
    }
    query = (query || '').trim();

    const utms = {
      utm_source: 'Web Directo',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      fbclid: '',
      captured_at: new Date().toISOString()
    };

    if (query.length > 0) {
      const cleanQuery = query.startsWith('?') ? query.substring(1) : query;
      const pairs = cleanQuery.split('&');
      let foundAny = false;

      pairs.forEach(function(pair) {
        const parts = pair.split('=');
        if (parts.length >= 2) {
          const key = decodeURIComponent(parts[0]).toLowerCase();
          const val = decodeURIComponent(parts.slice(1).join('='));
          if (UTM_KEYS.includes(key) && val) {
            utms[key] = val;
            foundAny = true;
          }
        }
      });

      // Si no hay utm_source pero existe gclid (Google Ads) o fbclid (Meta Ads)
      if (utms.utm_source === 'Web Directo') {
        if (utms.gclid) {
          utms.utm_source = 'google_ads';
          utms.utm_medium = 'cpc';
          foundAny = true;
        } else if (utms.fbclid) {
          utms.utm_source = 'facebook_ads';
          utms.utm_medium = 'paid_social';
          foundAny = true;
        }
      }

      if (foundAny) {
        saveAttribution(utms);
        return utms;
      }
    }

    // Si no vino query string, intentar recuperar del almacenamiento previo
    const existing = getStoredUtms();
    if (existing && existing.utm_source) {
      return existing;
    }

    saveAttribution(utms);
    return utms;
  }

  /**
   * Guarda los datos de atribución en sessionStorage y en memoria.
   * @param {Object} data
   */
  function saveAttribution(data) {
    memoryAttribution = Object.assign({}, data);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        // En modo incógnito estricto puede fallar silenciosamente
      }
    }
  }

  /**
   * Obtiene la atribución almacenada en la sesión actual.
   * @returns {Object}
   */
  function getStoredUtms() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          memoryAttribution = parsed;
          return parsed;
        }
      } catch (err) {
        // Ignorar fallo de parseo
      }
    }

    if (memoryAttribution) {
      return memoryAttribution;
    }

    return {
      utm_source: 'Web Directo',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      fbclid: '',
      captured_at: new Date().toISOString()
    };
  }

  /**
   * Dispara un evento analítico al window.dataLayer.
   * Tolerante ante ausencia de Google Tag Manager (inicializa window.dataLayer si no existe).
   * 
   * @param {string} eventName - Nombre del evento (ej. 'whatsapp_lead_click')
   * @param {Object} [payload={}] - Datos asociados al evento
   * @returns {Object} Evento estructurado emitido
   */
  function trackEvent(eventName, payload) {
    const eventData = Object.assign({
      event: eventName || 'jusa_event',
      timestamp: new Date().toISOString()
    }, payload || {});

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);
    }

    return eventData;
  }

  /**
   * Registra específicamente un clic de intención de contacto o lead por WhatsApp.
   * 
   * @param {Object} leadContext - Contexto del lead (cotización, variedad, m², ubicación)
   * @returns {Object} Evento emitido al dataLayer
   */
  function trackWhatsAppClick(leadContext) {
    const ctx = leadContext || {};
    const utms = getStoredUtms();

    const payload = {
      lead_channel: 'whatsapp',
      product_category: ctx.category || ctx.varietyTitle || 'General',
      grass_variety: ctx.varietyTitle || ctx.grass_variety || 'No especificada',
      area_m2: Number(ctx.gross || ctx.areaGross || ctx.area_m2 || 0),
      delivery_location: ctx.location || ctx.delivery_location || 'No especificada',
      is_b2b: Boolean(ctx.isB2B || (ctx.areaGross >= 500)),
      utm_source: utms.utm_source || 'Web Directo',
      utm_medium: utms.utm_medium || '',
      utm_campaign: utms.utm_campaign || '',
      gclid: utms.gclid || '',
      fbclid: utms.fbclid || '',
      page_path: typeof window !== 'undefined' && window.location ? window.location.pathname : '/'
    };

    return trackEvent('whatsapp_lead_click', payload);
  }

  /**
   * Construye el enlace universal a WhatsApp con texto prellenado y nota de atribución opcional.
   * 
   * @param {Object} options
   * @param {string} [options.phone='50765390949'] - Teléfono en formato internacional sin signos
   * @param {string} [options.message=''] - Texto del mensaje
   * @param {boolean} [options.includeUtmTag=true] - Si se debe añadir la nota de atribución de campaña
   * @param {Object} [options.attribution] - Atribución explícita opcional
   * @returns {string} URL formateada https://wa.me/...
   */
  function buildWhatsAppUrl(options) {
    const opts = options || {};
    const phone = opts.phone || OFFICIAL_WHATSAPP_PHONE;
    let message = (opts.message || '').trim();

    // Atribución de campaña
    if (opts.includeUtmTag !== false) {
      const utms = opts.attribution || getStoredUtms();
      if (utms && utms.utm_source && utms.utm_source !== 'Web Directo') {
        const campaignNote = utms.utm_campaign ? ` / ${utms.utm_campaign}` : '';
        const tag = `[Ref: ${utms.utm_source}${campaignNote}]`;
        if (message.length > 0 && !message.includes(tag)) {
          message += `\n\n${tag}`;
        }
      }
    }

    if (message.length === 0) {
      message = 'Hola Jardines Urbanos, deseo solicitar información sobre sus variedades de grama, vivero o hidrosiembra.';
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Vincula automáticamente todos los botones o enlaces de WhatsApp con data-attributes.
   * Selector por defecto: 'a[href*="wa.me"], [data-whatsapp-action]'
   * @param {string} [selector]
   */
  function attachWhatsAppHandlers(selector) {
    if (typeof document === 'undefined') return;

    const sel = selector || 'a[href*="wa.me"], [data-whatsapp-action]';
    const elements = document.querySelectorAll(sel);

    elements.forEach(function(el) {
      // Evitar registrar múltiples veces
      if (el.getAttribute('data-jusa-omni-attached')) return;
      el.setAttribute('data-jusa-omni-attached', 'true');

      el.addEventListener('click', function() {
        const category = el.getAttribute('data-product-category') || 'General';
        const variety = el.getAttribute('data-grass-variety') || el.innerText.trim();
        const area = parseFloat(el.getAttribute('data-area-m2') || '0');
        const location = el.getAttribute('data-delivery-location') || 'No especificada';

        trackWhatsAppClick({
          category: category,
          varietyTitle: variety,
          gross: area,
          location: location
        });
      });
    });
  }

  // Inicialización automática si corre en navegador
  if (typeof window !== 'undefined') {
    try {
      captureUtms();
    } catch (e) {
      // Ignorar en entornos de testing o SSR
    }
  }

  return {
    OFFICIAL_WHATSAPP_PHONE: OFFICIAL_WHATSAPP_PHONE,
    OFFICIAL_WHATSAPP_DISPLAY: OFFICIAL_WHATSAPP_DISPLAY,
    OFFICIAL_LANDLINE_PHONE: OFFICIAL_LANDLINE_PHONE,
    OFFICIAL_LANDLINE_DISPLAY: OFFICIAL_LANDLINE_DISPLAY,
    OFFICIAL_EMAIL_SALES: OFFICIAL_EMAIL_SALES,
    OFFICIAL_EMAIL_AGRO: OFFICIAL_EMAIL_AGRO,
    UTM_STORAGE_KEY: UTM_STORAGE_KEY,
    captureUtms: captureUtms,
    getStoredUtms: getStoredUtms,
    trackEvent: trackEvent,
    trackWhatsAppClick: trackWhatsAppClick,
    buildWhatsAppUrl: buildWhatsAppUrl,
    attachWhatsAppHandlers: attachWhatsAppHandlers
  };
}));
