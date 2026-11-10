# Dispatch for worker_m2

## Milestone 2: Lógica Interactiva: Calculadora y Catálogo

## Mandatory Guidelines
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Context & Inputs
- Path to original request: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md` (Read first!)
- Global Project Plan: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\orchestrator_1\PROJECT.md`
- Business Logic Specifications: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\spec_miner_survey_2\survey_specs.md`
- Asset Survey & Mockups: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_survey_1\survey_assets.md`
- Media Manifest: `c:\Users\Usuario\Downloads\Jardines Urbanos\site\assets\media_manifest.js`

## Objectives
1. Implement `site/js/calculator.js`:
   - Exact mathematical formula: $A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$ (mandatory +5% waste margin).
   - 4 Scenarios: `residencial` (Jardín / PH), `playa` (Casa de Playa), `deportivo` (Parque / Alto Tráfico), `talud` (Talud / Obra Vial).
   - 2 Sunlight conditions: `sol` (Pleno Sol +6 hrs), `sombra` (Sombra Parcial).
   - Exact recommendation hierarchy from `survey_specs.md`:
     - Talud -> `Hidrosiembra Técnica JUSA` (Camión Hidrosembrador B2B)
     - Playa -> `Grama Zoysia Japónica` (Rollos / Tarimas de Finca)
     - Sombra -> `Grama San Agustín` (Rollos / Tarimas de Finca)
     - Deportivo -> `Grama Zoysia Toro (Alto Tráfico)` (Suministro a Escala / Tarimas)
     - Default (Residencial sol) -> `Grama Zoysia Toro` (Rollos / Tarimas de Finca)
   - Dynamic WhatsApp link generator:
     - Target: `https://wa.me/50765390949?text=${encodeURIComponent(msg)}`
     - Pre-filled text: `Hola Jardines Urbanos, usé la calculadora web y deseo cotizar ${gross.toLocaleString()} m² (incluye 5% merma) de ${varietyTitle} para ${scenarioLabel} (${sunLabel}).`
   - Universal module export (works in browser as `window.JUSA_Calculator` and Node.js `module.exports`).

2. Implement `site/js/catalog.js`:
   - Structured botanical database linking verified species to real photos in `site/assets/img/` and native farm species to `site/assets/mockups/` with explicit disclaimer `[Variedad de Finca • Imagen Referencial]`.
   - Data attributes: ID, name, scientific name, category (`grama`, `palma`, `arbol`, `planta`, `b2b`), photo URL, isRealPhoto, badge, sun requirement, coastal salinity tolerance, traffic tolerance, short description.
   - Dynamic filtering function `filterBotanicalCatalog(criteria)`.
   - Search function by text query.
   - Strict data integrity: use `[DATO PENDIENTE DEL CLIENTE]` for any unconfirmed price or client data.
   - Universal module export (`window.JUSA_Catalog` and `module.exports`).

3. Implement `site/js/comparator.js`:
   - Interactive Before/After split slider controller supporting mouse drag, touch drag, and keyboard accessibility.
   - Support multiple slider instances on a single page.
   - Universal module export (`window.JUSA_Comparator` and `module.exports`).

4. Implement `site/js/omnichannel.js`:
   - Omnichannel WhatsApp helper (`window.JUSA_Omnichannel`), phone numbers `+507 6539-0949` and `+507 226-0494`, dataLayer event firing (`whatsapp_lead_click`), UTM parameter preservation.

5. Unit Testing:
   - Create `tests/test_calculator.test.js` and `tests/test_catalog.test.js` testing:
     - Waste margin calculation (+5% ceiling rounding)
     - All 4 scenarios × 2 sun conditions
     - WhatsApp URL format and destination phone `+507 6539-0949`
     - Catalog filtering by category, search text, and attribute flags
     - Absence of fictional data or unauthorized competitor links
   - Run tests with Node.js and ensure 100% pass rate.
   - Write comprehensive `handoff.md`.

## 2026-11-08T10:46:43Z
[Message from 4e4dce3e-b6b4-4e9d-8f07-227c2073623e]
You are worker_m2, working in directory c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\worker_m2\.
Read c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md first, as well as c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\worker_m2\DISPATCH.md.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task is Milestone 2: Lógica Interactiva: Calculadora y Catálogo:
1. Implement site/js/calculator.js (formula Math.ceil(area * 1.05), 4 scenarios, 2 sun conditions, recommendation hierarchy, dynamic WhatsApp link generator https://wa.me/50765390949, UMD module export).
2. Implement site/js/catalog.js (botanical database with 15 verified species from site/assets/img/ + native species from site/assets/mockups/ with disclaimers, category filters, text search, attribute filters, [DATO PENDIENTE DEL CLIENTE], UMD module export).
3. Implement site/js/comparator.js (touch/mouse Before/After split slider controller, multiple instance support, UMD module export).
4. Implement site/js/omnichannel.js (WhatsApp omnichannel routing, dataLayer event whatsapp_lead_click, UTM preservation).
5. Write and execute comprehensive unit test suite in tests/test_calculator.test.js and tests/test_catalog.test.js using Node.js to verify all mathematical formulas and filtering logic.
6. Deliver report at handoff.md and send message to parent when done.

