# Especificación Técnica y Lógica de Negocio 360° — Jardines Urbanos, S.A.

**Documento:** `survey_specs.md`  
**Agente:** `spec_miner_survey_2` (Specification Miner)  
**Fecha:** 8 de noviembre de 2026  
**Fuentes Autoritativas Auditadas:**
- `Propuesta_Ejecutiva_360_Jardines_Urbanos.html` / `.pdf`
- `PLAN_360_SEO_ANALITICA_SEGURIDAD.md`
- `ORIGINAL_REQUEST.md`
- `C:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\propuesta_master_360_interactiva.html`
- `C:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\investigacion_mercado_y_propuesta_killer.md`
- `C:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\propuestas_sitio_web.md`
- `C:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\roadmap_y_cronograma.md`
- Repositorio de Activos Reales: `imagenes/` (`FUENTES.csv`, `VERIFICACION.csv`, `LEEME_REFERENCIAS.txt`, `INDICE_VISUAL.html` y `docs/media_inventory_site.csv`)

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Calculadora m² | Selector de Escenario de Uso | Clasifica el tipo de terreno entre 4 perfiles técnicos: Jardín/PH, Casa de Playa, Parque/Tráfico o Talud/Obra Vial. | `scenario`: string enum (`'residencial'`, `'playa'`, `'deportivo'`, `'talud'`). | Modifica la recomendación varietal, modo de despacho y texto explicativo. | Default a `'residencial'` si no se proporciona valor válido. | `propuesta_master_360_interactiva.html` L267-280, L488-499 |
| 2 | Calculadora m² | Selector de Exposición Solar | Determina la radiación solar directa recibida por el área a revegetar. | `sun`: string enum (`'sol'`, `'sombra'`). | Influye en la selección entre especies tolerantes a sombra (*San Agustín*) vs pleno sol (*Zoysia Toro*). | Default a `'sol'` si no se indica. | `propuesta_master_360_interactiva.html` L301-313, L501-512 |
| 3 | Calculadora m² | Input de Área Neta ($m^2$) | Permite ingresar los metros cuadrados brutos o netos requeridos, mediante deslizador táctil continuo o entrada numérica. | `area`: entero o float en $m^2$ (Rango base: $20$ a $5,000+$ $m^2$, step 10). | Renderiza valor formateado en $m^2$ (`toLocaleString()`). | Limitar al rango $[20, 100000]$; valores negativos o no numéricos se corrigen a 20. | `propuesta_master_360_interactiva.html` L284-298, L515 |
| 4 | Calculadora m² | Cálculo de Merma Obligatoria (+5%) | Suma el margen de desperdicio recomendado para cortes perimetrales, esquinas y pérdidas en obra: $A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$. | `area` ($A_{\text{net}}$): número positivo en $m^2$. | `gross` ($A_{\text{gross}}$): entero en $m^2$. | Si $A_{\text{net}} \le 0$, retorna 0 o valor mínimo de seguridad. | `Propuesta_Ejecutiva` L414; `propuesta_master` L516 |
| 5 | Calculadora m² | Motor Recomendador Botánico | Aplica matriz condicional determinística para sugerir la variedad o técnica adecuada: *Zoysia Toro*, *Zoysia Japónica*, *San Agustín* o *Hidrosiembra Técnica*. | Tuple (`scenario`, `sun`, `area`). | Objeto técnico `{ title, desc, mode, scLabel }`. | Retorna fallback `Zoysia Toro` para residencial general. | `propuesta_master_360_interactiva.html` L521-550 |
| 6 | Calculadora m² | Generador Dinámico de Enlace WhatsApp | Construye URL `https://wa.me/50765390949?text=...` con texto codificado prellenado que incluye metraje neto, metraje con merma (+5%), variedad y condición. | Objeto de cálculo `{ gross, title, scLabel, sun }` + sesión UTMs. | String URL encodeada (`encodeURIComponent`). | Si falla codificación, abre WhatsApp con mensaje base o número sin query. | `PLAN_360` §3.1 L256-300; `propuesta_master` L552-555 |
| 7 | Omnicanalidad / Analítica | Enrutador Contextual con DataLayer | Script ligero (`window.JUSA_Omnichannel`) que captura UTMs en `sessionStorage` y dispara evento `whatsapp_lead_click` a `window.dataLayer`. | `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`, contexto de producto. | Evento dataLayer estructurado para GA4 y Meta Pixel + URL WhatsApp. | Tolera ausencia de `window.dataLayer` inicializándolo como array vacío `[]`. | `PLAN_360_SEO_ANALITICA_SEGURIDAD.md` L256-300 |
| 8 | Catálogo Botánico | Filtrado Dinámico por Categoría | Filtra especies de vivero y producción propia sin recargar página: Gramas, Palmas, Árboles/Plantas, B2B Hidrosiembra/Pitahaya. | `category`: string enum (`'all'`, `'grama'`, `'palma'`, `'arbol'`, `'b2b'`). | Alterna clases CSS visuales (`hidden` / show) en tarjetas `.cat-item`. | Default a `'all'` mostrando todo el inventario verificado. | `propuesta_master_360_interactiva.html` L366-373, L557-565 |
| 9 | Catálogo Botánico | Badges Climáticos de Panamá | Etiquetas visuales por condiciones fisiológicas: Sol Directo (☀️), Resistencia Salina Costera (🏖️), Sombra Parcial (⛅), Alto Tráfico (🐾). | Atributos botánicos del espécimen. | Badges cromáticos con iconos y texto descriptivo. | Omisión graciosa de insignias no aplicables. | `Propuesta_Ejecutiva` L425; `propuestas_sitio_web.md` L84-86 |
| 10 | Catálogo Botánico | Visualización de Fichas con Activos Reales | Despliegue de especies con fotografía real verified de `01_sitio_oficial/`, dimensiones y datos botánicos. | ID de archivo en `FUENTES.csv` / `media_inventory_site.csv`. | Imagen WebP/JPG responsiva con `alt` descriptivo. | Si no existe foto individual oficial, mostrar mockup IA claramente marcado como placeholder. | `ORIGINAL_REQUEST.md` R1; `FUENTES.csv` |
| 11 | B2B & Ingeniería | Portal de Especificaciones B2B | Sección técnica para arquitectos e ingenieros: tabla comparativa de pendiente máxima, resistencia, requerimiento hídrico y descarga de Ficha PDF. | Clic en botón de descarga o filtro por aplicación (Vial, Deportiva, Urbanismo). | Descarga de PDF técnico o modal de cotización de obra. | Notificación de solicitud enviada si el archivo PDF está en preparación. | `Propuesta_Ejecutiva` L370-373, L426; `propuestas_sitio_web.md` L140-176 |
| 12 | B2B & Ingeniería | Botón de Copiado Rápido de Especificación (`Copy Spec TXT`) | Copia en el portapapeles del usuario el párrafo técnico formal para pliegos de licitación, AutoCAD o Revit. | Clic de usuario en botón `[📋 Copiar Spec TXT]`. | Texto plano copiado al Clipboard API con notificación flotante (toast). | Fallback a selección de texto manual si Clipboard API no está permitida por el navegador. | `propuestas_sitio_web.md` L158, L178-180 |
| 13 | Interacción Visual | Comparador Interactivo Antes / Después | Deslizador táctil/arrastre (`range input`) que compara visualmente un talud en riesgo de erosión (Día 1) vs talud revegetado con hidrosiembra (Día 35). | Posición del slider `ba-slider` (entero 5 a 95, default 50). | Ajuste dinámico de porcentajes de ancho `style.width` en contenedores `#ba-before` y `#ba-after`. | Mantiene la suma de anchos al 100% de manera continua. | `propuesta_master_360_interactiva.html` L399-421, L567-571 |
| 14 | Formularios / Conversión | Formulario B2C Residencial | Captura de leads de particulares: Nombre, WhatsApp (+507), Provincia/Sector, Producto, Metros aproximados, Opt-in Ley 81. | Datos del formulario web. | Lead guardado en BD local + Webhook a Google Sheets / CRM + notificación transaccional. | Validación de campos requeridos; alerta en rojo si falta consentimiento. | `PLAN_360` §3.2 L304; `Propuesta_Ejecutiva` L466 |
| 15 | Formularios / Conversión | Formulario B2B Constructoras / Licitaciones | Captura de obras de envergadura: RUC, Empresa, Cargo, Metraje/Hectáreas, Tipo de obra, Fecha, adjunto opcional de BoQ (Excel/PDF). | Datos de empresa y archivo BoQ. | Clasificación automática como Prioridad Alta B2B si metraje $\ge 500\text{ m}^2$ o Hidrosiembra. | Límite de tamaño de archivo (10 MB); formatos permitidos `.pdf`, `.xlsx`, `.dwg`. | `PLAN_360` §3.2 L305-310; `propuestas_sitio_web.md` L167-180 |
| 16 | Integridad de Datos | Protocolo `[DATO PENDIENTE DEL CLIENTE]` | Reemplazo estricto de cualquier estadística, precio, testimonio o dato no confirmado documentalmente por el marcador estándar. | Datos sin verificar (precios unitarios, métricas exactas, RUC/DV, testimonios). | Renderizado visual del placeholder `[DATO PENDIENTE DEL CLIENTE]` sin inventar hechos. | El sistema nunca debe inventar cifras para rellenar espacios vacíos. | `ORIGINAL_REQUEST.md` R3; `DISPATCH.md` Obj. 2 |
| 17 | SEO On-Page | Silos Semánticos Transaccionales | URLs limpias orientadas a intención de búsqueda en Panamá: `/gramas-naturales-panama/`, `/hidrosiembra-control-erosion-panama/`, etc. | Rutas HTTP canónicas en español (`es-PA`). | Páginas transaccionales con 1 solo `<h1>` y metatags específicos (<60 caracteres título). | Redirección 301 permanente desde URLs antiguas (`/portfolio/*`). | `PLAN_360` §2.1, §2.2 |
| 18 | Datos Estructurados | Marcado JSON-LD Schema.org Multi-Tipo | Inyección en `<head>` del bloque estructurado `GardenStore`, `LandscapeArchitect` y `LocalBusiness` con OfferCatalog. | Datos verificados de JUSA (Coclé, Km 168, teléfonos, productos). | Bloque `<script type="application/ld+json">` válido según validador Schema.org. | Falla de sintaxis JSON invalidaría los rich snippets (debe validarse estrictamente). | `PLAN_360` §2.4 L121-242 |
| 19 | Rendimiento & Media | Optimización de Multimedia & Poster Frame | Sustitución de slider pesado por video en bucle ligero (<2.5 MB) y poster frame instantáneo en WebP (<150 KB). | Archivos de video WebM/MP4 + imagen estática WebP de precarga. | Reproducción diferida suave tras renderizado inmediato del LCP. | Si el navegador bloquea autoplay, se mantiene la imagen estática nítida. | `Propuesta_Ejecutiva` L346; `propuesta_master` L125-139 |
| 20 | Seguridad & Cumplimiento | Cabeceras HTTP de Seguridad & Hardening | Configuración de directivas HSTS, X-Frame-Options, X-Content-Type-Options y bloqueo de `/readme.html` y `?author=1`. | Peticiones HTTP al servidor web. | Encabezados de respuesta blindados y respuestas 403 Forbidden a accesos no autorizados. | Errores 500 si la sintaxis del servidor fuera incompatible (se verifican reglas estándar). | `PLAN_360` §4.2 L341-365 |
| 21 | Seguridad de Correo | Autenticación DNS Microsoft 365 (SPF/DKIM/DMARC) | Configuración de registros DNS para evitar que los correos de cotización del sitio caigan en spam en Outlook/Gmail. | Registros TXT y CNAME en panel DNS M365. | Entregabilidad garantizada de correos desde `ventas@` y `xavier@jardinesurbanos.com`. | Sin DKIM/DMARC los proveedores modernos rechazan los correos transaccionales. | `PLAN_360` §5.1 L392-403 |
| 22 | Cumplimiento Legal | Consentimiento Granular Ley 81 de Panamá | Casilla de verificación explícita (*opt-in* desmarcado) con enlace a Política de Privacidad y atención de Derechos ARCO. | Interacción del usuario al enviar formulario. | Registro del timestamp de consentimiento en la base de datos de leads. | Formulario bloqueado con mensaje de advertencia si la casilla no es marcada. | `PLAN_360` §5.2 L404-413 |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Calculadora m² | `area = 0` o valor negativo (`-50`) | El cálculo retornaría 0 o negativo si no se valida; debe forzarse al mínimo permitido ($20\text{ m}^2$) o mostrar alerta de valor inválido. |
| 2 | Calculadora m² | `area` extremadamente grande ($150,000\text{ m}^2$) | El cálculo con merma da $157,500\text{ m}^2$. Al superar los $500\text{ m}^2$, el sistema debe activar automáticamente la bandera comercial de "Prioridad Alta B2B" y sugerir atención directa con un ingeniero agrónomo. |
| 3 | Calculadora m² | Área no entera (ej. $125.4\text{ m}^2$) | La fórmula con merma es $125.4 \times 1.05 = 131.67$. El redondeo superior `Math.ceil(131.67)` arroja exactamente $132\text{ m}^2$ para evitar faltante de material. |
| 4 | Calculadora m² | Conflicto entre Escenario y Sombra (`scenario = 'talud'`, `sun = 'sombra'`) | La regla de `talud` tiene precedencia absoluta: recomienda **Hidrosiembra Técnica JUSA** porque en taludes pronunciados la fijación de la semilla y el mulch anti-escorrentía son la prioridad técnica antes que el tipo de césped en rollos. |
| 5 | Calculadora m² | Conflicto entre Playa y Sombra (`scenario = 'playa'`, `sun = 'sombra'`) | Si el usuario selecciona "Casa de Playa" pero marca "Sombra Parcial", la regla prioriza **Grama Zoysia Japónica** por su tolerancia a la salinidad costera y brisa marina, pero el mensaje incluye la advertencia contextual de evaluar la cobertura de copas de árboles. |
| 6 | Enlace WhatsApp | Caracteres especiales y saltos de línea en notas personalizadas | El texto del mensaje debe procesarse con `encodeURIComponent()` para preservar saltos de línea (`%0A`), asteriscos de negrita de WhatsApp (`%2A`) y tildes/emojis sin truncar el enlace en dispositivos móviles. |
| 7 | Enlace WhatsApp | Bloqueador de popups o usuario sin app WhatsApp | Si `window.open` o redirección directa es bloqueada, el botón debe funcionar como enlace tradicional `<a href="https://wa.me/..." target="_blank" rel="noopener noreferrer">` para apertura nativa. |
| 8 | Catálogo Botánico | Filtrado sin coincidencias en categoría | Todas las categorías estándar (`grama`, `palma`, `arbol`, `b2b`) cuentan con al menos 3 a 18 especímenes verificados; no se produce cuadrícula vacía. En caso de búsqueda textual futura sin resultados, debe presentarse un aviso de "Especie no encontrada en stock actual — Consultar al vivero". |
| 9 | Comparador Antes/Después | Valores extremos del deslizador (0% o 100%) | Si el slider llega a los extremos, el contenedor al 0% colapsaría su contenido interno; por ello el rango se restringe entre `min="5"` y `max="95"` manteniendo siempre visible una franja de referencia en ambos lados. |
| 10 | Integración UTMs | Sesión de usuario sin parámetros UTM (`referrer` directo u orgánico) | Si no existen variables en la URL, `sessionStorage` almacena el valor por defecto `'Web Directo'`, evitando etiquetas nulas (`null` o `undefined`) en el texto de WhatsApp o en los eventos de GA4. |
| 11 | Formularios Web | Envío sin marcar casilla de Política de Privacidad (Ley 81) | El botón de envío no procesa la solicitud y resalta visualmente la casilla de verificación obligatoria en color terracota con el texto *"Debe aceptar los términos de tratamiento de datos según la Ley 81 de Panamá"*. |
| 12 | Fotografías de Especies | Especies sin fotografía individual en `01_sitio_oficial` | No se deben tomar imágenes de Google indiscriminadamente. Se debe utilizar un mockup generado por IA etiquetado visiblemente como `[Mockup Referencial]` o `[Placeholder Temporal]` hasta que el cliente proporcione la fotografía real de su vivero. |

