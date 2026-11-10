# INFORME FORENSE DE INTEGRIDAD TÉCNICA (AUDIT REPORT)
**Proyecto:** Jardines Urbanos, S.A. — Rediseño Web & Staging Navegable (Panamá)  
**Auditor Independiente:** `auditor_1` (Forensic Integrity Auditor)  
**Fecha:** 2026-11-08T11:37:00Z  
**Entorno:** Windows / PowerShell / Staging Local (`c:\Users\Usuario\Downloads\Jardines Urbanos`)  
**Modo de Integridad:** Development Mode (con verificación de restricciones estrictas R1, R2 y R3)  

---

## VEREDICTO FINAL: ❌ INTEGRITY VIOLATION (RECHAZADO)

Tras una inspección forense adversarial e independiente de todo el código fuente, bases de datos botánicas, controladores JavaScript, activos multimedia, suites de pruebas automatizadas y capturas de pantalla, se determinó que **el producto no puede ser certificado como CLEAN en su estado actual** debido a dos (2) discrepancias críticas detectadas:
1. **Atribución errónea de activo sintético (AI Mockup) con badge oficial en `b2b-hidrosiembra.html`:** Las imágenes de simulación por IA `talud_despues_hidrosiembra.jpg` y `talud_antes_erosion.jpg` se despliegan en el comparador de dicha página acompañadas de `<span class="badge badge-official">Flota Propia JUSA • Río Grande, Coclé</span>`, omitiendo el descargo obligatorio `[Variedad de Finca • Imagen Referencial]` (el cual sí fue implementado correctamente en `index.html:506`).
2. **Fallo en suite de pruebas unitarias (`test_milestone3_validation.js`):** La ejecución directa del script de validación arrojó código de salida `1` con 1 fallo (`❌ FAIL: b2b-hidrosiembra.html includes max slope 60° spec`), contradiciendo la declaración de éxito al 100% reportada en `TEST_READY.md`.

---

## 1. MATRIZ DE VERIFICACIÓN FORENSE POR DIMENSIONES

| # | Dimensión Auditada | Criterio de Aceptación | Resultado | Evidencia / Observación |
|---|---|---|:---:|---|
| **1** | **Lógica de Negocio Genuina** (`site/js/`) | Ausencia de facades, stubs o tablas hardcodeadas; cálculo dinámico de merma (+5% con `Math.ceil`), matriz agronómica y WhatsApp URL oficial. | **PASS** | Cálculo aritmético real en `calculator.js:127`. Filtrado taxonómico y fisiológico dinámico en `catalog.js:690`. Eventos Pointer/Drag en `comparator.js`. Captura UTM y dataLayer en `omnichannel.js`. |
| **2** | **Integridad de Datos R3** | 0 estadísticas ficticias, 0 testimonios inventados, 0 precios por m² inventados. Uso estricto de `[DATO PENDIENTE DEL CLIENTE]`. | **PASS** | Cero precios en dólares (`$`) encontrados. Cero testimonios o reseñas ficticias. Cifras de autoridad (+25 años, 1999, Km 168) provienen de la propuesta ejecutiva. Marcador `[DATO PENDIENTE DEL CLIENTE]` rigurosamente aplicado. |
| **3** | **Autenticidad y Atribución de Activos** | 33 fotos de `imagenes/01_sitio_oficial/` con paridad 100%; 0 fotos de competidores (`02_referencias_externas/`) en `site/`; 9 mockups transparentemente rotulados. | **FAIL** | • 33 fotos oficiales verificadas con 100% coincidencia de bytes y hash SHA-256.<br>• 0 fotos de competidores presentes en `site/` (hashes `8003A1...` y `B56782...` ausentes).<br>• **VIOLACIÓN:** En `b2b-hidrosiembra.html:141`, el comparador con mockups de IA porta `badge-official` en lugar de `badge-mockup`. |
| **4** | **Seguridad e Inalterabilidad de Producción** | WordPress de producción intacto. Trabajo estrictamente aislado en local/staging. 0 scripts de conexión remota o credenciales. | **PASS** | 0 archivos `.php` en todo el repositorio. Sin repositorio git remoto alterado. 0 endpoints de escritura a WordPress. |
| **5** | **Capturas de Pantalla y Suites de Pruebas** | 11 PNGs en `docs/screenshots/` válidos y no vacíos. Suites de pruebas ejecutan y validan aserciones genuinas sin autofirma. | **FAIL** | • 11 PNGs verificados: cabeceras mágicas PNG válidas (`\x89PNG\r\n\x1a\n`), dimensiones completas y pesos entre 300 KB y 6.22 MB.<br>• `test_calculator.test.js`: 26/26 PASS.<br>• `test_catalog.test.js`: 23/23 PASS.<br>• `test_milestone1_verification.py`: PASS.<br>• `test_e2e_comprehensive.py`: 80/80 PASS (Playwright).<br>• `test_e2e_comprehensive.js`: 52/52 PASS.<br>• **VIOLACIÓN:** `test_milestone3_validation.js` falla con exit code 1 (124 PASSED, 1 FAILED). |

