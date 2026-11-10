import os, re

# Mapping of (filename_in_html) -> (mobile_filename)
mapping = {
    'DJI_0677-Mejorado-NR.jpg': 'DJI_0677_mobile.jpg',
    'hero_2_gramas_finca.jpg': 'hero_2_gramas_mobile.jpg',
    'hero_3_hidrosiembra.jpg': 'hero_3_hidrosiembra_mobile.jpg',
    'hero_4_vivero_palmas.jpg': 'hero_4_vivero_mobile.jpg',
    'letrero_finca_nosotros_derecha.jpg': 'letrero_finca_nosotros_mobile.jpg',
    'subhero_cont_2.jpg': 'subhero_cont_2_mobile.jpg',
    'subhero_cont_3.jpg': 'subhero_cont_3_mobile.jpg',
    'subhero_res_1.jpg': 'subhero_res_1_mobile.jpg',
    'subhero_res_2.jpg': 'subhero_res_2_mobile.jpg',
    'subhero_res_3.jpg': 'subhero_res_3_mobile.jpg',
    'subhero_res_4.jpg': 'subhero_res_4_mobile.jpg',
    'subhero_b2b_1.jpg': 'subhero_b2b_1_mobile.jpg',
    'subhero_b2b_2.jpg': 'subhero_b2b_2_mobile.jpg',
    'subhero_b2b_3.jpg': 'subhero_b2b_3_mobile.jpg',
    'subhero_b2b_4.jpg': 'subhero_b2b_4_mobile.jpg',
    'subhero_cat_1.jpg': 'subhero_cat_1_mobile.jpg',
    'subhero_cat_2.jpg': 'subhero_cat_2_mobile.jpg',
    'subhero_cat_3.jpg': 'subhero_cat_3_mobile.jpg',
    'subhero_cat_4.jpg': 'subhero_cat_4_mobile.jpg',
}

files = [
    'site/index.html',
    'site/pages/nosotros.html',
    'site/pages/residencial.html',
    'site/pages/b2b-hidrosiembra.html',
    'site/pages/catalogo.html'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    prefix = '../assets/img/' if 'pages/' in fpath else 'assets/img/'
    
    # We find <img ... class="...hero-slide..." ...>
    def replace_slide(match):
        tag = match.group(0)
        # Check if already has srcset
        if 'srcset=' in tag:
            return tag
            
        # Find which key is in src
        for orig_name, mob_name in mapping.items():
            if orig_name in tag:
                mob_path = prefix + mob_name
                # add srcset and sizes right after src="..."
                # Handle possible query params like ?v=...
                src_pattern = rf'(src=["\'][^"\']*{re.escape(orig_name)}[^"\']*["\'])'
                replacement = rf'\1 srcset="{mob_path} 768w, {prefix}{orig_name} 1920w" sizes="(max-width: 768px) 100vw, 1920px"'
                new_tag = re.sub(src_pattern, replacement, tag, count=1)
                return new_tag
        return tag

    # Regex for <img> with hero-slide class
    new_content = re.sub(r'<img[^>]*class=["\'][^"\']*hero-slide[^"\']*["\'][^>]*>', replace_slide, content)
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated slides in: {fpath}")
    else:
        print(f"No changes in: {fpath}")
