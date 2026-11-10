# Auditoría Técnica y Plan Maestro 360°: SEO, Conectividad, Analítica, Seguridad y Cumplimiento
**Proyecto:** Jardines Urbanos, S.A. (`https://jardinesurbanos.com`) — Panamá  
**Fecha de Auditoría:** 2026  
**Alcance:** Auditoría en vivo de producción + Arquitectura 360° de Nivel Mundial

---

## 1. Diagnóstico Técnico Actual de `https://jardinesurbanos.com` (Evidencia en Vivo)

### 1.1 Infraestructura, Servidor, Red y Tiempos de Respuesta (Crítico)
| Parámetro | Estado Detectado en Producción | Nivel de Riesgo / Impacto |
| :--- | :--- | :--- |
| **Dirección IP y Hosting** | `216.57.231.120` (`webhost20.webhero.com` — Hosting compartido tradicional en EE. UU.) | **CRÍTICO:** Sin CDN ni nodos de borde (Edge) en Centroamérica/Panamá. |
| **Tiempo de Respuesta (TTFB / Carga HTML)** | **17,398 ms (17.4 s)** en Home (`/`) y **16,642 ms (16.6 s)** en `/portfolio/gramas/` | **CRÍTICO:** Supera en **21x** el umbral recomendado por Google Core Web Vitals (< 800 ms TTFB). Causa abandono masivo en redes móviles de Panamá (+Móvil / Tigo) y penalización severa de Crawl Budget. |
| **Servidor Web y SO** | `Apache/2.4.6 (CentOS) mod_fcgid/2.3.9` | **ALTO:** CentOS 7 alcanzó *End-of-Life (EOL)* en junio de 2024. Sin soporte oficial de parches del sistema operativo. |
| **Motor PHP y Header Expuesto** | `X-Powered-By: PHP/8.1.34-php2shell` | **ALTO:** Exposición pública de versión PHP y firma atípica `php2shell`. PHP 8.1 en ciclo final de soporte; ausencia de OPcache/Object Cache perceptible. |
| **Certificado SSL / TLS** | Emisor: `RapidSSL TLS RSA CA G1 (DigiCert)` válido `04/02/2026` – `04/02/2027`. Protocolo negociado: **TLS 1.2** | **MEDIO:** No negocia **TLS 1.3** (que reduce un round-trip completo en conexiones móviles) ni cuenta con HSTS (`Strict-Transport-Security`). |
| **Peso del Documento HTML y Activos** | **208.1 KB** HTML en Home (**225.2 KB** en `/portfolio/gramas/`), **51 hojas CSS** y **27 scripts JS externos** | **CRÍTICO:** Exceso extremo de DOM y CSS inline (`Elementor css_print_method-internal`) + carga innecesaria de **Slider Revolution 6.7.34** y **WooCommerce 9.8.7** sin tienda activa. |

### 1.2 WordPress Core, Theme y Plugins Expuestos en Código Fuente
- **CMS:** WordPress `7.1.4` (etiqueta `<meta name="generator">` expuesta públicamente y archivo `/readme.html` accesible con HTTP `200`).
- **Plantilla (Theme):** `floria` + `floria-child` (ThemeREX / AxiomThemes).
- **Plugins activos detectados en el DOM:**
  1. `elementor` (`3.29.0`) — Maquetador visual con CSS inline masivo.
  2. `revslider` (`6.7.34`) — Slider Revolution cargando imágenes `dummy.png` y librerías pesadas bloqueantes del renderizado (LCP).
  3. `woocommerce` (`9.8.7`) — Activo sin flujo real de e-commerce, inyectando scripts, estilos y endpoints innecesarios.
  4. `trx_addons` — Plugin propietario del tema `floria` que controla Custom Post Types (`/portfolio/`, `/services/`, `/cpt_layouts/`).
  5. `click-to-chat-for-whatsapp` — Botón flotante de WhatsApp sin trazabilidad analítica ni mensajes dinámicos por página.
  6. `advanced-popups` — Plugin de popups con página huérfana indexada (`/newsletter-popups/`).
- **Ausencia total de Plugin SEO:** No existe Yoast SEO, Rank Math ni SEOPress activo. WordPress sirve su sitemap nativo crudo (`/wp-sitemap.xml`).

### 1.3 Auditoría de SEO On-Page, Indexación, `robots.txt` y `wp-sitemap.xml`
1. **Metadatos Pobres y Sin Intención de Búsqueda:**
   - `<title>`: `Jardines Urbanos – Bienvenidos` (Cero palabras clave transaccionales como *Gramas Naturales en Panamá*, *Hidrosiembra*, *Vivero*, *Paisajismo*).
   - `<meta name="description">`: **Inexistente** en el código fuente.
   - `<meta property="og:description">`: `"Bienvenidos"` (al compartir el enlace en WhatsApp, Instagram o LinkedIn aparece solo *"Bienvenidos"*).
