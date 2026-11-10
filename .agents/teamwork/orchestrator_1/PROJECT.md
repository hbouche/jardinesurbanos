# Project: Rediseño y Prototipado Navegable Jardines Urbanos, S.A.

## Architecture
- **Tech Stack**: Vanilla HTML5, CSS3 Custom Properties (Design System Tokens), Modular ES6 JavaScript. Zero build-step dependencies for 100% native browser portability and staging isolation.
- **Visual Direction**: "Tropical Luxury & Agro-Tech"
  - Palette: Bosque Profundo `#122B1D`, Arena Caliza `#F4F1EA`, Verde JUSA `#71B347`, Clorofila UI `#2E6F40`, Terracota Coclé `#FA7D09`.
  - Typography: Fraunces (Display Serif), Plus Jakarta Sans (Body Sans), JetBrains Mono (Tech/Metrics).
- **Directory Layout**:
  - `site/`: Root staging prototype.
    - `site/index.html`: Master interactive showcase connecting all sections.
    - `site/pages/`:
      - `residencial.html`: Landing Residencial / PH.
      - `b2b-hidrosiembra.html`: Landing B2B, Obras Viales, Taludes y Fichas Técnicas.
      - `catalogo.html`: Catálogo Botánico Vivo completo filtrable.
      - `calculadora.html`: Calculadora interactiva dedicada de m².
      - `contacto.html`: Formulario, WhatsApp Omnicanal, Mapa Coclé y Ley 81.
    - `site/css/`:
      - `tokens.css`: Variables CSS de paleta, tipografía, espaciado y sombras.
      - `components.css`: Componentes UI (cards, sliders, botones, badges, modales, drawer).
      - `layout.css`: Header, footer, grid responsive, bottom thumb bar.
    - `site/js/`:
      - `calculator.js`: Motor matemático de m² (+5% merma, árbol agronómico, generador WhatsApp).
      - `catalog.js`: Base de datos botánica estructurada, filtros dinámicos, búsqueda.
      - `comparator.js`: Controlador del slider interactivo Antes/Después (mouse & touch).
      - `omnichannel.js`: Integración de tracking GTM dataLayer y enrutamiento UTM WhatsApp.
      - `main.js`: Inicializador, navegación móvil, interactividad general.
    - `site/assets/`:
      - `img/`: 33 imágenes reales oficiales optimizadas desde `imagenes/01_sitio_oficial/`.
      - `mockups/`: Imágenes mockup con IA en `assets/mockups/` etiquetadas como referenciales.
  - `docs/screenshots/`: Capturas de pantalla de alta resolución Desktop (1440px) y Móvil (375px).
  - `tests/`: Pruebas automatizadas unitarias y E2E.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Scaffolding de Entorno Staging | Estructura de carpetas limpia y autónoma en `site/` | M1 | ORIGINAL_REQUEST R1 |