---

## 1. Especificaciones de la Calculadora Interactiva de m² y Cotizador

### 1.1 Entradas de Usuario y Parámetros de Control
La calculadora interactiva debe procesar las siguientes variables:

1. **Escenario de Aplicación (`scenario`):**
   - `residencial` ("🏡 Jardín / PH"): Jardines residenciales, patios de barriadas, áreas verdes comunes de propiedad horizontal.
   - `playa` ("🏖️ Casa de Playa"): Propiedades en el litoral pacífico o caribeño (Coronado, Buenaventura, Gorgona, Río Hato, Bocas del Toro), con exposición a brisa marina y salinidad.
   - `deportivo` ("⚽ Parque / Alto Tráfico"): Parques recreativos, campos de fútbol, áreas de juego infantil, canchas y zonas de tránsito continuo.
   - `talud` ("⛰️ Talud / Obra Vial"): Pendientes mayores a $25^\circ-30^\circ$, cortes de carretera, taludes de proyectos urbanísticos o zonas con alto riesgo de escorrentía pluvial y erosión.

2. **Exposición a la Luz Solar (`sun`):**
   - `sol` ("☀️ Pleno Sol Directo"): Más de 6 horas diarias de sol directo sin obstrucción arbórea o de estructuras.
   - `sombra` ("⛅ Sombra Parcial / Árboles"): Zonas con sombra intermitente, árboles maduros de gran follaje o patios con muros perimetrales altos.

