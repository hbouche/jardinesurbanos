// Chequeo de contraste WCAG (texto vs. fondo sólido efectivo) en las 8 páginas.
// Uso: node scripts/contraste.js [desktop|movil]   -> lista elementos con contraste < 4.5:1 (3:1 si texto grande)
// Limitación: no evalúa texto sobre fotos o degradados (los reporta como "sobre imagen" si hay background-image).
const { chromium } = require('playwright');
const path = require('path');
const root = path.resolve(__dirname, '..', 'site');
const pages = ['index.html', 'nosotros/index.html', 'residencial/index.html', 'comercial/index.html',
  'hidrosiembra/index.html', 'catalogo/index.html', 'calculadora/index.html', 'contacto/index.html'];
const vp = process.argv[2] === 'movil' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: vp });
  let total = 0;
  for (const pg of pages) {
    await page.goto('file://' + path.join(root, pg), { waitUntil: 'load' });
    await page.waitForTimeout(700);
    const issues = await page.evaluate(() => {
      const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
      const lum = ({ r, g, b }) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
      const out = [];
      const seen = new Set();
      for (const el of document.querySelectorAll('body *')) {
        if (['SCRIPT', 'STYLE', 'SVG', 'PATH', 'OPTION'].includes(el.tagName.toUpperCase())) continue;
        const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ');
        if (!own) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
        const rect = el.getBoundingClientRect(); if (!rect.width || !rect.height) continue;
        // Fondo efectivo: apilar fondos de ancestros hasta uno opaco
        const layers = []; let onImage = false;
        for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
          const s = getComputedStyle(n);
          if (s.backgroundImage && s.backgroundImage !== 'none') { onImage = true; break; }
          const bg = parse(s.backgroundColor); if (bg && bg.a > 0) { layers.push(bg); if (bg.a >= 1) break; }
          // texto superpuesto a una <img>/<video> hermana posicionada (heros, tarjetas sobre foto)
          if (n !== el && [...n.children].some(c => ['IMG', 'VIDEO'].includes(c.tagName) && getComputedStyle(c).position === 'absolute')) { if (!layers.length || layers[layers.length - 1].a < 1) { onImage = true; break; } }
        }
        let bg = { r: 255, g: 255, b: 255, a: 1 };
        for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
        let fg = parse(cs.color); if (!fg) continue; fg = blend(fg, bg);
        const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
        const large = size >= 24 || (size >= 18.66 && bold);
        const min = large ? 3 : 4.5;
        if (ratio < min && !onImage) {
          const key = own.slice(0, 50) + '|' + ratio.toFixed(1);
          if (seen.has(key)) continue; seen.add(key);
          out.push(`${ratio.toFixed(2)}:1  "${own.slice(0, 60)}"  <${el.tagName.toLowerCase()} class="${(el.className || '').toString().slice(0, 40)}">  color ${cs.color} sobre rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`);
        }
      }
      return out;
    });
    total += issues.length;
    console.log(`\n== ${pg} (${issues.length})`);
    issues.forEach(i => console.log('  ' + i));
  }
  console.log(`\nTOTAL con contraste insuficiente: ${total}`);
  await browser.close();
})();
