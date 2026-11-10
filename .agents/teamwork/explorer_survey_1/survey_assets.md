# Auditoría Integral de Activos Visuales y Matriz de Cobertura Botánica
**Proyecto:** Jardines Urbanos, S.A. (JUSA) — Rediseño Web 360° (Panamá)  
**Autor:** `explorer_survey_1`  
**Fecha:** 8 de noviembre de 2026  
**Directorios analizados:**  
- `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\` (`01_sitio_oficial\`, `02_referencias_externas\`, `INDICE_VISUAL.html`, `FUENTES.csv`, `LEEME_REFERENCIAS.txt`, `VERIFICACION.csv`)  
- `c:\Users\Usuario\Downloads\Jardines Urbanos\docs\media_inventory_site.csv`  

---

## 1. Resumen Ejecutivo

1. **Total de activos fotográficos reales verificados en disco:** **35 archivos de imagen**.
   - **33 imágenes oficiales descargadas de `https://jardinesurbanos.com/` (`imagenes/01_sitio_oficial/`):** Pertenecen legítimamente a las fincas de cultivo en Río Grande (Coclé), viveros, proyectos de paisajismo, maquinaria pesada de hidrosiembra, plantación de pitahaya y equipo humano de Jardines Urbanos, S.A. Todas cuentan con resolución media-alta (hasta 1920×1920 px) y verificación de integridad SHA-256.
   - **2 imágenes de referencia externa (`imagenes/02_referencias_externas/`):** Descargadas de *Jardinería Panamá* únicamente para estudio interno del encuadre de corte e instalación. **CRÍTICO:** NO corresponden a obras ni productos de JUSA y **NO deben publicarse bajo ninguna circunstancia como portafolio propio**.
2. **Total de ítems en la biblioteca multimedia WordPress (`docs/media_inventory_site.csv`):** **162 registros**.
   - De estos 162 registros, la biblioteca oficial en línea contiene referencias a **45 especies botánicas adicionales** (24 árboles nativos/ornamentales, 7 palmas y 14 plantas tropicales) que fueron catalogadas en el CMS de JUSA pero de las cuales solo 11 especies cuentan con fotografía individual descargada localmente en `01_sitio_oficial/`.
3. **Cobertura de Secciones Clave del Sitio Web con Fotografías Reales:**
   - **Gramas Naturales y Cosecha:** **100% cubierto** con fotografía real (Zoysia Toro, Zoysia Japónica, San Agustín, tarimas de despacho y máquina cosechadora).
   - **Hidrosiembra & Control de Erosión B2B:** **Cubierto** con foto real de maquinaria especializada sobre talud (`HIDROSIEMBRA-MAQUINA.jpg`).
   - **Agroexportación de Pitahaya (Coclé):** **100% cubierto** con toma aérea de dron (`DJI_0677-Mejorado-NR.jpg`) y foto de flor/fruto en campo (`Pitahaya2.jpg`).
   - **Equipo Humano y Fincas:** **100% cubierto** con 4 fotos de cuadrilla y operaciones (`Nosotros1.jpg` a `Nosotros4.jpg`).
4. **Brechas Visuales Identificadas que Requieren Mockups IA (`assets/mockups/`):**
   - **Pares de Comparador Antes / Después:** Talud erosionado vs. Talud estabilizado con hidrosiembra al día 35; Jardín residencial en tierra/obra vs. Jardín con Zoysia Toro instalada.
   - **Escenarios Visuales de la Calculadora de m²:** Proyecto en playa/alta salinidad (Buenaventura/Coronado) y área deportiva/alto tráfico en PH (Costa del Este).
   - **Especies Emblemáticas del Catálogo Botánico sin foto individual en local:** Árbol Guayacán (amarillo), Árbol Panamá (árbol nacional), Roble Sabanero (rosado), Flamboyán, Palma Viajera, Palma Coco Plumoso, Calathea Bijao y Ficus Lyrata.

---

## 2. Inventario Exhaustivo de Fotografía Real Disponible (35 Imágenes)

### 2.1 Archivos Oficiales de Jardines Urbanos, S.A. (`01_sitio_oficial/`) — 33 Imágenes