2. **Estructura Semántica de Encabezados Rota (8 etiquetas `<h1>` en el Home):**
   - El Home contiene **8 etiquetas `<h1>`** simultáneas:
     - `H1: Jardines Urbanos`
     - `H1: Ofrecemos productos con la mejor Calidad`
     - `H1: ¡Contamos con un amplio Catálogo de Cultivos de nuestro vivero!`
     - `H1: Nosotros` / `H1: Nuestra Misión` / `H1: Nuestra Visión`
     - `H1: Jardines Urbanos,` / `H1: ¡Vestimos de verde a Panamá!`
   - Esto diluye por completo la relevancia semántica frente a Googlebot.
3. **Ausencia Total de Datos Estructurados (`Schema.org` JSON-LD):**
   - No existe ningún bloque `<script type="application/ld+json">` en todo el sitio (ni `Organization`, ni `LocalBusiness`/`GardenStore`, ni `Product`, ni `FAQPage`, ni `BreadcrumbList`).
4. **Contaminación Grave en `wp-sitemap.xml` (Basura Demo en Inglés + Exposición de Usuarios):**
   - `/sitemap.xml` y `/sitemap_index.xml` dan **Timeout / Error de conexión**; únicamente responde `/wp-sitemap.xml`.
   - El sitemap indexa **basura del demo del tema Floria en inglés**:
     - Productos falsos de demo: `/product/golden-privet/`, `/product/japanese-aucuba/`
     - Servicios falsos de demo: `/services/leaf-removal/`, `/services/landscape-design/`, `/services/irrigation/`, `/services/fertilization/`
     - Páginas internas del maquetador: `/newsletter-popups/`, `/wp-sitemap-posts-cpt_layouts-1.xml`, `/wp-sitemap-posts-cpt_team-1.xml`
   - **Fuga de Seguridad en Sitemap de Usuarios (`wp-sitemap-users-1.xml`):** Expone públicamente el usuario administrador `/author/tamedina/`.
5. **Arquitectura de URLs Deficiente:**
   - Las líneas de negocio principales están encerradas bajo el slug genérico `/portfolio/` del tema (`https://jardinesurbanos.com/portfolio/gramas/`, `/portfolio/plantas/`, `/portfolio/palmas/`, `/portfolio/arboles/`, `/portfolio/hidrosiembra/`, `/portfolio/pitahaya/`), desperdiciando autoridad semántica en la URL.
6. **Errores de Enlazado Interno, Contenido Demo y UX:**
   - Enlaces del menú y footer apuntan a `http://` sin SSL (`http://jardinesurbanos.com/#productos`, `http://jardinesurbanos.com/#somos`, `http://jardinesurbanos.com/#ofrecemos`).
   - Botones de tarjetas de producto en inglés sin traducir (`Read more`).
   - El botón **"Ver Catálogo" / "Descarga Catálogo"** envía al usuario fuera del dominio hacia un hosting gratuito externo con un parámetro basura de rastreo de Facebook pegado (`https://catalogodecultivosjusa.tiiny.site/?fbclid=PAZXh0bgNhZW0CMTEAAadIZIo_...`).
   - Existe un `<iframe data-src="https://player.vimeo.com/video/150084090...">` oculto del demo original del tema.
   - El enlace telefónico es inválido en dispositivos móviles: `tel:(+507)%20226-0494%20/%20(+507)%206539-0949` (combina dos números con barra `/`, rompiendo el marcado directo en iOS y Android).
   - El icono de LinkedIn en la cabecera y el logo móvil apuntan a `href="#"`.

### 1.4 Estado de Analítica, Conversión y Correo Corporativo (DNS)
- **Cero Analítica Instalada:** No existe Google Tag Manager (`GTM`), ni Google Analytics 4 (`G-XXXX`), ni Meta Pixel (`fbq`), ni Microsoft Clarity. La empresa está operando 100% a ciegas respecto al retorno de inversión digital.
- **Cero Formularios de Captura en Home:** La sección `#contactanos` no contiene ningún `<form>` funcional ni calculadora de cotización.
- **Riesgo Alto en Correo Corporativo (DNS / Microsoft 365):**
  - Servidores DNS: `ns1-4.bdm.microsoftonline.com` | MX: `jardinesurbanos-com.mail.protection.outlook.com`.
  - **SPF actual:** `v=spf1 include:spf.protection.outlook.com -all` (HardFail `-all`). Como el servidor web (`216.57.231.120`) NO está incluido en el SPF, cualquier correo enviado por WordPress vía `wp_mail()` nativo falla la validación SPF y es bloqueado o enviado a SPAM.
  - **DKIM (`selector1._domainkey` / `selector2._domainkey`):** **NO CONFIGURADO**.
  - **DMARC (`_dmarc.jardinesurbanos.com`):** **NO CONFIGURADO**.

