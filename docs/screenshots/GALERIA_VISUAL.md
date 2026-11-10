# Galería Visual y Validación de Prototipo Navegable
## Jardines Urbanos, S.A. — Fincas en Río Grande, Coclé (Km 168)
### Dirección Visual: "Tropical Luxury & Agro-Tech"

**Fecha de generación:** 2026-11-08  
**Motor de automatización:** Playwright Chromium (Headless Chrome)  
**Resoluciones:** Desktop (1440×900 px) y Mobile (375×812 px, iPhone format)  
**Ubicación de capturas:** `docs/screenshots/`  

---

## 1. Resumen Ejecutivo del Prototipo Visual

Las capturas de alta resolución documentadas en este informe certifican la implementación fidedigna de las Fases 1 y 2 del proyecto para **Jardines Urbanos, S.A.**:
1. **Paleta de Identidad Aprobada:** Bosque Profundo (`#122B1D`), Arena Caliza (`#F4F1EA`), Verde JUSA (`#71B347`), Clorofila UI (`#2E6F40`) y Terracota Coclé (`#FA7D09`).
2. **Tipografía Dual de Marca:** Tipografía de exhibición *Fraunces* (display serif de alta gama) y tipografía de lectura *Plus Jakarta Sans* (cuerpo geométrico ultra-legible), complementadas con *JetBrains Mono* para métricas técnicas.
3. **Prioridad Absoluta de Fotografía Real:** Mapeo de las 33 fotos oficiales reales de la empresa (`imagenes/01_sitio_oficial/`) en Hero de dron, tarimas de finca, cosechadoras SAE y portafolio de vivero.
4. **Transparencia y Veracidad:** Todos los precios no confirmados por el cliente portan el marcador reglamentario `[DATO PENDIENTE DEL CLIENTE]`; las fotos generadas por IA para ilustrar comparaciones portan la etiqueta visible `[Variedad de Finca • Imagen Referencial]`.
5. **Comportamiento Responsive:** Adaptabilidad completa de layouts bento, comparadores táctiles y barra flotante de pulgar (*Thumb Bar*) en dispositivos móviles.

---

## 2. Catálogo de Capturas Visuales

### 2.1 Master Showcase Principal (`index.html`)

#### Desktop (1440×900)
- **Archivo:** [`desktop_home.png`](desktop_home.png)
- **Tamaño:** ~6.22 MB
- **Componentes validados:**
  - *Barra de Autoridad Superior:* Teléfonos oficiales verificados (+507 226-0494, +507 6539-0949) y coordenadas GPS de finca en Río Grande (`8.4293, -80.4960`).
  - *Hero Cinemático:* Fotografía aérea real con dron de la finca (`DJI_0677-Mejorado-NR.jpg`), propuesta de valor de 25 años de trayectoria y CTAs principales.
  - *Banner de Credibilidad:* Cifras de escala (+25 Años, Km 168, 5,000 m²/día, 100% adaptación climática).
  - *Bento Grid de 4 Pilares:* Gramas Naturales en rollos, Hidrosiembra B2B, Palmas y Árboles en Cepellón, y Plantación Tecnificada de Pitahaya (7 Ha).
  - *Widget Calculadora de m²:* Selector de 4 escenarios, cálculo interactivo con +5% de merma, recomendación agronómica y enlace a WhatsApp.
  - *Comparador Antes/Después:* Sliders interactivos de talud vial y jardín residencial.
  - *Catálogo Botánico Vivo:* Grid dinámico con pestañas por categoría y filtros de sol/costero/tráfico.
  - *Spotlight B2B & BoQ Copier:* Foto de hidrosembrador JUSA y botón de copiado de especificación técnica para planos en 1 clic.
  - *Galería de Cosecha:* Cosechadora SAE, tarimas de San Agustín, vivero de palmas reales y agrónomos JUSA.
  - *Formulario de Contacto & Cumplimiento Ley 81:* Checkbox de consentimiento para protección de datos personales en Panamá.
  - *Footer Institucional:* Directorio de variedades, navegación completa y datos legales.

#### Mobile (375×812)
- **Archivo:** [`mobile_home.png`](mobile_home.png)
- **Tamaño:** ~4.66 MB
- **Componentes validados:**
  - *Header Compacto & Menú Drawer:* Botón hamburguesa accesible con el pulgar.
  - *Diseño Monocolumna Adaptativo:* Ajuste fluido de tarjetas bento, testimonios y cuadrícula botánica a 375px.
  - *Thumb Bar Flotante Inferior:* Botones de acceso rápido fijo para "Calculadora m²" y "WhatsApp Directo" optimizados para navegación con una sola mano.
  - *Comparadores Táctiles:* Deslizadores redimensionados para control táctil sin desbordamiento horizontal.

