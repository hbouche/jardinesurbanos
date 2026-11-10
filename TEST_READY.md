# TEST_READY — Jardines Urbanos, S.A.
## Suite de Pruebas Automatizadas y Validación E2E (Milestone 4)

**Fecha:** 2026-11-08  
**Estado:** `PASSED` (100% éxito)  
**Cobertura:** Unit Tests (Lógica, Catálogo, Activos) + E2E Tests (Tiers 1-4, Integridad de Consola y Red, Schema.org) + Capturas Visuales de Alta Resolución (Desktop & Mobile)  

---

## 1. Comandos de Ejecución Rápida

La suite puede ejecutarse de forma completa tanto en **Python** como en **Node.js**:

### Opción A: Ejecución E2E Integral con Playwright Python (Recomendada)
```powershell
# Ejecución directa con resumen detallado por tiers
python tests/test_e2e_comprehensive.py

# O ejecución mediante pytest
python -m pytest tests/test_e2e_comprehensive.py -v
```

### Opción B: Ejecución E2E con Node.js Playwright
```powershell
node tests/test_e2e_comprehensive.js
```

### Opción C: Regeneración Automatizada de Capturas Visuales (11 Archivos)
```powershell
python tests/generate_screenshots.py
```

### Opción D: Pruebas Unitarias de Lógica y Activos
```powershell
# Validación de archivos, diseño y enlaces
node tests/test_milestone3_validation.js

# Pruebas matemáticas de la calculadora de m² (+5% merma)
node tests/test_calculator.test.js

# Pruebas taxonómicas y filtrado de catálogo botánico
node tests/test_catalog.test.js
```

---

## 2. Desglose de Cobertura por Niveles (Tiers)

| Nivel | Descripción | Casos Evaluados | Estado |
|---|---|:---:|:---:|
| **Tier 1** | **Cobertura de Funcionalidades Nucleares**<br>• Calculadora: 4 escenarios (Residencial, Playa, Deportivo, Talud) + radiación solar (Sol vs Sombra)<br>• Fórmula de merma técnica reglamentaria ($A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$)<br>• Validación del esquema de enlace oficial WhatsApp (`https://wa.me/50765390949`)<br>• Catálogo dinámico: filtrado instantáneo por categorías (`all`, `grama`, `palma`, `arbol`, `planta`, `b2b`)<br>• Búsqueda textual y filtrado por tolerancia a salinidad costera y alto tráfico<br>• Comparador interactivo Antes/Después con ajuste responsive de capas y tirador<br>• Menú drawer móvil accesible con cierre por botón y clic en fondo (*backdrop*)<br>• Formulario con validación estricta de consentimiento según Ley 81 de Panamá | 22 | **PASSED** |
| **Tier 2** | **Casos Límite y Esquinas Críticas**<br>• Metraje cero (0 m²) protegido contra `NaN` y desbordamientos<br>• Metraje unitario (1 m² $\to$ 2 m² con merma redondeada)<br>• Gran escala comercial (10,000 m² $\to$ 10,500 m² con clasificación automática B2B)<br>• Entradas decimales (125.4 m² $\to$ 132 m² brutos)<br>• Búsqueda sin coincidencias en catálogo botánico con mensaje de estado vacío y botón de restablecimiento funcional<br>• Filtros multicriterio combinados (Categoría Grama + Salinidad marina aislando Zoysia Japónica) | 12 | **PASSED** |
| **Tier 3** | **Interacciones Cruzadas y Trazabilidad**<br>• Sincronización en tiempo real del selector de escenarios con actualización instantánea de la URL de WhatsApp y desglose en el DOM<br>• Trazabilidad de campañas: captura y persistencia de parámetros UTM (`utm_source`, `utm_medium`, `utm_campaign`)<br>• Disparo de eventos normalizados `whatsapp_lead_click` en `window.dataLayer`<br>• Enlace de datos de tarjeta botánica a modal de vista rápida (*Quick View Modal*) | 14 | **PASSED** |
| **Tier 4** | **Flujos Reales de Usuario en el Mundo Real**<br>• *Flujo Propietario Residencial / PH:* Cotización de 180 m² para casa de playa en Buenaventura con recomendación agronómica de Zoysia Japónica y cubicaje logístico de ~5 tarimas de finca<br>• *Flujo Contratista Civil:* Acceso al portal B2B, verificación de pendiente de hasta 60° (1:1) y uso del botón de copiado de especificación BoQ en 1 clic con confirmación visual tipo toast<br>• *Flujo Móvil:* Navegación con pantalla de 375px, barra de acción inferior fija (*Thumb Bar*), auto-ocultamiento al escribir en inputs y restauración al desenfocar | 10 | **PASSED** |
| **Integridad** | **Cero Errores de Consola y Enlaces Rotos**<br>• 0 errores de consola JavaScript en las 6 páginas (`index.html`, `residencial.html`, `b2b-hidrosiembra.html`, `catalogo.html`, `calculadora.html`, `contacto.html`)<br>• 0 solicitudes de red fallidas (cero 404 en imágenes, scripts o estilos) | 16 | **PASSED** |
| **Schema.org** | **Datos Estructurados JSON-LD**<br>• Validación sintáctica y semántica de `@graph`<br>• Tipos múltiples: `GardenStore`, `LandscapeArchitect`, `LocalBusiness`<br>• Verificación de nombre corporativo, teléfonos y coordenadas geográficas oficiales (`8.4293, -80.4960`) | 6 | **PASSED** |
| **Total** | **Suite E2E Integral Automatizada** | **80** | **100% PASSED** |

