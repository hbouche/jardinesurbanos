/**
 * test_e2e_comprehensive.js
 * Comprehensive E2E Test Suite for Jardines Urbanos, S.A. (Node.js Playwright Runner)
 * Coverage: Tiers 1-4, Console & Network Integrity, Schema.org Validation.
 * Execution: `node tests/test_e2e_comprehensive.js`
 */

const http = require('http');
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT_DIR = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT_DIR, 'site');
const PORT = 8099;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const errors = [];

function assertTest(condition, name, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } else {
    failedTests++;
    const msg = `  [FAIL] ${name} - ${details}`;
    console.error(msg);
    errors.push(msg);
  }
}

// Basic static file server with 204 favicon support
function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml'
    };

    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
      let pathname = parsedUrl.pathname;

      if (pathname === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
      }

      if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
      }

      const filePath = path.join(SITE_DIR, pathname);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(PORT, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function runSuite() {
  console.log('='.repeat(70));
  console.log('JARDINES URBANOS, S.A. — COMPREHENSIVE E2E TEST SUITE (NODE.JS PLAYWRIGHT)');
  console.log('='.repeat(70));

  const server = await startServer();
  const baseUrl = `http://127.0.0.1:${PORT}`;

  let chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (!fs.existsSync(chromePath)) {
    chromePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  }

  const browser = await chromium.launch({ executablePath: chromePath });

  try {
    // -------------------------------------------------------------------------
    // TIER 1.1: Calculator 4 Scenarios & +5% Waste Math
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 1.1: Calculator 4 Scenarios & +5% Waste Math ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/index.html#calculadora`, { waitUntil: 'networkidle' });

      // Default Residencial 250 m² -> 263 m² gross
      const gross = (await page.locator('#calc-gross-m2').textContent()).trim();
      const variety = (await page.locator('#calc-rec-title').textContent()).trim();
      assertTest(gross === '263', 'Residencial 250 m² -> 263 m² (+5% ceil)', `Got ${gross}`);
      assertTest(variety.includes('Zoysia Toro'), 'Residencial + Sol recommends Zoysia Toro', `Got ${variety}`);

      // Playa scenario
      await page.locator('[data-scenario="playa"]').click();
      await page.waitForTimeout(100);
      const varietyPlaya = (await page.locator('#calc-rec-title').textContent()).trim();
      assertTest(varietyPlaya.includes('Zoysia Japónica'), 'Playa scenario recommends Zoysia Japónica');

      // Deportivo scenario
      await page.locator('[data-scenario="deportivo"]').click();
      await page.waitForTimeout(100);
      const varietyDep = (await page.locator('#calc-rec-title').textContent()).trim();
      assertTest(varietyDep.includes('Zoysia Toro'), 'Deportivo scenario recommends Zoysia Toro');

      // Talud scenario
      await page.locator('[data-scenario="talud"]').click();
      await page.waitForTimeout(100);
      const varietyTalud = (await page.locator('#calc-rec-title').textContent()).trim();
      const supplyMode = (await page.locator('#calc-supply-mode').textContent()).trim();
      assertTest(varietyTalud.includes('Hidrosiembra'), 'Talud scenario recommends Hidrosiembra Técnica');
      assertTest(supplyMode.includes('Hidrosembrador'), 'Talud supply mode is Hidrosembrador B2B', `Got ${supplyMode}`);

      // Sombra
      await page.locator('[data-scenario="residencial"]').click();
      await page.locator('[data-sun="sombra"]').click();
      await page.waitForTimeout(100);
      const varietySombra = (await page.locator('#calc-rec-title').textContent()).trim();
      assertTest(varietySombra.includes('San Agustín'), 'Residencial + Sombra recommends San Agustín');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 1.2: WhatsApp Link Schema
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 1.2: WhatsApp Link Schema & Official Number ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/calculadora/index.html`, { waitUntil: 'networkidle' });

      await page.locator('.calc-number-input').fill('500');
      await page.locator('.calc-number-input').dispatchEvent('input');
      await page.locator('[data-scenario="playa"]').click();
      await page.waitForTimeout(150);

      const href = await page.locator('#calc-whatsapp-btn').getAttribute('href');
      assertTest(href.startsWith('https://wa.me/50765390949'), 'WhatsApp link targets official number +507 6539-0949', href);
      assertTest(href.includes('525') && href.includes('Zoysia'), 'WhatsApp text encodes gross area and recommended variety');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 1.3: Catalog Category Filtering
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 1.3: Catalog Dynamic Category Filtering ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/catalogo/index.html`, { waitUntil: 'networkidle' });

      const cardsAll = await page.locator('.catalog-card').count();
      assertTest(cardsAll >= 20, `Filter 'all' renders all species (found ${cardsAll} >= 20)`);

      await page.locator('.catalog-tab[data-cat="grama"]').click();
      await page.waitForTimeout(150);
      const cardsGrama = await page.locator('.catalog-card').count();
      assertTest(cardsGrama === 3, `Filter 'grama' isolates 3 certified turf varieties (found ${cardsGrama})`);

      await page.locator('.catalog-tab[data-cat="palma"]').click();
      await page.waitForTimeout(150);
      const cardsPalma = await page.locator('.catalog-card').count();
      assertTest(cardsPalma >= 5, `Filter 'palma' renders palms (found ${cardsPalma} >= 5)`);

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 1.5: Comparator Interactive Slider
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 1.5: Before / After Comparator Interactive Slider ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/index.html#comparador`, { waitUntil: 'networkidle' });

      const container = page.locator('.ba-container').first();
      await container.scrollIntoViewIfNeeded();
      const box = await container.boundingBox();

      await page.mouse.click(box.x + box.width * 0.35, box.y + box.height * 0.5);
      await page.waitForTimeout(200);

      const beforeStyle = (await page.locator('.ba-before').first().getAttribute('style')) || '';
      const handleStyle = (await page.locator('.ba-handle').first().getAttribute('style')) || '';
      assertTest(beforeStyle.includes('35%') && handleStyle.includes('35%'), 'Comparator responsive split updated to 35% on click');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 1.6: Mobile Drawer Navigation
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 1.6: Mobile Drawer Navigation & Toggle ---');
    {
      const page = await browser.newPage({
        viewport: { width: 375, height: 812 },
        isMobile: true
      });
      await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });

      const drawer = page.locator('.drawer-backdrop');
      assertTest(!((await drawer.getAttribute('class')) || '').includes('open'), 'Drawer is initially closed');

      await page.locator('.menu-toggle').click();
      await page.waitForTimeout(350);
      assertTest(((await drawer.getAttribute('class')) || '').includes('open'), 'Menu toggle opens drawer');

      await page.locator('.drawer-close-btn').click({ force: true });
      await page.waitForTimeout(350);
      assertTest(!((await drawer.getAttribute('class')) || '').includes('open'), 'Close button dismisses drawer');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 1.7: Ley 81 Form Validation
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 1.7: Ley 81 Compliance Form Interception ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/contacto/index.html`, { waitUntil: 'networkidle' });

      await page.locator('input[name="nombre"]').fill('Carlos Mendoza');
      await page.locator('input[name="telefono"]').fill('+507 6234-5678');
      await page.locator('select[name="provincia"]').selectOption('Coclé');

      const checkbox = page.locator('input[name="ley81_optin"]');
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
      }

      const isRequired = (await checkbox.getAttribute('required')) !== null;
      assertTest(isRequired, 'Ley 81 opt-in checkbox has required attribute');

      const isInvalid = !(await checkbox.evaluate((el) => el.checkValidity()));
      assertTest(isInvalid, 'Ley 81 checkbox fails HTML5 validity when unchecked');

      const form = page.locator('form[data-validate-ley81]');
      await form.evaluate((el) => el.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })));
      await page.waitForTimeout(250);

      const toastText = (await page.locator('.toast').textContent()) || '';
      assertTest(toastText.includes('Ley 81'), 'Form JS interceptor blocked submission and displayed Ley 81 warning toast');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 2: Boundary Inputs & Search Reset
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 2: Boundary Inputs & Catalog Reset ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/calculadora/index.html`, { waitUntil: 'networkidle' });

      const numInput = page.locator('.calc-number-input');

      // 1 m2 -> 2 m2
      await numInput.fill('1');
      await numInput.dispatchEvent('input');
      await page.waitForTimeout(100);
      assertTest((await page.locator('#calc-gross-m2').textContent()).trim() === '2', 'Boundary 1 m² -> 2 m² gross (ceil 1.05)');

      // 0 m2 -> 0 m2 safely
      await numInput.fill('0');
      await numInput.dispatchEvent('input');
      await page.waitForTimeout(100);
      assertTest((await page.locator('#calc-gross-m2').textContent()).trim() === '0', 'Boundary 0 m² handled safely without NaN');

      // 10,000 m2 -> 10,500 m2 + B2B badge
      await numInput.fill('10000');
      await numInput.dispatchEvent('input');
      await page.waitForTimeout(100);
      const gross10k = (await page.locator('#calc-gross-m2').textContent()).replace(/[,.]/g, '').trim();
      assertTest(gross10k === '10500', 'Boundary 10,000 m² -> 10,500 m² gross');
      assertTest((await page.locator('#calc-lead-badge').textContent()).includes('B2B'), '10,000 m² automatically flagged with B2B priority badge');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 3: Cross-Feature Interactions (Modal & UTM Tracking)
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 3: Cross-Feature Interactions & UTM DataLayer ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/index.html?utm_source=google_ads&utm_medium=cpc&utm_campaign=verano_cocle`, { waitUntil: 'networkidle' });

      const storedUtms = await page.evaluate(() => window.JUSA_Omnichannel.getStoredUtms());
      assertTest(storedUtms.utm_source === 'google_ads', 'Omnichannel captured UTM source: google_ads');
      assertTest(storedUtms.utm_campaign === 'verano_cocle', 'Omnichannel captured UTM campaign: verano_cocle');

      await page.locator('#calc-whatsapp-btn').click();
      const dlEvents = await page.evaluate(() => window.dataLayer || []);
      const leadEvents = dlEvents.filter((e) => e.event === 'whatsapp_lead_click');
      assertTest(leadEvents.length > 0, "dataLayer registered 'whatsapp_lead_click' event on CTA click");
      if (leadEvents.length > 0) {
        assertTest(leadEvents[0].utm_source === 'google_ads', 'dataLayer event carries UTM attribution source');
      }

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TIER 4: Real-World Scenarios
    // -------------------------------------------------------------------------
    console.log('\n--- TIER 4: Real-World Scenarios (Residential, BoQ Copier, Thumb Bar) ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/residencial/index.html`, { waitUntil: 'networkidle' });

      await page.locator('.calc-number-input').fill('180');
      await page.locator('.calc-number-input').dispatchEvent('input');
      await page.locator('[data-scenario="playa"]').click();
      await page.locator('[data-sun="sol"]').click();
      await page.waitForTimeout(150);

      const gross = (await page.locator('#calc-gross-m2').textContent()).trim();
      const rec = (await page.locator('#calc-rec-title').textContent()).trim();
      const pallets = (await page.locator('#calc-pallets').textContent()).trim();

      assertTest(gross === '189', 'Homeowner quote: 180 m² net -> 189 m² gross (+9 m² merma)');
      assertTest(rec.includes('Zoysia Japónica'), 'Homeowner beach scenario accurately recommends Zoysia Japónica');
      assertTest(pallets.includes('5 tarimas'), 'Logistics accurately calculates ~5 tarimas de finca');

      await page.close();
    }

    // BoQ Copier
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      const page = await context.newPage();
      await page.goto(`${baseUrl}/hidrosiembra/index.html`, { waitUntil: 'networkidle' });

      const content = await page.content();
      assertTest(content.includes('60° (1:1)'), 'B2B page defines max slope angle 60° (1:1)');

      await page.locator('[data-action="copy-spec"]').first().click();
      await page.waitForTimeout(200);
      assertTest((await page.locator('.toast').count()) > 0, 'Toast notification confirmed BoQ spec copy');

      await context.close();
    }

    // Thumb Bar
    {
      const page = await browser.newPage({
        viewport: { width: 375, height: 812 },
        isMobile: true
      });
      await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });

      const thumbBar = page.locator('.thumb-bar');
      assertTest(await thumbBar.isVisible(), 'Sticky bottom thumb bar is visible on mobile (< 992px)');

      const locInput = page.locator('#calc-location-input');
      await locInput.scrollIntoViewIfNeeded();
      await locInput.focus();
      await page.waitForTimeout(150);
      assertTest(((await thumbBar.getAttribute('class')) || '').includes('hidden'), 'Thumb bar auto-hides when form input is focused');

      await locInput.blur();
      await page.waitForTimeout(150);
      assertTest(!((await thumbBar.getAttribute('class')) || '').includes('hidden'), 'Thumb bar restores visibility when input is blurred');

      await page.close();
    }

    // -------------------------------------------------------------------------
    // INTEGRITY & SCHEMA.ORG
    // -------------------------------------------------------------------------
    console.log('\n--- INTEGRITY: 0 Console Errors & 0 Broken Assets on All 6 Pages ---');
    const allPages = [
      'index.html',
      'residencial/index.html',
      'hidrosiembra/index.html',
      'catalogo/index.html',
      'calculadora/index.html',
      'contacto/index.html'
    ];

    for (const pUrl of allPages) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const consoleErrors = [];
      const failedRequests = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));
      page.on('requestfailed', (req) => failedRequests.push(req.url()));

      await page.goto(`${baseUrl}/${pUrl}`, { waitUntil: 'networkidle' });

      assertTest(consoleErrors.length === 0, `[${pUrl}] Zero JS console errors (found ${consoleErrors.length})`);
      assertTest(failedRequests.length === 0, `[${pUrl}] Zero failed asset network requests (found ${failedRequests.length})`);

      await page.close();
    }

    console.log('\n--- SCHEMA.ORG: JSON-LD Structured Data Verification ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });

      const jsonText = await page.locator('script[type="application/ld+json"]').first().textContent();
      const parsed = JSON.parse(jsonText);
      assertTest(parsed['@context'] === 'https://schema.org', 'Schema.org @context is https://schema.org');
      assertTest(parsed['@graph'] && parsed['@graph'].length > 0, 'Schema.org @graph has at least 1 top-level entity');
      assertTest(parsed['@graph'][0].name === 'Jardines Urbanos, S.A.', "Organization name matches 'Jardines Urbanos, S.A.'");
      assertTest(parsed['@graph'][0].geo.latitude === 8.4293, 'Geo latitude verified: 8.4293');
      assertTest(parsed['@graph'][0].geo.longitude === -80.496, 'Geo longitude verified: -80.4960');

      await page.close();
    }

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n' + '='.repeat(70));
  console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
  console.log('='.repeat(70));

  if (failedTests > 0) {
    console.error('\nFailed assertions:');
    errors.forEach((e) => console.error(e));
    process.exit(1);
  } else {
    console.log('\n[OK] All E2E tests across Tiers 1-4 passed with 100% success rate!\n');
    process.exit(0);
  }
}

runSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
