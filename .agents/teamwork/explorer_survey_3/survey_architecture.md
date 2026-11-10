# Architectural Blueprint & UX/UI Specification Report
**Project:** Jardines Urbanos, S.A. (`jardinesurbanos.com`) — Staging Prototype in `site/`  
**Author:** `explorer_survey_3`  
**Date:** 2026-11-08  
**Design Theme:** "Tropical Luxury & Agro-Tech"  
**Target Repository Directory:** `c:\Users\Usuario\Downloads\Jardines Urbanos\site\`

---

## 1. Executive Summary & Architectural Vision

Jardines Urbanos, S.A. (JUSA) is transitioning from a traditional plant nursery image into a recognized **agro-industrial powerhouse of green infrastructure, large-scale sod production (fincas in Río Grande, Coclé), and B2B/B2C landscaping solutions** across the Republic of Panamá.

The prototype in `site/` must be an **autonomous, responsive, zero-error, high-converting interactive web application**. It serves two primary customer personas without compromising speed or visual clarity:
1. **B2C / Residential & PH:** Homeowners, beach property owners (Coronado, Buenaventura, Gorgona), and PH administrators requiring fast m² calculation, variety recommendations (Zoysia Toro, Japónica, San Agustín), and instant WhatsApp ordering.
2. **B2B / Infrastructure, Civil Works & Architects:** Civil engineers, highway contractors (MOP), landscape architects, and sports facilities needing hydroseeding (hidrosiembra de taludes), technical BoQ specification downloads, and wholesale ornamental palms/trees.

### Key Architectural Tenets:
- **100% Autonomous & Zero-Dependency Lock-in:** Vanilla HTML5, modern modular CSS (custom properties for tokens + lightweight utility layout), and vanilla ES6 JavaScript modules. No node runtime required for serving; runs directly via local static server or file preview.
- **Priority Use of Verified Real Assets:** Direct integration of the 33 official high-resolution photographs (`imagenes/01_sitio_oficial/`) and verified references (`imagenes/02_referencias_externas/`). AI mockups are restricted strictly to designated gap slots (`assets/mockups/`) such as Before/After pairs and resort context renders.
- **Strict Data Integrity:** Real commercial facts (25+ years since 1999, farms in Río Grande Km 168 Coclé, phone numbers `+507 226-0494` and `+507 6539-0949`). Unverified client items are flagged with `[DATO PENDIENTE DEL CLIENTE]`.
- **Hybrid Multi-View Structure:** A unified master showcase (`site/index.html` with hash/tab view routing) coupled with dedicated standalone subpages (`site/pages/*.html`) to enable both seamless end-to-end demonstrations and granular component testing.

---

## 2. Directory & File Architecture (`site/`)

```text
c:\Users\Usuario\Downloads\Jardines Urbanos\site\
├── index.html                           # Master Landing & Showcase with anchor navigation
├── pages/
│   ├── residencial.html                 # Specialized Residential & Beach Villa Landing
│   ├── hidrosiembra.html                # B2B Hydroseeding, Slope Stabilization & BoQ Hub
│   ├── catalogo.html                    # Native Botanical Catalog with live multi-filter
│   ├── calculadora.html                 # Full-page Interactive m² Calculator & Quote Engine
│   ├── comparador.html                  # Interactive Before/After Touch-Slider Showcase
│   └── contacto.html                    # Direct WhatsApp Routing, Forms & Coclé Map
├── css/
│   ├── tokens.css                       # Brand CSS variables (colors, fonts, radii, spacing)
│   ├── base.css                         # CSS reset, typography base, layout containers
│   ├── components.css                   # Buttons, cards, badges, modal, tables, tabs
│   ├── calculator.css                   # Range sliders, scenario buttons, dark summary card
│   ├── before-after.css                 # Touch-split comparison slider styles
│   └── responsive.css                   # Media queries (1440px, 1200px, 768px, 414px, 375px)
├── js/
│   ├── config.js                        # Global constants (WhatsApp, phone, farm coordinates)
│   ├── navigation.js                    # Mobile drawer, sticky header, active section spy
│   ├── calculator.js                    # Math engine (+5% waste margin, scenario logic)
│   ├── catalog.js                       # 18+ verified botanical species data & filter engine
│   ├── before-after.js                  # Touch and mouse drag handler for split view
│   ├── omnichannel.js                   # URL-encoded WhatsApp message generator & UTM persister
│   └── main.js                          # Initialization and component orchestration
└── assets/
    ├── img/
    │   ├── real/                        # Symlinked or copied from ../imagenes/01_sitio_oficial/
    │   └── external-ref/                # Copied from ../imagenes/02_referencias_externas/
    ├── mockups/                         # AI-generated contextual mockups (Before/After pairs, beach villa)
    ├── icons/                           # Inline SVGs: sun, water, traffic, slope, WhatsApp, phone
    └── docs/                            # Spec sheets (Ficha_Tecnica_Hidrosiembra_JUSA.pdf placeholder)
```

---

## 3. Design Tokens: "Tropical Luxury & Agro-Tech"

The visual direction marries agricultural authority (deep tropical greens, sun-drenched limestone, fertile terracotta soil) with architectural sophistication.

### 3.1 Color Palette Tokens (`tokens.css`)

```css
:root {
  /* Brand Core Colors */
  --color-forest: #122B1D;             /* Bosque Profundo: Primary dark surface, B2B modules, footers */
  --color-sand: #F4F1EA;               /* Arena Caliza: Primary editorial background, light surfaces */
  --color-jusa: #71B347;               /* Verde JUSA Vivo: Primary brand green, badges, active accents */
  --color-chlorophyll: #2E6F40;        /* Clorofila Botánico: Primary interactive buttons, sliders, links */
  --color-terracotta: #FA7D09;         /* Terracota Coclé: Alerts, slope warning badges, secondary CTAs */

  /* Neutral & Supporting Shades */
  --color-forest-dark: #0A1B12;        /* Darker shade for dropdowns, tooltips, deep overlays */
  --color-forest-light: #1B3F2B;       /* Card background on dark theme */
  --color-sand-card: #FFFFFF;          /* Pure white card surface for high-contrast reading */
  --color-sand-muted: #E8E4DA;         /* Divider lines, input borders on sand background */
  --color-text-dark: #122B1D;          /* Primary body text on light background */
  --color-text-muted: #536B5C;         /* Secondary descriptive text */
  --color-text-light: #F4F1EA;         /* Primary text on dark forest surfaces */
  --color-text-dim: #DDD9D0;           /* Secondary text on dark forest surfaces */
  --color-border-dark: rgba(255, 255, 255, 0.12);
  --color-border-green: rgba(113, 179, 71, 0.35);

  /* Semantic UI Tokens */
  --bg-primary: var(--color-sand);
  --bg-surface: var(--color-sand-card);
  --bg-surface-dark: var(--color-forest);
  --accent-action: var(--color-chlorophyll);
  --accent-highlight: var(--color-jusa);
  --accent-alert: var(--color-terracotta);
}
```

### 3.2 Typography Tokens

```css
:root {
  /* Font Families */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

  /* Font Weights */
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  /* Desktop Type Scale (>= 1200px) */
  --fs-hero: 3.25rem;       /* 52px */
  --fs-h1: 2.5rem;          /* 40px */
  --fs-h2: 2rem;            /* 32px */
  --fs-h3: 1.5rem;          /* 24px */
  --fs-h4: 1.25rem;         /* 20px */
  --fs-body-lg: 1.125rem;   /* 18px */
  --fs-body: 1rem;          /* 16px */
  --fs-body-sm: 0.875rem;   /* 14px */
  --fs-caption: 0.75rem;    /* 12px */
  --fs-badge: 0.6875rem;    /* 11px */

  /* Line Heights */
  --lh-tight: 1.15;
  --lh-heading: 1.25;
  --lh-body: 1.6;
}
```

### 3.3 Elevation, Spacing & Border Radii

```css
:root {
  /* Border Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Spacing Scale */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */

  /* Elevation Shadows */
  --shadow-sm: 0 1px 3px rgba(18, 43, 29, 0.08);
  --shadow-md: 0 4px 12px rgba(18, 43, 29, 0.08);
  --shadow-lg: 0 10px 24px -4px rgba(18, 43, 29, 0.12);
  --shadow-xl: 0 20px 32px -8px rgba(18, 43, 29, 0.18);
  --shadow-forest: 0 12px 28px rgba(10, 27, 18, 0.4);
}
```

---

## 4. Responsive Breakpoint & Grid System

| Viewport Category | Width Range | Container Max-Width | Column Grid | Target Devices & Scenarios |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Wide** | $\ge 1440\text{ px}$ | $1320\text{ px}$ | 12 Columns ($32\text{ px}$ gutter) | 4K / 27" iMac / 1080p External Monitors (Architectural inspection) |
| **Desktop Standard** | $1200\text{ px} - 1439\text{ px}$ | $1140\text{ px}$ | 12 Columns ($24\text{ px}$ gutter) | MacBook Pro 14"/16", Typical 13"-15" laptops |
| **Tablet Landscape / Small Laptop** | $992\text{ px} - 1199\text{ px}$ | $960\text{ px}$ | 8 Columns ($20\text{ px}$ gutter) | iPad Pro landscape, Surface tablet |
| **Tablet Portrait** | $768\text{ px} - 991\text{ px}$ | $720\text{ px}$ | 6 Columns ($16\text{ px}$ gutter) | iPad portrait, Galaxy Tab |
| **Mobile Standard** | $375\text{ px} - 767\text{ px}$ | $100\%$ ($16\text{ px}$ padding) | 1-2 Columns ($12\text{ px}$ gutter) | iPhone 13/14/15/16 Pro ($390\text{ px}$), Galaxy S24 ($412\text{ px}$), iPhone SE ($375\text{ px}$) |
| **Mobile Small** | $< 375\text{ px}$ | $100\%$ ($12\text{ px}$ padding) | 1 Column ($8\text{ px}$ gutter) | Compact mobile screens ($320\text{ px} - 360\text{ px}$) |

### Mobile Touch Ergonomics:
- **Minimum Tap Target:** $48\text{ px} \times 48\text{ px}$ for all interactive elements, slider thumbs, and filter chips.
- **Thumb Zone Navigation:** Floating Bottom Bar on mobile viewports containing immediate dual buttons:
  - `[ 🧮 Calcular m² ]` (Opens bottom drawer or scrolls to calculator)
  - `[ 💬 WhatsApp Directo ]` (Opens native WhatsApp with page context)
- **Fluid Drag Gesture:** Before/After split slider responds to horizontal drag via Pointer Events API (`touch-action: pan-y` to allow vertical page scrolling without hitching).

---

## 5. Navigation System Architecture

```text
+--------------------------------------------------------------------------------------------------+
| TOP BAR: 🌿 Productores directos desde 1999 • Fincas en Río Grande, Coclé (Km 168)               |
|          📞 (+507) 226-0494  |  💬 WhatsApp: (+507) 6539-0949                                    |
+--------------------------------------------------------------------------------------------------+
| [JU Logo] JARDINES URBANOS      Inicio | Residencial | B2B & Hidrosiembra | Catálogo | Comparador | [ 🧮 Cotizar m² ]
+--------------------------------------------------------------------------------------------------+
```

### 5.1 Desktop Navigation (`>= 992px`)
- **Top Utility Bar:** `#0B1C12` background, micro-typography (`JetBrains Mono`, 12px), displays farm authority, separate phone numbers (landline vs WhatsApp mobile) to avoid the production error where both numbers were conjoined.
- **Main Header:** Sticky with dynamic transition:
  - Default on Hero: Transparent with subtle gradient or semi-translucent dark forest.
  - On Scroll ($> 60\text{ px}$): Solid `--color-forest` (`#122B1D`) with `backdrop-filter: blur(12px)` and thin border `border-b border-white/10`.