---

## 2. Plan Maestro 360° de SEO Local y Técnico en Panamá

### 2.1 Nueva Arquitectura de URLs (Silo Semántico Transaccional)
Reemplazar la estructura `/portfolio/*` (implementando redirecciones `301` permanentes desde las URLs actuales) y eliminar/desindexar el 100% de los Custom Post Types demo (`/product/golden-privet/`, `/services/leaf-removal/`, `/cpt_layouts/`, `/newsletter-popups/`):

```text
https://jardinesurbanos.com/
├── /gramas-naturales-panama/              (Hub Principal + Calculadora de m²)
│   ├── /gramas-naturales-panama/zoysia-toro/
│   ├── /gramas-naturales-panama/san-agustin/
│   └── /gramas-naturales-panama/zoysia-japonica/
├── /grama-sintetica-panama/               (Si se comercializa línea deportiva/decorativa o comparativa técnica)
├── /hidrosiembra-control-erosion-panama/  (B2B: Taludes, carreteras, minería, infraestructura, MOP)
├── /vivero-plantas-palmas-arboles/        (Catálogo filtrable nativo en el dominio, eliminando tiiny.site)
│   ├── /vivero-plantas-palmas-arboles/palmas-ornamentales/
│   ├── /vivero-plantas-palmas-arboles/arboles-nativos-reforestacion/
│   └── /vivero-plantas-palmas-arboles/plantas-ornamentales/
├── /paisajismo-mantenimiento-areas-verdes/ (Diseño, instalación de grama, riego y mantenimiento corporativo/residencial)
├── /productores-pitahaya-panama/          (Finca en Río Grande, Coclé - Comercialización B2B/B2C)
├── /proyectos-portafolio/                 (Casos de éxito reales en Ciudad de Panamá, Coclé, playas y campos deportivos)
├── /calculadora-de-grama/                 (Landing interactiva de alta conversión)
├── /nosotros/                             (+25 años desde 1999, capacidad industrial en Km 168 Interamericana)
├── /contacto/                             (Formulario B2B/B2C + Mapa interactivo + Ruta Waze/Google Maps)
└── /politica-de-privacidad/               (Cumplimiento Ley 81 de Panamá)
```

### 2.2 Matriz de Keywords Transaccionales para Panamá (B2B y B2C)
| Clúster de Negocio | Keywords Transaccionales Primarias (Panamá) | Keywords Secundarias / Long-Tail Local | URL Objetivo | Title Tag Optimizado (< 60 caract.) |
| :--- | :--- | :--- | :--- | :--- |
| **Home / Marca** | venta de grama en panama, vivero en panama, jardines urbanos panama | productores de grama en panama, empresa de paisajismo panama | `/` | `Jardines Urbanos | Gramas Naturales, Vivero e Hidrosiembra en Panamá` |
| **Gramas Naturales** | grama natural panama, precio m2 grama panama, grama zoysia toro panama, grama san agustin panama | comprar grama en rollo panama, grama japonesa panama, grama para campos deportivos panama | `/gramas-naturales-panama/` | `Venta de Grama Natural en Panamá: Zoysia Toro y San Agustín | M²` |
| **Grama Sintética / Deportiva** | grama sintetica panama, instalacion de grama panama, grama para jardines panama | grama paisajistica panama, cotizar grama por metro cuadrado panama | `/grama-sintetica-panama/` | `Grama para Jardines y Campos Deportivos en Panamá | Cotiza por M²` |
| **Hidrosiembra (B2B)** | hidrosiembra en panama, control de erosion panama, estabilizacion de taludes panama | revegetacion de taludes panama, empresas de hidrosiembra en panama | `/hidrosiembra-control-erosion-panama/` | `Hidrosiembra y Control de Erosión de Taludes en Panamá | JUSA` |
| **Palmas y Árboles** | venta de palmas en panama, vivero de arboles nativos panama, palmeras reales panama | arboles para reforestacion panama, plantas ornamentales al por mayor panama, vivero cocle | `/vivero-plantas-palmas-arboles/` | `Vivero en Panamá: Palmas, Árboles Nativos y Plantas Ornamentales` |
| **Paisajismo y Mantenimiento** | diseño de jardines panama, empresas de paisajismo en panama, mantenimiento de areas verdes panama | instalacion de jardines residenciales y comerciales panama, paisajismo hoteles playas panama | `/paisajismo-mantenimiento-areas-verdes/` | `Diseño de Paisajismo y Mantenimiento de Áreas Verdes en Panamá` |
| **Pitahaya** | productores de pitahaya en panama, venta de pitahaya cocle panama | fruta del dragon panama al por mayor, finca de pitahaya rio grande | `/productores-pitahaya-panama/` | `Productores de Pitahaya en Panamá | Finca en Río Grande, Coclé` |