3. **Área Estimada del Terreno ($A_{\text{net}}$):**
   - Rango en interfaz: Deslizador con valores de $20\text{ m}^2$ hasta $5,000+\text{ m}^2$, con incrementos estándar de $10\text{ m}^2$ y opción de tipeo manual.
   - Hitos predefinidos en la interfaz:
     - $20\text{ m}^2$: Patio pequeño / Zona de acento.
     - $500\text{ m}^2$: Residencia completa / Jardín amplio.
     - $2,000\text{ m}^2$: Parque de PH / Área recreativa.
     - $5,000+\text{ m}^2$: Proyecto de infraestructura / Obra B2B.

4. **Variables Adicionales de Contexto Comercial (Formulario / Omnicanalidad):**
   - `location`: Ubicación o provincia de entrega (ej. *Ciudad de Panamá, Costa del Este, Santa María, Panamá Oeste, Coclé / Playas, Provincias Centrales, Chiriquí*).
   - `includeInstall`: Requerimiento de instalación (*"Solo suministro en obra/finca"* vs *"Suministro e instalación completa con preparación de suelo"*).

---

### 1.2 Fórmulas Matemáticas Exactas y Reglas de Cálculo

#### A. Cálculo de Área con Merma Técnica (+5%)
Por estándar agronómico y constructivo de paisajismo en Panamá, se debe incorporar una merma sugerida del **+5%** por cortes perimetrales, esquinas y desperdicio en obra:

