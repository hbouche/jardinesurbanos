/**
 * test_calculator.test.js
 * Unit Test Suite for JUSA Calculator Engine (site/js/calculator.js)
 * Run: node tests/test_calculator.test.js
 */

const assert = require('assert');
const path = require('path');

// Cargar módulo UMD de la calculadora
const calculatorPath = path.resolve(__dirname, '../site/js/calculator.js');
const JUSA_Calculator = require(calculatorPath);

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
console.log('JARDINES URBANOS — TEST SUITE: CALCULATOR ENGINE');
console.log('======================================================\n');

// -------------------------------------------------------------------
// 1. FÓRMULA MATEMÁTICA Y MARGEN DE MERMA (+5% CON REDONDEO SUPERIOR)
// -------------------------------------------------------------------
console.log('--- Grupo 1: Margen de Merma (+5% con Math.ceil) ---');

runTest('100 m² netos con +5% merma debe resultar exactamente en 105 m²', () => {
  const result = JUSA_Calculator.calculateWaste(100);
  assert.strictEqual(result, 105);
});

runTest('250 m² netos con +5% merma (262.5) debe redondear hacia arriba a 263 m²', () => {
  const result = JUSA_Calculator.calculateWaste(250);
  assert.strictEqual(result, 263);
});

runTest('1,000 m² netos con +5% merma debe resultar en 1,050 m²', () => {
  const result = JUSA_Calculator.calculateWaste(1000);
  assert.strictEqual(result, 1050);
});

runTest('3,400 m² netos con +5% merma debe resultar en 3,570 m²', () => {
  const result = JUSA_Calculator.calculateWaste(3400);
  assert.strictEqual(result, 3570);
});

runTest('125.4 m² netos con +5% merma (131.67) debe redondear hacia arriba a 132 m²', () => {
  const result = JUSA_Calculator.calculateWaste(125.4);
  assert.strictEqual(result, 132);
});

runTest('1 m² neto con +5% merma (1.05) debe redondear hacia arriba a 2 m²', () => {
  const result = JUSA_Calculator.calculateWaste(1);
  assert.strictEqual(result, 2);
});

runTest('49 m² netos con +5% merma (51.45) debe redondear hacia arriba a 52 m²', () => {
  const result = JUSA_Calculator.calculateWaste(49);
  assert.strictEqual(result, 52);
});

runTest('0 m² debe retornar 0', () => {
  const result = JUSA_Calculator.calculateWaste(0);
  assert.strictEqual(result, 0);
});

runTest('Valores negativos (-50 m²) deben ser protegidos y retornar 0', () => {
  const result = JUSA_Calculator.calculateWaste(-50);
  assert.strictEqual(result, 0);
});

runTest('Entradas no numéricas o nulas deben ser manejadas con seguridad retornando 0', () => {
  assert.strictEqual(JUSA_Calculator.calculateWaste(null), 0);
  assert.strictEqual(JUSA_Calculator.calculateWaste(undefined), 0);
  assert.strictEqual(JUSA_Calculator.calculateWaste('invalido'), 0);
});

// -------------------------------------------------------------------
// 2. MATRIZ DE RECOMENDACIÓN: 4 ESCENARIOS × 2 CONDICIONES SOLARES
// -------------------------------------------------------------------
console.log('\n--- Grupo 2: Matriz de Decisión Agronómica (8 combinaciones) ---');

runTest('Escenario Talud + Pleno sol -> Hidrosiembra técnica JUSA', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 200, scenario: 'talud', sun: 'sol' });
  assert.strictEqual(quote.recommendedVariety, 'Hidrosiembra técnica JUSA');
  assert.strictEqual(quote.varietyKey, 'hidrosiembra');
  assert.strictEqual(quote.supplyMode, 'Camión hidrosembrador');
  assert.strictEqual(quote.isHydroseeding, true);
});

