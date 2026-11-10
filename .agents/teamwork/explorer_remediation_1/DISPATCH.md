# Dispatch for explorer_remediation_1

## Context & Mandatory Guidelines
Milestone 5 failed unconditionally due to a FORENSIC AUDIT INTEGRITY VIOLATION reported by `auditor_1`.
You MUST investigate the auditor's full evidence report below and formulate a precise, complete remediation strategy.
DO NOT recommend any strategy that circumvents the audit. The fix strategy MUST address the specific integrity violations identified by the auditor.

## Full Auditor Evidence Report (Verbatim)
From `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\auditor_1\handoff.md`:
```
Veredicto Formal: INTEGRITY VIOLATION (Rechazado).

1. Etiquetado de Mockups IA en b2b-hidrosiembra.html:
   - En `site/pages/b2b-hidrosiembra.html`, líneas 125-143:
     El comparador utiliza imágenes sintéticas generadas por IA (`talud_despues_hidrosiembra.jpg` y `talud_antes_erosion.jpg`) pero exhibe una etiqueta `badge-official` ("Flota Propia JUSA") sin el descargo obligatorio `[Variedad de Finca • Imagen Referencial]`.
     En `site/index.html`, línea 506: el mismo comparador incluye:
     `<span class="badge badge-mockup" style="margin-bottom: var(--space-2);">[Variedad de Finca • Imagen Referencial]</span>`.
     En `b2b-hidrosiembra.html`, el descargo `[Variedad de Finca • Imagen Referencial]` no está presente, y en su lugar se colocó `badge-official`. Esto viola el mandato de atribución transparente de mockups establecido en R1/R3.

2. Pruebas Automatizadas:
   - `node tests/test_milestone3_validation.js` falla con código 1.
     Error verbatim: `❌ FAIL: b2b-hidrosiembra.html includes max slope 60° spec`.
     Línea 140 de `tests/test_milestone3_validation.js`: `assert(b2bHtml.includes('Hasta 60° (1:1)'), ...)`.
     Línea 168 de `site/pages/b2b-hidrosiembra.html`: `<div class="eng-spec-metric">Hasta 60° <small>(Talud 1:1)</small></div>`.
     El proceso terminó con exit code 1.
```

## Objectives
1. Read `site/pages/b2b-hidrosiembra.html` and compare lines 120-150 with `site/index.html:500-515`.
2. Inspect `tests/test_milestone3_validation.js` line 140 and `site/pages/b2b-hidrosiembra.html:168`.
3. Provide exact, verified remediation instructions for the Worker:
   - Fix the badge and disclaimer in `site/pages/b2b-hidrosiembra.html` to clearly tag the comparator with `<span class="badge badge-mockup">[Variedad de Finca • Imagen Referencial]</span>` matching R1/R3 and `index.html`.
   - Fix the markup or test assertion in `b2b-hidrosiembra.html` / `test_milestone3_validation.js` so that `node tests/test_milestone3_validation.js` passes 100% with exit code 0.
4. Deliver `remediation_plan.md` and complete `handoff.md`.


## 2026-11-08T11:39:00Z
You are explorer_remediation_1, working in directory c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_remediation_1\.
Read c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\ORIGINAL_REQUEST.md first, as well as c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_remediation_1\DISPATCH.md.

Milestone 5 failed due to an INTEGRITY VIOLATION reported by auditor_1. You are tasked with analyzing the auditor's full evidence report and formulating a concrete, line-by-line remediation plan.
Inspect:
1. site/pages/b2b-hidrosiembra.html around line 125-145 and site/index.html:500-515.
2. tests/test_milestone3_validation.js around line 140 and site/pages/b2b-hidrosiembra.html:168.
Formulate a remediation plan addressing both items cleanly and authentically.
Write your report to remediation_plan.md and complete handoff.md. Send a message to parent when done.
