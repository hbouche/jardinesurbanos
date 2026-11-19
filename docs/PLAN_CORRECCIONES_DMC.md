# Plan de correcciones: revisión DMC (noviembre 2026)

Fuente: "Jardines Urbanos · Revisión del sitio web demo" (DMC, 28 láminas).
Base revisada: `origin/main` @ 6b6e398. El sitio está en `site/`: `index.html` y 7 páginas en `site/pages/`.

> El header, el cintillo, el menú móvil y el footer están **duplicados en los 8 HTML**, con un `<style>` inline repetido. Cualquier cambio global hay que hacerlo 8 veces.

---

## Estado verificado en el código

| Punto del PDF | Estado en el repo | Dónde |
|---|---|---|
| "B2B" en textos, URL y título | Sigue | Unas 120 apariciones; archivo `pages/b2b-hidrosiembra.html`; `<title>` "Jardines Urbanos B2B"; enlazado en los 8 menús |
| "Residencial / B2C" | Sigue | `index.html:1334`, `pages/calculadora.html:805`, `js/main.js:201` |
| "Km 168" en la franja de cifras | Sigue | `index.html:1033` (también en la dirección y el footer de varias páginas) |
| "Rio Grande" sin tilde | Sigue | Cintillo de `index`, `residencial` y `comercial` (`comercial.html:362` también en el footer) |
| "Desde nuestras fincas en el Fincas propias…" | Sigue | `index.html:1704` |
| "Robellini" | Sigue | `index.html:1189` |
| "Jardín / PH" y "2,000 m² (PH)" | Sigue | `index.html:1237, 1269`, `calculadora.html:726`; Comercial dice "Urbanismo / PH" |
| "Talud inclinado" en Residencial | Sigue | `residencial.html:901` |
| "Ver portal de ingeniería" | Sigue | `index.html` (hero) |
| "R.U.C.:" sin número | Sigue | `index.html:1775` |
| Redes a instagram.com, facebook.com… genéricos | Sigue | Cintillo y menú móvil de las 8 páginas; no hay redes en el footer |
| Valla, 1: Inicio sobre "Nosotros" | Sigue | `index.html:1679-1680`: decor `headerimage_jardinesurbanos.png` y `headerimage2_…png` |
| Valla, 2: video de producción | Sigue | `video_finca_dron_cocle.mp4` (`index.html:1132`, `nosotros.html:1156`) |
| Valla, 3: hero de Nosotros | Sigue | `nosotros.html:999`, `valla_oficial_dron_cocle.jpg` |
| Logo PNG de 290×82 | Sigue | `logo_white_290X82px.png` y `logo_290X82px.png`; sin SVG; **sin `<link rel="icon">`** aunque los íconos existen en `assets/img/decor/cropped-icon_*` |
| Fotos que no cargan | Causa encontrada | Los archivos existen; son JPG de unos 1 MB con `loading="lazy"` dentro de carruseles horizontales. En la prueba local: 0 rotas en desktop y 21 sin cargar en móvil. `assets/img` pesa 78 MB y `assets/video` 22 MB. |
| Mayúscula en cada palabra | Sigue | Todas las páginas menos Comercial (ver los h1/h2) |
| "&" en títulos | Sigue | Contacto ("Canales de Contacto & Fincas", "Formulario de Contacto & Cotización"), Catálogo ("Finca & Vivero"), etiquetas pequeñas ("TRADICIÓN FAMILIAR & ORGULLO…") |
| 5,000 frente a 3,500 m²/día | Sigue | `index.html:1037`, `b2b-hidrosiembra.html:7, 1016` frente a `:853` |
| 7 ha tecnificadas | Sigue | `index.html:975, 1118`, `nosotros.html:1072`, `js/catalog.js:868` |
| Adjetivos (majestuoso, monumental, insuperable) y "SAE" | Sigue | `index.html`, `js/catalog.js`, `assets/media_manifest.*` |
| "100% de arraigo", "98%", MiAmbiente, 24 h | Sigue | `nosotros.html:1075`, `b2b-hidrosiembra.html`, `js/calculator.js`, `js/catalog.js` |
| GA4 y píxel de Meta | No existen | No hay `gtag` ni `fbq` |
| Página de política de datos (Ley 81) | No existe | El aviso está en los formularios, pero no enlaza a ninguna página |
| URLs con ".html" | Sigue | Unos 250 enlaces internos |
| Largo de Inicio | Confirmado | 15.8 pantallas en desktop y 19.9 en móvil |
| 4 calculadoras | Confirmado | `index`, `residencial`, `comercial` y `calculadora` |

