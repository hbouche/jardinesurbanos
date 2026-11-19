/**
 * test_milestone3_validation.js
 * Comprehensive automated verification for Milestone 3:
 * Vistas Navegables, Tokens y Responsive
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT_DIR, 'site');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('\n============================================================');
console.log('🧪 MILESTONE 3: VALIDATION SUITE (PAGES, TOKENS, ASSETS)');
console.log('============================================================\n');

// 1. Core CSS Design System Files
console.log('--- 1. CSS Design System Verification ---');
const requiredCss = [
  'css/tokens.css',
  'css/components.css',
  'css/layout.css'
];

requiredCss.forEach(file => {
  const fullPath = path.join(SITE_DIR, file);
  assert(fs.existsSync(fullPath), `CSS file exists: ${file}`);
});

const tokensCss = fs.readFileSync(path.join(SITE_DIR, 'css/tokens.css'), 'utf-8');
assert(tokensCss.includes('#122B1D'), 'tokens.css defines Bosque Profundo (#122B1D)');
assert(tokensCss.includes('#F4F1EA'), 'tokens.css defines Arena Caliza (#F4F1EA)');
assert(tokensCss.includes('#71B347'), 'tokens.css defines Verde JUSA (#71B347)');
assert(tokensCss.includes('#2E6F40'), 'tokens.css defines Clorofila UI (#2E6F40)');
assert(tokensCss.includes('#FA7D09'), 'tokens.css defines Terracota Coclé (#FA7D09)');
assert(tokensCss.includes('Fraunces'), 'tokens.css defines Fraunces display font');
assert(tokensCss.includes('Plus Jakarta Sans'), 'tokens.css defines Plus Jakarta Sans body font');
assert(tokensCss.includes('JetBrains Mono'), 'tokens.css defines JetBrains Mono tech font');

// 2. HTML Pages Existence
console.log('\n--- 2. HTML Pages Existence ---');
const requiredPages = [
  'index.html',
  'residencial/index.html',
  'hidrosiembra/index.html',
  'catalogo/index.html',
  'calculadora/index.html',
  'contacto/index.html'
];

requiredPages.forEach(file => {
  const fullPath = path.join(SITE_DIR, file);
  assert(fs.existsSync(fullPath), `HTML page exists: ${file}`);
});

// 3. Asset Links Resolution Check (Zero 404s!)
console.log('\n--- 3. Asset & Link Integrity Verification (Zero 404s) ---');

requiredPages.forEach(page => {
  const fullPagePath = path.join(SITE_DIR, page);
  const pageDir = path.dirname(fullPagePath);
  const content = fs.readFileSync(fullPagePath, 'utf-8');

  // Regex to extract all local src and href attributes
  const srcMatches = [...content.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  const linkMatches = [...content.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(m => m[1]);
  const urlMatches = [...content.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1]);

  const allAssets = [...srcMatches, ...linkMatches, ...urlMatches];

  allAssets.forEach(asset => {
    // Ignore external http/https/data URLs
    if (asset.startsWith('http://') || asset.startsWith('https://') || asset.startsWith('data:') || asset.startsWith('#')) {
      return;
    }

    const cleanAsset = asset.split('?')[0].split('#')[0];
    const resolvedPath = path.resolve(pageDir, cleanAsset);
    const exists = fs.existsSync(resolvedPath);
    assert(exists, `In [${page}]: Asset '${asset}' resolves to real file: ${path.relative(ROOT_DIR, resolvedPath)}`);
  });
});

// 4. Schema.org JSON-LD Validation
console.log('\n--- 4. Schema.org JSON-LD Verification ---');
const indexHtml = fs.readFileSync(path.join(SITE_DIR, 'index.html'), 'utf-8');
const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(jsonLdMatch !== null, 'index.html contains Schema.org JSON-LD script block');
if (jsonLdMatch) {
  try {
    const parsed = JSON.parse(jsonLdMatch[1]);
    assert(parsed['@context'] === 'https://schema.org', 'Schema.org @context is valid');
    const graph = parsed['@graph'];
    assert(Array.isArray(graph) && graph.length > 0, 'Schema.org @graph has entries');
    const org = graph[0];
    assert(org.name === 'Jardines Urbanos, S.A.', 'Schema.org organization name verified');
    assert(org.geo && org.geo.latitude === 8.4293, 'Schema.org geo latitude verified: 8.4293');
    assert(org.geo && org.geo.longitude === -80.4960, 'Schema.org geo longitude verified: -80.4960');
  } catch (err) {
    assert(false, `Schema.org JSON-LD parsing failed: ${err.message}`);
  }
}

// 5. Section Elements in Master Showcase
console.log('\n--- 5. Master Showcase Section Requirements ---');
assert(indexHtml.includes('assets/img/DJI_0677-Mejorado-NR.jpg'), 'Hero references real drone photo DJI_0677-Mejorado-NR.jpg');
assert(indexHtml.includes('+25 años'), 'Credibility banner includes +25 años trayectoria');
assert(indexHtml.includes('Fincas propias en Coclé'), 'Credibility banner includes Fincas propias en Coclé');
assert(indexHtml.includes('href="calculadora/"'), 'Inicio enlaza a la calculadora única (revisión DMC: un botón, no el formulario)');
assert(indexHtml.includes('catalog-grid'), 'Botanical catalog grid markup is present');
assert(indexHtml.includes('ba-comparator'), 'Before/After comparator markup is present');
assert(indexHtml.includes('data-destacadas='), 'Inicio muestra solo las especies destacadas (revisión DMC: 6 especies + botón al catálogo)');
assert(!indexHtml.includes('<form'), 'Inicio sin formularios completos (revisión DMC: contacto breve)');
assert(indexHtml.includes('https://wa.me/50765390949') && indexHtml.includes('tel:+5072260494'), 'Contacto breve con WhatsApp y teléfono en Inicio');
assert(indexHtml.includes('thumb-bar'), 'Mobile sticky bottom thumb action bar is present');

// 6. Sub-Pages Specific Requirements
console.log('\n--- 6. Standalone Sub-Pages Requirements ---');
const residencialHtml = fs.readFileSync(path.join(SITE_DIR, 'residencial/index.html'), 'utf-8');
assert(residencialHtml.includes('Zoysia Toro') && residencialHtml.includes('Zoysia Japónica') && residencialHtml.includes('San Agustín'),
  'residencial.html covers the 3 core sod varieties');
assert(residencialHtml.includes('calculadora/?escenario=residencial'), 'residencial.html enlaza a la calculadora única preseleccionada');

const b2bHtml = fs.readFileSync(path.join(SITE_DIR, 'hidrosiembra/index.html'), 'utf-8');
assert(b2bHtml.includes('Hasta 60°') && (b2bHtml.includes('(Talud 1:1)') || b2bHtml.includes('(1:1)')), 'b2b-hidrosiembra.html includes max slope 60° spec');
assert(b2bHtml.includes('data-action="copy-spec"'), 'b2b-hidrosiembra.html includes BoQ Spec Copier');

const catalogoHtml = fs.readFileSync(path.join(SITE_DIR, 'catalogo/index.html'), 'utf-8');
assert(catalogoHtml.includes('catalog-grid'), 'catalogo.html includes dynamic catalog grid');
assert(catalogoHtml.includes('catalog-tab'), 'catalogo.html includes category tabs');

const calcHtml = fs.readFileSync(path.join(SITE_DIR, 'calculadora/index.html'), 'utf-8');
assert(calcHtml.includes('calc-widget'), 'calculadora.html includes full interactive calculator');

const contactoHtml = fs.readFileSync(path.join(SITE_DIR, 'contacto/index.html'), 'utf-8');
assert(contactoHtml.includes('8.4293, -80.4960'), 'contacto.html includes Coclé GPS coordinates');
assert(contactoHtml.includes('ley81_optin'), 'contacto.html includes Ley 81 opt-in');

// 7. JavaScript Syntax & Loading
console.log('\n--- 7. JavaScript Modules Syntax Check ---');
const jsFiles = [
  'js/calculator.js',
  'js/catalog.js',
  'js/comparator.js',
  'js/omnichannel.js',
  'js/main.js'
];

jsFiles.forEach(file => {
  const fullPath = path.join(SITE_DIR, file);
  try {
    const code = fs.readFileSync(fullPath, 'utf-8');
    // Basic syntax evaluation
    new Function(code);
    assert(true, `JavaScript syntax valid: ${file}`);
  } catch (err) {
    assert(false, `JavaScript syntax error in ${file}: ${err.message}`);
  }
});

console.log('\n============================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