### 2.3 Estrategia Google Business Profile (GBP) y SEO Local en Panamá
1. **Ficha Principal (Vivero y Planta de Producción - Coclé):**
   - **Nombre exacto:** `Jardines Urbanos, S.A. - Vivero y Cultivo de Gramas`
   - **Ubicación:** Carretera Interamericana, Km 168, Río Grande, Provincia de Coclé (`Plus Code: CGH3+PH9`).
   - **Categoría Principal:** `Vivero` (*Plant nursery*) / `Proveedor de césped` (*Sod supplier*).
   - **Categorías Secundarias:** `Arquitecto paisajista` (*Landscape architect*), `Centro de jardinería` (*Garden center*), `Servicio de jardinería` (*Landscaper*), `Proveedor agrícola`.
   - **Áreas de Servicio Configuradas:** Provincia de Coclé (Penonomé, Antón, Río Hato, Buenaventura, Coronado), Panamá Oeste (Chame, Gorgona, Coronado, Arraiján, La Chorrera), Ciudad de Panamá (Costa del Este, Santa María, Clayton, Panamá Pacífico, Brisas del Golf) y provincias centrales.
2. **Catálogo de Productos en GBP:** Subir fichas con foto real y botón de cotización por WhatsApp (con parámetros UTM `utm_source=google&utm_medium=gbp&utm_campaign=local`) para *Zoysia Toro*, *San Agustín*, *Zoysia Japónica*, *Servicio de Hidrosiembra*, *Palmas Ornamentales* y *Pitahaya*.

### 2.4 Código JSON-LD `Schema.org` Completo (Listo para Inyectar en `<head>`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["GardenStore", "LandscapeArchitect", "LocalBusiness"],
      "@id": "https://jardinesurbanos.com/#organization",
      "name": "Jardines Urbanos, S.A.",
      "alternateName": "JUSA Panamá",
      "url": "https://jardinesurbanos.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jardinesurbanos.com/wp-content/uploads/2025/06/logo_300X300px_blanco_stack.png",
        "width": 300,
        "height": 300
      },
      "image": "https://jardinesurbanos.com/wp-content/uploads/2025/09/SAE-PARA-COSECHA_mision.jpg",
      "description": "Empresa líder en Panamá fundada en 1999 especializada en el cultivo industrial y venta de gramas naturales (Zoysia Toro, San Agustín, Zoysia Japónica), hidrosiembra para control de erosión, vivero de palmas, árboles nativos, plantas ornamentales, paisajismo y producción de pitahaya.",
      "foundingDate": "1999",
      "telephone": "+507-226-0494",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+507-6539-0949",
          "contactType": "sales",
          "areaServed": "PA",
          "availableLanguage": ["es", "en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+507-226-0494",
          "contactType": "customer service",
          "email": "ventas@jardinesurbanos.com",
          "areaServed": "PA",
          "availableLanguage": ["es"]
        }
      ],
      "email": "ventas@jardinesurbanos.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Carretera Interamericana, Km 168, Río Grande",
        "addressLocality": "Río Grande",
        "addressRegion": "Coclé",
        "addressCountry": "PA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 8.4293,
        "longitude": -80.4960
      },
      "hasMap": "https://www.google.com/maps/place/Jardines+Urbanos,+s.a./@8.4293,-80.4960,15z",
      "areaServed": [
        { "@type": "Country", "name": "Panamá" },
        { "@type": "State", "name": "Panamá" },
        { "@type": "State", "name": "Coclé" },
        { "@type": "State", "name": "Panamá Oeste" },
        { "@type": "State", "name": "Colón" },
        { "@type": "State", "name": "Chiriquí" }
      ],
      "sameAs": [
        "https://www.instagram.com/jardines_urbanos/",
        "https://www.facebook.com/JardinesUrbanosPty/"
      ],
      "priceRange": "$$",
      "knowsAbout": [
        "Cultivo de Grama Natural en Panamá",
        "Grama Zoysia Toro",
        "Grama San Agustín",
        "Grama Zoysia Japónica",
        "Hidrosiembra y Control de Erosión de Taludes",
        "Paisajismo y Diseño de Jardines",
        "Vivero de Palmas y Árboles Nativos",
        "Producción de Pitahaya en Panamá"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Gramas, Vivero e Hidrosiembra en Panamá",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Grama Zoysia Toro (El Toro)",
              "description": "Grama natural de alta resistencia al tráfico, ideal para jardines residenciales, campos deportivos y áreas comerciales en Panamá.",
              "brand": { "@type": "Brand", "name": "Jardines Urbanos" }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Grama San Agustín (Stenotaphrum secundatum)",
              "description": "Grama natural adaptable a zonas costeras, jardines con sombra parcial y proyectos residenciales en Panamá.",
              "brand": { "@type": "Brand", "name": "Jardines Urbanos" }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Grama Zoysia Japónica (Zoysia spp.)",
              "description": "Grama natural de textura fina y alta estética para paisajismo premium y áreas verdes en Panamá.",
              "brand": { "@type": "Brand", "name": "Jardines Urbanos" }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Servicio de Hidrosiembra y Control de Erosión en Panamá",
              "description": "Aplicación mecanizada de semillas, fertilizantes, mulch y adherentes para estabilización y revegetación de taludes, carreteras e infraestructura."
            }
          }
        ]
      }
    }
  ]
}
</script>
```

---

## 3. Conectividad y Ecosistema Comercial Omnicanal

### 3.1 Enrutador Dinámico de WhatsApp con Contexto de Página, Calculadora y UTMs
Actualmente todos los botones de WhatsApp abren `api.whatsapp.com/send/?phone=50765390949&text` con texto vacío. Se implementará un motor JavaScript ligero (< 2 KB) que:
1. Captura automáticamente los parámetros `utm_source`, `utm_medium`, `utm_campaign`, `gclid` y `fbclid` al aterrizar el usuario y los persiste en `sessionStorage`.
2. Lee el contexto de la página actual (o los valores calculados en la **Calculadora de Grama / Hidrosiembra**: variedad de grama, área en $\text{m}^2$, provincia/ubicación de entrega, si requiere instalación).
3. Dispara el evento `generate_lead_whatsapp` hacia `dataLayer` (GTM -> GA4 + Meta Pixel) antes de abrir `https://wa.me/50765390949?text=...`.