$$\text{Factor de Merma} = 1.05$$

$$A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$$

En JavaScript:
```javascript
const gross = Math.ceil(area * 1.05);
```

*Ejemplos exactos de cálculo:*
- $100\text{ m}^2 \times 1.05 = 105\text{ m}^2$ (Merma: $5\text{ m}^2$)
- $250\text{ m}^2 \times 1.05 = 262.5\text{ m}^2 \rightarrow \mathbf{263\text{ m}^2}$ (Merma: $13\text{ m}^2$)
- $1,000\text{ m}^2 \times 1.05 = 1,050\text{ m}^2$ (Merma: $50\text{ m}^2$)
- $3,400\text{ m}^2 \times 1.05 = 3,570\text{ m}^2$ (Merma: $170\text{ m}^2$)

#### B. Estimación de Pallets / Tarimas de Finca (Si aplica cálculo de transporte)
Basado en las fotografías de despacho real de JUSA (`TARIMAS-SAN-AGUSTIN.jpg`):
- 1 Tarima estándar de finca en rollo almacena aproximadamente $40\text{ m}^2$ a $50\text{ m}^2$ de grama cosechada fresca.
$$\text{Tarimas Estimadas} = \lceil A_{\text{gross}} / 45 \rceil$$
*(Nota: Este dato se expone como referencia logística interna o para cotizaciones de flete desde Río Grande, Coclé).*

#### C. Umbral de Calificación B2B vs B2C
- Si $A_{\text{net}} \ge 500\text{ m}^2$ O `scenario === 'talud'`, el sistema asigna internamente la etiqueta `lead_type = 'B2B'` con prioridad de atención técnica inmediata.
- Si $A_{\text{net}} < 500\text{ m}^2$ y `scenario !== 'talud'`, se clasifica como `lead_type = 'B2C'` (Residencial).

---

### 1.3 Matriz de Decisión y Recomendaciones de Producto

El motor de recomendación sigue una jerarquía condicional estricta:

```
[Inicio de Evaluación]
  │
  ├── ¿scenario === 'talud'?
  │     ├── SÍ ──> Producto: "Hidrosiembra Técnica JUSA"
  │     │          Despacho: "Camión Hidrosembrador (Obra B2B)"
  │     │          Etiqueta: "Talud / Control de Erosión"
  │     │
  │     └── NO ──> ¿scenario === 'playa'?
  │                  ├── SÍ ──> Producto: "Grama Zoysia Japónica"
  │                  │          Despacho: "Rollos / Tarimas de Finca"
  │                  │          Etiqueta: "Casa de Playa / Costa"
  │                  │
  │                  └── NO ──> ¿sun === 'sombra'?
  │                               ├── SÍ ──> Producto: "Grama San Agustín"
  │                               │          Despacho: "Rollos / Tarimas de Finca"
  │                               │          Etiqueta: "Jardín con Sombra Parcial"
  │                               │
  │                               └── NO ──> ¿scenario === 'deportivo'?
  │                                            ├── SÍ ──> Producto: "Grama Zoysia Toro (Alto Tráfico)"
  │                                            │          Despacho: "Suministro a Escala / Tarimas"
  │                                            │          Etiqueta: "Parque / Alto Tráfico"
  │                                            │
  │                                            └── NO (Default) ──> Producto: "Grama Zoysia Toro"
  │                                                                 Despacho: "Rollos / Tarimas de Finca"
  │                                                                 Etiqueta: "Jardín / PH"
```

#### Fichas Técnicas de Recomendación Resultantes:

1. **Hidrosiembra Técnica JUSA (Escenario Talud / Control de Erosión):**
   - **Nombre de producto:** *Hidrosiembra Técnica JUSA*
   - **Descripción agronómica:** *"Aplicación mecanizada de semillas tropicalizadas, mulch de fibra de madera/celulosa, fertilizantes de liberación controlada y fijador orgánico para estabilizar taludes y controlar la erosión pluvial al 98% en Panamá."*
   - **Modalidad recomendada:** *Camión Hidrosembrador (Obra B2B)*
   - **Equipo verificado JUSA:** Maquinaria hidrosembradora propia rotulada (`HIDROSIEMBRA-MAQUINA.jpg`).

2. **Grama Zoysia Japónica (Escenario Casa de Playa / Costa):**
   - **Nombre científico:** *Zoysia japonica / Zoysia spp.*
   - **Nombre comercial:** *Grama Zoysia Japónica*
   - **Descripción agronómica:** *"Césped de hoja fina y raíces profundas con máxima tolerancia comprobada a la brisa marina cargada de salitre, suelos arenosos y sequías estacionales en las costas de Panamá."*
   - **Modalidad recomendada:** *Rollos / Tarimas de Finca*
   - **Foto verificada:** `JAPONESA-PROYECTO.jpg` y `JAPONESA-CLOSEUP.jpg`.

3. **Grama San Agustín (Condición Sombra Parcial / Jardines Arbolados):**
   - **Nombre científico:** *Stenotaphrum secundatum*
   - **Nombre comercial:** *Grama San Agustín*
   - **Descripción agronómica:** *"Variedad de hoja ancha color verde-azulado, insuperable en zonas residenciales con sombra parcial proyectada por árboles o muros altos. Mantiene su densidad y verdor bajo luz filtrada."*
   - **Modalidad recomendada:** *Rollos / Tarimas de Finca*
   - **Foto verificada:** `SAN-AGUSTIN-HEADER.jpg`, `SAN-AGUSTIN-CLOSEUP.jpg` y `TARIMAS-SAN-AGUSTIN.jpg`.