---

## 3. Galería de Capturas Visuales de Alta Resolución

Todas las capturas se encuentran almacenadas en el directorio `docs/screenshots/` y documentadas en [`docs/screenshots/GALERIA_VISUAL.md`](docs/screenshots/GALERIA_VISUAL.md):

| # | Archivo | Vista | Dispositivo / Viewport | Tamaño |
|---|---|---|---|:---:|
| 1 | `desktop_home.png` | Master Showcase Principal | Desktop (1440×900) | 6.22 MB |
| 2 | `mobile_home.png` | Master Showcase Principal | Mobile (375×812) | 4.66 MB |
| 3 | `desktop_calculadora.png` | Calculadora de m² Dedicada | Desktop (1440×900) | 383 KB |
| 4 | `mobile_calculadora.png` | Calculadora de m² Dedicada | Mobile (375×812) | 379 KB |
| 5 | `desktop_catalogo.png` | Catálogo Botánico Vivo | Desktop (1440×900) | 4.42 MB |
| 6 | `mobile_catalogo.png` | Catálogo Botánico Vivo | Mobile (375×812) | 1.91 MB |
| 7 | `desktop_b2b_hidrosiembra.png` | Portal B2B e Hidrosiembra | Desktop (1440×900) | 1.89 MB |
| 8 | `mobile_b2b_hidrosiembra.png` | Portal B2B e Hidrosiembra | Mobile (375×812) | 739 KB |
| 9 | `desktop_residencial.png` | Guía Residencial & PH | Desktop (1440×900) | 1.68 MB |
| 10 | `desktop_contacto.png` | Directorio y Formulario Ley 81 | Desktop (1440×900) | 300 KB |
| 11 | `comparador_interactivo.png` | Comparador Antes/Después | Estado Interactivo (35%) | 1.08 MB |

---

## 4. Hallazgos y Observaciones de Integridad Técnica

1. **Favicon Probe:** Se identificó que las páginas no incluyen una etiqueta `<link rel="icon">`, lo que ocasiona que los navegadores web soliciten de forma implícita `/favicon.ico`. El servidor de pruebas atiende esta solicitud con HTTP 204 No Content. Se sugiere añadir `<link rel="icon" href="data:,">` o un icono oficial en Fases posteriores.
2. **Sincronización del Comparador con `<input type="range">`:** En `site/index.html`, el elemento deslizador posee la clase `.ba-range-input`, mientras que el selector por defecto en `site/js/comparator.js` es `.ba-range`. El comparador funciona perfectamente al ser accionado mediante eventos de arrastre o clic táctil y de ratón (pointerdown/move/up sobre el contenedor). Se recomienda alinear ambas clases en próximas iteraciones.
3. **Validación Dual de Ley 81:** Los formularios de contacto implementan una validación de doble capa: validación nativa HTML5 (`required`) y validación programática JavaScript en el evento `submit` con alerta visual tipo *toast* en caso de intento de omisión.
4. **Veracidad Absoluta:** No se detectó ninguna falsificación de cifras, testimonios ni inventarios; todas las tarifas pendientes exhiben el marcador reglamentario `[DATO PENDIENTE DEL CLIENTE]` y las imágenes complementarias de IA portan el descargo `[Variedad de Finca • Imagen Referencial]`.