Material de Drive: es idéntico a `Originales Julio/` del repo (182 fotos y videos, 3 videos y `Logo/LOGOJUSA.ai`). El `.ai` es compatible con PDF, así que se pueden exportar SVG y PNG desde él.

---

## Fase 0: Preparación (base técnica). HECHA
1. ✅ **Header, cintillo, menú móvil y footer unificados** en `site/_partials/` e inyectados con `scripts/build_partials.py` (`npm run build` / `npm run check`). Ver `site/_partials/LEEME.md`.
   - Las 8 páginas usan ahora el footer de Inicio (4 columnas) y el menú móvil de Inicio (WhatsApp y teléfono).
   - El footer ya tiene redes. Las URLs están en un solo lugar (`paginas.json` > `redes`).
   - Se quitó del footer la etiqueta "R.U.C.:" sin número y el **RUC inventado** que mostraba Nosotros ("RUC 1421-23-45678 DV 90").
   - También salió la "fórmula de merma" en código que aparecía en el footer de Calculadora.
   - El `<style>` inline idéntico de 5 páginas pasó a `css/paginas-internas.css`. Inicio, Nosotros y Comercial conservan el suyo, que es distinto en cada una; se consolida en la Fase 3.
2. ✅ Capturas de referencia en `docs/qa/antes/` (desktop y móvil, las 8 páginas). Para repetirlas: `npm run capturas`.
3. ✅ **Logos** generados desde `LOGOJUSA.ai` con `scripts/generar_logos.py`, en `site/assets/img/brand/`:
   - Horizontal y apilado, en verde y en blanco (SVG).
   - Símbolo y favicons de 32, 180, 192 y 512 px.
   - El `.ai` solo trae la versión apilada; la horizontal se recompuso con sus vectores. **Conviene que el diseñador la valide.**
   - Ya se usan en el header, el menú móvil, el footer y el favicon. Las imágenes de logo dentro del contenido (por ejemplo, la tarjeta clara de Nosotros en Inicio) se cambian en la Fase 2.
4. ⏸ Limpieza del repo: `Originales Julio/` (unos 800 MB) y `scratch/` están en `.gitignore` pero commiteados. **Pendiente de decisión**, no se tocó.

Tests existentes: calculadora, catálogo y milestone3 (184 en total) pasan. `test_runtime_dom_sim.js`, `test_e2e_comprehensive.*` y `test_milestone1_verification.py` ya fallaban antes de los cambios porque usan rutas de Windows o Edge, o no tienen el DOM simulado.

## Fase 1: Texto y errores (no requiere decisiones del cliente). HECHA
Estado: aplicada en las 8 páginas, los parciales y el JS (calculadora, catálogo, main).
- Unos 300 textos pasaron a tipo oración.
- Las etiquetas en versalitas (insignias, "eyebrows", títulos del footer) siguen en mayúsculas porque así lo pone el CSS (`.badge`, `.section-eyebrow`, `.footer-heading`). El texto de origen ya está en tipo oración, así que pasarlas a minúsculas es quitar un `text-transform` del CSS.
- No queda ningún "&" en textos visibles, ni "B2B" o "B2C" visibles (la URL `/b2b-hidrosiembra` se cambia en la Fase 4).
- "Km 168" solo queda en direcciones. La franja de cifras ahora dice "Río Grande · Fincas propias en Coclé".
- Se quitó "Talud inclinado" de la calculadora de Residencial.
- Se corrigió que esa calculadora arrancaba con 180 m² pero mostraba el resultado de 250.
- Tests de calculadora, catálogo y milestone3 actualizados a los textos nuevos: todos pasan.

