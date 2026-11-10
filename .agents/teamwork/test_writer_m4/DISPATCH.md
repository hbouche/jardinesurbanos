# Dispatch for test_writer_m4

## Milestone 4: E2E Testing, Capturas Visuales y Validación

## Mandatory Guidelines
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Context & Inputs
- Path to original request: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md` (Read first!)
- Global Project Plan: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\orchestrator_1\PROJECT.md`
- Master Showcase & Pages: `c:\Users\Usuario\Downloads\Jardines Urbanos\site\`
- Visual Direction & Wireframes: `Tropical Luxury & Agro-Tech` (Desktop 1440px, Mobile 375px)

## Objectives
1. Implement Comprehensive E2E Test Suite (`tests/test_e2e_comprehensive.js` / `.py`):
   - Tier 1: Feature Coverage (Calculator 4 scenarios, +5% waste, WhatsApp link schema `https://wa.me/50765390949`, Catalog category filter & text search, Comparator slider, Mobile menu, Ley 81 form).
   - Tier 2: Boundary & Corner Cases (0 m², 1 m², 10,000 m², decimal inputs, empty catalog search, multi-filter combinations).
   - Tier 3: Cross-Feature Interactions (Scenario switch -> recommendation -> WhatsApp URL update; UTM parameter preservation; Catalog modal data binding).
   - Tier 4: Real-World Scenarios (Residential homeowner flow, Civil contractor slope BoQ copy flow, Mobile navigation & thumb bar).
2. High-Resolution Visual Verification & Screenshots:
   - Create and run an automated screenshot script (using Playwright, Puppeteer, Selenium, or headless browser script via Node/Python) to capture full Desktop (1440×900) and Mobile (375×812) screenshots:
     - `docs/screenshots/desktop_home.png`
     - `docs/screenshots/mobile_home.png`
     - `docs/screenshots/desktop_calculadora.png`
     - `docs/screenshots/mobile_calculadora.png`
     - `docs/screenshots/desktop_catalogo.png`
     - `docs/screenshots/mobile_catalogo.png`
     - `docs/screenshots/desktop_b2b_hidrosiembra.png`
     - `docs/screenshots/mobile_b2b_hidrosiembra.png`
     - `docs/screenshots/desktop_residencial.png`
     - `docs/screenshots/desktop_contacto.png`
     - `docs/screenshots/comparador_interactivo.png`
   - Generate visual gallery report `docs/screenshots/GALERIA_VISUAL.md` documenting each screenshot with layout review.
3. Console & Network Integrity:
   - Assert 0 JavaScript console errors, 0 broken asset links, valid Schema.org JSON-LD.
4. Coordination:
   - Create `TEST_READY.md` at project root with complete test execution commands and coverage summary table.
5. Deliver report at `handoff.md`.


## 2026-11-08T11:07:25Z
You are test_writer_m4, working in directory c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\test_writer_m4\.
Read c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md first, as well as c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\test_writer_m4\DISPATCH.md.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task is Milestone 4: E2E Testing, Capturas Visuales y Validación:
1. Implement and run a comprehensive E2E test suite (Tiers 1-4) verifying all features of site/index.html and site/pages/*.html (calculator +5% waste, WhatsApp link https://wa.me/50765390949, catalog filtering, comparator slider, mobile drawer, Ley 81 form, boundaries 0/1/10000 m², cross-feature flows).
2. Generate automated high-resolution screenshots for both Desktop (1440px) and Mobile (375px) saved to docs/screenshots/ (Home, Calculadora, Catálogo, B2B Hidrosiembra, Residencial, Contacto, Comparador) and compile docs/screenshots/GALERIA_VISUAL.md.
3. Assert 0 console errors and valid Schema.org JSON-LD.
4. Publish TEST_READY.md at project root with test runner instructions and tier breakdown.
5. Deliver report at handoff.md and send message to parent when done.