- **Menu Hierarchy:**
  1. `Inicio` (`#home` or `/index.html`)
  2. `Residencial & PH` (`#residencial` or `/pages/residencial.html`)
  3. `B2B & Hidrosiembra` (`#hidrosiembra` or `/pages/hidrosiembra.html`)
  4. `Catálogo Botánico` (`#catalogo` or `/pages/catalogo.html`)
  5. `Comparador Antes/Después` (`#comparador` or `/pages/comparador.html`)
  6. `Contacto` (`#contacto` or `/pages/contacto.html`)
- **Action CTA Button:** High-contrast pill `[ 🧮 Calcular m² ]` (`#71B347` background, `#122B1D` bold text).

### 5.2 Mobile Navigation (`< 992px`)
- **Hamburger Button:** Top right, accessible SVG toggle ($48\text{ px}$ tap area).
- **Mobile Off-Canvas Drawer:**
  - Slide-in from right, styled in `--color-forest` (`#122B1D`).
  - Contains company header, quick links, contact badges, and direct WhatsApp launcher.
- **Sticky Mobile Bottom Bar:**
  - Fixed position at viewport bottom (`bottom: 0; z-index: 999;`).
  - Dual pill split:
    - 50% width: `[ 🧮 Calculadora m² ]` (Green accent)
    - 50% width: `[ 💬 WhatsApp ]` (WhatsApp official green `#25D366` / JUSA green)
  - Automatically hides when the user actively interacts with the calculator slider to maximize visible canvas.