4. **Grama Zoysia Toro (Escenario Residencial Pleno Sol o Deportivo / Alto Tráfico):**
   - **Nombre científico:** *Zoysia japonica 'Toro' / 'El Toro'*
   - **Nombre comercial:** *Grama Zoysia Toro*
   - **Descripción agronómica:** *"Grama de hoja media y color verde intenso cultivada en Río Grande, Coclé. Destaca por su extraordinaria resistencia al pisoteo continuo, mascotas y rápido poder de recuperación tras el uso deportivo o recreativo."*
   - **Modalidad recomendada:** *Rollos / Tarimas de Finca* (o *Suministro a Escala / Tarimas* para canchas/parques).
   - **Foto verificada:** `TORO-CLOSEUP-1.jpg`, `TORO-ZOOM.jpg`, `SAE-PARA-COSECHA_mision.jpg`.

---

### 1.4 Generación Dinámica de Enlace a WhatsApp y Enrutador Omnicanal

#### A. Formato Base de URL
- **Teléfono comercial oficial:** `+507 6539-0949`
- **Identificador de WhatsApp:** `50765390949`
- **Endpoint:** `https://wa.me/50765390949?text=`

#### B. Texto del Mensaje Codificado (Formato Interactivo Directo)
```text
Hola Jardines Urbanos, usé la calculadora web y deseo cotizar ${gross} m² (incluye 5% merma) de ${title} para ${scLabel} (${currentSun === 'sol' ? 'Pleno Sol' : 'Sombra Parcial'}).
```

*Ejemplo Real Generado (250 m² en Jardín Residencial con Sol):*
```
https://wa.me/50765390949?text=Hola%20Jardines%20Urbanos%2C%20us%C3%A9%20la%20calculadora%20web%20y%20deseo%20cotizar%20263%20m%C2%B2%20(incluye%205%25%20merma)%20de%20Grama%20Zoysia%20Toro%20para%20Jard%C3%ADn%20%2F%20PH%20(Pleno%20Sol).
```

*Ejemplo Real Generado (1,500 m² en Talud con Hidrosiembra):*
```
https://wa.me/50765390949?text=Hola%20Jardines%20Urbanos%2C%20us%C3%A9%20la%20calculadora%20web%20y%20deseo%20cotizar%201%2C575%20m%C2%B2%20(incluye%205%25%20merma)%20de%20Hidrosiembra%20T%C3%A9cnica%20JUSA%20para%20Talud%20%2F%20Control%20de%20Erosi%C3%B3n%20(Pleno%20Sol).
```

#### C. Texto Omnicanal Completo con Ubicación, Instalación y Trazabilidad UTM
Cuando el usuario complementa su cotización con los campos adicionales:
```text
Hola Jardines Urbanos 🌿, vengo de la web (Calculadora de Grama).

📐 *Cotización de Calculadora:*
• Producto/Variedad: Grama Zoysia Toro
• Área estimada: 263 m² (incluye +5% merma)
• Escenario: Jardín / PH (Pleno Sol)
• Ubicación de entrega: Costa del Este, Panamá
• ¿Requiere instalación?: Suministro e Instalación

[Ref: Google Ads / Campaña Grama Verano]
```

#### D. Evento Analítico en el DataLayer (Disparado previo al redireccionamiento)
```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'whatsapp_lead_click',
  lead_channel: 'whatsapp',
  product_category: title,
  grass_variety: title,
  area_m2: gross,
  delivery_location: location || 'No especificada',
  utm_source: utmSource || 'Web Directo',
  page_path: window.location.pathname
});
```

---

## 2. Especificaciones del Catálogo Botánico Nativo

### 2.1 Taxonomía de Categorías y Filtros
El catálogo debe operar de manera 100% nativa en el dominio (eliminando el enlace roto `tiiny.site` 404), organizándose bajo las siguientes 4 categorías principales:

1. **`grama` — Gramas Naturales de Finca (3 variedades certificadas):**
   - Zoysia Toro
   - Zoysia Japónica
   - San Agustín
2. **`palma` — Palmas Ornamentales (5 variedades principales de alto porte):**
   - Palma Real de Finca (*Roystonea regia*)
   - Bismarckia (*Bismarckia nobilis*)
   - Cola de Zorro (*Wodyetia bifurcata*)
   - Areca (*Dypsis lutescens*)
   - Robellini (*Phoenix roebelenii*)
   *(Variedades adicionales en inventario: Palma Viajera, Carpentaria, Coco Plumoso, Raphia, Phoenix canariensis).*
3. **`arbol` — Árboles Nativos, de Sombra y Reforestación + Plantas de Jardinería:**
   - **Árboles:** Casco de Vaca (*Bauhinia*), Neem (*Azadirachta indica*), Amador, Guayacán (*Handroanthus chrysanthus*), Roble (*Tabebuia rosea*), Corotú (*Enterolobium cyclocarpum*), Cedro Amargo, Flamboyán, Árbol preparado para trasplante.
   - **Plantas Ornamentales:** Monstera (*Monstera deliciosa*), Xanadu (*Philodendron xanadu*), Ginger Variegado, Croto, Jazmín Estrella, Dianela, Copete, Calathea Bijao.
4. **`b2b` — Hidrosiembra y Agroexportación / Pitahaya:**
   - Servicio Mecanizado de Hidrosiembra (Taludes, minería, vías públicas).
   - Finca de Pitahaya (7 hectáreas en producción en Río Grande, Coclé).

---

### 2.2 Inventario de Especies Verificadas y Asociación Fotográfica Real

