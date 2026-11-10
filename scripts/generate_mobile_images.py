import os
from PIL import Image, ImageEnhance

# Definition of the 19 images with their source, target, focal center_x, and notes
JOBS = [
    # 1. Home (site/index.html)
    {
        "page": "Home",
        "src": "site/assets/img/DJI_0677-Mejorado-NR.jpg",
        "dst": "site/assets/img/DJI_0677_mobile.jpg",
        "center_x": 960,
        "desc": "Campo de grama verde de 7 hectáreas y cultivo tecnificado en Río Grande, Coclé"
    },
    {
        "page": "Home",
        "src": "site/assets/img/hero_2_gramas_finca.jpg",
        "dst": "site/assets/img/hero_2_gramas_mobile.jpg",
        "center_x": 940,
        "desc": "Tractor cosechador y tarimas de rollos frescos de grama certificada"
    },
    {
        "page": "Home",
        "src": "site/assets/img/hero_3_hidrosiembra.jpg",
        "dst": "site/assets/img/hero_3_hidrosiembra_mobile.jpg",
        "center_x": 800,
        "desc": "Cañón de hidrosiembra disparando mulch verde sobre talud"
    },
    {
        "page": "Home",
        "src": "site/assets/img/hero_4_vivero_palmas.jpg",
        "dst": "site/assets/img/hero_4_vivero_mobile.jpg",
        "center_x": 960,
        "desc": "Copas majestuosas de Palmas Reales y Bismarckias en vivero botánico"
    },

    # 2. Sobre Nosotros (site/pages/nosotros.html)
    {
        "page": "Nosotros",
        "src": "site/assets/img/letrero_finca_nosotros_derecha.jpg",
        "dst": "site/assets/img/letrero_finca_nosotros_mobile.jpg",
        "center_x": 1248, # 65% focal center
        "desc": "Cartelera monumental de piedra de la finca en Coclé con letras doradas nítidas"
    },
    {
        "page": "Nosotros",
        "src": "site/assets/img/subhero_cont_2.jpg",
        "dst": "site/assets/img/subhero_cont_2_mobile.jpg",
        "center_x": 960,
        "desc": "Perspectiva aérea panorámica de producción tecnificada"
    },
    {
        "page": "Nosotros",
        "src": "site/assets/img/subhero_cont_3.jpg",
        "dst": "site/assets/img/subhero_cont_3_mobile.jpg",
        "center_x": 960,
        "desc": "Operarios de campo y vivero botánico de Palmas Reales"
    },

    # 3. Residencial & PH (site/pages/residencial.html)
    {
        "page": "Residencial",
        "src": "site/assets/img/subhero_res_1.jpg",
        "dst": "site/assets/img/subhero_res_1_mobile.jpg",
        "center_x": 960,
        "desc": "Tapete de grama Zoysia Japónica frente a casa de playa"
    },
    {
        "page": "Residencial",
        "src": "site/assets/img/subhero_res_2.jpg",
        "dst": "site/assets/img/subhero_res_2_mobile.jpg",
        "center_x": 940,
        "desc": "Grama San Agustín densa y vibrante bajo sombra"
    },
    {
        "page": "Residencial",
        "src": "site/assets/img/subhero_res_3.jpg",
        "dst": "site/assets/img/subhero_res_3_mobile.jpg",
        "center_x": 960,
        "desc": "Alfombra Zoysia Toro resistente para familia y mascotas"
    },
    {
        "page": "Residencial",
        "src": "site/assets/img/subhero_res_4.jpg",
        "dst": "site/assets/img/subhero_res_4_mobile.jpg",
        "center_x": 960,
        "desc": "Entrega fresca de rollos de grama cosechados sobre tarimas"
    },

    # 4. B2B & Hidrosiembra (site/pages/b2b-hidrosiembra.html)
    {
        "page": "B2B",
        "src": "site/assets/img/subhero_b2b_1.jpg",
        "dst": "site/assets/img/subhero_b2b_1_mobile.jpg",
        "center_x": 800,
        "desc": "Camión hidrosembrador mecanizado con cañón de alta presión para taludes"
    },
    {
        "page": "B2B",
        "src": "site/assets/img/subhero_b2b_2.jpg",
        "dst": "site/assets/img/subhero_b2b_2_mobile.jpg",
        "center_x": 960,
        "desc": "Estabilización radicular masiva y control de erosión en talud terminado"
    },
    {
        "page": "B2B",
        "src": "site/assets/img/subhero_b2b_3.jpg",
        "dst": "site/assets/img/subhero_b2b_3_mobile.jpg",
        "center_x": 960,
        "desc": "Suministro mayorista para obras viales y consorcios del MOP"
    },
    {
        "page": "B2B",
        "src": "site/assets/img/subhero_b2b_4.jpg",
        "dst": "site/assets/img/subhero_b2b_4_mobile.jpg",
        "center_x": 960,
        "desc": "Escala industrial de producción continua desde fincas en Río Grande"
    },

    # 5. Catálogo Botánico (site/pages/catalogo.html)
    {
        "page": "Catalogo",
        "src": "site/assets/img/subhero_cat_1.jpg",
        "dst": "site/assets/img/subhero_cat_1_mobile.jpg",
        "center_x": 960,
        "desc": "Panorámica de vivero botánico con inventario botánico verificado"
    },
    {
        "page": "Catalogo",
        "src": "site/assets/img/subhero_cat_2.jpg",
        "dst": "site/assets/img/subhero_cat_2_mobile.jpg",
        "center_x": 960,
        "desc": "Flora tropical y palmas ornamentales listas para trasplante"
    },
    {
        "page": "Catalogo",
        "src": "site/assets/img/subhero_cat_3.jpg",
        "dst": "site/assets/img/subhero_cat_3_mobile.jpg",
        "center_x": 960,
        "desc": "Palmas Reales monumentales con poda radicular tecnificada"
    },
    {
        "page": "Catalogo",
        "src": "site/assets/img/subhero_cat_4.jpg",
        "dst": "site/assets/img/subhero_cat_4_mobile.jpg",
        "center_x": 960,
        "desc": "Palmas Bismarckia azul plateadas de lujo paisajístico"
    }
]

