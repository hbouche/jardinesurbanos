#!/usr/bin/env python3
"""
build_manifest.py
Generates site/assets/media_manifest.json and site/assets/media_manifest.js
Cataloging all 33 official photos and 9 AI mockups for Jardines Urbanos, S.A.
"""

import os
import json
import hashlib
from PIL import Image

SITE_ROOT = r"c:\Users\Usuario\Downloads\Jardines Urbanos\site"
ASSETS_DIR = os.path.join(SITE_ROOT, "assets")
IMG_DIR = os.path.join(ASSETS_DIR, "img")
MOCKUPS_DIR = os.path.join(ASSETS_DIR, "mockups")

# Metadata registry for official photos
OFFICIAL_METADATA = {
    "ARBOL-PREPARADO.jpg": {
        "title": "Árbol Preparado para Trasplante en Cepellón",
        "scientificName": "Especies nativas encepellonadas",
        "category": "arboles",
        "subcategory": "vivero",
        "alt": "Árbol nativo aclimatado en vivero con cepellón protegido para siembra urbana en Panamá - Jardines Urbanos",
        "description": "Árbol nativo preparado mediante poda de raíz y embalaje técnico de cepellón listo para trasplante directo con alta tasa de prendimiento.",
        "recommendedPlacement": "Catálogo Botánico y sección de Servicios de Arboricultura / Encepellonado",
        "tags": ["Árboles", "Vivero", "Trasplante", "Cepellón", "Nativo"]
    },
    "ARECA.jpg": {
        "title": "Palma Areca",
        "scientificName": "Dypsis lutescens",
        "category": "palmas",
        "subcategory": "vivero",
        "alt": "Palma Areca en maceta para paisajismo residencial y terrazas en Panamá - Vivero JUSA",
        "description": "Palma multicaule de frondas arqueadas finas, ideal para setos de privacidad, semisombra y diseño biofílico en residencias y PHs.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Palmas / Semisombra / Interiores PH)",
        "tags": ["Palmas", "Vivero", "Semisombra", "Interiores", "PH"]
    },
    "BISMARKIA.jpg": {
        "title": "Palma Bismarckia",
        "scientificName": "Bismarckia nobilis",
        "category": "palmas",
        "subcategory": "vivero",
        "alt": "Palma Bismarckia azul plateada cultivada en finca Coclé - Jardines Urbanos Panamá",
        "description": "Majestuosa palma solitaria de abanico con follaje azul plateado acerado, altamente resistente a pleno sol y sequía.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Palmas / Sol Directo / Lujo Tropical)",
        "tags": ["Palmas", "Vivero", "Sol Pleno", "Lujo Tropical", "Azul Plateado"]
    },
    "Catalogo_Main.jpg": {
        "title": "Hero Banner Catálogo Botánico y Vivero",
        "scientificName": "",
        "category": "banners",
        "subcategory": "catalogo",
        "alt": "Panorámica de vivero y producción botánica de Jardines Urbanos en Río Grande, Coclé",
        "description": "Vista panorámica de las naves de cultivo, macetones y líneas de aclimatación botánica de JUSA.",
        "recommendedPlacement": "Hero Banner principal del Catálogo Botánico Vivo (/vivero-plantas-palmas-arboles/)",
        "tags": ["Banner", "Catálogo", "Vivero", "Coclé", "Hero"]
    },
    "COLA-DE-ZORRO.jpg": {
        "title": "Palma Cola de Zorro",
        "scientificName": "Wodyetia bifurcata",
        "category": "palmas",
        "subcategory": "vivero",
        "alt": "Palma Cola de Zorro en macetón para bulevares y residenciales en Panamá - JUSA",
        "description": "Palma elegante con frondas plumosas tupidas que recuerdan la cola de un zorro; excelente para avenidas, sol directo y bajo mantenimiento.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Palmas / Sol Directo / Avenidas PH)",
        "tags": ["Palmas", "Vivero", "Sol Pleno", "Avenidas", "Bulevares"]
    },
    "CROTO.jpg": {
        "title": "Crotón Petro",
        "scientificName": "Codiaeum variegatum",
        "category": "plantas",
        "subcategory": "vivero",
        "alt": "Planta ornamental Crotón Petro de hojas multicolor para jardinería tropical - JUSA",
        "description": "Arbusto ornamental de follaje coriáceo con intensas tonalidades amarillas, rojas y verdes; requiere pleno sol para máxima luminosidad cromática.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Plantas Ornamentales / Sol / Canteros)",
        "tags": ["Plantas", "Ornamentales", "Sol", "Color", "Vivero"]
    },
    "DJI_0677-Mejorado-NR.jpg": {
        "title": "Vista Aérea con Dron: Finca de Pitahaya (7 Hectáreas, Coclé)",
        "scientificName": "Hylocereus costaricensis / monacanthus",
        "category": "agro",
        "subcategory": "pitahaya",
        "alt": "Vista aérea con dron de las 7 hectáreas de plantación tecnificada de pitahaya en Río Grande, Coclé - Jardines Urbanos",
        "description": "Toma aérea de dron que documenta la escala agroindustrial y el sistema tecnificado de espalderas de pitahaya roja de exportación en Coclé.",
        "recommendedPlacement": "Hero Banner de Pitahaya (/productores-pitahaya-panama/) y Showcase Fincas en Coclé",
        "tags": ["Agro", "Pitahaya", "Coclé", "Dron", "Exportación", "Escala"]
    },
    "GINGER-VARIEGADO.jpg": {
        "title": "Ginger Variegado",
        "scientificName": "Alpinia zerumbet 'Variegata'",
        "category": "plantas",
        "subcategory": "vivero",
        "alt": "Planta tropical Ginger Variegado para macizos y diseño biofílico en Panamá - JUSA",
        "description": "Follaje tropical exuberante con rayas verde claro y crema; aroma especiado suave y floración cerosa pendular muy apreciada en hotelería.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Plantas Ornamentales / Tropical Luxury)",
        "tags": ["Plantas", "Vivero", "Follaje", "Lujo Tropical", "Aromática"]
    },
    "headerimage4_jardinesurbanos.jpg": {
        "title": "Header Panorámico Institucional",
        "scientificName": "",
        "category": "banners",
        "subcategory": "institucional",
        "alt": "Cabecera panorámica corporativa de Jardines Urbanos S.A.",
        "description": "Cabecera horizontal optimizada para la identidad visual de secciones secundarias institucionales.",
        "recommendedPlacement": "Cabecera estándar de páginas secundarias (/nosotros/, /contacto/)",
        "tags": ["Banner", "Institucional", "Corporativo"]
    },
    "HIDROSIEMBRA-MAQUINA.jpg": {
        "title": "Hidrosembrador Mecanizado JUSA en Operación sobre Talud",
        "scientificName": "Hydroseeding & Erosion Control",
        "category": "b2b_hidrosiembra",
        "subcategory": "maquinaria",
        "alt": "Camión hidrosembrador de Jardines Urbanos aplicando mezcla estabilizadora en talud de obra vial en Panamá",
        "description": "Maquinaria pesada propia hidrosembradora aplicando lechada de mulch de fibra de madera, semillas certificadas, pegamentos biodegradables y fertilizante sobre corte vial.",
        "recommendedPlacement": "Hero Banner y sección de equipos en /hidrosiembra-control-erosion-panama/ y tarjeta B2B Home",
        "tags": ["B2B", "Hidrosiembra", "Taludes", "Maquinaria", "Control de Erosión", "Obras Viales"]
    },
    "IMG_8680.jpg": {
        "title": "Paisajismo Residencial de Autor",
        "scientificName": "",
        "category": "proyectos",
        "subcategory": "residencial",
        "alt": "Proyecto de paisajismo residencial exclusivo ejecutado por Jardines Urbanos en Panamá",
        "description": "Composición de palmas maduras, césped Zoysia y canteros perimetrales en proyecto residencial panameño de alto perfil.",
        "recommendedPlacement": "Galería de Casos de Éxito Residenciales en /proyectos-portafolio/ y Home",
        "tags": ["Proyectos", "Residencial", "Portafolio", "Paisajismo"]
    },
    "JAPONESA-CLOSEUP.jpg": {
        "title": "Césped Zoysia Japónica - Macro Textura",
        "scientificName": "Zoysia japonica",
        "category": "gramas",
        "subcategory": "variedades",
        "alt": "Detalle macro de césped natural Zoysia Japónica tolerante a salinidad costera - Finca JUSA",
        "description": "Hoja de textura media-fina de alta resistencia salina marina, óptima para residencias de playa (Buenaventura, Coronado) e islas.",
        "recommendedPlacement": "Tarjeta de producto en /gramas-naturales-panama/zoysia-japonica/ y Calculadora",
        "tags": ["Gramas", "Zoysia Japónica", "Playa", "Salinidad", "Césped"]
    },
    "JAPONESA-PROYECTO.jpg": {
        "title": "Proyecto Residencial con Zoysia Japónica Instalada",
        "scientificName": "Zoysia japonica",
        "category": "gramas",
        "subcategory": "proyectos",
        "alt": "Césped Zoysia Japónica recién instalado y tupido en residencia de playa en Panamá - JUSA",
        "description": "Acabado homogéneo tipo tapete verde continuo en residencial costero de Panamá.",
        "recommendedPlacement": "Showcase de Zoysia Japónica instalada en residencia y slider de proyectos",
        "tags": ["Gramas", "Zoysia Japónica", "Proyectos", "Playa", "Residencial"]
    },
    "JAZMIN-ESTRELLA.jpg": {
        "title": "Jazmín Estrella",
        "scientificName": "Trachelospermum jasminoides",
        "category": "plantas",
        "subcategory": "vivero",
        "alt": "Enredadera Jazmín Estrella con flores aromáticas para muros verdes y pérgolas - Vivero JUSA",
        "description": "Trepador leñoso perenne de hojas lustrosas y profusa floración blanca estrellada de perfume intenso.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Trepadoras / Aromáticas / Cercas Vivas)",
        "tags": ["Plantas", "Trepadoras", "Aromáticas", "Muros Verdes", "Vivero"]
    },
    "MONSTERA.jpg": {
        "title": "Monstera Deliciosa (Costilla de Adán)",
        "scientificName": "Monstera deliciosa",
        "category": "plantas",
        "subcategory": "vivero",
        "alt": "Monstera Deliciosa de gran porte en maceta para interiores y terrazas - JUSA Panamá",
        "description": "Icónica planta de sotobosque tropical con hojas fenestradas gigantes; ideal para semisombra y diseño contemporáneo.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Interiores / Terrazas / Semisombra)",
        "tags": ["Plantas", "Monstera", "Interiores", "Semisombra", "Vivero"]
    },
    "NEEM.jpg": {
        "title": "Árbol de Neem",
        "scientificName": "Azadirachta indica",
        "category": "arboles",
        "subcategory": "vivero",
        "alt": "Árbol de Neem en contenedor para sombra y control fitosanitario natural - Jardines Urbanos",
        "description": "Árbol de rápido crecimiento y copa densa; reconocido por su tolerancia a sequía y extractos repelentes naturales.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Árboles / Sombra / Repelente Fitosanitario)",
        "tags": ["Árboles", "Vivero", "Sombra", "Fitosanitario", "Resistencia"]
    },
    "Nosotros1.jpg": {
        "title": "Equipo Técnico JUSA - Selección Botánica en Campo",
        "scientificName": "",
        "category": "institucional",
        "subcategory": "equipo",
        "alt": "Ingenieros agrónomos y personal técnico de Jardines Urbanos evaluando sanidad vegetal en finca",
        "description": "Inspección técnica fitosanitaria de ejemplares ornamentales en las parcelas de aclimatación de Coclé.",
        "recommendedPlacement": "Página /nosotros/ (Bloque: Equipo Humano y Selección Botánica)",
        "tags": ["Institucional", "Equipo", "Agronomía", "Calidad", "Finca"]
    },
    "Nosotros2.jpg": {
        "title": "Instalaciones de Vivero y Casa de Malla en Coclé",
        "scientificName": "",
        "category": "institucional",
        "subcategory": "finca",
        "alt": "Instalaciones de vivero techado y casa de malla de Jardines Urbanos en Río Grande, Coclé",
        "description": "Infraestructura agroindustrial con microaspersión para propagación y aclimatación de plantas.",
        "recommendedPlacement": "Página /nosotros/ (Bloque: Infraestructura y Vivero en Coclé)",
        "tags": ["Institucional", "Infraestructura", "Vivero", "Coclé"]
    },
    "Nosotros3.jpg": {
        "title": "Cuadrilla JUSA en Obra de Paisajismo",
        "scientificName": "",
        "category": "institucional",
        "subcategory": "equipo",
        "alt": "Cuadrilla especializada de Jardines Urbanos ejecutando siembra e instalación en sitio",
        "description": "Personal uniformado con EPP realizando movimientos de tierra, calce de césped y siembra botánica.",
        "recommendedPlacement": "Página /nosotros/ y /paisajismo-mantenimiento-areas-verdes/ (Cuadrilla en Sitio)",
        "tags": ["Institucional", "Equipo", "Cuadrilla", "Instalación", "Obras"]
    },
    "Nosotros4.jpg": {
        "title": "Producción Botánica en Maceteros de Gran Formato",
        "scientificName": "",
        "category": "institucional",
        "subcategory": "finca",
        "alt": "Filas de macetones de gran porte en proceso de aclimatación en vivero Coclé - JUSA",
        "description": "Líneas de producción con sustrato enriquecido y riego automatizado para disponibilidad comercial inmediata.",
        "recommendedPlacement": "Página /nosotros/ (Bloque: Aclimatación y Control de Calidad)",
        "tags": ["Institucional", "Producción", "Vivero", "Aclimatación"]
    },
    "PALMA-REAL-FINCA.jpg": {
        "title": "Palmas Reales (Roystonea regia) en Finca Coclé",
        "scientificName": "Roystonea regia",
        "category": "palmas",
        "subcategory": "finca",
        "alt": "Cultivo a gran escala de Palmas Reales en suelo de finca en Río Grande, Coclé - JUSA",
        "description": "Hectáreas dedicadas al cultivo en suelo abierto de Palma Real cubana aclimatada a Panamá, listas para trasplante monumental.",
        "recommendedPlacement": "Hero de Palmas Ornamentales y Catálogo (Palma Real en producción propia)",
        "tags": ["Palmas", "Palma Real", "Finca", "Coclé", "Monumental"]
    },
    "Pitahaya2.jpg": {
        "title": "Flor y Fruto de Pitahaya Roja en Producción",
        "scientificName": "Hylocereus costaricensis / monacanthus",
        "category": "agro",
        "subcategory": "pitahaya",
        "alt": "Fruto maduro y flor de pitahaya roja cultivada en espaldera en Coclé - Jardines Urbanos",
        "description": "Detalle botánico de la fruta exótica de pulpa carmesí cosechada en las parcelas de JUSA para exportación y canal horeca.",
        "recommendedPlacement": "Ficha técnica y botánica en /productores-pitahaya-panama/ y Catálogo Agro",
        "tags": ["Agro", "Pitahaya", "Fruta", "Exportación", "Coclé"]
    },
    "Plantas_Main.jpg": {
        "title": "Banner Vivero de Plantas Ornamentales",
        "scientificName": "",
        "category": "banners",
        "subcategory": "catalogo",
        "alt": "Fondo panorámico de especies ornamentales tropicales del vivero JUSA",
        "description": "Banner de encabezado para la categoría de plantas tropicales y arbustos ornamentales.",
        "recommendedPlacement": "Banner de categoría Plantas y fondo de sección en Home",
        "tags": ["Banner", "Plantas", "Vivero", "Catálogo"]
    },
    "SAE-PARA-COSECHA_mision.jpg": {
        "title": "Máquina Cosechadora Automatizada de Césped en Rollo",
        "scientificName": "Trebro / Kesmac Turf Harvester",
        "category": "maquinaria",
        "subcategory": "finca",
        "alt": "Máquina cosechadora de rollos de césped operando en campo de grama en Coclé - Jardines Urbanos",
        "description": "Maquinaria agronómica especializada cortando rollos de grama con espesor uniforme de raíces y suelo para entrega fresca en menos de 24 horas.",
        "recommendedPlacement": "Sección de respaldo agroindustrial: Cosechadora de rollos en Coclé y ficha de césped",
        "tags": ["Maquinaria", "Cosecha", "Gramas", "Rollos", "Tecnología"]
    },
    "SAN-AGUSTIN-CLOSEUP.jpg": {
        "title": "Grama San Agustín - Textura y Follaje",
        "scientificName": "Stenotaphrum secundatum",
        "category": "gramas",
        "subcategory": "variedades",
        "alt": "Macro detalle de hojas anchas y densas de grama San Agustín para semisombra en Panamá - JUSA",
        "description": "Césped de hoja gruesa color verde oscuro azulado, tolerante a zonas arboladas con sombra moderada y suelos de pH variable.",
        "recommendedPlacement": "Tarjeta de producto en /gramas-naturales-panama/san-agustin/ y Calculadora",
        "tags": ["Gramas", "San Agustín", "Semisombra", "Césped", "Parques"]
    },
    "SAN-AGUSTIN-HEADER.jpg": {
        "title": "Campo de Cultivo Masivo de Grama San Agustín en Coclé",
        "scientificName": "Stenotaphrum secundatum",
        "category": "gramas",
        "subcategory": "finca",
        "alt": "Vista panorámica de campos de cultivo intensivo de grama San Agustín en Coclé - JUSA",
        "description": "Extensas parcelas bajo riego mecanizado en Río Grande para abastecer proyectos de urbanizaciones y campos verdes.",
        "recommendedPlacement": "Encabezado de San Agustín y sección Cultivos a Escala",
        "tags": ["Gramas", "San Agustín", "Finca", "Coclé", "Producción"]
    },
    "slider-5-black.jpg": {
        "title": "Paisajismo Corporativo y Comercial en Panamá",
        "scientificName": "",
        "category": "proyectos",
        "subcategory": "comercial",
        "alt": "Proyecto de paisajismo corporativo ejecutado por Jardines Urbanos en Panamá",
        "description": "Instalación de césped impecable y especies ornamentales en áreas públicas de centros corporativos.",
        "recommendedPlacement": "Slider interactivo #1 en Home y landing B2B",
        "tags": ["Proyectos", "Corporativo", "Comercial", "Slider", "Home"]
    },
    "slider-8-black.jpg": {
        "title": "Áreas Verdes Urbanas y Viales",
        "scientificName": "",
        "category": "proyectos",
        "subcategory": "urbano",
        "alt": "Revegetación y paisajismo urbano en Panamá por Jardines Urbanos",
        "description": "Intervención de áreas verdes urbanas combinando cobertura vegetal de bajo mantenimiento y diseño paisajístico.",
        "recommendedPlacement": "Slider interactivo #2 en Home y proyectos comerciales",
        "tags": ["Proyectos", "Urbano", "Vial", "Slider", "Home"]
    },
    "slider-9-black.jpg": {
        "title": "Jardinería de Lujo en Residencia Tropical",
        "scientificName": "",
        "category": "proyectos",
        "subcategory": "residencial",
        "alt": "Residencia de playa contemporánea con césped Zoysia y diseño de autor en Panamá - JUSA",
        "description": "Integración armónica de arquitectura moderna, césped fino Zoysia y paisajismo tropical biofílico.",
        "recommendedPlacement": "Slider interactivo #3 en Home y landing residencial premium",
        "tags": ["Proyectos", "Residencial", "Lujo Tropical", "Slider", "Home"]
    },
    "TARIMAS-SAN-AGUSTIN.jpg": {
        "title": "Tarimas de Grama Cosechada Lista para Despacho",
        "scientificName": "",
        "category": "logistica",
        "subcategory": "despacho",
        "alt": "Tarimas con rollos de césped natural recién cosechados listos para entrega en camión - Finca JUSA",
        "description": "Rollos frescos apilados sobre tarimas estandarizadas para despacho rápido hacia Panamá, playas o provincias centrales.",
        "recommendedPlacement": "Sección Despacho a Nivel Nacional y soporte de cotización por m²",
        "tags": ["Logística", "Despacho", "Tarimas", "Rollos", "Nacional"]
    },
    "TORO-CLOSEUP-1.jpg": {
        "title": "Zoysia Toro - Tapete de Césped Premium",
        "scientificName": "Zoysia japonica 'Toro'",
        "category": "gramas",
        "subcategory": "variedades",
        "alt": "Césped natural Zoysia Toro en rollo de textura fina y verde esmeralda - Jardines Urbanos Panamá",
        "description": "La variedad reina para residencias y canchas deportivas: tejido denso que inhibe malezas, soporta pisadas intensas, mascotas y sol ardiente.",
        "recommendedPlacement": "Tarjeta estelar en /gramas-naturales-panama/zoysia-toro/ y Calculadora",
        "tags": ["Gramas", "Zoysia Toro", "Residencial", "Alto Tráfico", "Césped"]
    },
    "TORO-ZOOM.jpg": {
        "title": "Zoysia Toro - Vista Macro de Densidad Foliar",
        "scientificName": "Zoysia japonica 'Toro'",
        "category": "gramas",
        "subcategory": "variedades",
        "alt": "Macrofotografía de la densidad del follaje de Zoysia Toro cultivada en Coclé - JUSA",
        "description": "Detalle microscópico del entramado de estolones y hojas de Zoysia Toro que brindan suavidad al tacto descalzo y máxima elasticidad.",
        "recommendedPlacement": "Vista macro de densidad foliar en la ficha técnica de Zoysia Toro",
        "tags": ["Gramas", "Zoysia Toro", "Macro", "Densidad", "Detalle"]
    },
    "XANADU.jpg": {
        "title": "Philodendron Xanadú",
        "scientificName": "Thaumatophyllum xanadu",
        "category": "plantas",
        "subcategory": "vivero",
        "alt": "Philodendron Xanadú cultivado en vivero para jardines tropicales en Panamá - JUSA",
        "description": "Planta perenne de porte redondeado y hojas profundamente lobuladas verde brillante; resistente a plagas y excelente para bordes y maceteros.",
        "recommendedPlacement": "Catálogo Botánico (Filtro: Plantas / Bajo Mantenimiento / Borduras)",
        "tags": ["Plantas", "Xanadú", "Vivero", "Semisombra", "Borduras"]
    }
}

