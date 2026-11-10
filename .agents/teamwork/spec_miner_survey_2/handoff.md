# Handoff Report — spec_miner_survey_2 (Specification Mining)

**Fecha:** 8 de noviembre de 2026  
**Agente:** `spec_miner_survey_2`  
**Destinatario:** `parent` (Orchestrator, ID: `4e4dce3e-b6b4-4e9d-8f07-227c2073623e`)  
**Tipo de Handoff:** Hard (Tarea completa y autosuficiente)

---

## 1. Observation (Observaciones Directas)

Se inspeccionaron directamente los archivos autoritativos en el espacio de trabajo y en el directorio de investigación:

1. **`Propuesta_Ejecutiva_360_Jardines_Urbanos.html`:**
   - Líneas 216–217: *"Jardines Urbanos, S.A. (+25 años desde 1999 y fincas propias en Río Grande, Coclé), integrando herramientas interactivas de cálculo por m², catálogo botánico vivo..."*
   - Líneas 315–337: Paleta cromática oficial: Bosque B2B (`#122B1D`), Verde JUSA (`#71B347`), Clorofila UI (`#2E6F40`), Arena Editorial (`#F4F1EA`), Terracota (`#FA7D09`).
   - Líneas 413–415: *"el cliente elige su tipo de proyecto, desliza los metros cuadrados (m²), indica si tiene pleno sol o sombra, y el sistema le recomienda la grama exacta sumando un +5% sugerido por merma de cortes y enviando el resumen técnico directo al WhatsApp comercial (+507 6539-0949)."*
   - Líneas 457–460: Schema.org `GardenStore`, `LandscapeArchitect` y catálogo de productos con geolocalización en Río Grande, Coclé.

2. **`PLAN_360_SEO_ANALITICA_SEGURIDAD.md`:**
   - Líneas 122–242: Bloque estructurado JSON-LD con `@type: ["GardenStore", "LandscapeArchitect", "LocalBusiness"]`, geolocalización `latitude: 8.4293, longitude: -80.4960`, teléfonos `+507-226-0494` y `+507-6539-0949`, y `OfferCatalog` con Zoysia Toro, San Agustín, Zoysia Japónica e Hidrosiembra.
   - Líneas 256–298: Script de omnicanalidad `window.JUSA_Omnichannel` con función `buildWhatsAppUrl()` que genera el payload contextual y dispara el evento `whatsapp_lead_click` a `window.dataLayer`.
   - Líneas 341–365: Reglas de seguridad HTTP (`.htaccess`) para HSTS, nosniff, SAMEORIGIN, bloqueo de `xmlrpc.php`, `readme.html` y autor `?author=1`.
   - Líneas 398–403: Configuración de DNS para Microsoft 365 con SPF (`v=spf1 include:spf.protection.outlook.com -all`), CNAMEs de DKIM y DMARC (`v=DMARC1; p=quarantine...`).
   - Línea 406: Requisito de consentimiento explícito no premarcado para la Ley 81 de 2019 de Panamá.

3. **`propuesta_master_360_interactiva.html`:**
   - Líneas 267–280: Escenarios: `sc-residencial` (🏡 Jardín / PH), `sc-playa` (🏖️ Casa de Playa), `sc-deportivo` (⚽ Parque / Tráfico), `sc-talud` (⛰️ Talud / Obra Vial).
   - Líneas 306–312: Opciones de sol: `sun-sol` (☀️ Pleno Sol Directo +6 hrs), `sun-sombra` (⛅ Sombra Parcial / Árboles).
   - Líneas 515–555: Implementación funcional de la calculadora:
     - `const area = parseInt(document.getElementById('area-slider').value, 10);`
     - `const gross = Math.ceil(area * 1.05);`
     - Recomendación:
       - Si `talud` $\rightarrow$ `title = 'Hidrosiembra Técnica JUSA'`, `mode = 'Camión Hidrosembrador (Obra B2B)'`.
       - Else if `playa` $\rightarrow$ `title = 'Grama Zoysia Japónica'`, `mode = 'Rollos / Tarimas de Finca'`.
       - Else if `sombra` $\rightarrow$ `title = 'Grama San Agustín'`, `mode = 'Rollos / Tarimas de Finca'`.
       - Else if `deportivo` $\rightarrow$ `title = 'Grama Zoysia Toro (Alto Tráfico)'`, `mode = 'Suministro a Escala / Tarimas'`.
       - Else $\rightarrow$ `title = 'Grama Zoysia Toro'`, `mode = 'Rollos / Tarimas de Finca'`.
     - Mensaje WhatsApp: `Hola Jardines Urbanos, usé la calculadora web y deseo cotizar ${gross.toLocaleString()} m² (incluye 5% merma) de ${title} para ${scLabel} (${currentSun === 'sol' ? 'Pleno Sol' : 'Sombra Parcial'}).`
     - URL WhatsApp: `https://wa.me/50765390949?text=${encodeURIComponent(msg)}`