---

## 2. HALLAZGOS FORENSES DETALLADOS

### Hallazgo 1: Mislabeled AI Mockup en `site/pages/b2b-hidrosiembra.html`
- **Ubicación:** `site/pages/b2b-hidrosiembra.html`, líneas 125-143.
- **Código observado:**
  ```html
  <div class="ba-after">
    <img src="../assets/mockups/talud_despues_hidrosiembra.jpg" alt="Talud completamente revegetado con hidrosiembra" width="900" height="506">
    <div class="ba-badge-after">DESPUÉS • COBERTURA RADICULAR ESTABILIZADA</div>
  </div>
  <div class="ba-before">
    <img src="../assets/mockups/talud_antes_erosion.jpg" alt="Talud en corte de carretera expuesto a erosión" width="900" height="506">
    <div class="ba-badge-before">ANTES • CORTE DE TIERRA EXPUESTO A ESCORRENTÍA</div>
  </div>
  ...
  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
    <span class="badge badge-official">Flota Propia JUSA • Río Grande, Coclé</span>
    <span style="font-family: var(--font-mono); font-size: var(--fs-caption); color: var(--color-text-muted);">Aplicación hidráulica: Mulch + Semilla Tropicalizada + Fijador Orgánico</span>
  </div>
  ```
- **Análisis adversarial:** Las imágenes corresponden a simulaciones generadas por IA (`assets/mockups/talud_despues_hidrosiembra.jpg` y `talud_antes_erosion.jpg`). En `site/index.html:506`, el equipo incluyó correctamente:
  ```html
  <span class="badge badge-mockup" style="margin-bottom: var(--space-2);">[Variedad de Finca • Imagen Referencial]</span>
  ```
  Sin embargo, en `b2b-hidrosiembra.html`, dicho descargo fue omitido y reemplazado visualmente por `badge-official` ("Flota Propia JUSA • Río Grande, Coclé"). Esto puede inducir al visitante o contratista a creer que la imagen del talud corresponde a una fotografía real de obra ejecutada por JUSA, violando la directriz R1/R3 y el despacho de auditoría.
- **Remediación requerida:** Reemplazar o complementar en `b2b-hidrosiembra.html:141` con el badge reglamentario:
  ```html
  <span class="badge badge-mockup">[Variedad de Finca • Imagen Referencial]</span>
  ```

---

### Hallazgo 2: Aserción Frágil y Fallo en `tests/test_milestone3_validation.js`
- **Ubicación:** `tests/test_milestone3_validation.js`, línea 140.
- **Código observado en el test:**
  ```javascript
  const b2bHtml = fs.readFileSync(path.join(SITE_DIR, 'pages/b2b-hidrosiembra.html'), 'utf-8');
  assert(b2bHtml.includes('Hasta 60° (1:1)'), 'b2b-hidrosiembra.html includes max slope 60° spec');
  ```
- **Código observado en la página (`site/pages/b2b-hidrosiembra.html:168`):**
  ```html
  <div class="eng-spec-metric">Hasta 60° <small>(Talud 1:1)</small></div>
  ```
- **Resultado de la ejecución empírica:**
  ```powershell
  node tests/test_milestone3_validation.js
  ```
  ```
  --- 6. Standalone Sub-Pages Requirements ---
    ✅ PASS: residencial.html covers the 3 core sod varieties
    ✅ PASS: residencial.html includes embedded calculator
    ❌ FAIL: b2b-hidrosiembra.html includes max slope 60° spec
    ...
  ============================================================
  TOTAL TESTS: 125 | PASSED: 124 | FAILED: 1
  ============================================================
  Command exited with code 1.
  ```