def process_all():
    print(f"Iniciando procesamiento de {len(JOBS)} imágenes móviles...")
    results = []
    
    target_width = 800
    target_height = 1200
    crop_width = 720 # 1080 * (2/3)
    
    for i, job in enumerate(JOBS, start=1):
        src_path = job["src"]
        dst_path = job["dst"]
        center_x = job["center_x"]
        
        if not os.path.exists(src_path):
            print(f"ERROR: Archivo origen no existe: {src_path}")
            continue
            
        with Image.open(src_path) as im:
            w, h = im.size # 1920, 1080
            
            # Calculate horizontal crop bounds
            x1 = max(0, min(w - crop_width, center_x - (crop_width // 2)))
            x2 = x1 + crop_width
            y1 = 0
            y2 = h
            
            # Perform crop
            cropped = im.crop((x1, y1, x2, y2))
            
            # High-fidelity Lanczos resize to 800x1200
            resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
            
            # Calibrate contrast (+5%)
            contrast_enhancer = ImageEnhance.Contrast(resized)
            enhanced = contrast_enhancer.enhance(1.05)
            
            # Calibrate color saturation (+8%)
            color_enhancer = ImageEnhance.Color(enhanced)
            enhanced = color_enhancer.enhance(1.08)
            
            # Quality calibration: target 120KB - 220KB (use 88 as requested)
            # If the image is dense and exceeds 250KB, adjust quality slightly between 82-88
            target_quality = 88
            enhanced.save(dst_path, "JPEG", quality=target_quality, progressive=True, optimize=True)
            size_kb = os.path.getsize(dst_path) / 1024
            
            # Fine-tune if size is slightly above 250KB (for ultra-fast mobile performance)
            if size_kb > 250:
                # test with quality 83-85
                for q in [85, 83, 80]:
                    enhanced.save(dst_path, "JPEG", quality=q, progressive=True, optimize=True)
                    size_kb = os.path.getsize(dst_path) / 1024
                    target_quality = q
                    if size_kb <= 240:
                        break
                        
            final_w, final_h = enhanced.size
            final_size_kb = os.path.getsize(dst_path) / 1024
            results.append({
                "num": i,
                "page": job["page"],
                "file": os.path.basename(dst_path),
                "path": dst_path,
                "dimensions": f"{final_w}x{final_h}",
                "size_kb": f"{final_size_kb:.1f} KB",
                "quality": target_quality,
                "desc": job["desc"]
            })
            print(f"[{i:02d}/19] Generada: {os.path.basename(dst_path):35s} | {final_w}x{final_h} | {final_size_kb:5.1f} KB (Q{target_quality}) | {job['desc']}")

    print("\n" + "="*80)
    print("RESUMEN DE GENERACIÓN DE IMÁGENES MÓVILES (19/19 EXITOSAS)")
    print("="*80)
    for r in results:
        print(f"{r['num']:02d}. [{r['page']:11s}] {r['file']:35s} -> {r['dimensions']} | {r['size_kb']:9s} | Q{r['quality']}")
    print("="*80)

if __name__ == "__main__":
    process_all()