#### Snippet Listo para Producción (Enrutador Contextual WhatsApp + GTM DataLayer):
```javascript
window.JUSA_Omnichannel = {
  phone: '50765390949',
  init() {
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid', 'fbclid'].forEach(k => {
      if (params.get(k)) sessionStorage.setItem('jusa_' + k, params.get(k));
    });
  },
  buildWhatsAppUrl({ product = '', variety = '', areaM2 = '', location = '', includeInstall = '', customNote = '' } = {}) {
    const pageTitle = document.title.split('|')[0].trim();
    const utmSource = sessionStorage.getItem('jusa_utm_source') || 'Web Directo';
    let msg = `Hola Jardines Urbanos 🌿, vengo de la web (${pageTitle}).`;

    if (areaM2) {
      msg += `\n\n📐 *Cotización de Calculadora:*` +
             `\n• Producto/Variedad: ${variety || product || 'Grama Natural'}` +
             `\n• Área estimada: ${areaM2} m²` +
             (location ? `\n• Ubicación de entrega: ${location}` : '') +
             (includeInstall ? `\n• ¿Requiere instalación?: ${includeInstall}` : '');
    } else if (product) {
      msg += `\nMe interesa cotizar: *${product}*` + (location ? ` para entrega en *${location}*.` : '.');
    } else {
      msg += `\nDeseo recibir asesoría y cotización para un proyecto.`;
    }
    if (customNote) msg += `\nNota: ${customNote}`;
    msg += `\n\n[Ref: ${utmSource}]`;

    // Push conversion event to Google Tag Manager dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_lead_click',
      lead_channel: 'whatsapp',
      product_category: product || pageTitle,
      grass_variety: variety || 'N/A',
      area_m2: areaM2 ? Number(areaM2) : 0,
      delivery_location: location || 'No especificada',
      utm_source: utmSource,
      page_path: window.location.pathname
    });

    return `https://wa.me/${this.phone}?text=${encodeURIComponent(msg)}`;
  }
};
document.addEventListener('DOMContentLoaded', () => window.JUSA_Omnichannel.init());
```

### 3.2 Arquitectura de Formularios Conectados a CRM / Google Sheets / Correo + Alertas Instantáneas
Se implementarán dos flujos de formulario sin fricción (con protección anti-spam invisible **Cloudflare Turnstile** en lugar de reCAPTCHA pesado):
1. **Formulario Rápido B2C (Residencial / Fincas / Jardines):** Nombre, WhatsApp (+507), Provincia/Sector (Ciudad de Panamá, Oeste, Playas/Coclé, Interior), Producto de interés (Grama Zoysia Toro, San Agustín, Japónica, Palmas/Árboles, Paisajismo) y Metros cuadrados ($\text{m}^2$) aproximados.
2. **Formulario Técnico B2B (Constructores, Ingenieros, Canchas Deportivas, Hidrosiembra):** Nombre, Empresa, RUC/Cargo, Correo corporativo, Teléfono, Tipo de Proyecto (Hidrosiembra de Taludes, Urbanización, Campo Deportivo, Hotel/Resort), Metraje en $\text{m}^2$ o Hectáreas, Fecha estimada de obra y carga opcional de plano/especificación PDF.

#### Flujo de Automatización (Webhook -> Make / n8n / Zapier):
- **Paso 1 (Persistencia Local):** Guarda el lead en la base de datos de WordPress (respaldo interno).
- **Paso 2 (Google Sheets / CRM en Tiempo Real):** Envía un `POST` JSON vía Webhook hacia Google Sheets (*Master Leads Tracker JUSA*) y/o HubSpot / Kommo / Pipedrive CRM asignando etiqueta `B2B` o `B2C` según el metraje ($\ge 500\text{ m}^2$ o Hidrosiembra = Prioridad Alta B2B).
- **Paso 3 (Notificación Instantánea):** Envía correo transaccional autenticado por Microsoft 365 SMTP a `ventas@jardinesurbanos.com` con el enlace de **1-Click para responder por WhatsApp al cliente** ya pre-armado.

### 3.3 Plan de Medición: Google Tag Manager (GTM), GA4, Meta Pixel y Google Search Console
Configuración centralizada mediante un único contenedor de **Google Tag Manager (`GTM-XXXXXXX`)** con carga diferida para no afectar Core Web Vitals:
| Nombre del Evento en GTM / GA4 | Evento Equivalente en Meta Pixel | Disparador (Trigger) | Parámetros Enviados (`eventParams`) |
| :--- | :--- | :--- | :--- |
| `whatsapp_lead_click` | `Contact` | Clic en cualquier botón de WhatsApp (`wa.me` / `api.whatsapp.com`) | `product_category`, `grass_variety`, `area_m2`, `delivery_location`, `utm_source` |
| `calculator_completed` | `CustomizeProduct` | Usuario calcula área en $\text{m}^2$ de grama o hidrosiembra | `grass_variety`, `area_m2`, `rolls_estimated` |
| `generate_lead` | `Lead` | Envío exitoso de formulario B2C o B2B | `lead_type` (`B2C` / `B2B`), `product_interest`, `area_m2`, `province` |
| `catalog_view` | `ViewContent` | Apertura o descarga del Catálogo de Cultivos nativo | `catalog_section`, `file_name` |
| `phone_call_click` | `Contact` | Clic en `tel:+5072260494` o `tel:+50765390949` | `phone_number`, `page_path` |

---

## 4. Rendimiento (Core Web Vitals), Hosting, Seguridad y Backups

### 4.1 Optimización Radical de Core Web Vitals (De 17.4 s a < 1.2 s)
1. **Capa Edge / CDN con Cloudflare (Panamá PTY Edge Node):**
   - Colocar el dominio detrás de **Cloudflare** (con nodo Edge local en Ciudad de Panamá - `PTY`) activando **TLS 1.3**, **HTTP/3 (QUIC)**, **Brotli**, **Early Hints** y **APO (Automatic Platform Optimization para WordPress)** o reglas de *Cache Everything* para visitantes anónimos. Esto reducirá el TTFB en Panamá de **17,398 ms a < 65 ms** desde caché de borde.
2. **Poda de Plugins Pesados e Innecesarios en WordPress:**
   - **Desactivar y desinstalar `WooCommerce` (`9.8.7`):** Actualmente no se realiza checkout en línea, pero WooCommerce inyecta scripts, estilos, consultas SQL y tablas que frenan cada petición PHP.
   - **Reemplazar `Slider Revolution` (`6.7.34`) en el Hero:** Sustituir el carrusel pesado por un Hero nativo en CSS/HTML con una imagen WebP/AVIF precargada (`<link rel="preload" as="image" fetchpriority="high">`), mejorando el **LCP (Largest Contentful Paint)** a `< 1.8 s`.
   - **Cambiar Elementor CSS Print Method:** Cambiar de `internal` (que inyecta miles de líneas de CSS dentro del HTML) a `external file` con generación de Critical CSS y eliminación de CSS no utilizado (*Remove Unused CSS*).
3. **Alojamiento Nativo del Catálogo:**
   - Eliminar el enlace externo `https://catalogodecultivosjusa.tiiny.site/?fbclid=...` y alojar el catálogo interactivo y su versión PDF optimizada directamente bajo `https://jardinesurbanos.com/catalogo-de-cultivos/` (reteniendo el tráfico, la autoridad SEO y el píxel de remarketing dentro del propio dominio).
