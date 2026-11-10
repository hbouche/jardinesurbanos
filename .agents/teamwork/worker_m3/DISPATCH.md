# Dispatch for worker_m3

## Milestone 3: Vistas Navegables, Tokens y Responsive

## Mandatory Guidelines
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Context & Inputs
- Path to original request: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md` (Read first!)
- Global Project Plan: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\orchestrator_1\PROJECT.md`
- Architecture & Wireframe Survey: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_survey_3\survey_architecture.md`
- Business Logic Specifications: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\spec_miner_survey_2\survey_specs.md`
- Interactive Modules: `site/js/calculator.js`, `site/js/catalog.js`, `site/js/comparator.js`, `site/js/omnichannel.js`
- Media Assets: `site/assets/img/` (33 real official photos), `site/assets/mockups/` (9 AI mockups), `site/assets/media_manifest.js`

## Objectives
1. Implement CSS Design System:
   - `site/css/tokens.css`:
     - Colors: Bosque Profundo `#122B1D`, Arena Caliza `#F4F1EA`, Verde JUSA `#71B347`, Clorofila UI `#2E6F40`, Terracota Coclé `#FA7D09`.
     - Fonts: Fraunces (display), Plus Jakarta Sans (body), JetBrains Mono (tech/metrics).
     - System fallbacks specified for offline resiliency.
   - `site/css/components.css`:
     - Buttons, cards, badge tags (`[Foto Oficial Finca JUSA]`, `[Variedad de Finca • Imagen Referencial]`, `[DATO PENDIENTE DEL CLIENTE]`), Before/After comparison slider styling, form inputs, drawer, modal dialogs.
   - `site/css/layout.css`:
     - Header, responsive navigation drawer, footer with Coclé coordinates `8.4293, -80.4960`, responsive container breakpoints (1440px, 1200px, 768px, 414px, 375px), and mobile sticky bottom thumb bar.

2. Implement Master Showcase (`site/index.html`):
   - Fully interactive master landing page integrating:
     - Header with desktop navbar & mobile menu toggle
     - Hero section with `assets/img/DJI_0677-Mejorado-NR.jpg` and CTAs
     - Credibility banner (+25 años desde 1999, Finca propia en Río Grande Coclé, Maquinaria de hidrosiembra)
     - Interactive m² Calculator widget (connected to `calculator.js`, live calculation, scenario pills, sun toggle, dynamic WhatsApp button `https://wa.me/50765390949`)
     - Live Botanical Catalog grid (connected to `catalog.js`, category filter tabs, search input, attribute badges, cards with real photos)
     - Interactive Before/After split sliders (connected to `comparator.js` for slope stabilization and residential lawn)
     - B2B & Hydroseeding spotlight (`assets/img/HIDROSIEMBRA-MAQUINA.jpg`)
     - Finca & Agro-drone gallery
     - Contact & Quote section with Ley 81 opt-in checkbox
     - Footer with Schema.org JSON-LD multi-type (`GardenStore`, `LandscapeArchitect`, `LocalBusiness`)
     - Sticky bottom thumb action bar for mobile devices

3. Implement Standalone Modular Pages in `site/pages/`:
   - `site/pages/residencial.html`: Tailored for home, PH, and beach villas.
   - `site/pages/b2b-hidrosiembra.html`: Tailored for developers, road contractors, slope stabilization, BoQ specs.
   - `site/pages/catalogo.html`: Full dedicated botanical catalog with expanded filtering and modals.
   - `site/pages/calculadora.html`: Dedicated calculator page with detailed agronomic advice.
   - `site/pages/contacto.html`: Contact channels, WhatsApp routing, Coclé location, Ley 81 form.

4. Implement `site/js/main.js`:
   - Master UI controller initializing calculators, catalog rendering, comparator sliders, mobile drawer navigation, smooth scroll, and omnichannel events across all pages.

5. Technical Validation:
   - Verify HTML validation and well-formedness.
   - Verify that all image paths in `site/` resolve to real files in `site/assets/img/` or `site/assets/mockups/`.
   - Verify that 0 console errors occur during DOM loading and interactions.
   - Deliver `handoff.md`.


## 2026-11-08T10:54:55Z
Received dispatch message:
You are worker_m3, working in directory c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\worker_m3\.
Read c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md first, as well as c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\worker_m3\DISPATCH.md.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task is Milestone 3: Vistas Navegables, Tokens y Responsive:
1. Implement CSS Design System: site/css/tokens.css, site/css/components.css, site/css/layout.css implementing "Tropical Luxury & Agro-Tech" (#122B1D, #F4F1EA, #71B347, #2E6F40, #FA7D09; Fraunces, Plus Jakarta Sans, JetBrains Mono).
2. Implement Master Showcase site/index.html (Hero, Credibility, Calculator widget, Catalog grid, Before/After sliders, B2B highlight, Finca section, Ley 81 contact, Schema.org JSON-LD, mobile thumb bar).
3. Implement Standalone Sub-pages in site/pages/: residencial.html, b2b-hidrosiembra.html, catalogo.html, calculadora.html, contacto.html.
4. Implement site/js/main.js to wire up UI interactions across all pages.
5. Validate all pages: check that all asset links resolve to real files, verify HTML syntax, ensure 0 broken links or console errors.
6. Deliver report at handoff.md and send message to parent when done.
