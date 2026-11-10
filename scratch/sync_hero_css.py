import glob, re

files = glob.glob('site/*.html') + glob.glob('site/pages/*.html')

new_block = '''    /* Hero Photographic Carousel Transitions & Mobile Vibrancy */
    .hero-bg.hero-carousel .hero-slide {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      opacity: 0 !important;
      transform: scale(1.02) !important;
      transition: opacity 1s ease-in-out, transform 4s ease-out !important;
      filter: brightness(1.04) contrast(1.06) saturate(1.15) !important;
      z-index: 1 !important;
    }
    .hero-bg.hero-carousel .hero-slide.active {
      opacity: 1 !important;
      transform: scale(1) !important;
      z-index: 1 !important;
    }

    /* Hero Scrim Overlay - Sombra Ejecutiva de Lujo Suave (Foco Fotográfico) */
    .hero-overlay {
      background: linear-gradient(180deg, 
        rgba(10, 27, 18, 0.35) 0%, 
        rgba(10, 27, 18, 0.10) 30%, 
        rgba(10, 27, 18, 0.35) 65%, 
        rgba(10, 27, 18, 0.78) 100%) !important;
      z-index: 2 !important;
    }

    /* Hero Content - Caja translúcida refinada (legibilidad perfecta de letras sin tapar la foto) */
    .hero-content {
      position: relative !important;
      z-index: 3 !important;
      background: linear-gradient(180deg, rgba(10, 27, 18, 0.58) 0%, rgba(10, 27, 18, 0.42) 60%, rgba(10, 27, 18, 0.68) 100%) !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
      padding: 18px 16px !important;
      border-radius: 16px !important;
      border: 1px solid rgba(113, 179, 71, 0.32) !important;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4) !important;
    }'''

pattern = re.compile(r'/\*\s*Hero Photographic (?:Enhancement|Carousel).*?\.hero-content\s*\{[^}]*\}', re.DOTALL)

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    updated, count = pattern.subn(new_block, content, count=1)
    if count > 0:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(updated)
        print(f'Successfully updated: {fpath}')
    else:
        print(f'Pattern did not match in: {fpath}')