4. **Imágenes Next-Gen (AVIF / WebP):**
   - Convertir todas las fotografías de gramas, vivero, palmas, hidrosiembra y pitahaya a **WebP/AVIF** con dimensionamiento responsivo (`srcset`) y `loading="lazy"` bajo el pliegue.

### 4.2 Endurecimiento (Hardening) de WordPress y Cabeceras HTTP de Seguridad
Actualmente el servidor expone `Server: Apache/2.4.6 (CentOS)` y `X-Powered-By: PHP/8.1.34-php2shell`, carece de cabeceras de seguridad, expone `/readme.html` y enumera usuarios en `/wp-sitemap-users-1.xml`.

#### Reglas `.htaccess` / Cloudflare Transform Rules Listas para Aplicar:
```apache
# 1. Ocultar huella de PHP y Servidor
<IfModule mod_headers.c>
  Header unset X-Powered-By
  Header always unset X-Powered-By
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# 2. Bloquear xmlrpc.php (Vectores de fuerza bruta y DDoS) y readme.html
<FilesMatch "^(xmlrpc\.php|readme\.html|license\.txt|wp-config-sample\.php)$">
  Require all denied
</FilesMatch>

# 3. Bloquear enumeración de autor (?author=1)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{QUERY_STRING} author=\d+ [NC]
  RewriteRule ^ - [F,L]
</IfModule>
```
#### Filtro para `functions.php` en `floria-child` (Eliminar exposición de usuarios y CPTs basura del Sitemap):
```php
<?php
// 1. Eliminar sitemap de usuarios (/wp-sitemap-users-1.xml) que expone 'tamedina'
add_filter('wp_sitemaps_add_provider', function($provider, $name) {
    if ('users' === $name) return false;
    return $provider;
}, 10, 2);

// 2. Excluir CPTs internos de plantilla (cpt_layouts, cpt_team, cpt_testimonials) del sitemap
add_filter('wp_sitemaps_post_types', function($post_types) {
    unset($post_types['cpt_layouts'], $post_types['cpt_team'], $post_types['cpt_testimonials']);
    return $post_types;
});

// 3. Ocultar versión de WordPress, WooCommerce y Elementor del <head>
remove_action('wp_head', 'wp_generator');
```

