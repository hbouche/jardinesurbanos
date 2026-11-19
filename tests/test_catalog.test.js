/**
 * test_catalog.test.js
 * Unit Test Suite for JUSA Botanical Catalog & Interactive Modules
 * Run: node tests/test_catalog.test.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Cargar módulos UMD
const catalogPath = path.resolve(__dirname, '../site/js/catalog.js');
const comparatorPath = path.resolve(__dirname, '../site/js/comparator.js');
const omnichannelPath = path.resolve(__dirname, '../site/js/omnichannel.js');

const JUSA_Catalog = require(catalogPath);
const JUSA_Comparator = require(comparatorPath);
const JUSA_Omnichannel = require(omnichannelPath);

let testsRun = 0;
let testsPassed = 0;

function runTest(name, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
    if (err.actual !== undefined && err.expected !== undefined) {
      console.error(`    Expected: ${JSON.stringify(err.expected)}`);
      console.error(`    Actual:   ${JSON.stringify(err.actual)}`);
    }
  }
}

console.log('\n======================================================');
console.log('JARDINES URBANOS — TEST SUITE: BOTANICAL CATALOG & LOGIC');
console.log('======================================================\n');

// -------------------------------------------------------------------
// 1. INTEGRIDAD DE LA BASE DE DATOS BOTÁNICA Y ACTIVOS EN DISCO
// -------------------------------------------------------------------
console.log('--- Grupo 1: Integridad de Especies y Archivos Fotográficos ---');

const allSpecies = JUSA_Catalog.getAllSpecies();

runTest('El catálogo debe contener todas las especies registradas (>= 20)', () => {
  assert.ok(allSpecies.length >= 20, `Se esperaban al menos 20 especies, encontradas: ${allSpecies.length}`);
});

runTest('Todas las fotos oficiales declaradas deben existir físicamente en site/assets/img/', () => {
  const officialSpecies = allSpecies.filter(s => s.isRealPhoto);
  assert.ok(officialSpecies.length >= 15, `Deben existir al menos 15 especies con fotos reales, encontradas: ${officialSpecies.length}`);

  officialSpecies.forEach(sp => {
    const fullPath = path.resolve(__dirname, '../site', sp.photoUrl);
    assert.ok(fs.existsSync(fullPath), `Archivo no encontrado en disco para ${sp.name}: ${sp.photoUrl}`);
    assert.strictEqual(sp.isOfficial, true, `Especie ${sp.name} debe tener isOfficial = true`);
    assert.strictEqual(sp.isMockup, false, `Especie ${sp.name} debe tener isMockup = false`);
    assert.strictEqual(sp.sourceTag, '[Foto oficial finca JUSA]', `Especie ${sp.name} debe portar el sourceTag de foto oficial`);
  });
});

runTest('Todas las especies mockup declaradas deben existir físicamente en site/assets/mockups/ y portar descargo referencial', () => {
  const mockupSpecies = allSpecies.filter(s => s.isMockup);
  assert.ok(mockupSpecies.length >= 5, `Deben existir especies mockup complementarias para nativas, encontradas: ${mockupSpecies.length}`);

  mockupSpecies.forEach(sp => {
    const fullPath = path.resolve(__dirname, '../site', sp.photoUrl);
    assert.ok(fs.existsSync(fullPath), `Archivo mockup no encontrado en disco para ${sp.name}: ${sp.photoUrl}`);
    assert.strictEqual(sp.isRealPhoto, false, `Especie mockup ${sp.name} debe tener isRealPhoto = false`);
    assert.strictEqual(sp.isOfficial, false, `Especie mockup ${sp.name} debe tener isOfficial = false`);
    assert.strictEqual(sp.sourceTag, '[Variedad de finca • imagen referencial]',
      `Especie mockup ${sp.name} debe portar obligatoriamente la etiqueta '[Variedad de finca • imagen referencial]'`);
    assert.ok(sp.badge.toLowerCase().includes('referencial'), `Badge de ${sp.name} debe indicar que es referencial`);
  });
});

runTest('Precios referenciales de vivero presentes y válidos en catálogo', () => {
  allSpecies.forEach(sp => {
    assert.ok(sp.price && sp.price.includes('$'),
      `La especie ${sp.name} debe tener un precio referencial válido con formato moneda`);
  });
});

runTest('Todas las especies deben tener atributos taxonómicos completos (id, nombre, categoría, descripción)', () => {
  const validCategories = ['grama', 'palma', 'arbol', 'planta', 'b2b'];
  const ids = new Set();

  allSpecies.forEach(sp => {
    assert.ok(sp.id && sp.id.startsWith('sp_'), `ID inválido en ${sp.name}`);
    assert.ok(!ids.has(sp.id), `ID duplicado: ${sp.id}`);
    ids.add(sp.id);

    assert.ok(sp.name && sp.name.length > 2, `Nombre faltante en ${sp.id}`);
    assert.ok(sp.scientificName && sp.scientificName.length > 2, `Nombre científico faltante en ${sp.name}`);
    assert.ok(validCategories.includes(sp.category), `Categoría '${sp.category}' inválida en ${sp.name}`);
    assert.ok(sp.shortDescription && sp.shortDescription.length > 15, `Descripción muy corta en ${sp.name}`);
    assert.ok(Array.isArray(sp.tags) && sp.tags.length >= 3, `Tags insuficientes en ${sp.name}`);
  });
});

// -------------------------------------------------------------------
// 2. FILTRADO DINÁMICO POR CATEGORÍA
// -------------------------------------------------------------------
console.log('\n--- Grupo 2: Filtrado por Categorías ---');

runTest("Filtro 'all' debe retornar el total completo de especies", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ category: 'all' });
  assert.strictEqual(result.length, allSpecies.length);
});

runTest("Filtro 'grama' debe retornar exactamente las 3 variedades certificadas de grama", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ category: 'grama' });
  assert.strictEqual(result.length, 3);
  const names = result.map(r => r.name);
  assert.ok(names.includes('Grama Zoysia Toro'));
  assert.ok(names.includes('Grama Zoysia Japónica'));
  assert.ok(names.includes('Grama San Agustín'));
});

runTest("Filtro 'palma' debe retornar al menos 5 palmas ornamentales", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ category: 'palma' });
  assert.ok(result.length >= 5, `Se esperaban >= 5 palmas, encontradas: ${result.length}`);
  const names = result.map(r => r.name);
  assert.ok(names.includes('Palma Real en finca'));
  assert.ok(names.includes('Palma Bismarckia'));
  assert.ok(names.includes('Palma cola de zorro'));
  assert.ok(names.includes('Palma Areca'));
});

runTest("Filtro 'arbol' debe retornar árboles nativos (preparado, neem, panamá, guayacán, roble)", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ category: 'arbol' });
  assert.ok(result.length >= 5, `Se esperaban >= 5 árboles, encontrados: ${result.length}`);
  const names = result.map(r => r.name);
  assert.ok(names.includes('Árbol preparado en cepellón'));
  assert.ok(names.includes('Árbol de Neem'));
  assert.ok(names.includes('Árbol Panamá (Árbol Nacional)'));
});

runTest("Filtro 'planta' debe retornar plantas ornamentales (monstera, xanadu, ginger, croto, jazmín, calathea)", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ category: 'planta' });
  assert.ok(result.length >= 5, `Se esperaban >= 5 plantas, encontradas: ${result.length}`);
});

runTest("Filtro 'b2b' debe retornar hidrosiembra y cultivo de pitahaya", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ category: 'b2b' });
  assert.strictEqual(result.length, 2);
  const names = result.map(r => r.name);
  assert.ok(names.some(n => n.includes('Hidrosiembra')));
  assert.ok(names.some(n => n.includes('Pitahaya')));
});

// -------------------------------------------------------------------
// 3. BÚSQUEDA TEXTUAL Y FILTROS FISIOLÓGICOS (SOL, SALINIDAD, TRÁFICO)
// -------------------------------------------------------------------
console.log('\n--- Grupo 3: Búsqueda Textual y Filtros Fisiológicos ---');

runTest("Búsqueda textual 'zoysia' debe retornar Zoysia Toro y Zoysia Japónica", () => {
  const result = JUSA_Catalog.searchCatalog('zoysia');
  assert.ok(result.length >= 2);
  result.forEach(item => {
    assert.ok(item.name.toLowerCase().includes('zoysia') || item.scientificName.toLowerCase().includes('zoysia'));
  });
});

runTest("Búsqueda textual 'bismarckia' debe retornar Palma Bismarckia", () => {
  const result = JUSA_Catalog.searchCatalog('bismarckia');
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 'sp_palma_bismarckia');
});

runTest("Búsqueda textual 'nacional' debe encontrar el Árbol Panamá", () => {
  const result = JUSA_Catalog.searchCatalog('nacional');
  assert.ok(result.some(r => r.id === 'sp_arbol_panama'));
});

runTest("Filtro por tolerancia a salinidad costera (salinity: true) debe incluir Zoysia Japónica y Bismarckia", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ salinity: true });
  assert.ok(result.length >= 3);
  const ids = result.map(r => r.id);
  assert.ok(ids.includes('sp_zoysia_japonica'));
  assert.ok(ids.includes('sp_palma_bismarckia'));
  result.forEach(item => {
    assert.strictEqual(item.coastalSalinityTolerance, true);
  });
});

runTest("Filtro por alta resistencia al tráfico (traffic: true) debe aislar la variedad de alto tráfico", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ traffic: true });
  assert.ok(result.length >= 1);
  assert.ok(result.some(r => r.id === 'sp_zoysia_toro'));
  result.forEach(item => {
    assert.strictEqual(item.trafficTolerance, true);
  });
});

runTest("Filtro por condición solar 'sombra' debe retornar especies de sombra parcial", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ sun: 'sombra' });
  const ids = result.map(r => r.id);
  assert.ok(ids.includes('sp_san_agustin'));
  assert.ok(ids.includes('sp_monstera'));
  assert.ok(ids.includes('sp_palma_areca'));
});

runTest("Filtro 'realPhotosOnly: true' debe excluir todos los mockups", () => {
  const result = JUSA_Catalog.filterBotanicalCatalog({ realPhotosOnly: true });
  assert.ok(result.length > 0);
  result.forEach(item => {
    assert.strictEqual(item.isRealPhoto, true);
    assert.strictEqual(item.isMockup, false);
  });
});

runTest('Búsqueda sin coincidencias debe retornar un array vacío de manera segura', () => {
  const result = JUSA_Catalog.searchCatalog('termino_completamente_inexistente_xyz_999');
  assert.strictEqual(Array.isArray(result), true);
  assert.strictEqual(result.length, 0);
});

// -------------------------------------------------------------------
// 4. MÉTODOS AUXILIARES Y ESTADÍSTICAS DEL CATÁLOGO
// -------------------------------------------------------------------
console.log('\n--- Grupo 4: Métodos Auxiliares y Estadísticas ---');

runTest('getSpeciesById() debe retornar la especie correcta o null si no existe', () => {
  const sp = JUSA_Catalog.getSpeciesById('sp_zoysia_toro');
  assert.ok(sp !== null);
  assert.strictEqual(sp.name, 'Grama Zoysia Toro');

  assert.strictEqual(JUSA_Catalog.getSpeciesById('id_falso'), null);
  assert.strictEqual(JUSA_Catalog.getSpeciesById(''), null);
  assert.strictEqual(JUSA_Catalog.getSpeciesById(null), null);
});

runTest('getCatalogStats() debe reportar métricas precisas de inventario', () => {
  const stats = JUSA_Catalog.getCatalogStats();
  assert.ok(stats.totalSpecies >= 20);
  assert.strictEqual(stats.totalSpecies, stats.officialPhotosCount + stats.mockupsCount);
  assert.strictEqual(stats.categoriesCount.grama, 3);
  assert.ok(stats.categoriesCount.palma >= 5);
  assert.ok(stats.categoriesCount.arbol >= 5);
  assert.ok(stats.categoriesCount.planta >= 5);
  assert.strictEqual(stats.categoriesCount.b2b, 2);
});

// -------------------------------------------------------------------
// 5. VERIFICACIÓN DE MÓDULOS COMPARADOR Y OMNICANAL
// -------------------------------------------------------------------
console.log('\n--- Grupo 5: Módulos Comparator y Omnichannel ---');

runTest('JUSA_Comparator debe exportar la clase y método initAll con rangos seguros [5, 95]', () => {
  assert.ok(typeof JUSA_Comparator.BeforeAfterComparator === 'function');
  assert.ok(typeof JUSA_Comparator.initAll === 'function');
  assert.strictEqual(JUSA_Comparator.DEFAULT_OPTIONS.min, 5);
  assert.strictEqual(JUSA_Comparator.DEFAULT_OPTIONS.max, 95);

  const comparator = new JUSA_Comparator.BeforeAfterComparator(null, { initialPosition: 50 });
  assert.strictEqual(comparator.clamp(0), 5);
  assert.strictEqual(comparator.clamp(100), 95);
  assert.strictEqual(comparator.clamp(50), 50);
});

runTest('JUSA_Omnichannel debe exportar números oficiales y métodos de tracking', () => {
  assert.strictEqual(JUSA_Omnichannel.OFFICIAL_WHATSAPP_PHONE, '50765390949');
  assert.strictEqual(JUSA_Omnichannel.OFFICIAL_WHATSAPP_DISPLAY, '+507 6539-0949');
  assert.strictEqual(JUSA_Omnichannel.OFFICIAL_LANDLINE_PHONE, '5072260494');
  assert.strictEqual(JUSA_Omnichannel.OFFICIAL_EMAIL_SALES, 'ventas@jardinesurbanos.com');

  // Captura de UTMs con query string
  const utms = JUSA_Omnichannel.captureUtms('?utm_source=google_ads&utm_campaign=grama_verano&utm_medium=cpc');
  assert.strictEqual(utms.utm_source, 'google_ads');
  assert.strictEqual(utms.utm_campaign, 'grama_verano');
  assert.strictEqual(utms.utm_medium, 'cpc');

  // Generación de URL WhatsApp con atribución
  const waUrl = JUSA_Omnichannel.buildWhatsAppUrl({
    message: 'Hola, deseo cotizar grama.',
    attribution: utms
  });
  assert.ok(waUrl.startsWith('https://wa.me/50765390949?text='));
  assert.ok(decodeURIComponent(waUrl).includes('[Ref: google_ads / grama_verano]'));

  // Disparo de evento dataLayer
  const event = JUSA_Omnichannel.trackWhatsAppClick({
    varietyTitle: 'Grama Zoysia Toro',
    gross: 263,
    location: 'Costa del Este'
  });
  assert.strictEqual(event.event, 'whatsapp_lead_click');
  assert.strictEqual(event.grass_variety, 'Grama Zoysia Toro');
  assert.strictEqual(event.area_m2, 263);
});

// -------------------------------------------------------------------
// 6. RESUMEN FINAL
// -------------------------------------------------------------------
console.log('\n======================================================');
console.log(`TOTAL PRUEBAS EJECUTADAS: ${testsRun}`);
console.log(`PRUEBAS EXITOSAS:         ${testsPassed}`);
console.log(`PRUEBAS FALLIDAS:         ${testsRun - testsPassed}`);
console.log('======================================================\n');

if (testsPassed !== testsRun) {
  process.exit(1);
} else {
  console.log('✔ TODAS LAS PRUEBAS DE CATÁLOGO Y LÓGICA PASARON AL 100%.\n');
}