---

## 6. Page & View Breakdown (The 7 Core Views)

### View 1: Home / Master Landing Page
- **Purpose:** Position JUSA as Panama's sod and landscape infrastructure authority, educate visitors on natural sod varieties, and offer rapid dual entry points.
- **Section Sequence:**
  1. **Top Bar & Sticky Navbar:** Brand verification, separate phone links.
  2. **Hero Cinematic Section:**
     - Background: Loop video simulation with fallback high-res poster image (`imagenes/01_sitio_oficial/DJI_0677-Mejorado-NR.jpg` - Drone over Río Grande farm).
     - Heading: *"Del cultivo en nuestras fincas a tu proyecto en todo Panamá."* (Fraunces Display).
     - Subtext: *"Más de 25 años cultivando grama certificada (Zoysia Toro, Zoysia Japónica y San Agustín), palmas ornamentales y soluciones de Hidrosiembra mecanizada."*
     - Split CTA: `[ 🏡 Cotizar para mi Casa / Jardín ]` (scrolls to calculator) + `[ 🏗️ Portal Constructoras e Hidrosiembra ]` (opens B2B hub).
     - Hero Floating Card: Quick sod selector preview (Toro, Japónica, San Agustín) with instant badges.
  3. **Bento Grid — 4 Core Business Pillars:**
     - Card A: *Gramas Naturales de Finca* (Zoysia Toro, Japónica, San Agustín) -> link to variety cards.
     - Card B: *Hidrosiembra & Control de Erosión* (High-contrast dark `#122B1D` card) -> link to B2B hub.
     - Card C: *Palmas Ornamentales & Árboles Nativos* (Cultivated in Coclé) -> link to live catalog.
     - Card D: *Cultivos Especiales: 7 Ha de Pitahaya* (Agro-export production in Río Grande) -> link to agriculture section.
  4. **Interactive Feature Preview: Calculadora Embebida:** Full interactive widget embedded directly on page.
  5. **Interactive Feature Preview: Comparador Antes/Después:** Slope transformation widget embedded directly on page.
  6. **Trust & Production Authority Bar:**
     - 4 Key Metrics: `+25 Años de Producción (1999)` | `Km 168 Interamericana, Coclé` | `Flota Mecanizada Propia` | `100% Adaptación Tropical`.
  7. **Footer:** Comprehensive site map, contact points, legal notice (Ley 81 de Protección de Datos de Panamá).

---