| # | Archivo | Dimensiones (px) | Aspecto | Orientación | Peso (Bytes) | Hash SHA-256 (Prefijo) | URL Original (WordPress JUSA) | Categoría | Ubicación Óptima Recomendada en el Prototipo |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `ARBOL-PREPARADO.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 940,576 | `5B0199FE...` | `.../2020/05/ARBOL-PREPARADO.jpg` | Vivero / Árboles | Catálogo Botánico y sección de Servicios de Arboricultura / Encepellonado |
| 2 | `ARECA.jpg` | 1877 × 1920 | 0.98 (~1:1) | Vertical | 1,494,404 | `4FA535FB...` | `.../2020/05/ARECA.jpg` | Vivero / Palmas | Catálogo Botánico (Filtro: Palmas / Semisombra / Interiores PH) |
| 3 | `BISMARKIA.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 735,718 | `1F802B47...` | `.../2020/05/BISMARKIA.jpg` | Vivero / Palmas | Catálogo Botánico (Filtro: Palmas / Sol Directo / Lujo Tropical) |
| 4 | `Catalogo_Main.jpg` | 1920 × 763 | 2.52 | Panorámica | 734,000 | `6F5529D5...` | `.../2025/06/Catalogo_Main.jpg` | Cabecera / Banner | Hero Banner principal del Catálogo Botánico Vivo (`/vivero-plantas-palmas-arboles/`) |
| 5 | `COLA-DE-ZORRO.jpg` | 1280 × 960 | 1.33 (4:3) | Horizontal | 335,469 | `D166D06B...` | `.../2020/05/COLA-DE-ZORRO.jpg` | Vivero / Palmas | Catálogo Botánico (Filtro: Palmas / Sol Directo / Avenidas PH) |
| 6 | `CROTO.jpg` | 1576 × 1920 | 0.82 | Vertical | 927,988 | `0ADD952B...` | `.../2020/05/CROTO.jpg` | Vivero / Plantas | Catálogo Botánico (Filtro: Plantas Ornamentales / Sol / Canteros) |
| 7 | `DJI_0677-Mejorado-NR.jpg` | 1920 × 1080 | 1.78 (16:9) | Horizontal | 1,050,256 | `559976E5...` | `.../2020/05/DJI_0677-Mejorado-NR.jpg` | Finca / Agro | Hero Banner de Pitahaya (`/productores-pitahaya-panama/`) y Showcase "Fincas en Coclé" |
| 8 | `GINGER-VARIEGADO.jpg` | 1920 × 1684 | 1.14 | Horizontal | 986,852 | `BA54C52D...` | `.../2020/05/GINGER-VARIEGADO.jpg` | Vivero / Plantas | Catálogo Botánico (Filtro: Plantas Ornamentales / Tropical Luxury) |
| 9 | `headerimage4_jardinesurbanos.jpg` | 1920 × 600 | 3.20 | Panorámica | 422,241 | `C6FF3785...` | `.../2020/08/headerimage4_jardinesurbanos.jpg` | Cabecera / Banner | Cabecera estándar de páginas secundarias (`/nosotros/`, `/contacto/`) |
| 10 | `HIDROSIEMBRA-MAQUINA.jpg` | 1920 × 1440 | 1.33 (4:3) | Horizontal | 609,362 | `B3111500...` | `.../2020/05/HIDROSIEMBRA-MAQUINA.jpg` | B2B / Hidrosiembra | Hero Banner y sección de equipos en `/hidrosiembra-control-erosion-panama/` |
| 11 | `IMG_8680.jpg` | 1844 × 1920 | 0.96 (~1:1) | Vertical | 658,566 | `9442E106...` | `.../2020/05/IMG_8680.jpg` | Proyectos / Jardín | Galería de Casos de Éxito Residenciales en `/proyectos-portafolio/` |
| 12 | `JAPONESA-CLOSEUP.jpg` | 1280 × 1920 | 0.67 (2:3) | Vertical | 704,642 | `5DD0236C...` | `.../2020/05/JAPONESA-CLOSEUP.jpg` | Gramas / Césped | Tarjeta de producto en `/gramas-naturales-panama/zoysia-japonica/` y Calculadora |
| 13 | `JAPONESA-PROYECTO.jpg` | 1920 × 1440 | 1.33 (4:3) | Horizontal | 589,152 | `675BA5F1...` | `.../2020/05/JAPONESA-PROYECTO.jpg` | Gramas / Proyectos | Showcase de Zoysia Japónica instalada en residencia y slider de proyectos |
| 14 | `JAZMIN-ESTRELLA.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 534,470 | `09F52FC3...` | `.../2020/05/JAZMIN-ESTRELLA.jpg` | Vivero / Plantas | Catálogo Botánico (Filtro: Trepadoras / Aromáticas / Cercas Vivas) |
| 15 | `MONSTERA.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 670,739 | `4167EEFC...` | `.../2020/05/MONSTERA.jpg` | Vivero / Plantas | Catálogo Botánico (Filtro: Interiores / Terrazas / Semisombra) |
| 16 | `NEEM.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 1,102,515 | `47A14F80...` | `.../2020/05/NEEM.jpg` | Vivero / Árboles | Catálogo Botánico (Filtro: Árboles / Sombra / Repelente Fitosanitario) |
| 17 | `Nosotros1.jpg` | 780 × 900 | 0.87 | Vertical | 255,158 | `990091E7...` | `.../2025/06/Nosotros1.jpg` | Institucional | Página `/nosotros/` (Bloque: Equipo Humano y Selección Botánica) |
| 18 | `Nosotros2.jpg` | 945 × 723 | 1.31 (4:3) | Horizontal | 181,665 | `BCEEF13F...` | `.../2025/06/Nosotros2.jpg` | Institucional | Página `/nosotros/` (Bloque: Infraestructura y Vivero en Coclé) |
| 19 | `Nosotros3.jpg` | 900 × 675 | 1.33 (4:3) | Horizontal | 271,004 | `37ED70CA...` | `.../2025/06/Nosotros3.jpg` | Institucional | Página `/nosotros/` y `/paisajismo-mantenimiento-areas-verdes/` (Cuadrilla en Sitio) |
| 20 | `Nosotros4.jpg` | 900 × 675 | 1.33 (4:3) | Horizontal | 283,037 | `FDA3A74B...` | `.../2025/06/Nosotros4.jpg` | Institucional | Página `/nosotros/` (Bloque: Aclimatación y Control de Calidad) |
| 21 | `PALMA-REAL-FINCA.jpg` | 1632 × 1224 | 1.33 (4:3) | Horizontal | 759,764 | `CBA1560F...` | `.../2020/05/PALMA-REAL-FINCA.jpg` | Vivero / Palmas | Hero de Palmas Ornamentales y Catálogo (Palma Real en producción propia) |
| 22 | `Pitahaya2.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 778,927 | `292B0B87...` | `.../2020/05/Pitahaya2.jpg` | Agro / Pitahaya | Ficha técnica y botánica en `/productores-pitahaya-panama/` |
| 23 | `Plantas_Main.jpg` | 1920 × 1079 | 1.78 (16:9) | Horizontal | 374,438 | `977D2CAB...` | `.../2020/05/Plantas_Main.jpg` | Vivero / General | Banner de categoría Plantas y fondo de sección en Home |
| 24 | `SAE-PARA-COSECHA_mision.jpg` | 780 × 900 | 0.87 | Vertical | 681,534 | `3E53821F...` | `.../2025/09/SAE-PARA-COSECHA_mision.jpg` | Maquinaria / Finca | Sección de respaldo agroindustrial: Cosechadora de rollos en Coclé |
| 25 | `SAN-AGUSTIN-CLOSEUP.jpg` | 1920 × 1440 | 1.33 (4:3) | Horizontal | 1,124,278 | `D6BD5D0E...` | `.../2020/05/SAN-AGUSTIN-CLOSEUP.jpg` | Gramas / Césped | Tarjeta de producto en `/gramas-naturales-panama/san-agustin/` y Calculadora |
| 26 | `SAN-AGUSTIN-HEADER.jpg` | 1632 × 1224 | 1.33 (4:3) | Horizontal | 436,802 | `7270AC04...` | `.../2020/05/SAN-AGUSTIN-HEADER.jpg` | Gramas / Finca | Encabezado de San Agustín y sección "Cultivos a Escala" |
| 27 | `slider-5-black.jpg` | 1920 × 1279 | 1.50 (3:2) | Horizontal | 595,210 | `69BD01F6...` | `.../2025/06/slider-5-black.jpg` | Proyectos / Hero | Slider interactivo #1 en Home y landing B2B |
| 28 | `slider-8-black.jpg` | 1920 × 1279 | 1.50 (3:2) | Horizontal | 723,659 | `CBAA31DC...` | `.../2025/06/slider-8-black.jpg` | Proyectos / Hero | Slider interactivo #2 en Home y proyectos comerciales |
| 29 | `slider-9-black.jpg` | 1920 × 1279 | 1.50 (3:2) | Horizontal | 537,117 | `E86B4387...` | `.../2025/06/slider-9-black.jpg` | Proyectos / Hero | Slider interactivo #3 en Home y landing residencial premium |
| 30 | `TARIMAS-SAN-AGUSTIN.jpg` | 1632 × 1224 | 1.33 (4:3) | Horizontal | 509,199 | `7F61CF2F...` | `.../2020/06/TARIMAS-SAN-AGUSTIN.jpg` | Logística / Despacho | Sección "Despacho a Nivel Nacional" y soporte de cotización por m² |
| 31 | `TORO-CLOSEUP-1.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 1,071,696 | `6898C51F...` | `.../2020/05/TORO-CLOSEUP-1.jpg` | Gramas / Césped | Tarjeta estelar en `/gramas-naturales-panama/zoysia-toro/` y Calculadora |
| 32 | `TORO-ZOOM.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 991,729 | `B98A94AD...` | `.../2020/05/TORO-ZOOM.jpg` | Gramas / Césped | Vista macro de densidad foliar en la ficha técnica de Zoysia Toro |
| 33 | `XANADU.jpg` | 1440 × 1920 | 0.75 (3:4) | Vertical | 765,963 | `6765CBF7...` | `.../2020/05/XANADU.jpg` | Vivero / Plantas | Catálogo Botánico (Filtro: Plantas / Bajo Mantenimiento / Borduras) |

---

### 2.2 Referencias Externas (`02_referencias_externas/`) — 2 Imágenes

> ⚠️ **REGLA DE INTEGRIDAD ESTRICTA (LEEME_REFERENCIAS.txt y FUENTES_EXTERNAS.csv):**  
> Estas dos imágenes proceden de *Jardinería Panamá*. **NO pertenecen a proyectos, cultivos ni contratos de Jardines Urbanos, S.A.** Se descargaron con fines exclusivos de benchmarking visual y encuadre técnico. **ESTÁ PROHIBIDO publicarlas en `site/` como trabajo propio de JUSA.**

| # | Archivo | Dimensiones (px) | Aspecto | Peso (Bytes) | Fuente Externa | Propósito Interno Permitido | Acción en el Proyecto |
|---|---|---|---|---|---|---|---|
| 34 | `referencia_instalacion_grama.jpg` | 800 × 800 | 1:1 Cuadrada | 788,606 | *Jardinería Panamá* (`jardineriapanama.com`) | Referencia del proceso de alineación y calce de rollos de césped en obra | **NO USAR EN SITIO WEB**. Generar mockup AI panameño (`assets/mockups/despues_instalacion_grama.jpg`) o usar cuadrilla de `Nosotros3.jpg`. |
| 35 | `referencia_rollo_grama.jpg` | 800 × 800 | 1:1 Cuadrada | 661,460 | *Jardinería Panamá* (`jardineriapanama.com`) | Referencia de grosor del pan de tierra y raíces en rollo comercial | **NO USAR EN SITIO WEB**. Utilizar fotos reales propias de JUSA: `TARIMAS-SAN-AGUSTIN.jpg` y `SAE-PARA-COSECHA_mision.jpg`. |

---

## 3. Clasificación Temática y Asignación de Roles Visuales en el Prototipo Staging

### 3.1 Gramas Naturales y Calculadora Interactiva de m²
- **Zoysia Toro (Tolerancia Pleno Sol + Tráfico Severo / Mascotas):**
  - Foto principal: `01_sitio_oficial/TORO-CLOSEUP-1.jpg` (Vertical 1440×1920).
  - Foto de detalle macro: `01_sitio_oficial/TORO-ZOOM.jpg` (Vertical 1440×1920).
  - Escenario residencial de aplicación: `01_sitio_oficial/slider-9-black.jpg` (Horizontal 1920×1279).
- **Zoysia Japónica (Resistencia Salina Playera + Estética Premium):**
  - Foto principal de variedad: `01_sitio_oficial/JAPONESA-CLOSEUP.jpg` (Vertical 1280×1920).
  - Foto de proyecto real en Panamá: `01_sitio_oficial/JAPONESA-PROYECTO.jpg` (Horizontal 1920×1440).
- **San Agustín (Tolerancia Media Sombra / Parques Arbolados):**
  - Foto de variedad textura: `01_sitio_oficial/SAN-AGUSTIN-CLOSEUP.jpg` (Horizontal 1920×1440).
  - Foto de campo de producción en Coclé: `01_sitio_oficial/SAN-AGUSTIN-HEADER.jpg` (Horizontal 1632×1224).
- **Logística, Cosecha en Finca y Despacho:**
  - Tarimas cargadas con rollos listos para flete: `01_sitio_oficial/TARIMAS-SAN-AGUSTIN.jpg` (Horizontal 1632×1224).
  - Máquina cosechadora de grama automatizada: `01_sitio_oficial/SAE-PARA-COSECHA_mision.jpg` (Vertical 780×900).

### 3.2 Hidrosiembra y Soluciones de Obra Civil B2B
- **Activo Fotográfico Real Crítico:** `01_sitio_oficial/HIDROSIEMBRA-MAQUINA.jpg` (Horizontal 1920×1440).
  - *Evidencia visual comprobada:* Muestra el camión hidrosembrador de JUSA trabajando sobre un corte de talud pronunciado, con manguera de alta presión y mulch vegetal.
  - *Ubicación en el sitio:* Cabecera y cuerpo de `/hidrosiembra-control-erosion-panama/`, tarjeta B2B en el Home ("Control de Erosión y Revegetación de Taludes") y sección de Fichas Técnicas para Licitaciones.

### 3.3 Agroexportación de Pitahaya (Río Grande, Coclé)
- **Activo Aéreo Panorámico:** `01_sitio_oficial/DJI_0677-Mejorado-NR.jpg` (Horizontal 16:9, 1920×1080).
  - *Evidencia visual comprobada:* Vista aérea de dron sobre las 7 hectáreas de espalderas de cultivo intensivo en Coclé.
  - *Ubicación en el sitio:* Hero principal de `/productores-pitahaya-panama/` y bloque de escala agroindustrial en el Home.
- **Activo de Fruto y Planta en Campo:** `01_sitio_oficial/Pitahaya2.jpg` (Vertical 1440×1920).
  - *Ubicación en el sitio:* Ficha de producto para exportación y compradores mayoristas en Panamá.

### 3.4 Vivero y Catálogo Botánico Vivo
- **Banner del Catálogo:** `01_sitio_oficial/Catalogo_Main.jpg` (Panorámica 1920×763).
- **Banner de Plantas:** `01_sitio_oficial/Plantas_Main.jpg` (16:9, 1920×1079).
- **Palmas Reales (Producción Propia en Coclé):** `01_sitio_oficial/PALMA-REAL-FINCA.jpg` (Horizontal 1632×1224).
- **Palmas Individuales Verificadas:** `ARECA.jpg` (1877×1920), `BISMARKIA.jpg` (1440×1920), `COLA-DE-ZORRO.jpg` (1280×960).
- **Árboles Individuales Verificados:** `ARBOL-PREPARADO.jpg` (1440×1920) y `NEEM.jpg` (1440×1920).
- **Plantas Ornamentales Tropicales Verificadas:** `MONSTERA.jpg`, `XANADU.jpg`, `CROTO.jpg`, `GINGER-VARIEGADO.jpg`, `JAZMIN-ESTRELLA.jpg` (Todas en 1440×1920 o 1920×1684).

### 3.5 Institucional, Cuadrillas y Experiencia (+25 Años)
- **Instalaciones y Vivero:** `Nosotros2.jpg` (945×723) y `Nosotros4.jpg` (900×675).
- **Equipo Humano y Cuadrilla en Campo:** `Nosotros1.jpg` (780×900) y `Nosotros3.jpg` (900×675).
- **Cabeceras Generales de Páginas:** `headerimage4_jardinesurbanos.jpg` (1920×600).
- **Showcase de Paisajismo de Autor:** `slider-5-black.jpg`, `slider-8-black.jpg`, `slider-9-black.jpg` (1920×1279 c/u) y `IMG_8680.jpg` (1844×1920).

---

## 4. Matriz de Cobertura Botánica: Fotos Reales vs. Brechas del Catálogo

A partir del cruce exhaustivo entre los 162 registros del WordPress oficial (`docs/media_inventory_site.csv`) y los 33 archivos descargados en `imagenes/01_sitio_oficial/`, se establece la siguiente matriz de disponibilidad:

### 4.1 Especies y Variedades con Fotografía Real Local (15 Ítems)
| Categoría Botánica | Nombre Común | Nombre Científico | Estado Fotográfico | Archivo Local Asignado |
|---|---|---|---|---|
| **Grama Natural** | Zoysia Toro | *Zoysia japonica 'Toro'* | ✅ Foto Real Local | `01_sitio_oficial/TORO-CLOSEUP-1.jpg`, `TORO-ZOOM.jpg` |
| **Grama Natural** | Zoysia Japónica | *Zoysia japonica* | ✅ Foto Real Local | `01_sitio_oficial/JAPONESA-CLOSEUP.jpg`, `JAPONESA-PROYECTO.jpg` |
| **Grama Natural** | San Agustín | *Stenotaphrum secundatum* | ✅ Foto Real Local | `01_sitio_oficial/SAN-AGUSTIN-CLOSEUP.jpg`, `SAN-AGUSTIN-HEADER.jpg` |
| **Palma** | Palma Real | *Roystonea regia* | ✅ Foto Real Local | `01_sitio_oficial/PALMA-REAL-FINCA.jpg` |
| **Palma** | Palma Areca | *Dypsis lutescens* | ✅ Foto Real Local | `01_sitio_oficial/ARECA.jpg` |
| **Palma** | Palma Bismarckia | *Bismarckia nobilis* | ✅ Foto Real Local | `01_sitio_oficial/BISMARKIA.jpg` |
| **Palma** | Palma Cola de Zorro | *Wodyetia bifurcata* | ✅ Foto Real Local | `01_sitio_oficial/COLA-DE-ZORRO.jpg` |
| **Árbol** | Árbol de Neem | *Azadirachta indica* | ✅ Foto Real Local | `01_sitio_oficial/NEEM.jpg` |
| **Árbol** | Árbol Preparado (Cepellón) | *Especies nativas encepellonadas* | ✅ Foto Real Local | `01_sitio_oficial/ARBOL-PREPARADO.jpg` |
| **Planta Ornamental** | Monstera Deliciosa | *Monstera deliciosa* | ✅ Foto Real Local | `01_sitio_oficial/MONSTERA.jpg` |
| **Planta Ornamental** | Philodendron Xanadú | *Thaumatophyllum xanadu* | ✅ Foto Real Local | `01_sitio_oficial/XANADU.jpg` |
| **Planta Ornamental** | Crotón Petro | *Codiaeum variegatum* | ✅ Foto Real Local | `01_sitio_oficial/CROTO.jpg` |
| **Planta Ornamental** | Ginger Variegado | *Alpinia zerumbet 'Variegata'* | ✅ Foto Real Local | `01_sitio_oficial/GINGER-VARIEGADO.jpg` |
| **Planta Trepadora** | Jazmín Estrella | *Trachelospermum jasminoides* | ✅ Foto Real Local | `01_sitio_oficial/JAZMIN-ESTRELLA.jpg` |
| **Fruto / Agro** | Pitahaya Roja | *Hylocereus costaricensis / monacanthus* | ✅ Foto Real Local | `01_sitio_oficial/Pitahaya2.jpg`, `DJI_0677-Mejorado-NR.jpg` |

---

### 4.2 Especies del Inventario de JUSA que Carecen de Archivo en Local (Brechas que requieren Mockup IA en `assets/mockups/`)

En la biblioteca de medios del CMS oficial de JUSA existían fichas para especies nativas clave de Panamá que no fueron descargadas en la carpeta `01_sitio_oficial/`. Para presentar un catálogo botánico completo y profesional, estas especies deben ser ilustradas mediante mockups generados por IA (etiquetados con badge `[Placeholder Temporal — Variedad de Finca]`):

#### A. Árboles Nativos y de Reforestación (10 especies prioritarias)
1. **Guayacán (Amarillo)** (*Handroanthus chrysanthus*): Árbol emblemático de la floración estival en Panamá. En WordPress: `Guayacan-Arbol1.jpg` (ID 37316).
2. **Árbol Panamá** (*Sterculia apetala*): **Árbol Nacional de la República de Panamá**, esencial para licitaciones y proyectos viales/mitigación ambiental. En WordPress: `Panama-Arbol.jpg` (ID 37323).
3. **Roble Sabanero / Roble Rosado** (*Tabebuia rosea*): Copa rosada característica del paisaje urbano y de parques en Panamá. En WordPress: `Roble-Arbol.jpg` (ID 37314).
4. **Flamboyán** (*Delonix regia*): Floración roja intensa, sombra extendida. En WordPress: `Flamboyan-Abrol.jpg` (ID 37321).
5. **Corotú** (*Enterolobium cyclocarpum*): Árbol corpulento de sombra ganadera y paisajismo rural en Coclé. En WordPress: `Corotu-Arbol.jpg` (ID 37313).
6. **Cedro Amargo** (*Cedrela odorata*): Especie forestal maderable protegida y de reforestación. En WordPress: `Cedro-amargo-Arbol.jpg` (ID 37318).
7. **Lluvia de Oro** (*Cassia fistula*): Racimos colgantes amarillos luminosos. En WordPress: `Luuvia-de-oro-Arbol.jpg` (ID 37331).
8. **Casco de Vaca** (*Bauhinia variegata*): Floración blanca/rosada estilo orquídea. En WordPress: `CASCO-DE-VACA.jpg` (ID 37739).
9. **Caracucha / Plumeria** (*Plumeria rubra*): Flor tropical aromática tradicional. En WordPress: `Caracucha-Arbol.jpg` (ID 37324).
10. **Almendro** (*Terminalia catappa*): Árbol costero de gran sombra y follaje rojizo estacional. En WordPress: `Almendro-Arbol.jpg` (ID 37308).

#### B. Palmas Ornamentales Adicionales (5 especies prioritarias)
1. **Palma Viajera** (*Ravenala madagascariensis*): Abanico monumental arquitectónico para entradas de PHs y hoteles. En WordPress: `Viajera-Palma.jpg` (ID 37299).
2. **Palma Coco Plumoso** (*Syagrus romanzoffiana*): Tronco anillado y porte esbelto para avenidas y bulevares. En WordPress: `Coco-plumoso-Palma.jpg` (ID 37298).
3. **Palma Robellini** (*Phoenix roebelenii*): Palma enana elegante para jardineras, terrazas y entradas residenciales. En WordPress: `ROBELLINI.jpg` (ID 37731).
4. **Palma Phoenix canariensis** (*Phoenix canariensis*): Palma de tronco robusto y copa esférica imponente. En WordPress: `Phoenix-canariensis-Palma.jpg` (ID 37304).
5. **Palma Carpentaria** (*Carpentaria acuminata*): Crecimiento rápido y porte estilizado. En WordPress: `Carpentaria-Palma.jpg` (ID 37300).

#### C. Plantas Ornamentales y de Follaje Tropical (6 especies prioritarias)
1. **Calathea Bijao** (*Calathea lutea / Heliconia*): Hojas anchas plateadas por el envés, símbolo del lujo tropical biofílico en Panamá. En WordPress: `Calathea-bijao-Planta.jpg` (ID 37285).
2. **Ficus Lyrata** (*Ficus lyrata*): Tendencia premium de interior y terrazas sombreadas. En WordPress: `Ficus-lyrata-Planta.jpg` (ID 37282).
3. **Helecho Peinilla** (*Nephrolepis biserrata*): Follaje plumoso colgante y sotobosque. En WordPress: `Helecho-peinilla-Planta.jpg` (ID 37284).
4. **Aglaonema Roja** (*Aglaonema 'Siam Aurora'*): Acento de color carmesí para sombra. En WordPress: `Aglonema-roja-Planta.jpg` (ID 37290).
5. **Sanchezia** (*Sanchezia speciosa*): Nervaduras amarillas vistosas sobre verde esmeralda. En WordPress: `Sanchezia-Planta.jpg` (ID 37289).
6. **Dieffenbachia Lotería** (*Dieffenbachia amoena*): Macicez y resistencia en áreas techadas. En WordPress: `Dieffenbachia-loteria-Planta.jpg` (ID 37286).

---

## 5. Catálogo de Brechas Visuales y Plan de Generación de Mockups con IA (`assets/mockups/`)

Para dar cumplimiento cabal al requerimiento del usuario (*"no olvides hacer las de mockups en base a eso [...] pares Antes/Después de taludes e instalación de grama, vistas de proyectos residenciales/playa/B2B en Panamá, y especies del catálogo que no tengan foto individual"*), se define a continuación la hoja de ruta técnica para el generador de imágenes de Antigravity:

### 5.1 Pares Interactivos de "Antes / Después" (Slider Interactivo)

#### Par 1: Control de Erosión e Hidrosiembra en Talud Vial
- **Brecha:** JUSA cuenta con la foto de la máquina operando (`HIDROSIEMBRA-MAQUINA.jpg`), pero no posee el par comparativo exacto de un talud en estado de falla erosiva antes de la intervención vs. el mismo talud estabilizado y revegetado.
- **Archivo Mockup 1A (Antes):** `assets/mockups/antes_talud_erosion.jpg`
  - *Prompt IA sugerido:* `"A steep, raw civil construction cut roadside slope in Panama along an infrastructure highway under overcast tropical sky, showing severe red-clay soil erosion, deep rainwater runoff gullies, loose rocks, and dangerous erosion risk before stabilization, realistic documentary style, hyper-detailed texture, 4:3 aspect ratio."`
- **Archivo Mockup 1B (Después):** `assets/mockups/despues_talud_hidrosiembra.jpg`
  - *Prompt IA sugerido:* `"The exact same steep roadside slope in Panama 35 days later, now completely stabilized and covered in a lush, dense, vibrant green blanket of turf grass from professional hydroseeding, root-locked, zero soil erosion, clean drainage curb at the base, sunny tropical day, architectural engineering photography, 4:3 aspect ratio."`

#### Par 2: Transformación Paisajística Residencial / Club de Playa
- **Brecha:** Las fotos externas de instalación no pueden usarse; se requiere un par dramático que demuestre el valor de instalar grama en rollo Zoysia Toro en un hogar panameño.
- **Archivo Mockup 2A (Antes):** `assets/mockups/antes_jardin_residencial.jpg`
  - *Prompt IA sugerido:* `"A modern tropical luxury residence backyard in Panama under construction, bare compacted dirt ground, uneven soil, construction rubble, no grass, empty perimeter, harsh tropical sunlight, architectural real estate photo, 4:3 aspect ratio."`
- **Archivo Mockup 2B (Después):** `assets/mockups/despues_jardin_residencial.jpg`
  - *Prompt IA sugerido:* `"The exact same modern tropical residence backyard in Panama after professional landscaping by Jardines Urbanos, featuring a flawless emerald-green Zoysia Toro lawn like a golf fairway, perfectly manicured stone borders, lush perimeter palm trees (Roystonea and Areca), outdoor terrace furniture, sunny blue sky, tropical luxury living magazine photography, 4:3 aspect ratio."`

---

### 5.2 Escenarios Visuales para la Calculadora Interactiva de m²
La calculadora de m² cuenta con 4 escenarios de selección rápida:

1. **Escenario Jardín / PH:** Cubierto por `slider-9-black.jpg` y `TORO-CLOSEUP-1.jpg`.
2. **Escenario Playa / Salinidad:**
   - **Archivo Mockup:** `assets/mockups/escenario_playa_salinidad.jpg`
   - *Prompt IA sugerido:* `"A pristine beachfront luxury villa lawn in Buenaventura or Coronado Panama, salt-tolerant dense Zoysia Japonica turf carpet facing the Pacific Ocean with coconut palms swaying in the sea breeze, high-end resort landscaping photography, 16:9 aspect ratio."`
3. **Escenario Alto Tráfico / Mascotas / Deporte:**
   - **Archivo Mockup:** `assets/mockups/escenario_alto_trafico_ph.jpg`
   - *Prompt IA sugerido:* `"A high-traffic outdoor community park and social area of an upscale gated community in Costa del Este Panama, resilient and dense Zoysia Toro grass field with kids playing area, pristine landscaping, tropical sunlight, 16:9 aspect ratio."`
4. **Escenario Talud / Control de Erosión:**
   - Cubierto por `HIDROSIEMBRA-MAQUINA.jpg` y el par de mockups `antes_talud_erosion.jpg` / `despues_talud_hidrosiembra.jpg`.

---

### 5.3 Especies Nativas Clave para el Catálogo Botánico Vivo (`assets/mockups/`)
Mockups con fondo botánico neutro o entorno natural panameño (formato vertical 3:4 o cuadrado 1:1, resolución 1024×1024 o 1024×1365 px):

| Archivo Mockup | Especie Botánica | Descripción Visual / Prompt IA |
|---|---|---|
| `assets/mockups/catalogo_arbol_guayacan.jpg` | Guayacán (*Handroanthus chrysanthus*) | Árbol de Guayacán en explosión de flores amarillas doradas intensas sin hojas, cielo azul tropical, espécimen de porte urbano en Panamá. |
| `assets/mockups/catalogo_arbol_panama.jpg` | Árbol Panamá (*Sterculia apetala*) | Árbol Nacional de Panamá, tronco recto majestuoso con contrafuertes basilares y copa frondosa verde esmeralda en vivero o parque. |
| `assets/mockups/catalogo_arbol_roble_rosado.jpg` | Roble Sabanero (*Tabebuia rosea*) | Copa abundante cubierta de flores rosa pastel, tronco gris claro elegante, luz cálida tropical panameña. |
| `assets/mockups/catalogo_arbol_flamboyan.jpg` | Flamboyán (*Delonix regia*) | Flores rojo fuego y anaranjadas brillantes, follaje plumoso fino, silueta abierta en forma de sombrilla. |
| `assets/mockups/catalogo_palma_viajera.jpg` | Palma Viajera (*Ravenala madagascariensis*) | Enorme abanico simétrico de hojas estilo plátano verde brillante en jardín tropical contemporáneo. |
| `assets/mockups/catalogo_palma_coco_plumoso.jpg` | Coco Plumoso (*Syagrus romanzoffiana*) | Tronco anillado esbelto con frondas plumosas arqueadas, fondo cielo tropical despejado. |
| `assets/mockups/catalogo_planta_calathea_bijao.jpg` | Calathea Bijao (*Calathea lutea*) | Mata densa de hojas anchas erectas de bijao con envés ceroso blanquecino, diseño biofílico tropical. |
| `assets/mockups/catalogo_planta_ficus_lyrata.jpg` | Ficus Lyrata (*Ficus lyrata*) | Hojas gruesas en forma de lira verde oscuro lustroso en macetón contemporáneo de terraza en PH. |
| `assets/mockups/producto_pitahaya_cosecha.jpg` | Pitahaya de Río Grande, Coclé | Cajas de madera ecológica con frutas frescas de pitahaya roja brillante recién cosechadas de las espalderas de Coclé. |

---

## 6. Directrices Técnicas de Integración Frontend para el Equipo de Construcción (`site/`)

1. **Jerarquía Estricta de Despliegue de Activos:**
   - **Nivel 1 (Prioridad Absoluta):** Las 33 fotos reales descargadas de `01_sitio_oficial/`. Deben ser el pilar de los héroes, fichas de producto de Zoysia Toro, Zoysia Japónica, San Agustín, Hidrosiembra, Pitahaya y Sobre Nosotros.
   - **Nivel 2 (Complementos Etiquetados):** Los mockups generados por IA en `assets/mockups/` para los comparadores Antes/Después y las especies faltantes del vivero. Toda tarjeta que use mockup debe incluir un micro-badge: `<span class="badge-placeholder">Variedad de Finca • Imagen Referencial</span>`.
   - **Nivel 3 (Prohibido):** Las 2 imágenes de `02_referencias_externas/` NO deben enlazar en el HTML del sitio navegable.
2. **Optimización de Carga y Rendimiento (Core Web Vitals):**
   - El sitio actual en producción sufre de un TTFB de 17.4s y 208 KB de HTML sin CDN. El prototipo en `site/` debe implementar imágenes servidas con etiquetas `<picture>` responsivas y formatos modernos WebP con fallback JPEG.
   - Tamaños objetivo:
     - Hero Banners (1920 px ancho): `< 220 KB` en WebP.
     - Tarjetas de Catálogo (600×800 px): `< 65 KB` en WebP.
     - Miniaturas de Calculadora (300×300 px): `< 25 KB` en WebP.
3. **Accesibilidad (a11y) y SEO Local (Panamá):**
   - Todos los elementos `<img>` deben incluir atributos `alt` descriptivos con intención transaccional y contexto local:
     - Ejemplo Toro: `alt="Césped natural Zoysia Toro en rollo para alto tráfico y jardines residenciales en Panamá - Finca Jardines Urbanos"`
     - Ejemplo Hidrosiembra: `alt="Servicio de hidrosiembra mecanizada para control de erosión y estabilización de taludes viales en Panamá - JUSA"`
     - Ejemplo Pitahaya: `alt="Cultivo y producción agroindustrial de pitahaya roja en finca de 7 hectáreas en Río Grande, Coclé - Jardines Urbanos"`
   - Atributos `loading="lazy"` para todas las imágenes bajo el pliegue (below the fold) y `loading="eager"` con `fetchpriority="high"` únicamente para la imagen Hero LCP.

---

## 7. Conclusión de la Auditoría

Jardines Urbanos, S.A. cuenta con un repositorio de fotografía real de **alto valor comercial y autenticidad comprobada**. A diferencia de competidores que recurren a fotos de stock genéricas de otros países, JUSA tiene registros directos de:
- Su maquinaria cosechadora y camión hidrosembrador con marca corporativa en pleno talud.
- Sus campos de producción masiva de grama y palmas reales en Coclé.
- Su propia finca de 7 hectáreas de pitahaya documentada con dron.
- Variedades clave de césped tropical (Toro, Japonesa, San Agustín) en alta definición.

La integración prioritaria de estas 33 imágenes reales en el prototipo `site/`, complementada estratégicamente con los mockups de Antes/Después y especies nativas en `assets/mockups/`, garantizará un prototipo navegable con máxima credibilidad, fidelidad al cliente y potencia de conversión comercial.