runTest('Escenario Talud + Sombra parcial -> Precedencia de Hidrosiembra técnica JUSA', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 200, scenario: 'talud', sun: 'sombra' });
  assert.strictEqual(quote.recommendedVariety, 'Hidrosiembra técnica JUSA');
  assert.strictEqual(quote.varietyKey, 'hidrosiembra');
  assert.strictEqual(quote.isHydroseeding, true);
});

runTest('Escenario Casa de playa + Pleno sol -> Grama Zoysia Japónica', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 150, scenario: 'playa', sun: 'sol' });
  assert.strictEqual(quote.recommendedVariety, 'Grama Zoysia Japónica');
  assert.strictEqual(quote.varietyKey, 'zoysia_japonica');
  assert.strictEqual(quote.supplyMode, 'Rollos / tarimas de finca');
  assert.strictEqual(quote.isHydroseeding, false);
});

runTest('Escenario Casa de playa + Sombra parcial -> Precedencia de Grama Zoysia Japónica por salinidad', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 150, scenario: 'playa', sun: 'sombra' });
  assert.strictEqual(quote.recommendedVariety, 'Grama Zoysia Japónica');
  assert.strictEqual(quote.varietyKey, 'zoysia_japonica');
  assert.strictEqual(quote.isHydroseeding, false);
});

runTest('Escenario Deportivo + Pleno sol -> Grama Zoysia Toro (alto tráfico)', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 600, scenario: 'deportivo', sun: 'sol' });
  assert.strictEqual(quote.recommendedVariety, 'Grama Zoysia Toro (alto tráfico)');
  assert.strictEqual(quote.varietyKey, 'zoysia_toro_deportivo');
  assert.strictEqual(quote.supplyMode, 'Suministro a escala / tarimas');
  assert.strictEqual(quote.isHydroseeding, false);
});

runTest('Escenario Deportivo + Sombra parcial -> Grama San Agustín (precedencia fisiológica de luz)', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 300, scenario: 'deportivo', sun: 'sombra' });
  assert.strictEqual(quote.recommendedVariety, 'Grama San Agustín');
  assert.strictEqual(quote.varietyKey, 'san_agustin');
  assert.strictEqual(quote.supplyMode, 'Rollos / tarimas de finca');
});

runTest('Escenario Residencial + Pleno sol (Default) -> Grama Zoysia Toro', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 80, scenario: 'residencial', sun: 'sol' });
  assert.strictEqual(quote.recommendedVariety, 'Grama Zoysia Toro');
  assert.strictEqual(quote.varietyKey, 'zoysia_toro');
  assert.strictEqual(quote.supplyMode, 'Rollos / tarimas de finca');
});

runTest('Escenario Residencial + Sombra parcial -> Grama San Agustín', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 120, scenario: 'residencial', sun: 'sombra' });
  assert.strictEqual(quote.recommendedVariety, 'Grama San Agustín');
  assert.strictEqual(quote.varietyKey, 'san_agustin');
  assert.strictEqual(quote.supplyMode, 'Rollos / tarimas de finca');
});

// -------------------------------------------------------------------
// 3. GENERADOR DINÁMICO DE ENLACE A WHATSAPP Y FORMATO
// -------------------------------------------------------------------
console.log('\n--- Grupo 3: Enlace Dinámico WhatsApp y Número Oficial ---');

runTest('Destino de WhatsApp debe ser estrictamente +507 6539-0949 (50765390949)', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 100, scenario: 'residencial', sun: 'sol' });
  assert.ok(quote.whatsappUrl.startsWith('https://wa.me/50765390949?text='),
    `URL debe apuntar al teléfono oficial 50765390949, recibida: ${quote.whatsappUrl}`);
});

runTest('Mensaje pre-llenado en WhatsApp debe coincidir con el formato exigido', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 250, scenario: 'residencial', sun: 'sol' });
  const url = new URL(quote.whatsappUrl);
  const textParam = url.searchParams.get('text');

  assert.ok(textParam.includes('Hola Jardines Urbanos, usé la calculadora web y deseo cotizar'),
    'Debe contener el saludo estandarizado');
  assert.ok(textParam.includes('263 m² (incluye 5% merma)'),
    'Debe contener los metros brutos con merma');
  assert.ok(textParam.includes('Grama Zoysia Toro'),
    'Debe especificar la variedad recomendada');
  assert.ok(textParam.includes('Jardín / residencial'),
    'Debe especificar el escenario');
  assert.ok(textParam.includes('Pleno sol'),
    'Debe especificar la condición de sol');
});