### 4.3 Estrategia de Backups Automatizados (Regla 3-2-1)
- **Backups Diarios Incrementales (Base de Datos) + Semanales Completos (`wp-content/uploads`):** Automatizados hacia almacenamiento externo inmutable (Amazon S3 / Google Cloud Storage / OneDrive Corporativo de Microsoft 365) con retención de 30 días y prueba mensual de restauración en entorno de *staging*.

---

## 5. Cumplimiento Legal en Panamá (Ley 81) y Entregabilidad de Correo Corporativo

### 5.1 Correos Corporativos: Solución Definitiva SPF, DKIM, DMARC y SMTP (Microsoft 365)
El dominio utiliza **Microsoft 365 (`jardinesurbanos-com.mail.protection.outlook.com`)** y los servidores DNS de Microsoft (`ns1-4.bdm.microsoftonline.com`), pero presenta tres vulnerabilidades críticas que provocan que los correos del sitio web caigan en SPAM o sean rechazados:
1. **Autenticación SMTP OAuth2 en WordPress:** Instalar **FluentSMTP** (gratuito y ultraligero) conectado mediante **Microsoft Graph API / OAuth 2.0** con una cuenta remitente dedicada (ej. `notificaciones@jardinesurbanos.com` o `ventas@jardinesurbanos.com`) y `Reply-To` dinámico al correo del cliente. **Nunca enviar vía `mail()` local desde `webhost20.webhero.com`.**
2. **Registros DNS Exactos a Configurar en el Panel DNS de Microsoft 365:**