Pendiente para la Fase 5, porque requiere datos del cliente: las cifras "5,000 m²/día" y "100% adaptación genética" de la franja.

Detalle de lo que pedía la fase:
1. Tipo oración en títulos, subtítulos, botones, etiquetas y footer, con Comercial como modelo. Los nombres de variedad no cambian.
2. "&" por "y" en títulos y etiquetas pequeñas.
3. Correcciones puntuales: "Río Grande"; quitar "en el Fincas propias…"; "Roebelenii"; "Jardín / residencial" en lugar de "Jardín / PH" y "2,000 m² (PH)"; quitar "Talud inclinado" de Residencial; quitar "Ver portal de ingeniería".
4. Cifra "Km 168" de la franja cambiada por "Fincas propias Río Grande, Coclé". La dirección postal puede conservar el Km.
5. Quitar "B2B" y "B2C" de los textos visibles y los títulos. "Residencial / B2C" pasa a "Residencial".
6. Moderar los adjetivos y aclarar "SAE". Dejar la jerga (BoQ, MOP, slurry) solo en Hidrosiembra.

## Fase 2: Forma (contraste, valla, logos y fotos). HECHA
Estado:
- **Contraste:** `node scripts/contraste.js [desktop|movil]` → 0 textos por debajo de 4.5:1. Solo queda el separador decorativo "|" del cintillo.
  - Causa de los bloques negros de "Paso 1/2/3": el CSS usaba `--color-lime` y `--radius-full` sin definirlas.
  - Verde WhatsApp de los botones: `#15803D` (5:1). El oficial `#25D366` daba 2:1 con texto blanco.
  - Terracota: `#B8560A` (4.8:1). La original `#FA7D09` daba 2.6:1.
  - Insignias con fondo sólido.
  - En móvil, las descripciones de la calculadora y las marcas del deslizador usaban un color pensado para fondo oscuro.
  - En la tarjeta de resultado de Comercial había texto oscuro sobre fondo oscuro.
- **Valla:** eliminada de los 3 lugares de DMC y de un 4.º que apareció en la revisión.
  - Las imágenes decorativas sobre "Nosotros", en Inicio y en Nosotros.
  - El video `video_finca_dron_cocle.mp4`, recortado desde el segundo 3.5 y con portada nueva (pasó de 3.4 MB a 1.5 MB).
  - El hero de Nosotros, que ahora usa una foto de cosecha mecanizada tomada de `Originales Julio/Grama5.jpg`.
  - La tarjeta "Equipo agronómico" de Inicio, que usaba `Nosotros1.jpg` (también era la valla).
- **Logos:** las tarjetas claras de Inicio y Nosotros usan `logo-horizontal-verde.svg`. Ya no se usa ningún PNG de 290 px.
- **Fotos:** `scripts/optimizar_imagenes.py` convirtió 145 imágenes a WebP (de 92 MB a 15.6 MB). Inicio pasó de 34.6 MB a 5.4 MB de imágenes en desktop y de 17.6 MB a 2.8 MB en móvil (`node scripts/peso_paginas.js`). Las primeras 6 tarjetas del catálogo cargan de inmediato. 0 imágenes rotas.
- **Marca de agua** (opción A):
  - Logo y "© Imagen propiedad de Jardines Urbanos, S.A." dentro del archivo.
  - Se aplicó a las fotos propias de `scripts/fotos_propias.txt`, que son 47.
  - No se aplicó a las referenciales ni a las fotos que se usan como fondo de hero, donde quedaría recortada. En algunas propias que también son hero (por ejemplo `HIDROSIEMBRA-MAQUINA`, `clusia_rosea_vivero`) queda sin marca. **Conviene que el cliente confirme la lista de fotos propias.**
  - Se quitaron las etiquetas "[Foto oficial finca JUSA]" y "© Propiedad de…". La etiqueta de "imagen referencial" se mantiene.