### View 2: Residencial / PH Landing
- **Purpose:** Target homeowners, residential developments, and beach properties with clear comparisons of sod types and installation logistics.
- **Section Sequence:**
  1. **Hero:** High-end tropical residence with lush lawn (`imagenes/01_sitio_oficial/JAPONESA-PROYECTO.jpg`).
     - Headline: *"La Grama Perfecta para tu Hogar, Jardín o Casa de Playa."*
  2. **Residential Decision Guide (The 3 Sod Types):**
     - **Zoysia Toro (El Toro):**
       - Image: `imagenes/01_sitio_oficial/TORO-CLOSEUP-1.jpg`.
       - Badges: `☀️ Sol Directo` | `🐾 Alto Tráfico / Mascotas` | `🌿 Textura Media`.
       - Ideal for: Residential backyards, children's play areas, community parks.
     - **Zoysia Japónica:**
       - Image: `imagenes/01_sitio_oficial/JAPONESA-CLOSEUP.jpg`.
       - Badges: `🏖️ Máxima Tolerancia Salina` | `💧 Resistente a Sequía` | `✨ Textura Fina`.
       - Ideal for: Beach houses (Coronado, Buenaventura, Gorgona), coastal breeze.
     - **San Agustín:**
       - Image: `imagenes/01_sitio_oficial/SAN-AGUSTIN-CLOSEUP.jpg`.
       - Badges: `⛅ Sombra Parcial / Árboles` | `🍃 Hoja Ancha` | `🌧️ Verde Esmeralda`.
       - Ideal for: Shaded patios, properties with mature trees, mountain residences.
  3. **Installation & Delivery Workflow (4 Simple Steps):**
     - Step 1: Medición y cálculo de m² (+5% merma).
     - Step 2: Cosecha fresca en finca el mismo día del despacho.
     - Step 3: Despacho en tarimas a nivel nacional.
     - Step 4: Instalación opcional y guía de riego inicial.
  4. **Residential Calculator Anchor:** Pre-set to "Jardín Residencial".

---

### View 3: B2B & Hidrosiembra (Taludes, Obras Viales, Campos Deportivos)
- **Purpose:** Serve structural engineering firms, highway contractors (MOP, Constructora Urbana, MECO, CUSA), and PH infrastructure developers.
- **Visual Tone:** Dark engineering theme (`#122B1D` with `#FA7D09` terracotta slope accents).
- **Section Sequence:**
  1. **Technical Hero:** Hydroseeding equipment in action (`imagenes/01_sitio_oficial/HIDROSIEMBRA-MAQUINA.jpg`).
     - Headline: *"Control de Erosión, Revegetación y Estabilización Mecanizada de Taludes."*
     - Subtext: *"Capacidad industrial para proyectos viales, canteras, desarrollos residenciales y taludes de hasta 60° (1:1)."*
  2. **Technical Specifications Matrix (Table for Engineers):**
     | Parámetro Técnico | Especificación JUSA | Ventaja en Obra |
     | :--- | :--- | :--- |
     | **Pendiente Máxima** | Hasta $60^\circ$ ($1:1$) con biomanta / fijador orgánico | Evita deslaves viales en época lluviosa en Panamá |
     | **Composición de Mezcla** | Mulch de fibra vegetal + semillas tropicalizadas + fijador + fertilizante | Germinación uniforme y retención de humedad |
     | **Velocidad de Aplicación** | Hasta $5,000\text{ m}^2$ por jornada por equipo | Reduce costos de mano de obra en $65\%$ vs tepe manual |
     | **Control de Erosión** | $98\%$ de efectividad tras 35 días | Cumplimiento de mitigación ambiental ANAM/MiAmbiente |
  3. **Architect & Engineer Tool: "1-Click BoQ Spec Copier":**
     - Text box containing standardized specification paragraph for AutoCAD / Revit notes or tender submission:
       > *"Suministro y aplicación mecanizada de Hidrosiembra para estabilización y control de erosión en taludes, ejecutada con equipo hidrosembrador de agitación hidráulica, utilizando mulch de fibra vegetal certificada, semillas de gramíneas tropicalizadas de rápido arraigo, adherente orgánico fijador y fertilizante de liberación controlada provisto por Jardines Urbanos, S.A."*
     - Interactive Button: `[ 📋 Copiar Especificación Técnica al Portapapeles ]` with toast feedback *"Copiado exitosamente"*.
  4. **Technical Download:** `[ 📄 Descargar Ficha Técnica Hidrosiembra (PDF) ]`.
  5. **BoQ / Project Quotation Form:** Direct file dropzone (`.pdf`, `.xlsx`, `.dwg`) + company name, project location, and estimated area.

---

### View 4: Catálogo Botánico Vivo (Filtros Dinámicos)
- **Purpose:** Permanent, high-performance replacement for the broken `tiiny.site` 404 URL. Native interactive catalog of 18+ real species from JUSA's Coclé nursery.
- **Section Sequence:**
  1. **Header & Category Pill Bar:**
     - `[ Todos (18) ]`
     - `[ 🌱 Gramas (3) ]`
     - `[ 🌴 Palmas (5) ]`
     - `[ 🌳 Árboles Nativos (5) ]`
     - `[ 🌿 Plantas Ornamentales (4) ]`
     - `[ 🥭 Agro & Especiales (1) ]`
  2. **Environmental & Climate Filter Badges (Secondary Bar):**
     - `[ ☀️ Pleno Sol ]`
     - `[ ⛅ Sombra Parcial ]`
     - `[ 🏖️ Resistencia Marina / Salina ]`
     - `[ 🐾 Alto Tráfico ]`
  3. **Search Input Bar:** Live text search filtering by common or scientific name.
  4. **Species Grid Layout (Responsive 1/2/4 columns):**
     - Each card contains:
       - Real photo from `imagenes/01_sitio_oficial/`.
       - Botanical badges (Sun exposure, water requirement, height category).
       - Common name in Fraunces (`Grama Zoysia Toro`, `Palma Bismarckia`, `Monstera Deliciosa`).
       - Scientific name in italics (`Zoysia japonica`, `Bismarckia nobilis`, `Monstera deliciosa`).
       - Short horticultural note.
       - Direct CTA: `[ 💬 Cotizar esta Especie por WhatsApp ]` (encodes species name into WhatsApp message).
  5. **Quick-View Botanical Modal:** Clicking a card opens a modal with full horticultural traits (growth rate, soil pH, maintenance level, nursery origin in Río Grande).