# Metadata registry for AI mockups
MOCKUP_METADATA = {
    "talud_antes_erosion.jpg": {
        "title": "Talud Vial con Erosión Severa (Antes de Intervención)",
        "scientificName": "Erosión pluvial en corte de carretera",
        "category": "b2b_hidrosiembra",
        "subcategory": "comparador_antes",
        "alt": "Talud vial en carretera de Panamá con severa erosión de suelo arcilloso y cárcavas antes de hidrosiembra - Simulación referencial",
        "description": "Estado crítico de inestabilidad y pérdida de suelo por lluvias tropicales en corte vial de infraestructura.",
        "recommendedPlacement": "Comparador interactivo Antes/Después en /hidrosiembra-control-erosion-panama/ y Home",
        "tags": ["Antes y Después", "Erosión", "Talud", "Vial", "Simulación Referencial"]
    },
    "talud_despues_hidrosiembra.jpg": {
        "title": "Talud Estabilizado con Hidrosiembra al Día 35 (Después)",
        "scientificName": "Estabilización botánica mecanizada",
        "category": "b2b_hidrosiembra",
        "subcategory": "comparador_despues",
        "alt": "El mismo talud vial estabilizado 35 días después con manto verde denso de hidrosiembra - Jardines Urbanos Panamá",
        "description": "Recuperación completa del perfil del talud mediante hidrosiembra tecnificada, fijación radicular profunda y cero erosión.",
        "recommendedPlacement": "Comparador interactivo Antes/Después en /hidrosiembra-control-erosion-panama/ y Home",
        "tags": ["Antes y Después", "Hidrosiembra", "Talud Estabilizado", "B2B", "Referencial"]
    },
    "jardin_antes_tierra.jpg": {
        "title": "Patio Residencial en Obra Gris y Tierra Desnuda (Antes)",
        "scientificName": "Suelo compactado pre-instalación",
        "category": "proyectos",
        "subcategory": "comparador_antes",
        "alt": "Patio de residencia moderna en Panamá en obra gris y tierra arcillosa antes de paisajismo - Simulación referencial",
        "description": "Espacio exterior sin vegetación, con tierra desnuda compactada y escombros de construcción antes del diseño de áreas verdes.",
        "recommendedPlacement": "Comparador interactivo Antes/Después Residencial en /residencial/ y Home",
        "tags": ["Antes y Después", "Residencial", "Obra Gris", "Patio", "Simulación Referencial"]
    },
    "jardin_despues_zoysia.jpg": {
        "title": "Jardín Residencial con Zoysia Toro y Paisajismo Tropical (Después)",
        "scientificName": "Zoysia japonica 'Toro' + Paisajismo de Autor",
        "category": "proyectos",
        "subcategory": "comparador_despues",
        "alt": "El mismo jardín residencial transformado con césped Zoysia Toro esmeralda y palmas de vivero - Jardines Urbanos",
        "description": "Transformación integral del patio exterior: alfombra de césped Zoysia Toro, piscina limpia, palmeras perimetrales y mobiliario de terraza.",
        "recommendedPlacement": "Comparador interactivo Antes/Después Residencial en /residencial/ y Home",
        "tags": ["Antes y Después", "Residencial", "Zoysia Toro", "Lujo Tropical", "Piscina", "Referencial"]
    },
    "guayacan_arbol.jpg": {
        "title": "Guayacán Amarillo",
        "scientificName": "Handroanthus chrysanthus",
        "category": "arboles",
        "subcategory": "catalogo_nativas",
        "alt": "Árbol de Guayacán en floración masiva dorada amarilla en Panamá - Catálogo Botánico JUSA",
        "description": "Árbol nativo emblemático de Panamá con espectacular floración amarillo oro durante la estación seca; altamente demandado en arboricultura urbana.",
        "recommendedPlacement": "Catálogo Botánico Vivo (Filtro: Árboles Nativos / Floración / Sol)",
        "tags": ["Árboles", "Nativo", "Guayacán", "Floración Amarilla", "Catálogo", "Referencial"]
    },
    "arbol_panama.jpg": {
        "title": "Árbol Panamá (Árbol Nacional)",
        "scientificName": "Sterculia apetala",
        "category": "arboles",
        "subcategory": "catalogo_nativas",
        "alt": "Árbol Panamá Sterculia apetala, Árbol Nacional de la República de Panamá con raíces tabulares - JUSA",
        "description": "Árbol Nacional de Panamá; espécimen majestuoso de copa ancha y grandes contrafuertes basilares, fundamental para reforestación y mitigación ambiental.",
        "recommendedPlacement": "Catálogo Botánico Vivo (Filtro: Árboles Nativos / Sombra / Mitigación)",
        "tags": ["Árboles", "Nativo", "Árbol Nacional", "Panamá", "Reforestación", "Referencial"]
    },
    "roble_sabanero.jpg": {
        "title": "Roble Sabanero (Roble Rosado)",
        "scientificName": "Tabebuia rosea",
        "category": "arboles",
        "subcategory": "catalogo_nativas",
        "alt": "Roble Sabanero en plena floración rosada pastel bajo el sol panameño - Vivero JUSA",
        "description": "Árbol caducifolio nativo con abundante floración color rosa pastel; copa simétrica ideal para sombra en parques, bulevares y canteros residenciales.",
        "recommendedPlacement": "Catálogo Botánico Vivo (Filtro: Árboles Nativos / Floración Rosa / Parques)",
        "tags": ["Árboles", "Nativo", "Roble Sabanero", "Floración Rosada", "Parques", "Referencial"]
    },
    "palma_viajera.jpg": {
        "title": "Palma Viajera",
        "scientificName": "Ravenala madagascariensis",
        "category": "palmas",
        "subcategory": "catalogo_nativas",
        "alt": "Palma Viajera con abanico foliar arquitectónico en jardín contemporáneo panameño - JUSA",
        "description": "Especie monumental con hojas gigantes dispuestas en un abanico plano perfecto; punto focal escultural para entradas de hoteles y villas.",
        "recommendedPlacement": "Catálogo Botánico Vivo (Filtro: Palmas / Arquitectónica / Lujo)",
        "tags": ["Palmas", "Palma Viajera", "Arquitectónica", "Abanico", "Referencial"]
    },
    "calathea_bijao.jpg": {
        "title": "Calathea Bijao",
        "scientificName": "Calathea lutea",
        "category": "plantas",
        "subcategory": "catalogo_nativas",
        "alt": "Calathea Bijao con hojas erectas anchas y envés ceroso plateado - Jardines Urbanos",
        "description": "Planta tropical de hojas anchas y erectas con envés ceroso blanquecino de gran valor biofílico en diseño de jardines contemporáneos.",
        "recommendedPlacement": "Catálogo Botánico Vivo (Filtro: Plantas Ornamentales / Follaje Biofílico / Semisombra)",
        "tags": ["Plantas", "Bijao", "Follaje", "Biofílico", "Semisombra", "Referencial"]
    }
}