---

### 2.2 Calculadora de Metros Cuadrados (`pages/calculadora.html`)

#### Desktop (1440×900)
- **Archivo:** [`desktop_calculadora.png`](desktop_calculadora.png)
- **Tamaño:** ~383 KB
- **Componentes validados:**
  - *Matriz de 4 Escenarios:* Jardín / PH, Casa de Playa, Parque / Tráfico, y Talud / Obra.
  - *Sincronización Dual de Entrada:* Slider deslizante y caja numérica interactiva bidireccionales.
  - *Condición Solar:* Selector Pleno Sol (+6 hrs) vs. Sombra Parcial.
  - *Tarjeta de Resultados en Vivo:* Metraje bruto ($A_{\text{net}} \times 1.05$), metros de merma calculados, estimación de tarimas de madera (~45 m² c/u), clasificación de lead (B2C vs. B2B).
  - *Botón WhatsApp Dinámico:* URL codificada con desglose completo del cálculo.
  - *Preguntas Frecuentes Agronómicas:* Justificación técnica del 5% de merma, logística de tarimas y umbral de hidrosiembra.

#### Mobile (375×812)
- **Archivo:** [`mobile_calculadora.png`](mobile_calculadora.png)
- **Tamaño:** ~379 KB
- **Componentes validados:**
  - Disposición vertical optimizada de controles y tarjeta de cotización.
  - Accesibilidad táctil de botones de escenario y deslizador de metros cuadrados.
  - Ocultamiento automático de la barra de pulgar al interactuar con campos de texto para evitar solapamientos con el teclado virtual.

---

### 2.3 Catálogo Botánico Vivo (`pages/catalogo.html`)

#### Desktop (1440×900)
- **Archivo:** [`desktop_catalogo.png`](desktop_catalogo.png)
- **Tamaño:** ~4.42 MB
- **Componentes validados:**
  - *Pestañas de Filtrado:* Todo el Inventario, Gramas Naturales (3 variedades certificadas), Palmas Ornamentales, Árboles Nativos, Plantas de Lujo e Hidrosiembra/B2B.
  - *Buscador Textual en Vivo:* Búsqueda instantánea por nombre común o taxón botánico (ej. *Zoysia*, *Bismarckia*).
  - *Filtros de Rasgos Fisiológicos:* Botones para filtrar por Pleno Sol, Tolerancia a Salinidad Costera y Alto Tráfico.
  - *Tarjetas de Especies:* Fotografía real o mockup debidamente etiquetada, nombre científico en cursiva, etiquetas botánicas y precio referencial `[DATO PENDIENTE DEL CLIENTE]`.
  - *Modal de Vista Rápida:* Ventana emergente con ficha técnica ampliada, requerimientos de cultivo y enlace de cotización por especie.

#### Mobile (375×812)
- **Archivo:** [`mobile_catalogo.png`](mobile_catalogo.png)
- **Tamaño:** ~1.91 MB
- **Componentes validados:**
  - Disposición de tarjetas en columna única móvil con carga asíncrona de imágenes.
  - Barra de búsqueda y botones de filtro con espaciado ergonómico.
  - Botón de cotización por WhatsApp directo en cada tarjeta.

---

### 2.4 Portal de Hidrosiembra & Obras Civiles B2B (`pages/b2b-hidrosiembra.html`)

#### Desktop (1440×900)
- **Archivo:** [`desktop_b2b_hidrosiembra.png`](desktop_b2b_hidrosiembra.png)
- **Tamaño:** ~1.89 MB
- **Componentes validados:**
  - *Hero Técnico Industrial:* Maquinaria hidrosembradora pesada operando en talud vial panameño.
  - *Tabla de Parámetros de Desempeño:* Pendiente máxima de hasta 60° (1:1), 5,000 m²/día de rendimiento, cobertura radicular en 35 días y 98% de reducción de escorrentía.
  - *Copiador de Especificación BoQ en 1 Clic:* Bloque de especificación técnica estandarizada para notas de planos en AutoCAD/Revit o pliegos de licitación MOP con botón de copiado al portapapeles.
  - *Estudio de Caso Antes/Después:* Talud vial de la Autopista Panamá Oeste (3,400 m²).
  - *Formulario B2B Corporativo:* Campos específicos para Empresa Constructora, Ingeniero a Cargo, Tipo de Intervención y consentimiento Ley 81.