| 2 | Integración de 33 Fotos Reales Oficiales | Mapeo prioritario de todas las fotos verificadas de `imagenes/01_sitio_oficial/` | M1 | explorer_survey_1 |
| 3 | Exclusión Estricta de Fotos Externas | Asegurar que `02_referencias_externas/` no se use como portafolio propio de JUSA | M1 | explorer_survey_1 / R3 |
| 4 | Generación de Mockups IA para Brechas Visuales | Pares Antes/Después de talud y césped, vistas de proyectos y especies sin foto local en `assets/mockups/` | M1 | ORIGINAL_REQUEST Follow-up |
| 5 | Manifest / Base de Datos de Medios | Registro estructurado de URLs, alt text botánico, resoluciones y badges | M1 | explorer_survey_1 |
| 6 | Calculadora m²: Escenarios de Uso | Selección de 4 escenarios: Residencial/PH, Playa, Alto Tráfico, Talud | M2 | spec_miner_survey_2 |
| 7 | Calculadora m²: Condición Solar | Selección Pleno Sol (+6 hrs) o Sombra Parcial | M2 | spec_miner_survey_2 |
| 8 | Calculadora m²: Margen Merma +5% | Fórmula matemática $A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$ | M2 | spec_miner_survey_2 |
| 9 | Calculadora m²: Motor de Recomendación | Decisión agronómica: Talud->Hidrosiembra, Playa->Zoysia Japónica, Sombra->San Agustín, Tráfico/Sol->Zoysia Toro | M2 | spec_miner_survey_2 |
| 10 | Calculadora m²: Generador Dinámico WhatsApp | URL `https://wa.me/50765390949` con mensaje codificado con cotización detallada | M2 | spec_miner_survey_2 |
| 11 | Catálogo Botánico: Taxonomía y Especies | Especies reales verificadas (Zoysia, San Agustín, Bismarckia, Areca, etc.) + especies nativas con badge | M2 | explorer_survey_1 |
| 12 | Catálogo Botánico: Filtrado Dinámico | Filtros instantáneos por categoría (Gramas, Palmas, Árboles, Plantas, Hidrosiembra) | M2 | ORIGINAL_REQUEST R2 |
| 13 | Catálogo Botánico: Búsqueda y Atributos | Búsqueda por texto y badges de tolerancia (sol, salinidad costera, tráfico) | M2 | spec_miner_survey_2 |
| 14 | Comparador Antes/Después Interactivo | Slider táctil y con cursor para comparar estados (ej. talud erosionado vs estabilizado) | M2 | ORIGINAL_REQUEST R2 |
| 15 | Protocolo de Integridad de Datos | Marcadores `[DATO PENDIENTE DEL CLIENTE]` para información no verificada; cero datos inventados | M2 | ORIGINAL_REQUEST R3 |
| 16 | Tokens de Diseño "Tropical Luxury & Agro-Tech" | Implementación en CSS de colores (#122B1D, #F4F1EA, #71B347, #2E6F40, #FA7D09) y fuentes Fraunces + Plus Jakarta Sans | M3 | explorer_survey_3 |
| 17 | Header y Navegación Responsive | Barra de navegación desktop con enlaces ancla/páginas y menú drawer móvil | M3 | explorer_survey_3 |
| 18 | Barra de Acción Móvil Inferior (Thumb Bar) | Botón fijo inferior en pantallas móviles para cotización rápida WhatsApp y calculadora | M3 | explorer_survey_3 |
| 19 | Master Showcase (`site/index.html`) | Página principal integrando Hero con dron, calculadora, catálogo vivo, comparador y B2B | M3 | explorer_survey_3 |
| 20 | Landing Residencial (`site/pages/residencial.html`) | Vista especializada para propietarios de casas, PH y residenciales de playa | M3 | explorer_survey_3 |
| 21 | Landing B2B e Hidrosiembra (`site/pages/b2b-hidrosiembra.html`) | Vista técnica para constructoras, desarrolladores, taludes y control de erosión | M3 | explorer_survey_3 |
| 22 | Página de Contacto & Cumplimiento (`site/pages/contacto.html`) | Canales de atención, ubicación Coclé y checkbox de consentimiento Ley 81 | M3 | spec_miner_survey_2 |
| 23 | SEO Base y Schema.org JSON-LD | Metadatos únicos, OpenGraph, JSON-LD multi-tipo GardenStore/LandscapeArchitect | M3 | spec_miner_survey_2 |
| 24 | Pruebas Automatizadas de Lógica | Tests unitarios para cálculo de merma, recomendaciones y filtros | M4 | ORIGINAL_REQUEST Acceptance |
| 25 | Verificación Visual Responsive y Capturas | Capturas de pantalla Desktop (1440px) y Móvil (375px) en `docs/screenshots/` | M4 | ORIGINAL_REQUEST Follow-up |
| 26 | Verificación Técnica de Consola y Enlaces | Comprobación de 0 errores en consola del navegador y enlaces funcionales | M4 | ORIGINAL_REQUEST Acceptance |
| 27 | Auditoría Forense de Integridad | Verificación independiente de autenticidad, ausencia de falsificación y cumplimiento | M5 | Integrity Forensics |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Activos, Entorno y Mockups IA | Scaffolding de `site/`, copiado/optimización de 33 fotos reales oficiales, generación de mockups IA complementarios en `assets/mockups/` | none | DONE |
| M2 | Lógica Interactiva: Calculadora y Catálogo | `calculator.js`, `catalog.js`, `comparator.js`, `omnichannel.js`, unit tests matemáticos y de filtrado | M1 | DONE |
| M3 | Vistas Navegables, Tokens y Responsive | `tokens.css`, `components.css`, `layout.css`, `index.html`, páginas modularizadas en `pages/`, SEO JSON-LD | M2 | DONE |
| M4 | E2E Testing, Capturas Visuales y Validación | Pruebas E2E automatizadas, capturas de pantalla Desktop/Móvil en `docs/screenshots/`, reporte de cobertura | M3 | DONE |
| M5 | Auditoría Forense de Integridad | Verificación forense por `teamwork_auditor` (cero código falso, respeto a datos reales, integridad) | M4 | DONE |

## Interface Contracts
### `calculator.js` ↔ UI Components
- `calculateLawnQuote({ areaNet: number, scenario: string, sun: string }): QuoteResult`
  - `areaNet`: número entero $\ge 1$ en m².
  - `scenario`: `'residencial' | 'playa' | 'deportivo' | 'talud'`.
  - `sun`: `'sol' | 'sombra'`.
  - Returns: `{ areaNet: number, wasteMarginPct: 5, areaGross: number, recommendedVariety: string, varietyKey: string, supplyMode: string, whatsappUrl: string, summaryText: string }`.

### `catalog.js` ↔ UI Components
- `filterBotanicalCatalog({ category?: string, query?: string, sun?: string, salinity?: boolean, traffic?: boolean }): BotanicalItem[]`
  - `BotanicalItem`: `{ id: string, name: string, scientificName: string, category: 'grama'|'palma'|'arbol'|'planta'|'b2b', image: string, isRealPhoto: boolean, badge: string, sun: string, salinity: boolean, traffic: boolean, description: string }`.

### `omnichannel.js` ↔ Global Scope
- `window.JUSA_Omnichannel = { buildWhatsAppUrl(quoteData), trackEvent(eventName, payload) }`
- Emite eventos normalizados a `window.dataLayer = window.dataLayer || []`.

## Code Layout
- `site/index.html`: Entry point master showcase
- `site/pages/*.html`: Standalone sub-pages
- `site/css/tokens.css`, `components.css`, `layout.css`
- `site/js/calculator.js`, `catalog.js`, `comparator.js`, `omnichannel.js`, `main.js`
- `site/assets/img/`: Official real photos
- `site/assets/mockups/`: AI mockups for visual gaps
- `tests/test_calculator.js`: Unit tests for math formulas
- `tests/test_catalog.js`: Unit tests for filtering logic
- `tests/test_e2e.py` / `test_e2e.js`: Automated browser/DOM integration tests
- `docs/screenshots/`: Desktop and mobile visual proof