#### Verified Botanical Dataset to Load:
| Common Name | Scientific Name | Category | Photo Source | Key Traits |
| :--- | :--- | :--- | :--- | :--- |
| **Grama Zoysia Toro** | *Zoysia 'El Toro'* | Gramas | `01_sitio_oficial/TORO-CLOSEUP-1.jpg` | Pleno sol, alto tráfico, mascotas |
| **Grama Zoysia Japónica** | *Zoysia japonica* | Gramas | `01_sitio_oficial/JAPONESA-CLOSEUP.jpg` | Pleno sol, alta salinidad playa, sequía |
| **Grama San Agustín** | *Stenotaphrum secundatum* | Gramas | `01_sitio_oficial/SAN-AGUSTIN-CLOSEUP.jpg` | Sombra parcial, hoja ancha, residencial |
| **Palma Real de Finca** | *Roystonea regia* | Palmas | `01_sitio_oficial/PALMA-REAL-FINCA.jpg` | Porte majestuoso, urbanismo, avenidas |
| **Palma Bismarckia** | *Bismarckia nobilis* | Palmas | `01_sitio_oficial/BISMARKIA.jpg` | Follaje azul plateado, sol pleno, lujo |
| **Palma Cola de Zorro** | *Wodyetia bifurcata* | Palmas | `01_sitio_oficial/COLA-DE-ZORRO.jpg` | Hojas plumosas, paisajismo residencial |
| **Palma Areca** | *Dypsis lutescens* | Palmas | `01_sitio_oficial/ARECA.jpg` | Cerco vivo, semisombra, interiores |
| **Palma Robellini** | *Phoenix roebelenii* | Palmas | `01_sitio_oficial/ROBELLINI.jpg` | Porte bajo, jardines de piscina |
| **Árbol Casco de Vaca** | *Bauhinia variegata* | Árboles | `01_sitio_oficial/CASCO-DE-VACA.jpg` | Floración orquídea, sombra urbana |
| **Árbol Neem** | *Azadirachta indica* | Árboles | `01_sitio_oficial/NEEM.jpg` | Repelente natural, rápido crecimiento |
| **Árbol Preparado** | *Especie forestal aclimatada* | Árboles | `01_sitio_oficial/ARBOL-PREPARADO.jpg` | Cepellón preparado para trasplante |
| **Monstera Deliciosa** | *Monstera deliciosa* | Ornamentales | `01_sitio_oficial/MONSTERA.jpg` | Hojas fenestradas, sombra, interior |
| **Philodendron Xanadu** | *Thaumatophyllum xanadu* | Ornamentales | `01_sitio_oficial/XANADU.jpg` | Mata densa, borduras, semisombra |
| **Croto Petra** | *Codiaeum variegatum* | Ornamentales | `01_sitio_oficial/CROTO.jpg` | Hojas multicolor, pleno sol |
| **Ginger Variegado** | *Alpinia zerumbet 'Variegata'* | Ornamentales | `01_sitio_oficial/GINGER-VARIEGADO.jpg` | Follaje rayado, flor colgante |
| **Jazmín Estrella** | *Trachelospermum jasminoides* | Ornamentales | `01_sitio_oficial/JAZMIN-ESTRELLA.jpg` | Trepadora aromática, sol y sombra |
| **Pitahaya (Fruta Dragón)**| *Hylocereus undatus* | Agro / Especiales| `01_sitio_oficial/Pitahaya2.jpg` | 7 Ha en Coclé, esquejes y fruta fresca |

---

### View 5: Calculadora Interactiva de m²
- **Purpose:** Transform unassisted traffic into pre-qualified sales leads sent directly to WhatsApp `+507 6539-0949`.
- **Layout:** Two-column split on desktop (58% controls, 42% live result card); stacked sequential steps on mobile.
- **Interactive Steps:**
  1. **Paso 1: ¿Dónde se instalará el proyecto?**
     - Button cards:
       - `[ 🏡 Jardín / PH ]`
       - `[ 🏖️ Casa de Playa ]`
       - `[ ⚽ Parque / Alto Tráfico ]`
       - `[ ⛰️ Talud / Obra Vial ]`
  2. **Paso 2: Área del Terreno en m²**
     - Synchronized controls:
       - Numeric input box: `[ 250 ] m²` (manual typing allowed)
       - Smooth Range Slider: min `20`, max `5000`, step `10` (default: `250 m²`)
       - Tick marks: `20 m²` (Patio), `500 m²` (Residencia), `2,000 m²` (PH), `5,000+ m²` (Obra B2B).
  3. **Paso 3: Condición de Luz Solar y Terreno**
     - `[ ☀️ Pleno Sol Directo (+6 hrs) ]`
     - `[ ⛅ Sombra Parcial / Árboles ]`
  4. **Paso 4: Servicios Adicionales (Opcional)**
     - `[x] Despacho en obra / proyecto`
     - `[ ] Incluir preparación de suelo e instalación profesional`