#### Mobile (375×812)
- **Archivo:** [`mobile_b2b_hidrosiembra.png`](mobile_b2b_hidrosiembra.png)
- **Tamaño:** ~739 KB
- **Componentes validados:**
  - Adaptación responsive de tabla de especificaciones con lectura fluida.
  - Botón de copiado de especificación funcional en pantallas táctiles con retroalimentación visual tipo toast.

---

### 2.5 Guía Residencial & PH (`pages/residencial.html`)

#### Desktop (1440×900)
- **Archivo:** [`desktop_residencial.png`](desktop_residencial.png)
- **Tamaño:** ~1.68 MB
- **Componentes validados:**
  - *Tríada de Variedades de Finca:* Zoysia Toro (patio activo y mascotas), Zoysia Japónica (brisa marina y salinidad) y San Agustín (sombra de árboles perimetrales).
  - *Tabla Comparativa de Fisiología:* Resistencia al pisoteo, tolerancia solar, salinidad y frecuencia de poda.
  - *Calculadora Integrada:* Widget de cálculo directo para el propietario o administrador de PH.
  - *Proceso Constructivo en 4 Pasos:* Nivelación de suelo, transporte fresco en tarimas, colocación en junta trabada y riego de establecimiento.

---

### 2.6 Contacto, Fincas y Cumplimiento (`pages/contacto.html`)

#### Desktop (1440×900)
- **Archivo:** [`desktop_contacto.png`](desktop_contacto.png)
- **Tamaño:** ~300 KB
- **Componentes validados:**
  - *Directorio Oficial Verificado:* Coordenadas de finca en Río Grande (`8.4293, -80.4960`), teléfono fijo `(+507) 226-0494`, WhatsApp `(+507) 6539-0949`, correos departamentales y horarios de operación.
  - *Ficha Geográfica:* Indicaciones de acceso en el Km 168 de la Carretera Interamericana y enlace a Google Maps (Plus Code `CGH3+PH9`).
  - *Formulario Validado Ley 81:* Formulario de contacto con validación estricta del checkbox de consentimiento según la Ley 81 de 2019 de la República de Panamá.

---

### 2.7 Comparador Interactivo de Suelos Panameños

- **Archivo:** [`comparador_interactivo.png`](comparador_interactivo.png)
- **Tamaño:** ~1.08 MB
- **Detalle del componente:**
  - Estado interactivo con deslizador central desplazado al 40% demostrando la funcionalidad de corte entre la capa de "ANTES (Día 1)" y "DESPUÉS (Día 35)".
  - Manejador circular central (`◄►`) con badges de estado y descargo explícito `[Variedad de Finca • Imagen Referencial]`.

---

## 3. Matriz de Cumplimiento de Criterios de Aceptación Visual

| Criterio | Especificación | Estado | Evidencia Visual |
|---|---|:---:|---|
| Paleta de Marca | `#122B1D`, `#F4F1EA`, `#71B347`, `#2E6F40`, `#FA7D09` | **CUMPLE** | Presente en todas las capturas (fondos, botones, badges, tipografía) |
| Tipografía Dual | Fraunces (Headings) + Plus Jakarta Sans (Body) | **CUMPLE** | Renderizado tipográfico nítido en Desktop y Mobile |
| Fotos Reales JUSA | Integración prioritaria de las 33 fotos de `01_sitio_oficial/` | **CUMPLE** | Hero Dron, tarimas, cosechadora, palmas, fotos de producto |
| Etiquetado Mockups | `[Variedad de Finca • Imagen Referencial]` | **CUMPLE** | Visible en comparadores y especies complementarias |
| Cero Datos Falsos | `[DATO PENDIENTE DEL CLIENTE]` en precios no confirmados | **CUMPLE** | Todas las fichas de catálogo y widgets de cotización |
| Responsive 1440px | Cobertura completa sin desbordamiento horizontal | **CUMPLE** | Capturas desktop con layout bento y grids calibrados |
| Responsive 375px | Adaptabilidad en ancho estándar de smartphone con Thumb Bar | **CUMPLE** | Capturas móviles fluidas con botones accesibles al pulgar |

---

## 4. Instrucciones para Reproducir las Capturas

Para regenerar de forma totalmente desatendida las 11 capturas de pantalla de alta resolución:

```bash
# Ejecutar script automatizado con Playwright Chromium
python tests/generate_screenshots.py
```

El script iniciará automáticamente un servidor HTTP local en `127.0.0.1:8096`, lanzará Chromium en modo headless con los viewports especificados, ejecutará un desplazamiento suave para asegurar la carga de activos diferidos y guardará las 11 capturas en `docs/screenshots/`.
