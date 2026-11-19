/**
 * catalog.js
 * Jardines Urbanos, S.A. (Panamá) - Base de Datos Botánica Estructurada y Motor de Filtrado
 * 
 * Especificaciones:
 * - Base de datos botánica verificada de especies de cultivo propio y vivero en Río Grande, Coclé
 * - Asociación estricta de fotos reales a 'assets/img/' con badge 'Foto oficial JUSA'
 * - Especies nativas representadas mediante mockups IA en 'assets/mockups/' con descargo explícito '[Variedad de finca • imagen referencial]'
 * - Precios referenciales de vivero y finca en Río Grande, Coclé
 * - Filtros por categoría ('all', 'grama', 'palma', 'arbol', 'planta', 'b2b')
 * - Búsqueda por texto y atributos fisiológicos (sol, salinidad costera, tráfico)
 * - Módulo UMD (Navegador: window.JUSA_Catalog, Node.js: module.exports)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JUSA_Catalog = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const PENDING_CLIENT_DATA = 'Precio a cotizar';
  const OFFICIAL_PHOTO_TAG = '[Foto oficial finca JUSA]';
  const MOCKUP_PHOTO_TAG = '[Variedad de finca • imagen referencial]';

  const CATEGORIES = [
    { key: 'all', label: 'Todo el inventario', icon: '' },
    { key: 'grama', label: 'Gramas naturales', icon: '' },
    { key: 'palma', label: 'Palmas ornamentales', icon: '' },
    { key: 'arbol', label: 'Árboles nativos', icon: '' },
    { key: 'planta', label: 'Plantas ornamentales', icon: '' },
    { key: 'b2b', label: 'Hidrosiembra', icon: '' }
  ];

  /**
   * Catálogo botánico oficial verificado de Jardines Urbanos, S.A.
   */
  const BOTANICAL_SPECIES = [
    // -------------------------------------------------------------
    // GRAMAS NATURALES EN ROLLO (CULTIVO PROPIO EN COCĹÉ)
    // -------------------------------------------------------------
    {
      id: 'sp_zoysia_toro',
      name: 'Grama Zoysia Toro',
      scientificName: "Zoysia japonica 'Toro'",
      category: 'grama',
      subcategory: 'gramas_rollo',
      photoUrl: 'assets/img/TORO-CLOSEUP-1.webp',
      alternatePhotos: ['assets/img/TORO-ZOOM.webp', 'assets/img/SAE-PARA-COSECHA_mision.webp'],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: true,
      shortDescription: 'Césped esmeralda de hoja media cultivado en Río Grande, Coclé. Resiste el pisoteo intenso de canchas y mascotas, y se regenera rápido.',
      features: [
        'Máxima resistencia al pisoteo y juegos deportivos',
        'Despacho en rollos frescos desde finca en Coclé',
        'Rápido enraizamiento en suelos tropicales'
      ],
      price: 'Ref. $3.75 / m²',
      unit: 'm²',
      tags: ['Grama', 'Zoysia Toro', 'Alto Tráfico', 'Residencial', 'Canchas', 'Coclé']
    },
    {
      id: 'sp_zoysia_japonica',
      name: 'Grama Zoysia Japónica',
      scientificName: 'Zoysia japonica',
      category: 'grama',
      subcategory: 'gramas_playa',
      photoUrl: 'assets/img/JAPONESA-CLOSEUP.webp',
      alternatePhotos: ['assets/img/JAPONESA-PROYECTO.webp'],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Césped de textura fina y raíces profundas con máxima tolerancia comprobada al salitre, brisa marina y sequías en casas de playa en Coronado, Buenaventura y costas de Panamá.',
      features: [
        'Resistencia superior a la brisa marina y salinidad costera',
        'Crecimiento homogéneo tipo tapete fino ornamental',
        'Bajo requerimiento de corte frente a otras variedades'
      ],
      price: 'Ref. $4.25 / m²',
      unit: 'm²',
      tags: ['Grama', 'Zoysia Japónica', 'Casa de playa', 'Salinidad', 'Costa', 'Buenaventura']
    },
    {
      id: 'sp_san_agustin',
      name: 'Grama San Agustín',
      scientificName: 'Stenotaphrum secundatum',
      category: 'grama',
      subcategory: 'gramas_sombra',
      photoUrl: 'assets/img/SAN-AGUSTIN-CLOSEUP.webp',
      alternatePhotos: ['assets/img/SAN-AGUSTIN-HEADER.webp', 'assets/img/TARIMAS-SAN-AGUSTIN.webp'],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sombra',
      sunLabel: 'Sombra parcial / filtrada',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Césped de hoja ancha verde azulada; la variedad de mayor desempeño en zonas residenciales con sombra parcial proyectada por árboles maduros o muros perimetrales altos.',
      features: [
        'Tolerancia fisiológica superior a sombra parcial',
        'Césped tupido que inhibe la aparición de malezas',
        'Excelente estética para jardines residenciales arbolados'
      ],
      price: 'Ref. $3.25 / m²',
      unit: 'm²',
      tags: ['Grama', 'San Agustín', 'Sombra Parcial', 'Residencial', 'PH', 'Verde Azulado']
    },

    // -------------------------------------------------------------
    // PALMAS ORNAMENTALES (VIVERO Y CULTIVO EN SUELO ABIERTO)
    // -------------------------------------------------------------
    {
      id: 'sp_palma_real',
      name: 'Palma Real en finca',
      scientificName: 'Roystonea regia',
      category: 'palma',
      subcategory: 'palmas_monumentales',
      photoUrl: 'assets/img/PALMA-REAL-FINCA.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Palma de tronco liso anillado y copa verde brillante, cultivada en suelo de finca en Río Grande, Coclé, para avenidas, bulevares y residenciales.',
      features: [
        'Ejemplares aclimatados en campo con fuste recto',
        'Ideal para alineaciones viales y accesos de PH',
        'Alta resistencia a vientos alisios tropicales'
      ],
      price: 'Ref. $95.00 / un.',
      unit: 'unidad',
      tags: ['Palma', 'Palma Real', 'Gran porte', 'Urbanismo', 'Coclé', 'Bulevares']
    },
    {
      id: 'sp_palma_bismarckia',
      name: 'Palma Bismarckia',
      scientificName: 'Bismarckia nobilis',
      category: 'palma',
      subcategory: 'palmas_lujo',
      photoUrl: 'assets/img/BISMARKIA.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Palma de hojas en abanico azul plateado. Resiste sol pleno, brisa marina y sequía.',
      features: [
        'Coloración azul plateada única de alto impacto visual',
        'Punto focal de distinción en jardinería de autor',
        'Muy resistente a la sequía estacional'
      ],
      price: 'Ref. $85.00 / un.',
      unit: 'unidad',
      tags: ['Palma', 'Bismarckia', 'Azul Plateado', 'Sol Pleno', 'Lujo Tropical', 'Sequía']
    },
    {
      id: 'sp_cola_de_zorro',
      name: 'Palma cola de zorro',
      scientificName: 'Wodyetia bifurcata',
      category: 'palma',
      subcategory: 'palmas_urbanas',
      photoUrl: 'assets/img/COLA-DE-ZORRO.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / semisombra',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Palma arquitectónica con frondas plumosas densas que emulan la cola de un zorro; excelente para bulevares, entradas residenciales, piscinas y paisajismo contemporáneo.',
      features: [
        'Frondas plumosas simétricas de bajo mantenimiento',
        'No posee espinas; apta para áreas de piscinas y terrazas',
        'Crecimiento vigoroso en climas cálidos'
      ],
      price: 'Ref. $45.00 / un.',
      unit: 'unidad',
      tags: ['Palma', 'Cola de Zorro', 'Plumosa', 'Piscinas', 'Bulevares', 'Residencial']
    },
    {
      id: 'sp_palma_areca',
      name: 'Palma Areca',
      scientificName: 'Dypsis lutescens',
      category: 'palma',
      subcategory: 'palmas_setos',
      photoUrl: 'assets/img/ARECA.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sombra',
      sunLabel: 'Semisombra / sol filtrado',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Palma multicaule de tallos dorados y finas frondas arqueadas; la especie más solicitada para setos vivos de privacidad, divisiones de linderos y terrazas en PHs.',
      features: [
        'Formación rápida de barrera visual y cortina vegetal',
        'Excelente desempeño en contenedores y macetones',
        'Apta para patios protegidos y semisombra'
      ],
      price: 'Ref. $22.00 / un.',
      unit: 'unidad',
      tags: ['Palma', 'Areca', 'Seto Vivo', 'Semisombra', 'Privacidad', 'PH']
    },
    {
      id: 'sp_palma_viajera',
      name: 'Palma Viajera',
      scientificName: 'Ravenala madagascariensis',
      category: 'palma',
      subcategory: 'palmas_lujo',
      photoUrl: 'assets/mockups/palma_viajera.webp',
      alternatePhotos: [],
      isRealPhoto: false,
      isOfficial: false,
      isMockup: true,
      sourceTag: MOCKUP_PHOTO_TAG,
      badge: 'Variedad de finca • imagen referencial',
      badgeClass: 'badge-mockup',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / semisombra',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Planta de gran porte con hojas en abanico plano; punto focal para villas, entradas de hoteles y rotondas.',
      features: [
        'Disposición geométrica en abanico bidimensional',
        'Gran porte para entradas de alta visibilidad',
        'Cultivada bajo aclimatación en vivero Coclé'
      ],
      price: 'Ref. $40.00 / un.',
      unit: 'unidad',
      tags: ['Palma', 'Palma Viajera', 'Abanico', 'Arquitectónica', 'Lujo', 'Referencial']
    },

    // -------------------------------------------------------------
    // ÁRBOLES NATIVOS Y DE REFORESTACIÓN (VIVERO Y CAMPO)
    // -------------------------------------------------------------
    {
      id: 'sp_arbol_preparado',
      name: 'Árbol preparado en cepellón',
      scientificName: 'Especies nativas encepellonadas',
      category: 'arbol',
      subcategory: 'arboricultura',
      photoUrl: 'assets/img/ARBOL-PREPARADO.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Árbol nativo preparado mediante poda técnica de raíces y embalaje seguro de cepellón listo para trasplante directo a obra con alta tasa de prendimiento.',
      features: [
        'Cepellón estabilizado y protegido con arpillera técnica',
        'Poda radicular para mitigar el estrés post-trasplante',
        'Aclimatado para desarrollo inmediato en sitio'
      ],
      price: 'Ref. $75.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Trasplante', 'Cepellón', 'Vivero', 'Nativo', 'Arboricultura']
    },
    {
      id: 'sp_arbol_neem',
      name: 'Árbol de Neem',
      scientificName: 'Azadirachta indica',
      category: 'arbol',
      subcategory: 'sombra',
      photoUrl: 'assets/img/NEEM.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Árbol de copa densa y rápido crecimiento con notable resistencia a la sequía y conocidas propiedades repelentes fitosanitarias naturales en climas cálidos.',
      features: [
        'Rápida cobertura de sombra para parques y fincas',
        'Repelente natural contra insectos y plagas botánicas',
        'Resistencia extrema a suelos pobres y déficit hídrico'
      ],
      price: 'Ref. $28.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Neem', 'Sombra', 'Repelente Natural', 'Rápido Crecimiento', 'Sequía']
    },
    {
      id: 'sp_arbol_panama',
      name: 'Árbol Panamá (Árbol Nacional)',
      scientificName: 'Sterculia apetala',
      category: 'arbol',
      subcategory: 'nativas',
      photoUrl: 'assets/mockups/arbol_panama.webp',
      alternatePhotos: [],
      isRealPhoto: false,
      isOfficial: false,
      isMockup: true,
      sourceTag: MOCKUP_PHOTO_TAG,
      badge: 'Variedad de finca • imagen referencial',
      badgeClass: 'badge-mockup',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Árbol Nacional de Panamá; de copa ancha y grandes raíces tablares, fundamental para reforestación, parques urbanos y mitigación ambiental.',
      features: [
        'Árbol Nacional oficial de la República de Panamá',
        'Enorme valor ecológico y captura de carbono',
        'Copa amplia para sombra masiva en urbanismo'
      ],
      price: 'Ref. $35.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Nativo', 'Árbol Nacional', 'Panamá', 'Reforestación', 'Sombra', 'Referencial']
    },
    {
      id: 'sp_guayacan_amarillo',
      name: 'Guayacán Amarillo',
      scientificName: 'Handroanthus chrysanthus',
      category: 'arbol',
      subcategory: 'floracion',
      photoUrl: 'assets/mockups/guayacan_arbol.webp',
      alternatePhotos: [],
      isRealPhoto: false,
      isOfficial: false,
      isMockup: true,
      sourceTag: MOCKUP_PHOTO_TAG,
      badge: 'Variedad de finca • imagen referencial',
      badgeClass: 'badge-mockup',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Árbol nativo emblemático con espectacular floración amarillo oro durante la estación seca; altamente demandado en proyectos de paisajismo urbano y bulevares.',
      features: [
        'Floración sincronizada dorada de gran atractivo visual',
        'Especie nativa adaptada a la estacionalidad panameña',
        'Madera de alta densidad y copa estructurada'
      ],
      price: 'Ref. $32.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Guayacán', 'Floración Amarilla', 'Nativo', 'Sol Pleno', 'Referencial']
    },
    {
      id: 'sp_roble_sabanero',
      name: 'Roble Sabanero',
      scientificName: 'Tabebuia rosea',
      category: 'arbol',
      subcategory: 'floracion',
      photoUrl: 'assets/mockups/roble_sabanero.webp',
      alternatePhotos: [],
      isRealPhoto: false,
      isOfficial: false,
      isMockup: true,
      sourceTag: MOCKUP_PHOTO_TAG,
      badge: 'Variedad de finca • imagen referencial',
      badgeClass: 'badge-mockup',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Árbol caducifolio nativo con abundante floración color rosa pastel; copa simétrica ideal para sombra en parques, bulevares y canteros residenciales.',
      features: [
        'Floración rosa pastel que cubre la totalidad de la copa',
        'Excelente comportamiento en aceras amplias y parques',
        'Especie protegida y fomentada en reforestación'
      ],
      price: 'Ref. $30.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Roble Sabanero', 'Floración Rosa', 'Nativo', 'Sombra', 'Referencial']
    },

    // -------------------------------------------------------------
    // PLANTAS ORNAMENTALES Y DE LUJO TROPICAL
    // -------------------------------------------------------------
    {
      id: 'sp_monstera',
      name: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      category: 'planta',
      subcategory: 'interiores_terrazas',
      photoUrl: 'assets/img/monstera_deliciosa_vivero.webp',
      alternatePhotos: ['assets/img/MONSTERA.webp'],
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sombra',
      sunLabel: 'Sombra / luz indirecta',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Icónica planta de sotobosque tropical de hojas perforadas fenestradas gigantes; ideal para terrazas techadas y maceteros residenciales.',
      features: [
        'Hojas fenestradas ornamentales de gran formato',
        'Excelente adaptación a interiores luminosos y terrazas',
        'Símbolo de arquitectura de paisaje contemporánea'
      ],
      price: 'Ref. $18.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Monstera', 'Biofílica', 'Sombra', 'Lujo Tropical', 'Interiores']
    },
    {
      id: 'sp_xanadu',
      name: 'Philodendron Xanadu',
      scientificName: 'Philodendron xanadu',
      category: 'planta',
      subcategory: 'canteros_coberturas',
      photoUrl: 'assets/img/XANADU.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sombra',
      sunLabel: 'Semisombra / luz tamizada',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Arbusto tropical perenne compacto con hojas profundamente lobuladas verde brillante; proporciona coberturas densas de suelo y canteros de sombra en PHs.',
      features: [
        'Porte denso y compacto que no requiere podas continuas',
        'Mantiene verdor lustroso en condiciones de luz filtrada',
        'Excelente para macizos al pie de palmeras'
      ],
      price: 'Ref. $14.00 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Xanadu', 'Semisombra', 'Canteros', 'Tropical', 'PH']
    },
    {
      id: 'sp_ginger_variegado',
      name: 'Ginger Variegado',
      scientificName: "Alpinia zerumbet 'Variegata'",
      category: 'planta',
      subcategory: 'lujo_tropical',
      photoUrl: 'assets/img/GINGER-VARIEGADO.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sombra',
      sunLabel: 'Semisombra / sol filtrado',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Follaje tropical exuberante con rayas verde claro y crema; aroma especiado suave y floración cerosa pendular muy apreciada en hotelería y residencias.',
      features: [
        'Hojas variegadas de alto contraste cromático',
        'Aroma especiado suave y floración pendular elegante',
        'Ideal para borduras tropicales'
      ],
      price: 'Ref. $12.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Ginger', 'Variegado', 'Aromática', 'Lujo Tropical', 'Follaje']
    },
    {
      id: 'sp_croton',
      name: 'Crotón Petro',
      scientificName: 'Codiaeum variegatum',
      category: 'planta',
      subcategory: 'canteros_color',
      photoUrl: 'assets/img/CROTO.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / semisombra',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Arbusto ornamental de hojas coriáceas multicolores (rojo, anaranjado, amarillo y verde); requiere exposición solar para intensificar su vibrante cromatismo tropical.',
      features: [
        'Follaje perenne policromático de gran impacto',
        'Aporte de acento cálido en jardines residenciales',
        'Alta rusticidad y tolerancia al calor'
      ],
      price: 'Ref. $9.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Crotón', 'Multicolor', 'Sol Pleno', 'Canteros', 'Color']
    },
    {
      id: 'sp_jazmin_estrella',
      name: 'Jazmín Estrella',
      scientificName: 'Trachelospermum jasminoides',
      category: 'planta',
      subcategory: 'trepadoras_muros',
      photoUrl: 'assets/img/JAZMIN-ESTRELLA.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Sol / Semisombra',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Trepador leñoso perenne de follaje verde lustroso y profusa floración blanca en estrella muy fragante; excelente para pérgolas, muros y vallas vivas.',
      features: [
        'Flores blancas estrelladas de perfume envolvente',
        'Cobertura tupida de mallas perimetrales y cercas',
        'Follaje denso de bajo mantenimiento'
      ],
      price: 'Ref. $8.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Jazmín Estrella', 'Trepador', 'Aromática', 'Muros Verdes', 'Pérgolas']
    },
    {
      id: 'sp_clusia_rosea',
      name: 'Clusia Rosea (Copey)',
      scientificName: 'Clusia rosea',
      category: 'planta',
      subcategory: 'cercas_vivas',
      photoUrl: 'assets/img/clusia_rosea_vivero.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / semisombra',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Arbusto tropical de hojas coriáceas carnosas verde lustroso; excelente resistencia a la brisa marina, vientos fuertes y suelos secos en playas y jardines residenciales.',
      features: [
        'Hojas carnosas muy resistentes al salitre',
        'Formación de setos y pantallas vegetales densas',
        'Bajo mantenimiento y tolerancia a sequías'
      ],
      price: 'Ref. $16.00 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Clusia', 'Cercas Vivas', 'Playa', 'Salinidad', 'Costa', 'Sol Pleno']
    },
    {
      id: 'sp_mangle_plateado',
      name: 'Mangle Plateado',
      scientificName: 'Conocarpus erectus var. sericeus',
      category: 'planta',
      subcategory: 'costeras_playa',
      photoUrl: 'assets/img/mangle_plateado_vivero.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Follaje aterciopelado de tonalidad gris plateada acerada; especie costera reina para cercas vivas y paisajismo expuesto al mar en Buenaventura, Coronado y playas de Coclé.',
      features: [
        'Coloración gris plateada única en el diseño de paisaje',
        'Tolerancia extrema a la salinidad, viento costero y arena',
        'Ideal para setos de linderos y cercas vivas frente al mar'
      ],
      price: 'Ref. $14.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Mangle Plateado', 'Cercas Vivas', 'Playa', 'Salinidad', 'Costera', 'Buenaventura']
    },
    {
      id: 'sp_rosa_tabogana',
      name: 'Rosa Tabogana',
      scientificName: 'Nerium oleander',
      category: 'planta',
      subcategory: 'cercas_floracion',
      photoUrl: 'assets/img/rosa_tabogana_cerca_viva.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Arbusto rústico y vigoroso de floración perenne en tonos vivos; una de las especies más tradicionales y resistentes de Panamá para cercas verdes y delimitación de propiedades.',
      features: [
        'Floración ininterrumpida bajo el sol tropical panameño',
        'Rápida conformación de cortinas vegetales de privacidad',
        'Resistencia comprobada al calor intenso y sequía'
      ],
      price: 'Ref. $12.00 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Rosa Tabogana', 'Cercas Verdes', 'Floración', 'Sol Pleno', 'Rusticidad']
    },
    {
      id: 'sp_lechuga_de_playa',
      name: 'Lechuga de Playa',
      scientificName: 'Scaevola taccada',
      category: 'planta',
      subcategory: 'coberturas_costeras',
      photoUrl: 'assets/img/lechuga_de_playa_costera.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / frente de playa',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Planta suculenta costera con hojas verde esmeralda y pequeñas flores blancas; máxima tolerancia al agua salobre, rocío marino directo y estabilización de dunas costeras.',
      features: [
        'Máxima resistencia al salitre y vientos marinos continuos',
        'Excelente cobertura densa para taludes y dunas de arena',
        'Follaje lustroso que no se resiente en verano'
      ],
      price: 'Ref. $9.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Lechuga de Playa', 'Costa', 'Salinidad', 'Playa', 'Frente de Mar', 'Suculenta']
    },
    {
      id: 'sp_dianella_variegada',
      name: 'Dianela Variegada',
      scientificName: 'Dianella ensifolia',
      category: 'planta',
      subcategory: 'borduras_canteros',
      photoUrl: 'assets/img/dianella_variegada_vivero.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / semisombra',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Herbácea perenne en mata con hojas acintadas verdes bordeadas en blanco crema; ideal para líneas de contorno, senderos y contrastes de textura en diseño residencial.',
      features: [
        'Contraste cromático luminoso en jardines residenciales',
        'Mantenimiento mínimo y resistencia a plagas comunes',
        'Excelente para macizos al borde de caminos de grama'
      ],
      price: 'Ref. $7.50 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Dianela', 'Variegada', 'Borduras', 'Canteros', 'Senderos']
    },
    {
      id: 'sp_aglaonema_siam',
      name: "Aglaonema 'Siam Aurora'",
      scientificName: 'Aglaonema commutatum',
      category: 'planta',
      subcategory: 'interiores_lujo',
      photoUrl: 'assets/img/aglaonema_siam_aurora.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sombra',
      sunLabel: 'Sombra / luz interior',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Planta de colección con hojas verde moteadas y bordes rojo carmín; ideal para lobbies, apartamentos y áreas protegidas del sol directo.',
      features: [
        'Follaje rojo carmín exótico de alto impacto visual',
        'Purificadora de aire y tolerante a baja iluminación',
        'Producción en macetas de cultivo listas para decorar'
      ],
      price: 'Ref. $19.00 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Aglaonema', 'Interiores', 'Lobby PH', 'Sombra', 'Rojo']
    },
    {
      id: 'sp_arbol_jupiter',
      name: 'Árbol Júpiter (flor de mayo)',
      scientificName: 'Lagerstroemia speciosa',
      category: 'arbol',
      subcategory: 'arboles_floracion',
      photoUrl: 'assets/img/arbol_jupiter_florecido.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol directo',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Árbol ornamental mediano con una de las floraciones más espectaculares del trópico en racimos rosa lila y tronco escultórico; cultivado en alineaciones en finca Coclé.',
      features: [
        'Floración exuberante prolongada en tonos lila y rosa',
        'Porte controlado ideal para aceras, parques y jardines',
        'Corteza lisa decorativa de gran atractivo invernal'
      ],
      price: 'Ref. $38.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Árbol Júpiter', 'Floración Rosa', 'Ornamental', 'Vivero Coclé', 'Sol Pleno']
    },
    {
      id: 'sp_uvero_de_playa',
      name: 'Uvero de Playa',
      scientificName: 'Coccoloba uvifera',
      category: 'arbol',
      subcategory: 'costeros_playa',
      photoUrl: 'assets/img/uvero_de_playa_costero.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / primera línea de mar',
      coastalSalinityTolerance: true,
      trafficTolerance: false,
      shortDescription: 'Árbol costero autóctono con hojas orbiculares coriáceas grandes y nervaduras rojizas; muy resistente al viento fuerte y a la salinidad en playas panameñas.',
      features: [
        'Hojas orbiculares redondeadas con nervaduras rojas decorativas',
        'Resiste la primera línea de playa',
        'Produce racimos comestibles de uvas de playa'
      ],
      price: 'Ref. $34.00 / un.',
      unit: 'unidad',
      tags: ['Árbol', 'Uvero de Playa', 'Playa', 'Salinidad', 'Costa', 'Buenaventura', 'Primera Línea']
    },
    {
      id: 'sp_calathea_bijao',
      name: 'Calathea Bijao',
      scientificName: 'Calathea lutea',
      category: 'planta',
      subcategory: 'follaje_biofilico',
      photoUrl: 'assets/mockups/calathea_bijao.webp',
      alternatePhotos: [],
      isRealPhoto: false,
      isOfficial: false,
      isMockup: true,
      sourceTag: MOCKUP_PHOTO_TAG,
      badge: 'Variedad de finca • imagen referencial',
      badgeClass: 'badge-mockup',
      sunRequirement: 'sombra',
      sunLabel: 'Semisombra / Humedad',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Planta tropical de hojas anchas erectas con envés ceroso blanquecino plateado; gran valor biofílico en diseño de jardines residenciales y canteros perimetrales.',
      features: [
        'Hojas anchas arquitectónicas con envés ceroso plateado',
        'Excelente para filtros visuales y pantallas vegetales',
        'Apreciada en arquitectura biofílica contemporánea'
      ],
      price: 'Ref. $11.00 / un.',
      unit: 'unidad',
      tags: ['Planta', 'Bijao', 'Follaje', 'Biofílica', 'Semisombra', 'Referencial']
    },

    // -------------------------------------------------------------
    // SERVICIOS B2B, HIDROSIEMBRA Y AGROINDUSTRIA
    // -------------------------------------------------------------
    {
      id: 'sp_hidrosiembra_b2b',
      name: 'Hidrosiembra mecanizada de taludes',
      scientificName: 'Revegetación hidráulica',
      category: 'b2b',
      subcategory: 'ingenieria_taludes',
      photoUrl: 'assets/img/HIDROSIEMBRA-MAQUINA.webp',
      alternatePhotos: [],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol / obras viales',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Equipo propio hidrosembrador rotulado para estabilización de taludes, minería y obras civiles en Panamá. Aplica lechada de semillas tropicales, mulch y fijadores.',
      features: [
        'Estabilización de taludes y control de erosión al 98%',
        'Maquinaria pesada propia hidrosembradora en obra',
        'Cumplimiento con especificaciones de ingeniería vial'
      ],
      price: 'Ref. $1.85 / m²',
      unit: 'm²',
      tags: ['Obra civil', 'Hidrosiembra', 'Talud', 'Control de Erosión', 'Maquinaria', 'Obras Viales']
    },
    {
      id: 'sp_pitahaya_agro',
      name: 'Pitahaya roja de exportación (7 hectáreas)',
      scientificName: 'Hylocereus costaricensis / monacanthus',
      category: 'b2b',
      subcategory: 'agroexportacion',
      photoUrl: 'assets/img/pitahaya_fruto_cosecha_cocle.webp',
      alternatePhotos: ['assets/img/Pitahaya2.webp', 'assets/img/nosotros_liderazgo_finca_cocle.webp'],
      alternatePhotos: ['assets/img/DJI_0677-Mejorado-NR.webp'],
      isRealPhoto: true,
      isOfficial: true,
      isMockup: false,
      sourceTag: OFFICIAL_PHOTO_TAG,
      badge: 'Foto oficial JUSA',
      badgeClass: 'badge-official',
      sunRequirement: 'sol',
      sunLabel: 'Pleno sol tropical',
      coastalSalinityTolerance: false,
      trafficTolerance: false,
      shortDescription: 'Plantación tecnificada en espalderas en Río Grande, Coclé. Fruta del dragón de pulpa carmesí cosechada con altos estándares para mercado nacional y agroexportación.',
      features: [
        '7 hectáreas en producción tecnificada en Coclé',
        'Fruta selecta de exportación con alto contenido de antioxidantes',
        'Venta mayorista a canal horeca y distribuidores'
      ],
      price: 'Ref. $3.50 / kg',
      unit: 'kg / caja',
      tags: ['Agro', 'Pitahaya', 'Agroexportación', 'Coclé', 'Superfruta', 'Producción Propia']
    }
  ];

  /**
   * Obtiene la lista completa de especies botánicas.
   * @returns {Array<Object>}
   */
  function getAllSpecies() {
    return BOTANICAL_SPECIES.slice();
  }

  /**
   * Obtiene una especie por su identificador único.
   * @param {string} id - Identificador de la especie (ej. 'sp_zoysia_toro')
   * @returns {Object|null}
   */
  function getSpeciesById(id) {
    if (!id) return null;
    return BOTANICAL_SPECIES.find(sp => sp.id === id) || null;
  }

  /**
   * Obtiene la taxonomía de categorías disponible.
   * @returns {Array<Object>}
   */
  function getCategories() {
    return CATEGORIES.slice();
  }

  /**
   * Filtra dinámicamente el catálogo según criterios combinados.
   * 
   * @param {Object} criteria
   * @param {string} [criteria.category='all'] - 'all' | 'grama' | 'palma' | 'arbol' | 'planta' | 'b2b'
   * @param {string} [criteria.query=''] - Texto de búsqueda libre (nombre, científico, tags, descripción)
   * @param {string} [criteria.sun] - 'sol' | 'sombra' | 'all'
   * @param {boolean} [criteria.salinity] - Si es true, filtra solo tolerantes a salinidad marina
   * @param {boolean} [criteria.traffic] - Si es true, filtra solo resistentes a tráfico intenso
   * @param {boolean} [criteria.realPhotosOnly] - Si es true, filtra solo fotos oficiales verified
   * @returns {Array<Object>} Lista de especies que cumplen todos los criterios activos
   */
  function filterBotanicalCatalog(criteria) {
    const filters = criteria || {};
    const cat = (filters.category || 'all').toLowerCase().trim();
    const query = (filters.query || '').toLowerCase().trim();
    const sunFilter = filters.sun ? filters.sun.toLowerCase().trim() : '';
    const salinityFilter = typeof filters.salinity === 'boolean' ? filters.salinity : null;
    const trafficFilter = typeof filters.traffic === 'boolean' ? filters.traffic : null;
    const realPhotosOnly = Boolean(filters.realPhotosOnly);

    return BOTANICAL_SPECIES.filter(item => {
      // 1. Filtro de Categoría
      if (cat !== 'all' && item.category !== cat) {
        return false;
      }

      // 2. Filtro de Fotos Reales Oficiales
      if (realPhotosOnly && !item.isRealPhoto) {
        return false;
      }

      // 3. Filtro de Condición Solar
      if (sunFilter && sunFilter !== 'all') {
        if (item.sunRequirement !== sunFilter && item.sunRequirement !== 'ambos') {
          return false;
        }
      }

      // 4. Filtro de Salinidad Costera
      if (salinityFilter !== null && salinityFilter === true) {
        if (!item.coastalSalinityTolerance) {
          return false;
        }
      }

      // 5. Filtro de Resistencia a Tráfico
      if (trafficFilter !== null && trafficFilter === true) {
        if (!item.trafficTolerance) {
          return false;
        }
      }

      // 6. Filtro de Texto (Búsqueda en nombre, científico, descripción y tags)
      if (query.length > 0) {
        const matchName = item.name.toLowerCase().includes(query);
        const matchSci = item.scientificName.toLowerCase().includes(query);
        const matchDesc = item.shortDescription.toLowerCase().includes(query);
        const matchTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchName && !matchSci && !matchDesc && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Búsqueda rápida por texto libre.
   * @param {string} query - Consulta de búsqueda
   * @returns {Array<Object>}
   */
  function searchCatalog(query) {
    return filterBotanicalCatalog({ query: query });
  }

  /**
   * Genera estadísticas de inventario para métricas y UI.
   * @returns {Object}
   */
  function getCatalogStats() {
    const total = BOTANICAL_SPECIES.length;
    const officialCount = BOTANICAL_SPECIES.filter(s => s.isOfficial).length;
    const mockupCount = BOTANICAL_SPECIES.filter(s => s.isMockup).length;
    const categoriesCount = {};

    BOTANICAL_SPECIES.forEach(s => {
      categoriesCount[s.category] = (categoriesCount[s.category] || 0) + 1;
    });

    return {
      totalSpecies: total,
      officialPhotosCount: officialCount,
      mockupsCount: mockupCount,
      categoriesCount: categoriesCount
    };
  }

  /**
   * Genera el enlace directo a WhatsApp para cotizar o consultar disponibilidad de una especie.
   * Target: https://wa.me/50765390949?text=Hola,%20deseo%20consultar%20disponibilidad%20de%20[NombreEspecie]
   * @param {string} speciesName - Nombre común de la especie
   * @returns {string} URL formateada de WhatsApp
   */
  function getSpeciesWhatsAppUrl(speciesName) {
    const cleanName = speciesName ? speciesName.trim() : '';
    return 'https://wa.me/50765390949?text=Hola,%20deseo%20consultar%20disponibilidad%20de%20' + encodeURIComponent(cleanName);
  }

  /**
   * Genera el HTML de la tarjeta de cada especie del catálogo botánico.
   * Incluye un botón/enlace sutil para cotizar o consultar disponibilidad por WhatsApp.
   * @param {Object} item - Objeto con datos de la especie
   * @param {string} [assetPrefix=''] - Prefijo relativo para activos
   * @returns {string} Marcado HTML de la tarjeta
   */
  function renderSpeciesCardHtml(item, assetPrefix) {
    const prefix = assetPrefix || '';
    const imgPath = prefix + item.photoUrl;

    // Fotos propias: sin etiqueta (llevan marca de agua dentro del archivo). Referenciales: se avisa.
    const badgeHtml = item.isOfficial
      ? ''
      : '<span class="badge badge-mockup">' + item.badge + '</span>';

    let traitsHtml = '';
    if (item.sunRequirement === 'sol') {
      traitsHtml += '<span class="badge badge-sun"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> Sol</span>';
    } else if (item.sunRequirement === 'sombra') {
      traitsHtml += '<span class="badge badge-shade"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg> Sombra</span>';
    }

    if (item.coastalSalinityTolerance) {
      traitsHtml += '<span class="badge badge-salinity"><svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M2 19c2 1.5 4.5 1.5 6.5 0s4.5-1.5 6.5 0 4.5 1.5 6.5 0"/></svg> Costero</span>';
    }

    if (item.trafficTolerance) {
      traitsHtml += '<span class="badge badge-traffic"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Tráfico</span>';
    }

    const waUrl = getSpeciesWhatsAppUrl(item.name);

    return '<div class="catalog-card-img-wrap">' +
      '<img src="' + imgPath + '" alt="' + item.name + ' - Jardines Urbanos Panamá" class="catalog-card-img" loading="lazy" width="400" height="300">' +
      '<div class="catalog-card-badge-pos">' + badgeHtml + '</div>' +
      '</div>' +
      '<div class="catalog-card-body">' +
      '<h3 class="catalog-card-title">' + item.name + '</h3>' +
      '<p class="catalog-card-sci">' + item.scientificName + '</p>' +
      '<div class="catalog-card-traits">' + traitsHtml + '</div>' +
      '<p class="catalog-card-desc">' + item.shortDescription + '</p>' +
      '<div class="catalog-card-footer">' +
      '<span class="catalog-price-tag" title="Precio referencial en vivero">' + item.price + '</span>' +
      '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" data-grass-variety="' + item.name + '" data-product-category="Catálogo" title="Cotizar o consultar disponibilidad por WhatsApp">' +
      '<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg> Consultar' +
      '</a>' +
      '</div>' +
      '</div>';
  }

  return {
    PENDING_CLIENT_DATA: PENDING_CLIENT_DATA,
    OFFICIAL_PHOTO_TAG: OFFICIAL_PHOTO_TAG,
    MOCKUP_PHOTO_TAG: MOCKUP_PHOTO_TAG,
    CATEGORIES: CATEGORIES,
    BOTANICAL_SPECIES: BOTANICAL_SPECIES,
    getAllSpecies: getAllSpecies,
    getSpeciesById: getSpeciesById,
    getCategories: getCategories,
    filterBotanicalCatalog: filterBotanicalCatalog,
    searchCatalog: searchCatalog,
    getCatalogStats: getCatalogStats,
    getSpeciesWhatsAppUrl: getSpeciesWhatsAppUrl,
    renderSpeciesCardHtml: renderSpeciesCardHtml
  };
}));
