import os
from PIL import Image
import numpy as np

img_dir = os.path.join('site', 'assets', 'img')

audit_data = [
    # 1. Home
    {
        'page': 'Inicio (Home)',
        'file': 'DJI_0677_mobile.jpg',
        'source': 'DJI_0677-Mejorado-NR.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Finca Coclé: Vista aérea tecnificada 7 hectáreas de cultivo de grama',
        'focal_elements': 'Campo verde continuo, canales de riego y horizonte agrario'
    },
    {
        'page': 'Inicio (Home)',
        'file': 'hero_2_gramas_mobile.jpg',
        'source': 'hero_2_gramas_finca.jpg',
        'crop_center': 0.42,
        'expected_scene': 'Grama Certificada: Tractor cosechador y tarimas de rollos frescos',
        'focal_elements': 'Tractor mecanizado cosechando rollos verdes sobre estibas de madera'
    },
    {
        'page': 'Inicio (Home)',
        'file': 'hero_3_hidrosiembra_mobile.jpg',
        'source': 'hero_3_hidrosiembra.jpg',
        'crop_center': 0.38,
        'expected_scene': 'Ingeniería B2B: Cañón de hidrosiembra disparando mulch verde sobre talud',
        'focal_elements': 'Camión cisterna / hidrosembradora y chorro de mulch de alta presión'
    },
    {
        'page': 'Inicio (Home)',
        'file': 'hero_4_vivero_mobile.jpg',
        'source': 'hero_4_vivero_palmas.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Vivero Monumental: Palmas Reales y Bismarckias en Río Grande',
        'focal_elements': 'Copas majestuosas de palmas tropicales alineadas y cielo abierto'
    },
    
    # 2. Nosotros
    {
        'page': 'Sobre Nosotros',
        'file': 'letrero_finca_nosotros_mobile.jpg',
        'source': 'letrero_finca_nosotros_derecha.jpg',
        'crop_center': 0.65,
        'expected_scene': 'Cartelera Monumental: Muro de piedra con letras doradas de la Finca JUSA',
        'focal_elements': 'Monumento de piedra labrada con marca institucional y palmas de entrada'
    },
    {
        'page': 'Sobre Nosotros',
        'file': 'subhero_cont_2_mobile.jpg',
        'source': 'subhero_cont_2.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Trayectoria 25+ años: Perspectiva aérea integral de fincas de producción',
        'focal_elements': 'Panorámica de parcelas cultivadas con gramas de exportación'
    },
    {
        'page': 'Sobre Nosotros',
        'file': 'subhero_cont_3_mobile.jpg',
        'source': 'subhero_cont_3.jpg',
        'crop_center': 0.45,
        'expected_scene': 'Equipo de Campo: Vivero botánico y arbolado con personal especializado',
        'focal_elements': 'Líneas de producción botánica y ejemplares en crecimiento'
    },
    
    # 3. Residencial
    {
        'page': 'Residencial & PH',
        'file': 'subhero_res_1_mobile.jpg',
        'source': 'subhero_res_1.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Casas de Playa: Tapete verde Zoysia Japónica tolerante al salitre',
        'focal_elements': 'Césped esmeralda impecable frente a residencia con piscina'
    },
    {
        'page': 'Residencial & PH',
        'file': 'subhero_res_2_mobile.jpg',
        'source': 'subhero_res_2.jpg',
        'crop_center': 0.42,
        'expected_scene': 'Zonas Sombreadas: Tapete denso de grama San Agustín',
        'focal_elements': 'Rollos cosechados de alta densidad y follaje verde lustroso'
    },
    {
        'page': 'Residencial & PH',
        'file': 'subhero_res_3_mobile.jpg',
        'source': 'subhero_res_3.jpg',
        'crop_center': 0.48,
        'expected_scene': 'Familia y Mascotas: Alfombra Zoysia Toro resistente y mullida',
        'focal_elements': 'Jardín residencial amplio con textura suave para juego infantil'
    },
    {
        'page': 'Residencial & PH',
        'file': 'subhero_res_4_mobile.jpg',
        'source': 'subhero_res_4.jpg',
        'crop_center': 0.45,
        'expected_scene': 'Despacho Residencial: Rollos frescos cosechados el mismo día',
        'focal_elements': 'Estibas de rollos compactos listos para instalación inmediata'
    },
    
    # 4. B2B
    {
        'page': 'B2B & Hidrosiembra',
        'file': 'subhero_b2b_1_mobile.jpg',
        'source': 'subhero_b2b_1.jpg',
        'crop_center': 0.38,
        'expected_scene': 'Infraestructura Vial: Máquina de hidrosiembra estabilizando taludes',
        'focal_elements': 'Aplicación de hidro-mulch en corte de carretera para control de erosión'
    },
    {
        'page': 'B2B & Hidrosiembra',
        'file': 'subhero_b2b_2_mobile.jpg',
        'source': 'subhero_b2b_2.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Talud Terminado: Estabilización verde consolidada con cobertura total',
        'focal_elements': 'Pendiente empinada cubierta uniformemente sin deslaves'
    },
    {
        'page': 'B2B & Hidrosiembra',
        'file': 'subhero_b2b_3_mobile.jpg',
        'source': 'subhero_b2b_3.jpg',
        'crop_center': 0.60,
        'expected_scene': 'Obras Viales: Despacho a gran escala en camiones de plataforma',
        'focal_elements': 'Logística pesada y maquinaria de carga en proyectos viales'
    },
    {
        'page': 'B2B & Hidrosiembra',
        'file': 'subhero_b2b_4_mobile.jpg',
        'source': 'subhero_b2b_4.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Capacidad Agro-Industrial: 7 hectáreas continuas de suministro en Coclé',
        'focal_elements': 'Extensión de grama en producción con capacidad de abasto continuo'
    },
    
    # 5. Catalogo
    {
        'page': 'Catálogo Botánico',
        'file': 'subhero_cat_1_mobile.jpg',
        'source': 'subhero_cat_1.jpg',
        'crop_center': 0.40,
        'expected_scene': 'Vivero Completo: Panorámica de cultivo botánico e inventario verificado',
        'focal_elements': 'Canteros ordenados con plantas tropicales y árboles ornamentales'
    },
    {
        'page': 'Catálogo Botánico',
        'file': 'subhero_cat_2_mobile.jpg',
        'source': 'subhero_cat_2.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Flora Tropical: Palmas ornamentales y plantas de lujo en cepellón',
        'focal_elements': 'Ejemplares botánicos frondosos aclimatados al trópico panameño'
    },
    {
        'page': 'Catálogo Botánico',
        'file': 'subhero_cat_3_mobile.jpg',
        'source': 'subhero_cat_3.jpg',
        'crop_center': 0.50,
        'expected_scene': 'Palmas Reales: Ejemplares monumentales con poda radicular para urbanismos',
        'focal_elements': 'Troncos rectos y estéticos con coronas verdes vigorosas'
    },
    {
        'page': 'Catálogo Botánico',
        'file': 'subhero_cat_4_mobile.jpg',
        'source': 'subhero_cat_4.jpg',
        'crop_center': 0.45,
        'expected_scene': 'Lujo Paisajístico: Palmas Bismarckia plateadas y follajes esculturales',
        'focal_elements': 'Abanicos azul-plata distintivos de Bismarckia nobilis en pleno esplendor'
    }
]