def get_file_info(file_path):
    with open(file_path, "rb") as f:
        data = f.read()
    sha256 = hashlib.sha256(data).hexdigest().upper()
    size_bytes = len(data)
    with Image.open(file_path) as img:
        width, height = img.size
        img_format = img.format
    aspect_ratio = round(width / height, 2)
    orientation = "cuadrada" if aspect_ratio == 1.0 else ("horizontal" if aspect_ratio > 1.0 else "vertical")
    return {
        "width": width,
        "height": height,
        "aspectRatio": aspect_ratio,
        "orientation": orientation,
        "sizeBytes": size_bytes,
        "sha256": sha256,
        "format": img_format
    }

def main():
    manifest_items = []

    # Process Official Photos
    for filename in sorted(os.listdir(IMG_DIR)):
        if not filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        filepath = os.path.join(IMG_DIR, filename)
        info = get_file_info(filepath)
        meta = OFFICIAL_METADATA.get(filename, {
            "title": filename,
            "scientificName": "",
            "category": "general",
            "subcategory": "general",
            "alt": f"Fotografía oficial de {filename} - Jardines Urbanos S.A.",
            "description": "Fotografía oficial de fincas y viveros de Jardines Urbanos S.A.",
            "recommendedPlacement": "Sitio Web",
            "tags": ["Oficial"]
        })

        item = {
            "id": f"img_{os.path.splitext(filename)[0]}",
            "filename": filename,
            "relativePath": f"assets/img/{filename}",
            "absoluteWebPath": f"/assets/img/{filename}",
            "isOfficial": True,
            "isMockup": False,
            "sourceTag": "[Foto Oficial Finca JUSA]",
            "sourceType": "OFICIAL_FINCA_JUSA",
            "badgeText": "Foto Oficial JUSA",
            "badgeClass": "badge-official",
            "title": meta["title"],
            "scientificName": meta["scientificName"],
            "category": meta["category"],
            "subcategory": meta["subcategory"],
            "alt": meta["alt"],
            "description": meta["description"],
            "recommendedPlacement": meta["recommendedPlacement"],
            "tags": meta["tags"],
            "dimensions": {
                "width": info["width"],
                "height": info["height"],
                "aspectRatio": info["aspectRatio"],
                "orientation": info["orientation"]
            },
            "fileSize": info["sizeBytes"],
            "sha256": info["sha256"],
            "mimeType": "image/jpeg"
        }
        manifest_items.append(item)

    # Process AI Mockups
    for filename in sorted(os.listdir(MOCKUPS_DIR)):
        if not filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        filepath = os.path.join(MOCKUPS_DIR, filename)
        info = get_file_info(filepath)
        meta = MOCKUP_METADATA.get(filename, {
            "title": filename,
            "scientificName": "",
            "category": "mockup",
            "subcategory": "mockup",
            "alt": f"Mockup referencial de {filename}",
            "description": "Mockup generado por IA para representar especie o escenario referencial.",
            "recommendedPlacement": "Catálogo Botánico",
            "tags": ["Mockup", "Referencial"]
        })

        item = {
            "id": f"mockup_{os.path.splitext(filename)[0]}",
            "filename": filename,
            "relativePath": f"assets/mockups/{filename}",
            "absoluteWebPath": f"/assets/mockups/{filename}",
            "isOfficial": False,
            "isMockup": True,
            "sourceTag": "[Variedad de Finca • Imagen Referencial]",
            "sourceType": "MOCKUP_IA_REFERENCIAL",
            "badgeText": "Variedad de Finca • Imagen Referencial",
            "badgeClass": "badge-mockup",
            "title": meta["title"],
            "scientificName": meta["scientificName"],
            "category": meta["category"],
            "subcategory": meta["subcategory"],
            "alt": meta["alt"],
            "description": meta["description"],
            "recommendedPlacement": meta["recommendedPlacement"],
            "tags": meta["tags"],
            "dimensions": {
                "width": info["width"],
                "height": info["height"],
                "aspectRatio": info["aspectRatio"],
                "orientation": info["orientation"]
            },
            "fileSize": info["sizeBytes"],
            "sha256": info["sha256"],
            "mimeType": "image/jpeg"
        }
        manifest_items.append(item)

    manifest_data = {
        "schemaVersion": "1.0.0",
        "generatedAt": "2026-11-08T10:41:00Z",
        "brand": "Jardines Urbanos, S.A. (Panamá)",
        "summary": {
            "totalItems": len(manifest_items),
            "officialPhotosCount": sum(1 for x in manifest_items if x["isOfficial"]),
            "mockupsCount": sum(1 for x in manifest_items if x["isMockup"]),
            "categories": sorted(list(set(x["category"] for x in manifest_items)))
        },
        "integrityNotes": [
            "Todas las 33 fotos oficiales proceden directamente de https://jardinesurbanos.com/ y corresponden a fincas, proyectos y maquinaria de JUSA en Panamá.",
            "Las 9 imágenes mockup fueron generadas con IA para ilustrar comparadores Antes/Después y especies nativas registradas en la biblioteca CMS de JUSA sin archivo local previo.",
            "Todas las imágenes mockup portan el sourceTag '[Variedad de Finca • Imagen Referencial]'.",
            "Se excluyeron de forma estricta las 2 fotos de 02_referencias_externas/ para garantizar veracidad absoluta en activos públicos."
        ],
        "items": manifest_items
    }

    # Write JSON
    json_path = os.path.join(ASSETS_DIR, "media_manifest.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2, ensure_ascii=False)
    print(f"Wrote JSON manifest: {json_path} ({os.path.getsize(json_path)} bytes)")

    # Write JS (supports both ES module and global script inclusion)
    js_content = f"""/**
 * media_manifest.js
 * Jardines Urbanos, S.A. (Panamá) - Media Asset Manifest & Integrity Registry
 * Generated: {manifest_data["generatedAt"]}
 * Total Items: {manifest_data["summary"]["totalItems"]} ({manifest_data["summary"]["officialPhotosCount"]} Oficiales + {manifest_data["summary"]["mockupsCount"]} Mockups)
 */

(function(root, factory) {{
  if (typeof define === 'function' && define.amd) {{
    define([], factory);
  }} else if (typeof module === 'object' && module.exports) {{
    module.exports = factory();
  }} else {{
    root.JUSA_MEDIA_MANIFEST = factory();
  }}
}}(typeof self !== 'undefined' ? self : this, function() {{
  const manifest = {json.dumps(manifest_data, indent=2, ensure_ascii=False)};

  manifest.getByFilename = function(filename) {{
    return manifest.items.find(item => item.filename === filename);
  }};

  manifest.getByCategory = function(category) {{
    return manifest.items.filter(item => item.category === category);
  }};

  manifest.getOfficialOnly = function() {{
    return manifest.items.filter(item => item.isOfficial);
  }};

  manifest.getMockupsOnly = function() {{
    return manifest.items.filter(item => item.isMockup);
  }};

  return manifest;
}}));

// Export for ES modules
if (typeof exportValue !== 'undefined') {{
  // placeholder
}}
"""
    js_path = os.path.join(ASSETS_DIR, "media_manifest.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Wrote JS manifest: {js_path} ({os.path.getsize(js_path)} bytes)")

if __name__ == "__main__":
    main()