| Nombre Común | Nombre Científico | Categoría | Archivo Fotográfico Real (`01_sitio_oficial/`) | Dimensiones Originales | Atributos Fisiológicos Verificados |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Grama Zoysia Toro** | *Zoysia japonica 'Toro'* | `grama` | `TORO-CLOSEUP-1.jpg`<br>`TORO-ZOOM.jpg`<br>`SAE-PARA-COSECHA_mision.jpg` | $1440 \times 1920$<br>$1440 \times 1920$<br>$780 \times 900$ | ☀️ Sol Directo • 🐾 Máxima resistencia pisoteo • Hoja media • Uso residencial y canchas deportivas. |
| **Grama Zoysia Japónica** | *Zoysia japonica* | `grama` | `JAPONESA-PROYECTO.jpg`<br>`JAPONESA-CLOSEUP.jpg` | $1920 \times 1440$<br>$1280 \times 1920$ | ☀️ Pleno Sol • 🏖️ Máxima tolerancia salina y costera • Hoja fina • Raíces profundas resistentes a sequía. |
| **Grama San Agustín** | *Stenotaphrum secundatum* | `grama` | `SAN-AGUSTIN-HEADER.jpg`<br>`SAN-AGUSTIN-CLOSEUP.jpg`<br>`TARIMAS-SAN-AGUSTIN.jpg` | $1632 \times 1224$<br>$1920 \times 1440$<br>$1632 \times 1224$ | ⛅ Sombra Parcial • ☀️ Sol • Hoja ancha verde-azulado • Césped denso y ornamental para residencias. |
| **Palma Real en Finca** | *Roystonea regia* | `palma` | `PALMA-REAL-FINCA.jpg` | $1632 \times 1224$ | ☀️ Sol directo • Porte monumental • Tronco liso anillado • Ideal avenidas, urbanismo y PHs. |
| **Palma Bismarckia** | *Bismarckia nobilis* | `palma` | `BISMARKIA.jpg` | $1440 \times 1920$ | ☀️ Pleno Sol • Hojas en abanico color azul plateado • Alta resistencia a la sequía y viento. |
| **Palma Cola de Zorro** | *Wodyetia bifurcata* | `palma` | `COLA-DE-ZORRO.jpg` | $1280 \times 960$ | ☀️ Sol / Semisombra • Follaje plumoso elegante • Muy usada en paisajismo residencial y piscinas. |
| **Palma Areca** | *Dypsis lutescens* | `palma` | `ARECA.jpg` | $1877 \times 1920$ | ⛅ Semisombra / Sol filtrado • Múltiples tallos dorados • Excelente seto divisorio y cortina vegetal. |
| **Casco de Vaca** | *Bauhinia purpurea / variegata* | `arbol` | `CASCO-DE-VACA.jpg` *(Media WP)* | $1440 \times 1920$ | ☀️ Sol directo • Floración ornamental llamativa • Hojas bilobuladas • Árbol urbano de sombra moderada. |
| **Árbol de Neem** | *Azadirachta indica* | `arbol` | `NEEM.jpg` | $1440 \times 1920$ | ☀️ Pleno Sol • Crecimiento rápido • Resistencia extrema a sequía • Propiedades repelentes naturales. |
| **Árbol Preparado** | Varios nativos | `arbol` | `ARBOL-PREPARADO.jpg` | $1440 \times 1920$ | Cepellón preparado en vivero para trasplante con alta tasa de sobrevivencia en obra. |
| **Monstera** | *Monstera deliciosa* | `arbol`/`planta` | `MONSTERA.jpg` | $1440 \times 1920$ | ⛅ Sombra / Luz indirecta • Hojas perforadas de lujo • Interior, terrazas y jardines tropicales protegidos. |
| **Xanadu** | *Philodendron xanadu* | `arbol`/`planta` | `XANADU.jpg` | $1440 \times 1920$ | ⛅ Media sombra • Porte compacto • Hojas lobuladas brillantes • Cobertura densa de jardineras. |
| **Ginger Variegado** | *Alpinia zerumbet variegata* | `arbol`/`planta` | `GINGER-VARIEGADO.jpg` | $1920 \times 1684$ | ⛅ Semisombra • Follaje rayado verde y amarillo • Acento de color en jardines residenciales y corporativos. |
| **Croto** | *Codiaeum variegatum* | `arbol`/`planta` | `CROTO.jpg` | $1576 \times 1920$ | ☀️ Sol / Semisombra • Hojas coriáceas policromáticas (rojo, amarillo, naranja, verde). |
| **Jazmín Estrella** | *Trachelospermum jasminoides* | `arbol`/`planta` | `JAZMIN-ESTRELLA.jpg` | $1440 \times 1920$ | ☀️ Sol / Semisombra • Enredadera/cubresuelos • Flores blancas fragantes. |
| **Hidrosiembra Vial** | Mezcla agronómica JUSA | `b2b` | `HIDROSIEMBRA-MAQUINA.jpg` | $1920 \times 1440$ | ⛰️ Taludes y obras civiles • Control de erosión • Equipo hidrosembrador con marca corporativa en obra. |
| **Cultivo de Pitahaya** | *Selenicereus undatus* | `b2b` | `Pitahaya2.jpg`<br>`DJI_0677-Mejorado-NR.jpg` | $1440 \times 1920$<br>$1920 \times 1080$ | ☀️ Sol tropical • 7 hectáreas en Río Grande, Coclé • Cultivo agroindustrial para mercado local y exportación. |

---

## 3. Directrices de Integridad de Datos y Protocolo `[DATO PENDIENTE DEL CLIENTE]`

### 3.1 Hechos Verificados de Jardines Urbanos, S.A.
Solo los siguientes datos se consideran hechos verídicos comprobados en las fuentes autoritativas:
1. **Razón Social:** Jardines Urbanos, S.A. (abreviado JUSA).
2. **Trayectoria:** Fundada en **1999** (+25 años de experiencia continuada en Panamá).
3. **Slogan de Marca:** *"¡Vestimos de verde a Panamá!"*.
4. **Instalaciones Agrícolas:** Fincas propias de cultivo en **Carretera Interamericana, Km 168, Río Grande, Provincia de Coclé** (Coordenadas geográficas: `8.4293° N, 80.4960° W`).
5. **Oficina en Ciudad de Panamá:** Calle 64 Este, San Francisco / Ciudad de Panamá.
6. **Teléfonos Oficiales:** Fijo `(+507) 226-0494` y WhatsApp Comercial `(+507) 6539-0949`.
7. **Correos Electrónicos Oficiales:** `ventas@jardinesurbanos.com` (Ventas y paisajismo) y `xavier@jardinesurbanos.com` (Pitahaya y agroexportación).
8. **Capacidad Productiva:**
   - Cultivo de gramas naturales en rollo: Zoysia Toro, Zoysia Japónica y San Agustín.
   - Equipo hidrosembrador mecanizado propio para obras de infraestructura y control de erosión.
   - 7 hectáreas dedicadas al cultivo de Pitahaya en Coclé.
   - Vivero de palmas maduras (Palma Real, Bismarckia, Areca, Cola de Zorro) y árboles nativos.

---

### 3.2 Campos y Datos No Verificados que Requieren `[DATO PENDIENTE DEL CLIENTE]`

Para mantener el más riguroso estándar de integridad exigido en el requerimiento R3, se prohíbe taxativamente inventar datos numéricos, precios o testimonios falsos. Se deben usar los siguientes marcadores exactos:

