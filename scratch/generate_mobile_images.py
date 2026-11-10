import os
from PIL import Image, ImageEnhance

img_dir = os.path.join('site', 'assets', 'img')

# Specification of 19 mobile images: (source_filename, dest_filename, crop_x_center_ratio)
# crop_x_center_ratio: 0.5 = exact center, 0.65 = shifted right, 0.35 = shifted left
specs = [
    # 1. Home
    ('DJI_0677-Mejorado-NR.jpg', 'DJI_0677_mobile.jpg', 0.50),
    ('hero_2_gramas_finca.jpg', 'hero_2_gramas_mobile.jpg', 0.42),
    ('hero_3_hidrosiembra.jpg', 'hero_3_hidrosiembra_mobile.jpg', 0.38),
    ('hero_4_vivero_palmas.jpg', 'hero_4_vivero_mobile.jpg', 0.50),

    # 2. Nosotros
    ('letrero_finca_nosotros_derecha.jpg', 'letrero_finca_nosotros_mobile.jpg', 0.65),
    ('subhero_cont_2.jpg', 'subhero_cont_2_mobile.jpg', 0.50),
    ('subhero_cont_3.jpg', 'subhero_cont_3_mobile.jpg', 0.45),

    # 3. Residencial & PH
    ('subhero_res_1.jpg', 'subhero_res_1_mobile.jpg', 0.50),
    ('subhero_res_2.jpg', 'subhero_res_2_mobile.jpg', 0.42),
    ('subhero_res_3.jpg', 'subhero_res_3_mobile.jpg', 0.48),
    ('subhero_res_4.jpg', 'subhero_res_4_mobile.jpg', 0.45),

    # 4. B2B & Hidrosiembra
    ('subhero_b2b_1.jpg', 'subhero_b2b_1_mobile.jpg', 0.38),
    ('subhero_b2b_2.jpg', 'subhero_b2b_2_mobile.jpg', 0.50),
    ('subhero_b2b_3.jpg', 'subhero_b2b_3_mobile.jpg', 0.60),
    ('subhero_b2b_4.jpg', 'subhero_b2b_4_mobile.jpg', 0.50),

    # 5. Catálogo Botánico
    ('subhero_cat_1.jpg', 'subhero_cat_1_mobile.jpg', 0.40),
    ('subhero_cat_2.jpg', 'subhero_cat_2_mobile.jpg', 0.50),
    ('subhero_cat_3.jpg', 'subhero_cat_3_mobile.jpg', 0.50),
    ('subhero_cat_4.jpg', 'subhero_cat_4_mobile.jpg', 0.45),
]

target_w, target_h = 800, 1200
crop_ratio = target_w / target_h # 2 / 3 = 0.6667

print(f"Generating {len(specs)} mobile-optimized vertical images...")

results = []
for src_name, dst_name, x_ratio in specs:
    src_path = os.path.join(img_dir, src_name)
    dst_path = os.path.join(img_dir, dst_name)
    
    if not os.path.exists(src_path):
        print(f"ERROR: Missing source {src_path}")
        continue
        
    with Image.open(src_path) as img:
        img = img.convert('RGB')
        orig_w, orig_h = img.size
        
        # Determine crop box to achieve 2:3 aspect ratio
        # For 1920x1080: crop_h = 1080, crop_w = 1080 * (2/3) = 720
        crop_h = orig_h
        crop_w = int(round(crop_h * crop_ratio))
        
        # Center x based on focal point ratio
        center_x = int(round(orig_w * x_ratio))
        left = max(0, min(orig_w - crop_w, center_x - crop_w // 2))
        top = 0
        right = left + crop_w
        bottom = crop_h
        
        cropped = img.crop((left, top, right, bottom))
        
        # Resize to 800x1200 using high-quality Lanczos
        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Calibrate vibrancy & clarity (+4% contrast, +8% saturation, +2% sharpness)
        enhancer = ImageEnhance.Color(resized)
        vibrant = enhancer.enhance(1.08)
        
        enhancer = ImageEnhance.Contrast(vibrant)
        contrasted = enhancer.enhance(1.04)
        
        enhancer = ImageEnhance.Sharpness(contrasted)
        final_img = enhancer.enhance(1.05)
        
        # Save as progressive JPEG with quality 88
        final_img.save(dst_path, 'JPEG', quality=88, progressive=True, optimize=True)
        
        size_kb = os.path.getsize(dst_path) / 1024
        print(f" -> Generated {dst_name:30} | {final_img.size} | {size_kb:.1f} KB | Focal X: {x_ratio:.2f}")
        results.append({
            'file': dst_name,
            'source': src_name,
            'size': f"{final_img.size[0]}x{final_img.size[1]}",
            'kb': round(size_kb, 1)
        })

print(f"\nSUCCESS: All {len(results)} mobile vertical images created!")