- **Live Calculation Logic:**
  - Net Area: $A_{\text{net}} = \text{input value}$
  - Gross Recommended Area (+5% cutting waste):
    $$A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$$
  - Estimated Sod Rolls ($0.5\text{ m} \times 1.0\text{ m} = 0.5\text{ m}^2$ per roll):
    $$\text{Rolls} = A_{\text{gross}} \times 2$$
  - Automatic Recommendation Rules:
    - If `scenario === 'talud'`: Recommend **Hidrosiembra Técnica Mecanizada JUSA** (Mulch + semillas + fijador), mode: *Camión Hidrosembrador en Obra*.
    - If `scenario === 'playa'`: Recommend **Grama Zoysia Japónica** (High salinity and wind resistance), mode: *Rollos / Tarimas de Finca*.
    - If `sun === 'sombra'`: Recommend **Grama San Agustín** (High shade adaptation, wide emerald leaf), mode: *Rollos / Tarimas de Finca*.
    - If `scenario === 'deportivo'`: Recommend **Grama Zoysia Toro (Línea Tráfico Pesado)**, mode: *Suministro a Escala / Tarimas*.
    - Default (Jardín / PH en Pleno Sol): Recommend **Grama Zoysia Toro**, mode: *Rollos / Tarimas de Finca*.
- **Dynamic WhatsApp Payload Generator:**
  - Phone: `+507 6539-0949`
  - URL Format: `https://wa.me/50765390949?text=${encodeURIComponent(msg)}`
  - Encoded Message Template:
    > *"Hola Jardines Urbanos 🌿, usé la calculadora web y deseo cotizar: ${grossM2} m² (incluye 5% merma por cortes) de ${recommendedVariety} para ${scenarioLabel} en condición de ${sunLabel}. ¿Cuál es el tiempo de despacho a [Mi Ubicación]?"*
  - Live Preview Box: Shows the formatted message in real time inside the card.

---

### View 6: Comparador Antes / Después (Interactive Slider)
- **Purpose:** Provide indisputable visual evidence of vegetation establishment, erosion mitigation speed, and turf density.
- **Section Sequence:**
  1. **Scenario Selector Tabs:**
     - `[ ● 1. Talud con Hidrosiembra: Día 1 vs Día 35 ]`
     - `[ ○ 2. Jardín Residencial: Suelo Gris vs Zoysia Establecida ]`
     - `[ ○ 3. Instalación de Grama: Terreno Preparado vs Alfombra Verde ]`
  2. **Split Comparison Canvas:**
     - Left image layer: "ANTES" (Día 1) with Terracotta tag `#FA7D09`.
     - Right image layer: "DESPUÉS" (Día 35) with JUSA Green tag `#71B347`.
     - Center Divider Handle: Draggable split icon with horizontal arrows (`◄─┼─►`).
     - Touch & Mouse Draggable: Operates smoothly on phone screens and desktop.
  3. **Case Study Context Strip:**
     - Location: Panamá Oeste / Autopista Interamericana.
     - Intervened Area: $3,400\text{ m}^2$.
     - Time to full coverage: 5 semanas (35 días).
     - Applied Solution: Hidrosiembra mecanizada con semilla tropicalizada y fijador orgánico.
     - Action Link: `[ Solicitar diagnóstico para terreno similar → ]`.

---

### View 7: Contacto / Cotización Directa WhatsApp
- **Purpose:** Frictionless omni-channel contact, separating B2C inquiries from commercial B2B tenders, with verified contact info and Coclé map.
- **Section Sequence:**
  1. **Dual Contact Form Tabs:**
     - **Tab A: Cotización Residencial / Jardín (B2C):**
       - Fields: Nombre completo, WhatsApp (+507), Provincia/Sector (Panamá, Panamá Oeste, Playas/Coclé, Provincias Centrales, Chiriquí), Variedad de interés, Metraje estimado m².
       - Button: `[ Enviar Consulta Rápida ]` (dispatches to WhatsApp with form data).
     - **Tab B: Portal Técnico B2B (Constructoras & Arquitectos):**
       - Fields: Empresa constructora, Nombre del Ingeniero/Arquitecto, Teléfono, Correo corporativo, Tipo de Obra (Talud vial, Urbanización, Campo deportivo), Metraje ($m^2$ o Ha), Carga de archivo BoQ (`.pdf`/`.xlsx`).
  2. **Verified Physical & Communications Directory:**
     - **Vivero y Fincas de Producción:** Carretera Interamericana, Km 168, Río Grande, Provincia de Coclé (Plus Code: `CGH3+PH9`).
     - **Teléfono Fijo:** `+507 226-0494` (Click-to-call link: `tel:+5072260494`).
     - **WhatsApp Comercial:** `+507 6539-0949` (Click-to-chat link: `https://wa.me/50765390949`).
     - **Correos Oficiales:**
       - Ventas generales y gramas: `ventas@jardinesurbanos.com`
       - Proyectos agro/pitahaya: `xavier@jardinesurbanos.com`
     - **Horario:** Lunes a Viernes 7:30 a.m. – 4:30 p.m. / Sábados 8:00 a.m. – 12:00 m.d.
  3. **Interactive Map Component:** Visual map representation of Río Grande, Coclé location with direct Google Maps route button.

