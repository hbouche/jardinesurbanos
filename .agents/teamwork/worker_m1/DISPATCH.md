# Dispatch for worker_m1

## Milestone 1: Activos, Entorno y Mockups IA

## Mandatory Guidelines
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Context & Inputs
- Path to original request: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md` (Read first!)
- Global Project Plan: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\orchestrator_1\PROJECT.md`
- Asset Survey Report: `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_survey_1\survey_assets.md`
- Source images: `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\01_sitio_oficial\`

## Objectives
1. Scaffolding:
   - Create directories:
     - `site/`
     - `site/css/`
     - `site/js/`
     - `site/pages/`
     - `site/assets/img/`
     - `site/assets/mockups/`
     - `assets/mockups/`
2. Real Official Photos:
   - Copy all 33 official photos from `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\01_sitio_oficial\` to `c:\Users\Usuario\Downloads\Jardines Urbanos\site\assets\img\`.
   - STRICT INTEGRITY: DO NOT copy `02_referencias_externas/` into public site assets.
3. AI Mockups Generation for Visual Gaps:
   - Generate AI mockups using `generate_image` based on the exact prompt specifications in `survey_assets.md` Section 5:
     - `talud_antes_erosion.jpg`: Bare eroded roadside slope in tropical Panama.
     - `talud_despues_hidrosiembra.jpg`: Same slope stabilized with dense green hydroseeded grass.
     - `jardin_antes_tierra.jpg`: Residential backyard with bare reddish clay soil before lawn installation.
     - `jardin_despues_zoysia.jpg`: Same backyard with lush, freshly installed Zoysia Toro turf.
     - Missing catalog species: `guayacan_arbol.jpg`, `arbol_panama.jpg`, `roble_sabanero.jpg`, `palma_viajera.jpg`, `calathea_bijao.jpg`.
   - Save these to `assets/mockups/` and copy to `site/assets/mockups/`.
4. Media Manifest:
   - Create `site/assets/media_manifest.js` (and `.json`) cataloging all 33 real images + mockups with labels, dimensions, category, and source tags (`[Foto Oficial Finca JUSA]` vs `[Variedad de Finca • Imagen Referencial]`).
5. Run verification script to check file existence, non-zero file sizes, and write `handoff.md`.


## 2026-11-08T10:34:26Z
You are worker_m1, working in directory c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\worker_m1\.
Read c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md first, as well as c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\worker_m1\DISPATCH.md.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task is Milestone 1: Activos, Entorno y Mockups IA:
1. Create directories in site/: css/, js/, pages/, assets/img/, assets/mockups/, and assets/mockups/ in project root.
2. Copy all 33 real official photos from imagenes/01_sitio_oficial/ into site/assets/img/. Verify that 02_referencias_externas/ is NOT copied into public web assets.
3. Generate the required AI mockups for the visual gaps in assets/mockups/ (and mirror to site/assets/mockups/):
   - Slope Before/After pair: talud_antes_erosion.jpg and talud_despues_hidrosiembra.jpg
   - Residential lawn Before/After pair: jardin_antes_tierra.jpg and jardin_despues_zoysia.jpg
   - Missing native catalog species: guayacan_arbol.jpg, arbol_panama.jpg, roble_sabanero.jpg, palma_viajera.jpg, calathea_bijao.jpg
   Follow prompt specs in c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_survey_1\survey_assets.md.
4. Create site/assets/media_manifest.js (and .json) cataloging all official images and mockups with labels, category, dimensions, and source tags ([Foto Oficial Finca JUSA] vs [Variedad de Finca • Imagen Referencial]).
5. Run verification to confirm all files exist, have non-zero size, and write your handoff.md. Send a message to parent when complete.