def run_audit():
    print(f"=== INICIANDO AUDITORIA TECNICA Y VISUAL: {len(audit_data)} IMAGENES ===")
    results = []
    for item in audit_data:
        m_file = item['file']
        s_file = item['source']
        m_path = os.path.join(img_dir, m_file)
        s_path = os.path.join(img_dir, s_file)
        
        if not os.path.exists(m_path):
            print(f"FAILED: {m_file} does not exist!")
            continue
            
        kb = os.path.getsize(m_path) / 1024.0
        
        with Image.open(m_path) as mob, Image.open(s_path) as desk:
            w, h = mob.size
            mob_mode = mob.mode
            mob_format = mob.format
            is_prog = bool(mob.info.get('progressive', False))
            
            # Verify no corruption
            mob.verify()
            
        with Image.open(m_path) as mob:
            hsv = mob.convert('HSV')
            h_arr, s_arr, v_arr = np.array(hsv).transpose(2, 0, 1)
            mean_sat = float(np.mean(s_arr) / 255.0 * 100.0)
            mean_val = float(np.mean(v_arr) / 255.0 * 100.0)
            contrast = float(np.std(v_arr) / 255.0 * 100.0)
            
            # Dimensions check
            dim_ok = (w == 800 and h == 1200)
            # Size check
            size_ok = (kb < 250.0)
            # Visual check
            vibrant_ok = (mean_sat > 20.0 and contrast > 15.0)
            
            status = "CERTIFICADO" if (dim_ok and size_ok and vibrant_ok and mob_mode == 'RGB') else "OBSERVACION"
            
            res = {
                'page': item['page'],
                'file': m_file,
                'source': s_file,
                'dimensions': f"{w}x{h} px",
                'weight_kb': round(kb, 1),
                'format': f"{mob_format} (Prog: {is_prog})",
                'saturation': f"{mean_sat:.1f}%",
                'contrast': f"{contrast:.1f}%",
                'brightness': f"{mean_val:.1f}%",
                'scene': item['expected_scene'],
                'focal': item['focal_elements'],
                'status': status
            }
            results.append(res)
            print(f"[{status}] {m_file:32} | {w}x{h} px | {kb:5.1f} KB | Sat: {mean_sat:4.1f}% | Cont: {contrast:4.1f}% | {item['expected_scene'][:40]}...")

    print("\nRESUMEN GLOBAL:")
    print(f"Total auditadas: {len(results)}/19")
    cert_count = sum(1 for r in results if r['status'] == 'CERTIFICADO')
    print(f"Certificadas al 100%: {cert_count}/19")
    max_kb = max(r['weight_kb'] for r in results)
    min_kb = min(r['weight_kb'] for r in results)
    avg_kb = sum(r['weight_kb'] for r in results) / len(results)
    print(f"Rango de peso: {min_kb} KB - {max_kb} KB (Promedio: {avg_kb:.1f} KB)")
    print(f"Todas < 250 KB: {all(r['weight_kb'] < 250.0 for r in results)}")
    print(f"Todas 800x1200 px: {all(r['dimensions'] == '800x1200 px' for r in results)}")

if __name__ == '__main__':
    run_audit()
