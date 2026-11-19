// Capturas de página completa (desktop y móvil) de las 8 páginas del sitio.
// Uso: node scripts/capturas.js <carpeta_salida>
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '..', 'site');
const out = path.resolve(process.argv[2] || 'docs/qa/capturas');
const pages = ['index.html', 'nosotros/index.html', 'residencial/index.html', 'comercial/index.html',
  'hidrosiembra/index.html', 'catalogo/index.html', 'calculadora/index.html', 'contacto/index.html'];
const viewports = [{ n: 'desktop', width: 1440, height: 900 }, { n: 'movil', width: 390, height: 844 }];
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const pg of pages) {
      await page.goto('file://' + path.join(root, pg), { waitUntil: 'load' }).catch(() => {});
      const h = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += vp.height) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(80); }
      // Forzar carga de imágenes diferidas fuera de pantalla (carruseles horizontales)
      await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; }));
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(1500);
      // Pausar videos y animaciones para capturas comparables
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
      await page.evaluate(() => document.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; }));
      const name = vp.n + '_' + (pg === 'index.html' ? 'index' : path.dirname(pg)) + '.jpg';
      await page.screenshot({ path: path.join(out, name), fullPage: true, type: 'jpeg', quality: 70 });
      console.log(name);
    }
    await page.close();
  }
  await browser.close();
})();
