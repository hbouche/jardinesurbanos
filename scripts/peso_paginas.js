// Mide el peso descargado (imágenes, video, total) y las imágenes rotas de cada página, en desktop y móvil.
// Uso: node scripts/peso_paginas.js
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const root = path.resolve(__dirname, '..', 'site');
const pages = ['index.html', 'nosotros/index.html', 'residencial/index.html', 'comercial/index.html',
  'hidrosiembra/index.html', 'catalogo/index.html', 'calculadora/index.html', 'contacto/index.html'];
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ n: 'desktop', width: 1440, height: 900 }, { n: 'movil', width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const pg of pages) {
      const loaded = new Map();
      const onReq = r => { const u = r.url(); if (u.startsWith('file://')) loaded.set(u, r.resourceType()); };
      page.on('requestfinished', onReq);
      await page.goto('file://' + path.join(root, pg), { waitUntil: 'load' });
      const h = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += vp.height) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(120); }
      await page.waitForTimeout(1200);
      const broken = await page.evaluate(() => [...document.images].filter(i => i.getBoundingClientRect().width > 0 && i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')));
      page.off('requestfinished', onReq);
      let img = 0, vid = 0, tot = 0;
      for (const [u, t] of loaded) {
        const f = decodeURIComponent(u.replace('file://', '').split('?')[0]);
        const s = fs.existsSync(f) ? fs.statSync(f).size : 0; tot += s;
        if (t === 'image') img += s; if (t === 'media' || /\.mp4$/.test(f)) vid += s;
      }
      console.log(`${vp.n.padEnd(7)} ${pg.padEnd(28)} imágenes ${(img / 1e6).toFixed(2)} MB | video ${(vid / 1e6).toFixed(2)} MB | total ${(tot / 1e6).toFixed(2)} MB | rotas ${broken.length}${broken.length ? ' ' + broken.slice(0, 3).join(', ') : ''}`);
    }
    await page.close();
  }
  await browser.close();
})();