---

## 7. Component Breakdown & Functional Contracts

| Component Name | File / Location | Inputs / Props | Output / Events | States & Edge Cases |
| :--- | :--- | :--- | :--- | :--- |
| **`SiteHeader`** | `components.css`, `navigation.js` | Brand logo, nav links, active view | Route navigation, mobile drawer toggle | Transparent on hero, sticky frosted glass on scroll, active indicator |
| **`MobileDrawer`** | `components.css`, `navigation.js` | Navigation links, contact phones | Open/Close drawer, trap focus | Closed by default; closes on link click or outside backdrop tap |
| **`StickyBottomBar`** | `components.css`, `navigation.js` | Viewport width ($< 992\text{ px}$) | Scroll to calculator, trigger WhatsApp | Auto-hides when interacting with calculator slider; shows on scroll |
| **`HeroDualCTA`** | `index.html`, `components.css` | Headline, video/poster, CTAs | Route to Residential or B2B view | Graceful fallback if video fails to load; loads WebP poster first |
| **`BentoPillars`** | `index.html`, `components.css` | 4 business unit definitions | Deep link to subpage or section | Responsive grid: 4 cols (Desktop) -> 2 cols (Tablet) -> 1 col (Mobile) |
| **`CalculatorWidget`** | `calculator.js`, `calculator.css`| Scenario, area $m^2$, sun exposure | Computed gross $m^2$, variety, WA URL | Minimum area $20\text{ m}^2$, max $5,000+\text{ m}^2$, auto +5% waste margin |
| **`CatalogFilterGrid`**| `catalog.js`, `components.css` | Category chip, search query, sun chip| Filtered species card array | Empty state message if no matching species found; reset button |
| **`SpeciesCard`** | `catalog.js`, `components.css` | Species object (name, photo, badges) | WhatsApp quote click, modal open | Fallback image if photo missing; responsive thumbnail aspect ratio |
| **`BeforeAfterSlider`**| `before-after.js`, `before-after.css`| Before image, After image, initial %| Drag position change ($5\% - 95\%$) | Pointer events support; does not block vertical touch scroll on mobile |
| **`BoQSpecCopier`** | `hidrosiembra.html`, `main.js` | Specification text string | Clipboard copy + visual toast | Fallback prompt if clipboard permissions are restricted |
| **`WhatsAppLeadRouter`**| `omnichannel.js` | Form data or calculator payload | URL-encoded `wa.me` redirect | Captures UTMs from `sessionStorage`; pushes `whatsapp_lead_click` to `dataLayer` |

---

## 8. Asset Allocation & Integration Map

### 8.1 Real Photographic Assets (`imagenes/01_sitio_oficial/`)

| Asset Filename | Resolution | UI Component Slot | Viewport / Section |
| :--- | :--- | :--- | :--- |
| `DJI_0677-Mejorado-NR.jpg` | $1920 \times 1080$ | Master Hero Poster / Video Fallback | Home Hero, Authority Banner |
| `headerimage4_jardinesurbanos.jpg` | $1920 \times 600$ | Section Divider Banner | Residencial Header |
| `TORO-CLOSEUP-1.jpg` | $1440 \times 1920$ | Zoysia Toro Feature Card | Home Bento, Catalog, Residential |
| `TORO-ZOOM.jpg` | $1440 \times 1920$ | Zoysia Toro Detail Modal | Catalog Quick-View Modal |
| `JAPONESA-CLOSEUP.jpg` | $1280 \times 1920$ | Zoysia Japónica Feature Card | Catalog, Residential Beach Section |
| `JAPONESA-PROYECTO.jpg` | $1920 \times 1440$ | Beach Residence Project Feature | Residential Landing Hero |
| `SAN-AGUSTIN-CLOSEUP.jpg` | $1920 \times 1440$ | San Agustín Feature Card | Catalog, Residential Shade Section |
| `SAN-AGUSTIN-HEADER.jpg` | $1632 \times 1224$ | Shaded Turf Section Banner | Residential Shade Banner |
| `TARIMAS-SAN-AGUSTIN.jpg` | $1632 \times 1224$ | Harvest & Packaging Proof | Logística & Despacho Section |
| `SAE-PARA-COSECHA_mision.jpg`| $780 \times 900$ | Mechanized Harvester in Coclé | Trust & Production Section |
| `HIDROSIEMBRA-MAQUINA.jpg` | $1920 \times 1440$ | Hydroseeding Truck & Equipment | B2B Hydroseeding Hero & Hub |
| `PALMA-REAL-FINCA.jpg` | $1632 \times 1224$ | Royal Palms Nursery Field | Catalog, B2B Urbanism |
| `BISMARKIA.jpg` | $1440 \times 1920$ | Bismarckia Nobilis Card | Catalog Luxury Palmas |
| `COLA-DE-ZORRO.jpg` | $1280 \times 960$ | Foxtail Palm Card | Catalog Palmas |
| `ARECA.jpg` | $1877 \times 1920$ | Areca Palm Card | Catalog Palmas |
| `ROBELLINI.jpg` | $1440 \times 1920$ | Robellini Palm Card | Catalog Palmas |
| `ARBOL-PREPARADO.jpg` | $1440 \times 1920$ | Acclimatized Tree with Root Ball | Catalog Árboles Nativos |
| `CASCO-DE-VACA.jpg` | $1440 \times 1920$ | Bauhinia Urban Tree Card | Catalog Árboles Nativos |
| `NEEM.jpg` | $1440 \times 1920$ | Neem Tree Card | Catalog Árboles Nativos |
| `MONSTERA.jpg` | $1440 \times 1920$ | Monstera Deliciosa Card | Catalog Ornamentales |
| `XANADU.jpg` | $1440 \times 1920$ | Philodendron Xanadu Card | Catalog Ornamentales |
| `CROTO.jpg` | $1576 \times 1920$ | Croton Petra Card | Catalog Ornamentales |
| `GINGER-VARIEGADO.jpg` | $1920 \times 1684$ | Variegated Ginger Card | Catalog Ornamentales |
| `JAZMIN-ESTRELLA.jpg` | $1440 \times 1920$ | Star Jasmine Card | Catalog Ornamentales |
| `Pitahaya2.jpg` | $1440 \times 1920$ | 7 Ha Pitahaya Cultivation | Agro-Export Section, Catalog |
| `Nosotros1.jpg` – `Nosotros4.jpg` | $\sim 900 \times 700$ | History & Team Gallery | About JUSA / Production Heritage |