| Tipo | Host / Nombre | Valor Exacto Recomendado | Propósito |
| :--- | :--- | :--- | :--- |
| `TXT` | `@` | `v=spf1 include:spf.protection.outlook.com -all` | Mantener estricto una vez WordPress envíe por Microsoft 365 SMTP/Graph (o añadir `ip4:216.57.231.120` temporalmente mientras se migra el envío). |
| `CNAME` | `selector1._domainkey` | `selector1-jardinesurbanos-com._domainkey.<tenant>.onmicrosoft.com` | Activar firma criptográfica **DKIM** en Microsoft 365 Defender Portal. |
| `CNAME` | `selector2._domainkey` | `selector2-jardinesurbanos-com._domainkey.<tenant>.onmicrosoft.com` | Rotación de clave **DKIM** secundaria en Microsoft 365. |
| `TXT` | `_dmarc` | `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@jardinesurbanos.com; adkim=r; aspf=r;` | Protección **DMARC** contra suplantación de dominio (*spoofing*) y garantía de bandeja principal en Gmail/Outlook. |

### 5.2 Cumplimiento con la Ley 81 de 2019 (Protección de Datos Personales de Panamá - ANTAI)
Conforme a la **Ley 81 del 26 de marzo de 2019** y su reglamentación por el **Decreto Ejecutivo No. 285 de 28 de mayo de 2021** de la República de Panamá:
1. **Consentimiento Informado y Expreso en Formularios:** Todo formulario de cotización y contacto debe incluir una casilla de verificación desmarcada por defecto (*opt-in* explícito):
   > *"Acepto el tratamiento de mis datos personales por parte de **Jardines Urbanos, S.A.** para el envío de cotizaciones, atención comercial por WhatsApp/correo y seguimiento de mi solicitud, conforme a la [Política de Privacidad y Protección de Datos (Ley 81 de Panamá)](/politica-de-privacidad/)."*
2. **Página de Política de Privacidad (`/politica-de-privacidad/`) con Derechos ARCO+ (Acceso, Rectificación, Cancelación, Oposición y Portabilidad):**
   - **Responsable del Tratamiento:** Jardines Urbanos, S.A., RUC panameño, domicilio en Carretera Interamericana, Km 168, Río Grande, Provincia de Coclé, República de Panamá.
   - **Finalidad del Tratamiento:** Elaboración de cotizaciones técnicas (gramas, vivero, paisajismo, hidrosiembra, pitahaya), coordinación logística de despacho/instalación, facturación y comunicaciones comerciales autorizadas.
   - **Canal de Ejercicio de Derechos ARCO:** Correo `ventas@jardinesurbanos.com` (con plazo legal de respuesta máximo de 10 días hábiles para acceso y 5 días hábiles para rectificación/cancelación según la Ley 81).
   - **Banner de Cookies:** Banner ligero con aceptación granular para cookies analíticas (GA4) y publicitarias (Meta Pixel) sincronizado con **Google Consent Mode v2**.

---

## 6. Hoja de Ruta de Ejecución (Quick Wins vs. Transformación Estructural)

1. **Fase 1 — Intervención Inmediata (Días 1–3 | Impacto Inmediato):**
   - Purgar páginas y productos demo en inglés (`/product/golden-privet/`, `/services/leaf-removal/`, `/newsletter-popups/`) y bloquear `/wp-sitemap-users-1.xml` y `/xmlrpc.php`.
   - Corregir el enlace telefónico roto `tel:(+507) 226-0494 / (+507) 6539-0949` separándolo en dos enlaces válidos (`tel:+5072260494` y `tel:+50765390949`), corregir los enlaces `http://` del menú y eliminar el enlace externo a `tiiny.site/?fbclid=...`.
   - Desactivar WooCommerce (si no hay venta por carrito), activar Cloudflare CDN + TLS 1.3 y aplicar las cabeceras de seguridad `.htaccess`.
   - Configurar DKIM, DMARC y FluentSMTP con Microsoft 365.
2. **Fase 2 — SEO Técnico, Datos Estructurados y Omnicanalidad (Días 4–10):**
   - Inyectar el bloque JSON-LD `GardenStore` / `LandscapeArchitect` / `LocalBusiness` y corregir la jerarquía de encabezados (un único `<h1>` por URL).
   - Implementar el enrutador dinámico de WhatsApp + Calculadora de Grama ($\text{m}^2$) + Formularios B2B/B2C conectados a Google Sheets/CRM.
   - Desplegar Google Tag Manager (`GA4` + `Meta Pixel` + `Google Search Console`) y publicar la Política de Privacidad (Ley 81 de Panamá).
3. **Fase 3 — Expansión de Autoridad Local en Panamá (Días 11–30):**
   - Migrar `/portfolio/*` hacia las nuevas landings transaccionales con redirecciones `301`, optimizar la ficha de Google Business Profile y lanzar el catálogo nativo indexable de especies del vivero.