Detalle de lo que pedía la fase:
1. Contraste de 4.5:1 como mínimo: "Foto oficial finca JUSA", "Paso 1/2/3" (hoy son bloques negros), insignia del resultado, descripciones grises de la calculadora en móvil y marcas del deslizador.
2. **Valla fuera** de los 3 lugares: quitar los decor de `index.html:1679-1680`; en el hero de Nosotros poner una foto de la finca o la cosecha (de `Originales Julio/`); en el video, cambiar el inicio o la portada (`poster`) o elegir otro video.
3. Logos SVG en el header, el footer y el menú móvil, más el favicon. Logo verde en las tarjetas claras.
4. Fotos: convertir a WebP de 200 KB como máximo y usar carga inmediata en las primeras tarjetas de cada carrusel. Objetivo: Inicio por debajo de unos 3 MB.
5. Marca de agua: preparar el script para exportar las fotos propias con el logo y "© Imagen propiedad de Jardines Urbanos, S.A." en la esquina. Reemplaza la etiqueta "Foto oficial finca JUSA".

## Fase 3: Colores y estructura
1. Tokens nuevos: Salvia `#E3EDDB`, Menta `#F0F6EB` y Hoja `#CFE3BF`. Aplicarlos según la lámina 14: cifras en Salvia, video en Arena, Constructoras en Menta con botón terracota, resultado de la calculadora en blanco con borde Hoja, directorio en Salvia. El header, el cintillo y el footer siguen oscuros. El hero, más transparente.
2. **Inicio corto** en 8 bloques: hero, cifras, servicios, antes/después, 6 especies con botón al catálogo, botón a la calculadora, Nosotros en un párrafo con galería y contacto breve. Las 25 fichas y los 2 formularios salen de Inicio.
3. **Una sola calculadora** en `/calculadora`, con preselección por tipo de proyecto desde Residencial, Comercial e Hidrosiembra. Sacar "Calculadora" del menú.
4. Hero con un mensaje fijo en lugar de 4 rotativos. En móvil, texto más corto para que los botones se vean de inmediato.
5. Cambiar la foto del hero de Comercial (sale una carretera).

## Fase 4: Técnico y publicación
1. `b2b-hidrosiembra.html` pasa a `hidrosiembra`, actualizando los enlaces de las 8 páginas, el sitemap y el schema.
2. URLs sin ".html": carpetas con `index.html` o reglas del hosting.
3. GA4 y píxel de Meta con eventos `cotizar_residencial`, `cotizar_comercial`, `cotizar_hidrosiembra`, `whatsapp_click` y `calculadora_enviar`. **Requiere los IDs.**
4. Página `politica-de-datos` (Ley 81), enlazada desde todos los formularios y el footer.
5. Redes en el footer, con las URLs listas para reemplazar.

## Fase 5: Bloqueado, decide el cliente
Mientras no lleguen las respuestas, se deja preparado para activarlo con un interruptor.
- Precios visibles o no (25 fichas, `js/main.js` con "Est. total").
- Sección "Soluciones para constructoras… pliegos MOP".
- Capacidad de hidrosiembra (5,000 o 3,500 m²/día) y hectáreas (7 tecnificadas o 7 de pitahaya).
- Promesas: 100% de arraigo, 98% de escorrentía, 100% de adaptación, producción certificada, menos de 24 h, MOP y MiAmbiente. Sin respaldo, se suavizan con "hasta" o "en condiciones normales", o se quitan.
- Fotos reales de antes y después. Mientras no lleguen, se oculta la sección.
- Número de RUC y URLs de Instagram, LinkedIn, Facebook y YouTube.
- IDs de GA4 y Meta, y dominio propio.

## Fase 6: Control de calidad
Capturas en desktop y móvil de cada página, comparadas con las de la Fase 0. Verificar el contraste (axe o Lighthouse), que todas las imágenes cargan haciendo scroll en móvil, el peso de Inicio y el número de pantallas. Búsqueda final sin "B2B", "B2C", "Km 168" (en cifras), "Rio Grande", "&" en títulos ni "instagram.com" genérico. Ejecutar los tests de `tests/`.