runTest('Caracteres especiales y tildes se codifican correctamente con encodeURIComponent', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 1500, scenario: 'talud', sun: 'sol' });
  // Comprobar que no existen espacios planos sin codificar en la URL
  assert.ok(!quote.whatsappUrl.includes(' '), 'La URL no debe tener caracteres de espacio sin codificar');
  assert.ok(quote.whatsappUrl.includes('%20') || quote.whatsappUrl.includes('+'), 'Espacios deben estar codificados');
});

// -------------------------------------------------------------------
// 4. LÓGICA DE NEGOCIO: TARIMAS LOGÍSTICAS Y UMBRAL B2B
// -------------------------------------------------------------------
console.log('\n--- Grupo 4: Logística de Tarimas y Umbral B2B ---');

runTest('Estimación de tarimas de finca (área bruta / 45 m² redondeado hacia arriba)', () => {
  // 100 m² netos -> 105 m² brutos -> ceil(105 / 45) = 3 tarimas
  const quote1 = JUSA_Calculator.calculateLawnQuote({ areaNet: 100, scenario: 'residencial', sun: 'sol' });
  assert.strictEqual(quote1.estimatedPallets, 3);

  // 400 m² netos -> 420 m² brutos -> ceil(420 / 45) = 10 tarimas
  const quote2 = JUSA_Calculator.calculateLawnQuote({ areaNet: 400, scenario: 'residencial', sun: 'sol' });
  assert.strictEqual(quote2.estimatedPallets, 10);
});

runTest('En hidrosiembra mecanizada, el número de tarimas debe ser 0 (despacho en camión cisterna)', () => {
  const quote = JUSA_Calculator.calculateLawnQuote({ areaNet: 1500, scenario: 'talud', sun: 'sol' });
  assert.strictEqual(quote.estimatedPallets, 0);
});

runTest('Área >= 500 m² clasifica automáticamente como lead B2B', () => {
  const quoteB2B = JUSA_Calculator.calculateLawnQuote({ areaNet: 500, scenario: 'residencial', sun: 'sol' });
  assert.strictEqual(quoteB2B.isB2B, true);
  assert.strictEqual(quoteB2B.leadType, 'B2B');
});

runTest('Escenario Talud clasifica como lead B2B independientemente del metraje', () => {
  const quoteTalud = JUSA_Calculator.calculateLawnQuote({ areaNet: 80, scenario: 'talud', sun: 'sol' });
  assert.strictEqual(quoteTalud.isB2B, true);
  assert.strictEqual(quoteTalud.leadType, 'B2B');
});

runTest('Área < 500 m² en escenario residencial clasifica como B2C', () => {
  const quoteB2C = JUSA_Calculator.calculateLawnQuote({ areaNet: 200, scenario: 'residencial', sun: 'sol' });
  assert.strictEqual(quoteB2C.isB2C || !quoteB2C.isB2B, true);
  assert.strictEqual(quoteB2C.leadType, 'B2C');
});

// -------------------------------------------------------------------
// 5. RESUMEN FINAL
// -------------------------------------------------------------------
console.log('\n======================================================');
console.log(`TOTAL PRUEBAS EJECUTADAS: ${testsRun}`);
console.log(`PRUEBAS EXITOSAS:         ${testsPassed}`);
console.log(`PRUEBAS FALLIDAS:         ${testsRun - testsPassed}`);
console.log('======================================================\n');

if (testsPassed !== testsRun) {
  process.exit(1);
} else {
  console.log('✔ TODAS LAS PRUEBAS DE CALCULADORA PASARON AL 100%.\n');
}
