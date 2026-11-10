import glob, re, os

print("=== INSPECTING HERO CAROUSELS ===")
for f in sorted(glob.glob('site/*.html') + glob.glob('site/pages/*.html')):
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    # Search for id="hero-carousel"
    match = re.search(r'<div[^>]*id=["\']hero-carousel["\'][^>]*>(.*?)</div>', content, re.DOTALL)
    if match:
        imgs = re.findall(r'<img[^>]*class=["\'][^"\']*hero-slide[^"\']*["\'][^>]*src=["\']([^"\']+)["\']', match.group(1))
        if not imgs:
            imgs = re.findall(r'<img[^>]*src=["\']([^"\']+)["\']', match.group(1))
        print(f"[CAROUSEL FOUND] {f}: {len(imgs)} slides ->")
        for img in imgs:
            print(f"    - {img}")
    else:
        # Search for hero section
        hero_sec = re.search(r'<section[^>]*class=["\'][^"\']*hero[^"\']*["\'][^>]*>(.*?)</section>', content, re.DOTALL)
        if hero_sec:
            imgs = re.findall(r'<img[^>]*src=["\']([^"\']+)["\']', hero_sec.group(1))
            print(f"[NO CAROUSEL ID] {f}: Hero section found with images: {imgs}")
        else:
            print(f"[NO HERO] {f}")