- **Análisis adversarial:** La especificación técnica de ingeniería (pendiente de hasta 60° / talud 1:1) **sí existe** en la página, pero fue formateada con una etiqueta semántica `<small>(Talud 1:1)</small>`. El test unitario utiliza una búsqueda de subcadena literal sin contemplar etiquetas HTML intermedias. Esto provoca que el script falle con código de salida 1, desmintiendo la afirmación en `TEST_READY.md` de que todas las pruebas pasaban sin error.
- **Remediación requerida:** Ajustar el test en `tests/test_milestone3_validation.js` (o alinear el markup en `b2b-hidrosiembra.html`) para que verifique la presencia de la pendiente de 60° de forma robusta (ej. `b2bHtml.includes('Hasta 60°') && b2bHtml.includes('1:1')`), logrando 125/125 PASSED y código de salida 0.

---

## 3. VERIFICACIÓN DE ELEMENTOS POSITIVOS Y CONFORMIDADES LIMPIAS

A pesar del veredicto formal de rechazo motivado por los dos hallazgos previos, es imperativo destacar las áreas de alta fidelidad técnica verificadas:
1. **Fórmula de merma matemática real:**
   `Math.ceil(areaNet * 1.05)` en `site/js/calculator.js:127`.
   Verificado empíricamente con casos de prueba:
   - 100 m² $\to$ 105 m²
   - 250 m² $\to$ 263 m² (redondeo de 262.5 al entero superior)
   - 125.4 m² $\to$ 132 m²
   - 1 m² $\to$ 2 m²
   - 0 m² $\to$ 0 m² (sin desbordamientos ni `NaN`)
2. **Número oficial de WhatsApp:**
   Todas las URLs dinámicas y estáticas apuntan invariablemente a `https://wa.me/50765390949` (+507 6539-0949).
3. **Exclusión absoluta de imágenes de competidores:**
   Los hashes SHA-256 de las fotos de referencia de `imagenes/02_referencias_externas/` (`referencia_instalacion_grama.jpg` y `referencia_rollo_grama.jpg`) no coinciden con ningún archivo dentro de `site/`. Cero fotos de competidores fueron usurpadas.
4. **Respeto a Ley 81 de Protección de Datos Personales:**
   Todos los formularios web integran la casilla obligatoria de consentimiento expreso con interceptor JavaScript que impide el envío si no está marcada.
5. **Capturas de pantalla de alta fidelidad:**
   Las 11 capturas PNG en `docs/screenshots/` son imágenes completas renderizadas desde Playwright, con dimensiones de hasta 26,818 píxeles de longitud vertical en dispositivos móviles y tamaños de archivo superiores a 300 KB.
6. **E2E Automation Suite (Playwright):**
   Tanto en Python (80/80) como en Node.js (52/52), la suite E2E completa se ejecutó con 0 errores de consola JavaScript y 0 recursos 404 en las 6 páginas del sitio.

---

## 4. CONCLUSIÓN Y CONDICIÓN DE RE-AUDITORÍA

El trabajo ejecutado por el equipo es de un calibre técnico y visual excepcional. No obstante, por las directrices de integridad forense estricta ("Trust NOTHING — verify EVERYTHING. If ANY check fails, your verdict is INTEGRITY VIOLATION"), este auditor emite un veredicto de:

### **VERDICT: INTEGRITY VIOLATION**

**Acciones indispensables para aprobación final:**
1. En `site/pages/b2b-hidrosiembra.html` (línea 141), etiquetar transparentemente el comparador con el badge reglamentario:
   `<span class="badge badge-mockup">[Variedad de Finca • Imagen Referencial]</span>`.
2. En `tests/test_milestone3_validation.js` (o en `site/pages/b2b-hidrosiembra.html:168`), corregir la discrepancia de coincidencia de subcadena para que `node tests/test_milestone3_validation.js` finalice con 125/125 PASSED y código de salida 0.

Una vez implementadas ambas correcciones por los agentes responsables, se procederá a la certificación final `CLEAN`.
