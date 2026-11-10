# Original User Request

## Approved Task Prompt — 2026-11-08T10:22:00Z

Ejecutar siempre en multiagente y con los skills que tenemos. Rediseño completo y prototipado navegable del sitio web para Jardines Urbanos, S.A. (Panamá), cubriendo las Fases 1 y 2 del roadmap aprobado: auditoría de activos, entorno local/staging, integración prioritaria de imágenes reales provistas y construcción del prototipo interactivo (desktop y móvil) en `site/` con la calculadora de m² y catálogo vivo.

Working directory: c:\Users\Usuario\Downloads\Jardines Urbanos
Integrity mode: development

Documentos y recursos de referencia:
- Repositorio de imágenes reales: `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes` (`01_sitio_oficial/` con 33 fotos reales de gramas, palmas, árboles, plantas, hidrosiembra, pitahaya y equipo; `02_referencias_externas/` con fotos de instalación y rollos de grama; `INDICE_VISUAL.html`, `FUENTES.csv`, `LEEME_REFERENCIAS.txt` y `VERIFICACION.csv`)
- Propuesta Ejecutiva 360: Propuesta_Ejecutiva_360_Jardines_Urbanos.pdf y .html
- Plan Técnico SEO / Analítica / Seguridad: PLAN_360_SEO_ANALITICA_SEGURIDAD.md
- Roadmap y cronograma: C:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\roadmap_y_cronograma.md
- Wireframes y mockups aprobados: C:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\

## Requirements

### R1. Preparación de entorno y uso prioritario de imágenes reales
Estructurar el entorno local/staging en `c:\Users\Usuario\Downloads\Jardines Urbanos` sin modificar el sitio de producción. Utilizar de forma prioritaria todo el material fotográfico real disponible en la carpeta `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes` (`01_sitio_oficial/` y `02_referencias_externas/`), guiándose por `INDICE_VISUAL.html`, `FUENTES.csv` y `LEEME_REFERENCIAS.txt`, ya que todo ese contenido corresponde a proyectos y especies reales de la empresa. Generar imágenes mockup con IA únicamente para complementar secciones o vacíos puntuales que no cuenten con foto real en la carpeta, etiquétandolas explícitamente como placeholders temporales.

### R2. Prototipo navegable interactivo y funcionalidades clave
Construir en `site/` el prototipo navegable responsive (desktop y móvil) siguiendo la dirección visual "Tropical Luxury & Agro-Tech" (paleta: Bosque Profundo #122B1D, Arena Caliza #F4F1EA, Verde JUSA #71B347, Clorofila #2E6F40, Terracota #FA7D09; tipografía: Fraunces + Plus Jakarta Sans). Implementar la calculadora interactiva de m² (escenarios de uso, recomendación de variedades de grama e hidrosiembra, margen de merma de +5% y generación de enlace dinámico a WhatsApp +507 6539-0949 con mensaje prellenado), el catálogo botánico nativo filtrable, comparador antes/después y las páginas de aterrizaje residenciales y B2B/hidrosiembra.

### R3. Integridad de datos y restricciones de infraestructura
Utilizar exclusivamente datos reales y verificados de Jardines Urbanos, S.A. como hechos; para cualquier información no confirmada por el cliente, emplear marcadores `[DATO PENDIENTE DEL CLIENTE]` en lugar de inventar cifras, estadísticas, testimonios o logos. No realizar ninguna modificación ni publicación sobre el entorno de producción de WordPress durante esta etapa; todo el trabajo debe desarrollarse en local/staging.

## Acceptance Criteria

### Estructura y Funcionamiento del Prototipo
- [ ] El prototipo navegable en `site/` carga de forma autónoma y sin errores en la consola del navegador.
- [ ] La dirección visual implementa fielmente los colores de marca aprobados (#122B1D, #F4F1EA, #71B347, #2E6F40, #FA7D09) y las fuentes tipográficas especificadas.
- [ ] La experiencia es responsive y cuenta con capturas visuales de verificación tanto en formato desktop como móvil.

### Funcionalidades Interactivas
- [ ] La calculadora de m² opera interactivamente para todos los escenarios (Jardín/PH, Playa, Alto tráfico, Talud), calcula correctamente los metros requeridos sumando el 5% de merma, recomienda la variedad adecuada (Zoysia Toro, Zoysia Japónica, San Agustín o Hidrosiembra) y genera el enlace `https://wa.me/50765390949` con el texto codificado con el resumen del cálculo.
- [ ] El catálogo botánico nativo permite filtrar dinámicamente por categoría botánica y muestra únicamente las especies reales verificadas de la finca y vivero de JUSA.

### Activos y Veracidad
- [ ] Todas las imágenes reales disponibles en `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes` (`01_sitio_oficial/` y `02_referencias_externas/`) se integran de forma prioritaria en el prototipo y catálogo conforme a `INDICE_VISUAL.html` y `FUENTES.csv`.
- [ ] Solo se utilizan imágenes generadas por IA como placeholders complementarios para secciones o especies que carezcan de fotografía real en el repositorio provisto.
- [ ] Ningún dato no verificado, testimonio inventado ni estadística ficticia aparece como hecho consumado en el sitio o en la documentación entregada.
- [ ] El sitio web de producción permanece inalterado.

### Verificación Técnica
- [ ] Las validaciones de código (HTML/CSS/JS linter o validador) se ejecutan y aprueban sin fallos críticos.
- [ ] Pruebas programáticas automatizadas validan la lógica matemática de la calculadora de m² y el filtrado del catálogo.
- [ ] La auditoría técnica corrobora la presencia de etiquetas meta SEO base y la conformidad con la propuesta ejecutiva aprobada.


## Follow-up — 2026-11-08T10:22:37Z

Instrucción adicional importante del usuario: "sí y no olvides hacer las de mockups en base a eso".
Asegúrate de que el equipo:
1. Analice visualmente las fotos reales de `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes` (`01_sitio_oficial/` y `02_referencias_externas/`) y genere también las fotos de mockup con IA (`image-generator`) inspiradas directamente en esas fotos reales panameñas (ej. pares Antes/Después de taludes e instalación de grama, vistas de proyectos residenciales/playa/B2B en Panamá, y especies del catálogo que no tengan foto individual en `01_sitio_oficial/`), guardándolas en `assets/mockups/` (y referenciándolas donde aporten valor visual).
2. Genere y tome capturas/mockups visuales de alta resolución (Desktop y Mobile) del sitio navegable resultante usando esas imágenes reales y los mockups inspirados en ellas.
