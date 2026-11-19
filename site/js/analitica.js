/**
 * analitica.js · Medición del sitio (revisión DMC): GA4 + píxel de Meta.
 *
 * Para activar: completar los IDs en CONFIG (por ejemplo ga4: 'G-ABC123XYZ', metaPixel: '123456789012345').
 * Mientras estén vacíos no se carga ningún script externo: los eventos solo se registran en
 * window.dataLayer (útil para probar o para conectar Google Tag Manager más adelante).
 *
 * Eventos (mismo nombre en GA4, en dataLayer y como evento personalizado en Meta):
 *   cotizar_residencial · cotizar_comercial · cotizar_hidrosiembra  → botones de cotizar por tipo de cliente
 *   calculadora_abrir      → enlaces a la calculadora sin tipo preseleccionado
 *   calculadora_cotizacion → WhatsApp / PDF / correo desde el resultado de la calculadora
 *   whatsapp_click · llamada_click · correo_click → contacto directo
 *   formulario_envio       → envío de los formularios de contacto e hidrosiembra
 * En Meta, además, los de cotizar/calculadora/formulario se envían como "Lead" y los de contacto como "Contact".
 *
 * Aviso de cookies (Ley 81): GA4 y el píxel de Meta solo se cargan si la persona acepta.
 * La decisión se guarda en este navegador (localStorage 'jusa_consentimiento') y se puede
 * cambiar desde el enlace "Preferencias de cookies" del footer.
 */
(function () {
  'use strict';

  var CONFIG = {
    ga4: '',        // ID de medición de Google Analytics 4 (G-XXXXXXXXXX)
    metaPixel: ''   // ID del píxel de Meta (solo números)
  };

  window.dataLayer = window.dataLayer || [];

  // ---- Consentimiento ----
  var CONSENT_KEY = 'jusa_consentimiento';
  function getConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* navegación privada */ } }
  var loaded = false;

  // ---- Carga de las etiquetas (solo con consentimiento y si hay ID) ----
  function loadTags() {
    if (loaded) return;
    loaded = true;
    if (CONFIG.ga4) {
      var g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ga4);
      document.head.appendChild(g);
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.ga4);
    }
    if (CONFIG.metaPixel) {
      /* Código base oficial del píxel de Meta */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CONFIG.metaPixel);
      window.fbq('track', 'PageView');
    }
  }
  if (getConsent() === 'aceptado') loadTags();

  // ---- Aviso de cookies ----
  var thisScript = document.currentScript || document.querySelector('script[src*="js/analitica.js"]');
  var prefix = thisScript ? thisScript.getAttribute('src').split('js/analitica.js')[0] : '';

  function showBanner() {
    if (document.getElementById('aviso-cookies')) return;
    var box = document.createElement('div');
    box.id = 'aviso-cookies';
    box.className = 'aviso-cookies';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Aviso de cookies');
    box.innerHTML =
      '<p class="aviso-cookies-texto">Usamos cookies de medición (Google Analytics y Meta) para saber qué partes del sitio son útiles y mejorar nuestros anuncios. ' +
      'Solo se activan si las aceptas. <a href="' + prefix + 'politica-de-datos/#cookies">Más información</a>.</p>' +
      '<div class="aviso-cookies-acciones">' +
      '<button type="button" class="btn btn-outline btn-sm" data-cookies="rechazado">Rechazar</button>' +
      '<button type="button" class="btn btn-primary btn-sm" data-cookies="aceptado">Aceptar</button>' +
      '</div>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cookies]');
      if (!b) return;
      var v = b.getAttribute('data-cookies');
      var prev = getConsent();
      setConsent(v);
      box.remove();
      window.dataLayer.push({ event: 'consentimiento_cookies', decision: v });
      if (v === 'aceptado') loadTags();
      else if (prev === 'aceptado' && loaded) location.reload(); // descarga las etiquetas ya cargadas
    });
    document.body.appendChild(box);
  }

  function initBanner() {
    if (!getConsent()) showBanner();
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-abrir-cookies]')) { e.preventDefault(); showBanner(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBanner);
  else initBanner();

  var META_LEAD = { cotizar_residencial: 1, cotizar_comercial: 1, cotizar_hidrosiembra: 1, calculadora_cotizacion: 1, formulario_envio: 1 };
  var META_CONTACT = { whatsapp_click: 1, llamada_click: 1, correo_click: 1 };

  function track(name, params) {
    params = params || {};
    params.pagina = location.pathname.replace(/index\.html$/, '') || '/';
    window.dataLayer.push(Object.assign({ event: name }, params));
    if (loaded && CONFIG.ga4 && window.gtag) window.gtag('event', name, params);
    if (loaded && CONFIG.metaPixel && window.fbq) {
      if (META_LEAD[name]) window.fbq('track', 'Lead', { content_name: name });
      else if (META_CONTACT[name]) window.fbq('track', 'Contact', { content_name: name });
      window.fbq('trackCustom', name, params);
    }
  }
  window.JUSA_Analitica = { track: track, config: CONFIG, mostrarAvisoCookies: showBanner };

  function section(el) {
    var s = el.closest('section, header, footer, aside, .mobile-sticky-bar');
    if (!s) return '';
    return s.id || s.tagName.toLowerCase() + (s.classList.length ? '.' + s.classList[0] : '');
  }

  function classify(a) {
    var href = a.getAttribute('href') || '';
    var text = (a.textContent || '').trim().toLowerCase();
    if (/^https:\/\/wa\.me\//.test(href)) return 'whatsapp_click';
    if (/^tel:/.test(href)) return 'llamada_click';
    if (/^mailto:/.test(href)) return 'correo_click';
    if (/calculadora\/?(\?|#|$)/.test(href)) {
      if (/escenario=(residencial|jardin)/.test(href)) return 'cotizar_residencial';
      if (/escenario=comercial/.test(href)) return 'cotizar_comercial';
      if (/escenario=(talud|hidrosiembra)/.test(href)) return 'cotizar_hidrosiembra';
      return 'calculadora_abrir';
    }
    if (text.indexOf('cotizar') === 0) {
      if (/comercial/.test(href + text)) return 'cotizar_comercial';
      if (/hidrosiembra|licitacion/.test(href + text)) return 'cotizar_hidrosiembra';
      return 'cotizar_residencial';
    }
    return null;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    // Acciones del resultado de la calculadora
    if (/^calc-(whatsapp|pdf|email)-btn$/.test(el.id || '')) {
      var widget = document.querySelector('.calc-widget');
      var active = widget && widget.querySelector('.calc-pill.active');
      var area = widget && widget.querySelector('.calc-number-input');
      track('calculadora_cotizacion', {
        canal: el.id.replace('calc-', '').replace('-btn', ''),
        escenario: active ? active.getAttribute('data-scenario') : '',
        m2: area ? Number(area.value) : 0
      });
      return;
    }
    if (el.tagName !== 'A') return;
    var name = classify(el);
    if (name) track(name, { seccion: section(el), texto: (el.textContent || '').trim().slice(0, 60) });
  }, true);

  document.addEventListener('submit', function (e) {
    var form = e.target;
    track('formulario_envio', { formulario: form.id || form.getAttribute('name') || section(form) });
  }, true);
})();