1. **Precios Unitarios de Productos e Instalación:**
   - Precio por $m^2$ de Grama Zoysia Toro: `[DATO PENDIENTE DEL CLIENTE]` *(Se cotiza a través de WhatsApp / Asesoría técnica)*.
   - Precio por $m^2$ de Grama San Agustín: `[DATO PENDIENTE DEL CLIENTE]`.
   - Precio por $m^2$ de Grama Zoysia Japónica: `[DATO PENDIENTE DEL CLIENTE]`.
   - Precio unitario por $m^2$ de Hidrosiembra: `[DATO PENDIENTE DEL CLIENTE]` *(Varía según pendiente, tipo de suelo y distancia desde Coclé)*.
   - Flete de transporte desde Río Grande: `[DATO PENDIENTE DEL CLIENTE]`.

2. **Datos Legales y Societarios Específicos:**
   - Número de RUC y Dígito Verificador (DV) de la sociedad: `[DATO PENDIENTE DEL CLIENTE]`.
   - Horario de atención al público en oficinas de Ciudad de Panamá: `[DATO PENDIENTE DEL CLIENTE]`.

3. **Métricas y Estadísticas Cuantitativas No Sustentadas:**
   - Total exacto de hectáreas de toda la finca (salvo las 7 Ha de Pitahaya): `[DATO PENDIENTE DEL CLIENTE]`.
   - Metros cuadrados totales históricos instalados (ej. evitar "más de 1,000,000 m²" a menos que JUSA lo certifique): utilizar *"Líderes en suministro para proyectos residenciales, PHs y obras viales en todo Panamá"* o marcar `[DATO PENDIENTE DEL CLIENTE]`.
   - Porcentaje de satisfacción de clientes: No colocar números inventados (ej. "99.9%").

4. **Testimonios y Nombres de Clientes:**
   - Citas testimoniales atribuidas a clientes o arquitectos específicos: No inventar nombres ni empresas ficticias. Usar casos descriptivos genéricos (ej. *"Estabilización de talud vial en Panamá Oeste - 3,400 m²"*) o colocar `[DATO PENDIENTE DEL CLIENTE]`.
   - Logos corporativos de constructoras o entidades de gobierno (ej. MOP, Minera, Odebrecht): No colocar logos de terceros sin previa autorización escrita de Jardines Urbanos.

5. **Claves de Infraestructura y Analytics:**
   - ID de medición Google Analytics 4 (`G-XXXXXXXXXX`): `[DATO PENDIENTE DEL CLIENTE]`.
   - Contenedor Google Tag Manager (`GTM-XXXXXXX`): `[DATO PENDIENTE DEL CLIENTE]`.
   - ID de inquilino de Microsoft 365 para registro CNAME DKIM (`<tenant>.onmicrosoft.com`): `[DATO PENDIENTE DEL CLIENTE]`.

---

## 4. Requerimientos de Metadatos SEO, OpenGraph y Schema.org JSON-LD

### 4.1 Arquitectura de Metadatos por Ruta Canónica

| URL Canónica | Idioma | Title Tag (< 60 caracteres) | Meta Description (140–155 caracteres) | H1 Semántico Único |
| :--- | :--- | :--- | :--- | :--- |
| `https://jardinesurbanos.com/` | `es-PA` | `Jardines Urbanos \| Gramas Naturales, Vivero e Hidrosiembra en Panamá` | Productores líderes desde 1999 en Río Grande, Coclé. Venta de grama natural Zoysia Toro, Japónica y San Agustín, hidrosiembra de taludes y vivero en Panamá. | `Del cultivo en nuestras fincas a tu proyecto en todo Panamá.` |
| `https://jardinesurbanos.com/gramas-naturales-panama/` | `es-PA` | `Venta de Grama Natural en Panamá: Zoysia Toro y San Agustín \| M²` | Cotiza grama natural en rollo directamente de nuestras fincas en Coclé. Variedades Zoysia Toro, San Agustín y Japónica para casas, playas y proyectos en Panamá. | `Venta y Suministro de Grama Natural Certificada en Panamá` |
| `https://jardinesurbanos.com/hidrosiembra-control-erosion-panama/` | `es-PA` | `Hidrosiembra y Control de Erosión de Taludes en Panamá \| JUSA` | Servicio especializado de hidrosiembra para estabilización de taludes, proyectos viales, minería e infraestructura civil en Panamá con maquinaria propia. | `Hidrosiembra y Estabilización Mecanizada de Taludes en Panamá` |
| `https://jardinesurbanos.com/vivero-plantas-palmas-arboles/` | `es-PA` | `Vivero en Panamá: Palmas, Árboles Nativos y Plantas Ornamentales` | Catálogo botánico de cultivo propio en Coclé: Palma Real, Bismarckia, Cola de Zorro, árboles nativos para reforestación y plantas ornamentales para PHs. | `Catálogo Botánico Vivo de Palmas, Árboles y Plantas de Vivero` |
| `https://jardinesurbanos.com/calculadora-de-grama/` | `es-PA` | `Calculadora de Grama por M² y Recomendador Climático \| Panamá` | Calcula los metros cuadrados exactos de grama o hidrosiembra para tu terreno en Panamá con un 5% de merma y cotiza directo por WhatsApp en segundos. | `Calculadora Inteligente de Grama Natural e Hidrosiembra` |
| `https://jardinesurbanos.com/productores-pitahaya-panama/` | `es-PA` | `Productores de Pitahaya en Panamá \| Finca en Río Grande, Coclé` | Cultivo agroindustrial de fruta del dragón (Pitahaya) en Río Grande, Coclé. 7 hectáreas de producción de alta calidad para mercado nacional y exportación. | `Productores de Pitahaya de Alta Calidad en Río Grande, Coclé` |
| `https://jardinesurbanos.com/contacto/` | `es-PA` | `Contacto y Cotizaciones \| Jardines Urbanos Panamá` | Contáctanos al +507 6539-0949 o ventas@jardinesurbanos.com. Finca en Río Grande, Coclé y despacho a nivel nacional en Panamá. | `Contáctanos y Cotiza con Nuestros Especialistas Agrícolas` |
| `https://jardinesurbanos.com/politica-de-privacidad/` | `es-PA` | `Política de Privacidad y Protección de Datos (Ley 81) \| JUSA` | Cumplimiento de la Ley 81 de 2019 de la República de Panamá sobre protección de datos personales en Jardines Urbanos, S.A. | `Política de Privacidad y Protección de Datos Personales` |