### 8.2 External Reference Images (`imagenes/02_referencias_externas/`)
- `referencia_instalacion_grama.jpg` ($800 \times 800$): Used strictly as installation procedure diagram in Residential view.
- `referencia_rollo_grama.jpg` ($800 \times 800$): Used strictly as sod roll dimension guide in the Calculator widget.

### 8.3 AI Mockup Gap Requirements (`assets/mockups/`)
Per user instructions, AI mockups must complement only visual gaps where no official photo exists, explicitly labeled as temporary concept mockups:
1. `mockup_antes_despues_talud_1.jpg`: Paired before/after visual of highway cut slope in Panama (exposed red soil vs established hydroseed carpet at Day 35).
2. `mockup_antes_despues_jardin_2.jpg`: Paired before/after visual of residential construction yard (compacted dirt vs installed Zoysia lawn at Day 14).
3. `mockup_villa_playa_zoysia.jpg`: High-resolution architectural visualization of Pacific beach villa (Buenaventura/Coronado) with Zoysia Japónica under sea breeze.
4. `mockup_campo_deportivo_zoysia.jpg`: Multi-use soccer/sports pitch with Zoysia Toro under tropical conditions.

---

## 9. Performance, SEO & Quality Assurance Standards

### 9.1 Core Web Vitals Targets
- **Largest Contentful Paint (LCP):** $< 1.8\text{ s}$ on 4G mobile. Hero images lazy-loaded after poster frame; poster frame compressed $< 120\text{ KB}$.
- **Cumulative Layout Shift (CLS):** $< 0.02$. Explicit `width` and `height` attributes on all `<img>` tags and CSS `aspect-ratio` containers.
- **Interaction to Next Paint (INP):** $< 100\text{ ms}$. Zero heavy blocking frameworks; slider events debounced using `requestAnimationFrame`.

### 9.2 SEO On-Page Architecture
- Correct language declaration: `<html lang="es-PA">`.
- Strict single `<h1>` per page reflecting transactional search intent:
  - Home: `<h1>Venta de Gramas Naturales, Hidrosiembra y Vivero en Panamá</h1>`
  - Residencial: `<h1>Gramas Naturales para Jardines y Casas de Playa en Panamá</h1>`
  - Hidrosiembra: `<h1>Servicios de Hidrosiembra y Control de Erosión de Taludes en Panamá</h1>`
  - Catálogo: `<h1>Catálogo Botánico Vivo: Palmas, Árboles y Gramas en Panamá</h1>`
  - Calculadora: `<h1>Calculadora de Metros Cuadrados (m²) de Grama e Hidrosiembra</h1>`
- `Schema.org` JSON-LD graph embedded on every page (`GardenStore`, `LandscapeArchitect`, `LocalBusiness`, `OfferCatalog`).

---

## 10. Implementation Roadmap for Subsequent Milestones

1. **Milestone 1 (Worker Assets & Environment):**
   - Populate `site/assets/img/` with links/copies of the 33 official photos.
   - Generate the 4 complementary gap mockups into `site/assets/mockups/`.
   - Setup `tokens.css` and base scaffolding.
2. **Milestone 2 (Worker Calculator & Catalog Logic):**
   - Implement `calculator.js` with 5% waste margin formula and scenario matrix.
   - Implement `catalog.js` with 18 verified botanical items and live filtering.
   - Implement `omnichannel.js` with WhatsApp dynamic link builder.
3. **Milestone 3 (Worker Pages & Responsive Layouts):**
   - Build `index.html` and the 6 specialized pages (`pages/*.html`).
   - Integrate `before-after.js` interactive touch slider.
   - Implement mobile drawer and sticky bottom bar.
4. **Milestone 4 (Reviewer & Auditor Verification):**
   - Execute programmatic mathematical tests on calculator logic.
   - Verify zero console errors across desktop (1440px/1200px) and mobile (375px/414px).
   - Capture high-resolution verification screenshots.
