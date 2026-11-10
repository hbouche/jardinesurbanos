/**
 * test_runtime_dom_sim.js
 * Simulates DOM environment to verify that all JS modules load and initialize with 0 runtime errors
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '../site');

// Create minimal DOM stub
global.window = global;
global.self = global;
global.document = {
  readyState: 'complete',
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') cb();
  },
  removeEventListener: () => {},
  querySelector: (sel) => null,
  querySelectorAll: (sel) => [],
  createElement: (tag) => ({
    className: '',
    innerHTML: '',
    style: {},
    appendChild: () => {},
    setAttribute: () => {},
    getAttribute: () => null,
    addEventListener: () => {}
  }),
  body: {
    appendChild: () => {},
    style: {}
  }
};
global.location = {
  pathname: '/site/index.html',
  search: '?utm_source=test&utm_medium=cpc'
};
global.sessionStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};

console.log('Testing module loading in simulated browser environment...');

const mediaManifest = require(path.join(SITE_DIR, 'assets/media_manifest.js'));
global.JUSA_MEDIA_MANIFEST = mediaManifest;
console.log('  ✅ media_manifest.js loaded. Brand:', mediaManifest.brand);

const omnichannel = require(path.join(SITE_DIR, 'js/omnichannel.js'));
global.JUSA_Omnichannel = omnichannel;
console.log('  ✅ omnichannel.js loaded. WhatsApp:', omnichannel.OFFICIAL_WHATSAPP_DISPLAY);

const calculator = require(path.join(SITE_DIR, 'js/calculator.js'));
global.JUSA_Calculator = calculator;
console.log('  ✅ calculator.js loaded. Scenarios:', Object.keys(calculator.SCENARIOS).join(', '));

const catalog = require(path.join(SITE_DIR, 'js/catalog.js'));
global.JUSA_Catalog = catalog;
console.log('  ✅ catalog.js loaded. Species count:', catalog.BOTANICAL_SPECIES.length);

const comparator = require(path.join(SITE_DIR, 'js/comparator.js'));
global.JUSA_Comparator = comparator;
console.log('  ✅ comparator.js loaded. Comparator constructor exists:', typeof comparator.BeforeAfterComparator);

require(path.join(SITE_DIR, 'js/main.js'));
console.log('  ✅ main.js loaded and executed DOM bootstrap with 0 errors.');

console.log('\nAll JS modules run cleanly without exceptions!');
