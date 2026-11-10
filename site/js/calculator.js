/**
 * calculator.js
 * Jardines Urbanos, S.A. (Panamá) - Motor Matemático de Calculadora de Grama e Hidrosiembra
 * 
 * Especificaciones:
 * - Margen de merma agronómica obligatoria: +5% con redondeo al entero superior (Math.ceil(area * 1.05))
 * - 4 Escenarios: residencial, playa, deportivo, talud
 * - 2 Condiciones de sol: sol (+6 hrs), sombra (sombra parcial / filtrada)
 * - Matriz de recomendación agronómica de alta jerarquía
 * - Generador dinámico de enlace WhatsApp oficial (+507 6539-0949)
 * - Módulo UMD (Navegador: window.JUSA_Calculator, Node.js: module.exports)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JUSA_Calculator = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const OFFICIAL_WHATSAPP_PHONE = '50765390949';
  const OFFICIAL_WHATSAPP_DISPLAY = '+507 6539-0949';
  const WASTE_MARGIN_FACTOR = 1.05;
  const WASTE_MARGIN_PERCENT = 5;
  const PALLET_COVERAGE_M2 = 45; // 1 tarima de finca = ~40 a 50 m² (promedio 45 m²)
  const B2B_AREA_THRESHOLD = 500;

  const SCENARIOS = {
    residencial: {
      key: 'residencial',
      label: 'Jardín / PH',
      fullLabel: 'Jardín / PH Residencial',
      description: 'Patios residenciales, jardines de casas particulares y áreas verdes comunes de propiedad horizontal.'
    },
    playa: {
      key: 'playa',
      label: 'Casa de Playa',
      fullLabel: 'Casa de Playa / Costa',
      description: 'Propiedades costeras con exposición a brisa marina salina, suelos arenosos y sequías estacionales.'
    },
    deportivo: {
      key: 'deportivo',
      label: 'Parque / Alto Tráfico',
      fullLabel: 'Parque / Alto Tráfico',
      description: 'Canchas deportivas, parques recreativos, áreas infantiles y zonas con tránsito peatonal intenso o mascotas.'
    },
    talud: {
      key: 'talud',
      label: 'Talud / Obra Vial',
      fullLabel: 'Talud / Control de Erosión',
      description: 'Pendientes pronunciadas, cortes viales y terraplenes con riesgo crítico de erosión pluvial en Panamá.'
    }
  };

  const SUN_CONDITIONS = {
    sol: {
      key: 'sol',
      label: 'Pleno Sol',
      fullLabel: 'Pleno Sol (+6 hrs)',
      description: 'Más de 6 horas continuas de sol directo al día.'
    },
    sombra: {
      key: 'sombra',
      label: 'Sombra Parcial',
      fullLabel: 'Sombra Parcial / Árboles',
      description: 'Luz filtrada por copas de árboles maduros o muros perimetrales altos.'
    }
  };

  const VARIETIES = {
    zoysia_toro: {
      key: 'zoysia_toro',
      name: 'Grama Zoysia Toro',
      scientificName: "Zoysia japonica 'Toro'",
      supplyMode: 'Rollos / Tarimas de Finca',
      shortDescription: 'Grama de hoja media y color verde esmeralda intenso cultivada en Río Grande, Coclé. Excelente resistencia al pisoteo y rápida regeneración.',
      isHydroseeding: false
    },
    zoysia_toro_deportivo: {
      key: 'zoysia_toro_deportivo',
      name: 'Grama Zoysia Toro (Alto Tráfico)',
      scientificName: "Zoysia japonica 'Toro'",
      supplyMode: 'Suministro a Escala / Tarimas',
      shortDescription: 'Variedad de máximo desempeño mecánico cultivada en Coclé. Diseñada para soportar pisoteo deportivo constante y tránsito masivo de mascotas.',
      isHydroseeding: false
    },
    zoysia_japonica: {
      key: 'zoysia_japonica',
      name: 'Grama Zoysia Japónica',
      scientificName: 'Zoysia japonica',
      supplyMode: 'Rollos / Tarimas de Finca',
      shortDescription: 'Césped de textura fina con la mayor tolerancia comprobada al salitre costero, brisa marina y suelos arenosos en el litoral pacífico y caribeño.',
      isHydroseeding: false
    },
    san_agustin: {
      key: 'san_agustin',
      name: 'Grama San Agustín',
      scientificName: 'Stenotaphrum secundatum',
      supplyMode: 'Rollos / Tarimas de Finca',
      shortDescription: 'Variedad de hoja ancha verde azulada de alta tolerancia a la sombra parcial y luz tamizada de árboles maduros o edificios residenciales.',
      isHydroseeding: false
    },
    hidrosiembra: {
      key: 'hidrosiembra',
      name: 'Hidrosiembra Técnica JUSA',
      scientificName: 'Técnica Mecanizada B2B',
      supplyMode: 'Camión Hidrosembrador B2B',
      shortDescription: 'Aplicación mecanizada de semillas tropicalizadas, mulch de fibra de madera/celulosa, fijador orgánico y fertilizantes para estabilización de taludes al 98%.',
      isHydroseeding: true
    }
  };

  /**
   * Calcula el área bruta obligatoria aplicando el +5% de merma técnica y redondeo superior.
   * @param {number} areaNet - Metros cuadrados netos
   * @returns {number} Metros cuadrados brutos redondeados hacia arriba
   */
  function calculateWaste(areaNet) {
    const net = Number(areaNet);
    if (isNaN(net) || net <= 0) {
      return 0;
    }
    return Math.ceil(net * WASTE_MARGIN_FACTOR);
  }

  /**
   * Resuelve la recomendación agronómica según la jerarquía estricta.
   * Jerarquía:
   * 1. Talud -> Hidrosiembra Técnica JUSA (prevalencia absoluta sobre condición solar)
   * 2. Playa -> Grama Zoysia Japónica (prevalencia por salinidad y costa)
   * 3. Sombra -> Grama San Agustín (prevalencia fisiológica por tolerancia lumínica)
   * 4. Deportivo -> Grama Zoysia Toro (Alto Tráfico)
   * 5. Default (Residencial sol) -> Grama Zoysia Toro
   * 
   * @param {string} scenario - 'residencial' | 'playa' | 'deportivo' | 'talud'
   * @param {string} sun - 'sol' | 'sombra'
   * @returns {Object} Objeto de recomendación técnica
   */
  function getRecommendation(scenario, sun) {
    const scKey = (scenario || 'residencial').toLowerCase().trim();
    const sunKey = (sun || 'sol').toLowerCase().trim();

    let variety;
    let contextNote = '';

    if (scKey === 'talud') {
      variety = VARIETIES.hidrosiembra;
      contextNote = 'En taludes pronunciados y cortes viales, la hidrosiembra mecanizada con mulch anti-escorrentía es la única solución técnica que garantiza fijación radicular sin desprendimiento.';
    } else if (scKey === 'playa') {
      variety = VARIETIES.zoysia_japonica;
      if (sunKey === 'sombra') {
        contextNote = 'Priorizamos Zoysia Japónica por su resistencia superior a la salinidad costera y brisa marina; si la sombra es densa bajo copas tupidas, se recomienda podar ramas para mejorar insolación.';
      } else {
        contextNote = 'Óptima para casas de playa y costas panameñas: tolera brisa marina, salinidad del sustrato y sequía estacional.';
      }
    } else if (sunKey === 'sombra') {
      variety = VARIETIES.san_agustin;
      contextNote = 'La variedad San Agustín es la única especie de césped que mantiene densidad y vigor bajo sombra parcial de árboles maduros o muros perimetrales en Panamá.';
    } else if (scKey === 'deportivo') {
      variety = VARIETIES.zoysia_toro_deportivo;
      contextNote = 'Zoysia Toro ofrece la mayor resistencia al pisoteo continuo, canchas de juego infantil y mascotas activas, con rápida regeneración vegetativa.';
    } else {
      // Default: residencial sol
      variety = VARIETIES.zoysia_toro;
      contextNote = 'La opción preferida en residenciales y PHs de Panamá a pleno sol: césped denso, uniforme y de bajo consumo hídrico relativo.';
    }

    const scenarioObj = SCENARIOS[scKey] || SCENARIOS.residencial;
    const sunObj = SUN_CONDITIONS[sunKey] || SUN_CONDITIONS.sol;

    return {
      varietyKey: variety.key,
      title: variety.name,
      scientificName: variety.scientificName,
      supplyMode: variety.supplyMode,
      description: variety.shortDescription,
      contextNote: contextNote,
      isHydroseeding: variety.isHydroseeding,
      scenarioKey: scenarioObj.key,
      scenarioLabel: scenarioObj.label,
      scenarioFullLabel: scenarioObj.fullLabel,
      sunKey: sunObj.key,
      sunLabel: sunObj.label,
      sunFullLabel: sunObj.fullLabel
    };
  }

  /**
   * Genera el enlace de WhatsApp pre-llenado oficial para el cotizador.
   * Target: https://wa.me/50765390949?text=${encodeURIComponent(msg)}
   * Formato exigido:
   * "Hola Jardines Urbanos, usé la calculadora web y deseo cotizar ${gross.toLocaleString()} m² (incluye 5% merma) de ${varietyTitle} para ${scenarioLabel} (${sunLabel})."
   * 
   * @param {Object} params
   * @param {number} params.gross - Metros cuadrados con merma
   * @param {string} params.varietyTitle - Nombre comercial de la variedad recomendada
   * @param {string} params.scenarioLabel - Etiqueta corta del escenario (ej. "Jardín / PH")
   * @param {string} params.sunLabel - Etiqueta del sol (ej. "Pleno Sol" o "Sombra Parcial")
   * @param {string} [params.location] - Ubicación opcional de entrega
   * @param {string} [params.includeInstall] - Requerimiento opcional de instalación
   * @param {string} [params.utmSource] - Fuente UTM de atribución opcional
   * @returns {string} URL codificada completa de WhatsApp
   */
  function buildWhatsAppUrl(params) {
    const gross = Number(params.gross) || 0;
    const varietyTitle = params.varietyTitle || 'Grama Zoysia Toro';
    const scenarioLabel = params.scenarioLabel || 'Jardín / PH';
    const sunLabel = params.sunLabel || 'Pleno Sol';
    const grossFormatted = gross.toLocaleString('es-PA');

    // Mensaje base estandarizado
    let message = `Hola Jardines Urbanos, usé la calculadora web y deseo cotizar ${grossFormatted} m² (incluye 5% merma) de ${varietyTitle} para ${scenarioLabel} (${sunLabel}).`;

    // Si el usuario especificó detalles adicionales de cotización (formulario expandido)
    if (params.location || params.includeInstall || params.utmSource) {
      const extraParts = [];
      if (params.location) {
        extraParts.push(`• Ubicación de entrega: ${params.location}`);
      }
      if (params.includeInstall) {
        extraParts.push(`• Instalación: ${params.includeInstall}`);
      }
      if (params.utmSource) {
        extraParts.push(`[Ref: ${params.utmSource}]`);
      }
      if (extraParts.length > 0) {
        message += `\n\n${extraParts.join('\n')}`;
      }
    }

    return `https://wa.me/${OFFICIAL_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Realiza el cálculo integral de la cotización de césped / hidrosiembra.
   * 
   * @param {Object} input
   * @param {number|string} input.areaNet - Metros cuadrados netos requeridos
   * @param {string} [input.scenario='residencial'] - 'residencial' | 'playa' | 'deportivo' | 'talud'
   * @param {string} [input.sun='sol'] - 'sol' | 'sombra'
   * @param {string} [input.location] - Ubicación opcional (ej. "Costa del Este, Panamá")
   * @param {string} [input.includeInstall] - "Solo suministro" | "Suministro e instalación"
   * @param {string} [input.utmSource] - Trazabilidad UTM
   * @returns {Object} Resultado integral de cotización
   */
  function calculateLawnQuote(input) {
    const rawInput = input || {};
    const areaNet = Math.max(0, parseFloat(rawInput.areaNet || rawInput.area || 0) || 0);
    const scenario = rawInput.scenario || 'residencial';
    const sun = rawInput.sun || 'sol';

    const areaGross = calculateWaste(areaNet);
    const wasteM2 = Math.max(0, areaGross - Math.floor(areaNet));
    const rec = getRecommendation(scenario, sun);

    // Estimación logística de tarimas de finca (no aplica para camión hidrosembrador)
    const estimatedPallets = rec.isHydroseeding
      ? 0
      : (areaGross > 0 ? Math.ceil(areaGross / PALLET_COVERAGE_M2) : 0);

    // Clasificación de lead B2B vs B2C
    const isB2B = (areaNet >= B2B_AREA_THRESHOLD) || (scenario === 'talud');
    const leadType = isB2B ? 'B2B' : 'B2C';

    const whatsappUrl = buildWhatsAppUrl({
      gross: areaGross,
      varietyTitle: rec.title,
      scenarioLabel: rec.scenarioLabel,
      sunLabel: rec.sunLabel,
      location: rawInput.location,
      includeInstall: rawInput.includeInstall,
      utmSource: rawInput.utmSource
    });

    const summaryText = `Cotización estimada: ${areaGross.toLocaleString('es-PA')} m² de ${rec.title} (${rec.supplyMode}) para ${rec.scenarioLabel} en condición de ${rec.sunLabel}. Incluye 5% de merma técnica por cortes perimetrales.`;

    return {
      areaNet: areaNet,
      areaGross: areaGross,
      wasteMarginPct: WASTE_MARGIN_PERCENT,
      wasteM2: wasteM2,
      recommendedVariety: rec.title,
      varietyKey: rec.varietyKey,
      scientificName: rec.scientificName,
      supplyMode: rec.supplyMode,
      scenarioKey: rec.scenarioKey,
      scenarioLabel: rec.scenarioLabel,
      sunKey: rec.sunKey,
      sunLabel: rec.sunLabel,
      isHydroseeding: rec.isHydroseeding,
      estimatedPallets: estimatedPallets,
      isB2B: isB2B,
      leadType: leadType,
      whatsappUrl: whatsappUrl,
      summaryText: summaryText,
      description: rec.description,
      contextNote: rec.contextNote,
      phoneDisplay: OFFICIAL_WHATSAPP_DISPLAY,
      phoneRaw: OFFICIAL_WHATSAPP_PHONE
    };
  }

  return {
    SCENARIOS: SCENARIOS,
    SUN_CONDITIONS: SUN_CONDITIONS,
    VARIETIES: VARIETIES,
    OFFICIAL_WHATSAPP_PHONE: OFFICIAL_WHATSAPP_PHONE,
    OFFICIAL_WHATSAPP_DISPLAY: OFFICIAL_WHATSAPP_DISPLAY,
    WASTE_MARGIN_FACTOR: WASTE_MARGIN_FACTOR,
    WASTE_MARGIN_PERCENT: WASTE_MARGIN_PERCENT,
    PALLET_COVERAGE_M2: PALLET_COVERAGE_M2,
    B2B_AREA_THRESHOLD: B2B_AREA_THRESHOLD,
    calculateWaste: calculateWaste,
    getRecommendation: getRecommendation,
    buildWhatsAppUrl: buildWhatsAppUrl,
    calculateLawnQuote: calculateLawnQuote
  };
}));