4. **`FUENTES.csv`, `VERIFICACION.csv` y `docs/media_inventory_site.csv`:**
   - 33 fotografías oficiales verificadas descargadas de la web de JUSA, cubriendo Zoysia Toro (`TORO-CLOSEUP-1.jpg`, `TORO-ZOOM.jpg`), San Agustín (`SAN-AGUSTIN-HEADER.jpg`, `SAN-AGUSTIN-CLOSEUP.jpg`, `TARIMAS-SAN-AGUSTIN.jpg`), Zoysia Japónica (`JAPONESA-PROYECTO.jpg`, `JAPONESA-CLOSEUP.jpg`), maquinaria de hidrosiembra rotulada (`HIDROSIEMBRA-MAQUINA.jpg`), cultivo de Pitahaya (`Pitahaya2.jpg`, `DJI_0677-Mejorado-NR.jpg`), y especies de vivero (Bismarckia, Palma Real, Areca, Cola de Zorro, Neem, Monstera, Xanadu, Ginger Variegado, Croto, Jazmín Estrella).
   - 2 referencias externas en `02_referencias_externas/` que NO deben atribuirse a portafolio propio de JUSA.

---

## 2. Logic Chain (Cadena Lógica de Deducción)

1. **Premisa 1 (Calculadora & Lógica de Negocio):** Las fuentes autoritativas coinciden de manera unívoca en la fórmula matemática con factor $1.05$ redondeado al entero superior ($A_{\text{gross}} = \lceil A_{\text{net}} \times 1.05 \rceil$).
2. **Premisa 2 (Jerarquía de Recomendación):** La lógica de selección varietal no es arbitraria sino agronómica:
   - Un talud exige retención física de suelo inmediata mediante slurry hidrosembrado (semilla + fibra + fijador), por lo que tiene prioridad máxima sobre la selección de sol o sombra.
   - En una vivienda de playa en Panamá, la salinidad y la brisa marina son el principal factor limitante, haciendo obligatoria la Zoysia Japónica.
   - En jardines con sombra parcial, la Zoysia Toro decae, por lo que la San Agustín de hoja ancha es la única variedad recomendada.
   - En suelo plano a pleno sol, la Zoysia Toro es el estándar supremo de resistencia y estética.
3. **Premisa 3 (Integridad de Datos):** El requerimiento R3 exige evitar a toda costa la invención de estadísticas, precios unitarios por $m^2$ o testimonios falsos. Dado que ni la propuesta ejecutiva ni el plan técnico publican tarifas fijas (las cuales fluctúan por flete y volumen), estos datos deben marcarse explícitamente como `[DATO PENDIENTE DEL CLIENTE]`.
4. **Premisa 4 (Omnicanalidad y SEO):** El número de WhatsApp oficial es `+507 6539-0949` y el enrutamiento debe preservar parámetros UTM hacia el dataLayer para Google Analytics 4 y Meta Pixel.
5. **Conclusión Lógica:** Toda la especificación extraída en `survey_specs.md` provee la base matemática, de contenido, taxonómica y de arquitectura necesaria y suficiente para que los agentes constructores maqueten y programen el prototipo navegable en `site/` sin requerir suposiciones.

---

## 3. Caveats (Advertencias y Supuestos)

- **Precios de Venta:** Los precios por $m^2$ y tarifas de instalación no están en los documentos de referencia; deben cotizarse por WhatsApp o recibir el listado oficial de precios de JUSA mediante el marcador `[DATO PENDIENTE DEL CLIENTE]`.
- **Tenant ID de Microsoft 365:** Para la configuración de los registros CNAME de DKIM, el subdominio exacto `<tenant>.onmicrosoft.com` depende del acceso de administración a Microsoft Defender de JUSA (`[DATO PENDIENTE DEL CLIENTE]`).
- **IDs de Medición Analítica:** El contenedor GTM y el Measurement ID de GA4 son marcadores `[DATO PENDIENTE DEL CLIENTE]` que se conectarán cuando JUSA facilite la cuenta de Google.

---

## 4. Conclusion (Conclusión de la Tarea)

La tarea de minado y extracción de especificaciones técnicas para Jardines Urbanos, S.A. ha sido completada al 100%. El documento exhaustivo `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\spec_miner_survey_2\survey_specs.md` ha sido generado con:
1. Tabla de 22 funcionalidades descubiertas (`## Features Discovered`).
2. Tabla de 12 casos de borde (`## Edge Cases`).
3. Fórmulas matemáticas y rangos exactos de la calculadora de $m^2$ (+5% de merma).
4. Matriz de decisión botánica para los 4 escenarios y 2 condiciones solares.
5. Generación de URLs de WhatsApp (`https://wa.me/50765390949`) con enrutamiento de UTMs y eventos dataLayer.
6. Taxonomía botánica completa de especies reales verificadas y mapeo fotográfico oficial.
7. Protocolo estricto de integridad `[DATO PENDIENTE DEL CLIENTE]`.
8. Bloques listos de SEO, OpenGraph, Schema.org JSON-LD y cabeceras de seguridad HTTP.

---

## 5. Verification Method (Método de Verificación Independiente)

Para verificar independientemente este informe y sus hallazgos:
1. **Inspección de Archivos:**
   - Abrir y verificar el informe completo en:  
     `c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\spec_miner_survey_2\survey_specs.md`
2. **Validación de la Fórmula y Lógica de Calculadora:**
   - Contrastar contra `c:\Users\Usuario\.gemini\antigravity\brain\06a2f751-b5ae-4d18-94e4-841ab5713109\propuesta_master_360_interactiva.html` líneas 514–555.
3. **Validación de Datos Estructurados y Seguridad:**
   - Contrastar contra `c:\Users\Usuario\Downloads\Jardines Urbanos\PLAN_360_SEO_ANALITICA_SEGURIDAD.md` líneas 121–242 y 341–365.
4. **Validación de Activos Fotográficos Reales:**
   - Contrastar contra `c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\FUENTES.csv` y `docs/media_inventory_site.csv`.