---

### 4.2 Código Completo JSON-LD Schema.org (Validado para Inyección en `<head>`)

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
      "description": "Empresa panameña fundada en 1999 especializada en la producción industrial y venta de grama natural (Zoysia Toro, San Agustín, Zoysia Japónica), servicios de hidrosiembra para control de erosión de taludes, vivero de palmas ornamentales, árboles nativos, paisajismo integral y cultivo de pitahaya.",
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
              "description": "Grama natural en rollo de alta resistencia al tráfico continuo y sol, ideal para residencias, áreas comunes de PH y campos deportivos en Panamá.",
              "brand": { "@type": "Brand", "name": "Jardines Urbanos" }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Grama San Agustín (Stenotaphrum secundatum)",
              "description": "Grama natural en rollo de hoja ancha, óptima para zonas con sombra parcial y proyectos residenciales en Panamá.",
              "brand": { "@type": "Brand", "name": "Jardines Urbanos" }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Grama Zoysia Japónica (Zoysia spp.)",
              "description": "Grama natural de textura fina con máxima resistencia a la salinidad de costas, brisa marina y sequía en casas de playa en Panamá.",
              "brand": { "@type": "Brand", "name": "Jardines Urbanos" }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Servicio de Hidrosiembra y Control de Erosión de Taludes",
              "description": "Aplicación mecanizada de semillas, mulch de fibra, fertilizantes y fijadores orgánicos para control de erosión y revegetación en taludes y obras viales en Panamá."
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

### 4.3 Etiquetas OpenGraph y Twitter Cards
Cada plantilla HTML debe incluir el bloque homologado:
```html
<!-- OpenGraph / Facebook / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_PA" />
<meta property="og:site_name" content="Jardines Urbanos, S.A." />
<meta property="og:title" content="Jardines Urbanos | Gramas Naturales, Vivero e Hidrosiembra en Panamá" />
<meta property="og:description" content="Productores líderes desde 1999 en Río Grande, Coclé. Venta de grama natural Zoysia Toro, Japónica y San Agustín, hidrosiembra de taludes y vivero en Panamá." />
<meta property="og:url" content="https://jardinesurbanos.com/" />
<meta property="og:image" content="https://jardinesurbanos.com/wp-content/uploads/2025/09/SAE-PARA-COSECHA_mision.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Cosecha de Grama Natural en Fincas de Río Grande, Coclé - Jardines Urbanos" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Jardines Urbanos | Gramas Naturales, Vivero e Hidrosiembra en Panamá" />
<meta name="twitter:description" content="Productores líderes desde 1999 en Río Grande, Coclé. Venta de grama natural Zoysia Toro, Japónica y San Agustín, hidrosiembra de taludes y vivero en Panamá." />
<meta name="twitter:image" content="https://jardinesurbanos.com/wp-content/uploads/2025/09/SAE-PARA-COSECHA_mision.jpg" />
```

---

## 5. Requerimientos de Seguridad HTTP, Cumplimiento y Correo

### 5.1 Cabeceras de Seguridad y Reglas de Bloqueo (.htaccess)
```apache
<IfModule mod_headers.c>
  # 1. Ocultar huellas técnicas del servidor y PHP
  Header unset X-Powered-By
  Header always unset X-Powered-By

  # 2. Strict Transport Security (HSTS)
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

  # 3. Prevención de MIME-Sniffing
  Header always set X-Content-Type-Options "nosniff"

  # 4. Prevención de Clickjacking
  Header always set X-Frame-Options "SAMEORIGIN"

  # 5. Política de Referrer
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # 6. Política de Permisos del Navegador
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# 7. Bloqueo de archivos sensibles y vectores comunes de ataque
<FilesMatch "^(xmlrpc\.php|readme\.html|license\.txt|wp-config-sample\.php)$">
  Require all denied
</FilesMatch>

# 8. Bloqueo de enumeración de usuarios (?author=1)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{QUERY_STRING} author=\d+ [NC]
  RewriteRule ^ - [F,L]
</IfModule>
```

### 5.2 Autenticación de Correo Microsoft 365 (DNS SPF, DKIM, DMARC)
Para resolver la vulnerabilidad actual de caída en SPAM de correos hacia `ventas@` y `xavier@jardinesurbanos.com`:

| Tipo de Registro | Host / Nombre | Valor Exacto Configurado | Propósito Técnico |
| :--- | :--- | :--- | :--- |
| `TXT` | `@` | `v=spf1 include:spf.protection.outlook.com -all` | Autentica a Microsoft 365 como remitente exclusivo autorizado. |
| `CNAME` | `selector1._domainkey` | `selector1-jardinesurbanos-com._domainkey.[DATO PENDIENTE DEL CLIENTE].onmicrosoft.com` | Firma criptográfica DKIM primaria. |
| `CNAME` | `selector2._domainkey` | `selector2-jardinesurbanos-com._domainkey.[DATO PENDIENTE DEL CLIENTE].onmicrosoft.com` | Rotación de clave criptográfica DKIM secundaria. |
| `TXT` | `_dmarc` | `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@jardinesurbanos.com; adkim=r; aspf=r;` | Política DMARC de aislamiento de suplantaciones y garantía de bandeja de entrada. |

### 5.3 Cumplimiento Legal con la Ley 81 de 2019 de Panamá (Protección de Datos)
1. **Casilla de Verificación Obligatoria (*Opt-In* Explícito):**
   ```text
   [ ] Acepto el tratamiento de mis datos personales por parte de Jardines Urbanos, S.A. para recibir cotizaciones y seguimiento comercial conforme a la Política de Privacidad (Ley 81 de Panamá).
   ```
2. **Plazos Legales para Ejercicio de Derechos ARCO:**
   - Acceso a datos personales: Máximo 10 días hábiles.
   - Rectificación, Cancelación y Oposición: Máximo 5 días hábiles.
   - Canal oficial de tramitación: `ventas@jardinesurbanos.com`.

---

Este informe documenta el 100% de la lógica técnica, fórmulas matemáticas, inventario botánico, reglas de integridad de datos y directrices de ingeniería necesarias para la construcción del prototipo interactivo en `site/`.
