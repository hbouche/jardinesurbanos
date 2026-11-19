#!/usr/bin/env python3
"""Convierte las fotos del sitio a WebP liviano y actualiza las referencias.

Revisión DMC: "Inicio descarga unos 12 MB en fotos; convertir a WebP de 200 KB como máximo".

- Genera <nombre>.webp junto a cada JPG/PNG de site/assets/img y site/assets/mockups
  (los originales se conservan como respaldo y para og:image).
- Tamaño según uso:
    * imágenes de hero (las que aparecen con "1920w" en un srcset): máx. 1920 px de ancho, <= 200 KB
    * versiones *_mobile: máx. 768 px, <= 120 KB
    * resto (tarjetas, galerías, catálogo): máx. 1000 px, <= 110 KB
- Reemplaza las rutas .jpg/.png por .webp en HTML, JS y CSS del sitio, excepto en
  <meta> (og:image) y en el JSON-LD, donde los buscadores y redes prefieren JPG.

- Marca de agua (opción A de la revisión DMC): logo + "© Imagen propiedad de Jardines Urbanos, S.A."
  en la esquina inferior derecha, solo en las fotos propias listadas en scripts/fotos_propias.txt
  y que no se usan como fondo de hero (ahí la foto va recortada y la marca quedaría cortada).
  Se aplica al exportar (queda dentro del archivo), nunca en imágenes referenciales.

Uso: python3 scripts/optimizar_imagenes.py [--solo-convertir] [--solo=nombre1,nombre2]
"""
import glob
import io
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
DIRS = [os.path.join(SITE, 'assets', 'img'), os.path.join(SITE, 'assets', 'mockups')]
SKIP_DIRS = {'brand'}                       # logos generados (ya optimizados)
SKIP_PREFIX = ('icon_', 'cropped-icon_')    # íconos/favicons
EXT = ('.jpg', '.jpeg', '.png')


def text_files():
    return (['index.html'] + sorted(glob.glob(os.path.join(SITE, 'pages', '*.html'))) +
            sorted(glob.glob(os.path.join(SITE, '_partials', '*.html'))) +
            sorted(glob.glob(os.path.join(SITE, 'js', '*.js'))) +
            sorted(glob.glob(os.path.join(SITE, 'css', '*.css'))) + ['assets/media_manifest.js'])


def hero_names():
    names = set()
    for f in text_files():
        txt = open(os.path.join(SITE, f), encoding='utf-8').read()
        for m in re.finditer(r'([\w./-]+?\.(?:jpe?g|png))\s+1920w', txt, re.I):
            names.add(os.path.basename(m.group(1)))
        for m in re.finditer(r'<img[^>]*class="hero-slide[^"]*"[^>]*>', txt):
            s = re.search(r'src="([^"]+)"', m.group(0))
            if s:
                names.add(os.path.basename(s.group(1)))
    return names


OWN_LIST = os.path.join(ROOT, 'scripts', 'fotos_propias.txt')
LOGO = os.path.join(SITE, 'assets', 'img', 'brand', 'icon-192.png')
FONT = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
WATERMARK_TEXT = '© Imagen propiedad de Jardines Urbanos, S.A.'


def own_photos():
    if not os.path.exists(OWN_LIST):
        return set()
    return {l.strip() for l in open(OWN_LIST, encoding='utf-8') if l.strip() and not l.startswith('#')}


def watermark(im):
    """Logo + texto en la esquina inferior derecha, blanco semitransparente con sombra suave."""
    base = im.convert('RGBA')
    w, h = base.size
    unit = max(12, round(min(w, h * 1.6) * 0.018))      # tamaño de letra proporcional
    font = ImageFont.truetype(FONT, unit)
    logo = Image.open(LOGO).convert('RGBA')
    lh = round(unit * 2.0)
    logo = logo.resize((lh, lh), Image.LANCZOS)
    tmp = ImageDraw.Draw(base)
    tw = tmp.textlength(WATERMARK_TEXT, font=font)
    pad = round(unit * 0.9)
    box_w, box_h = int(lh + unit * 0.5 + tw), lh
    x0, y0 = w - box_w - pad, h - box_h - pad
    layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # sombra para que se lea sobre cielos claros
    for dx, dy in ((1, 1), (2, 2)):
        d.text((x0 + lh + unit * 0.5 + dx, y0 + (lh - unit) / 2 - unit * 0.1 + dy), WATERMARK_TEXT, font=font, fill=(0, 0, 0, 90))
    d.text((x0 + lh + unit * 0.5, y0 + (lh - unit) / 2 - unit * 0.1), WATERMARK_TEXT, font=font, fill=(255, 255, 255, 215))
    lg = logo.copy(); lg.putalpha(lg.getchannel('A').point(lambda a: int(a * 0.9)))
    layer.alpha_composite(lg, (x0, y0))
    out = Image.alpha_composite(base, layer)
    return out.convert(im.mode) if im.mode in ('RGB', 'RGBA') else out.convert('RGB')


def encode(im, quality):
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=quality, method=6)
    return buf.getvalue()


def convert(path, max_w, max_bytes, mark=False):
    im = ImageOps.exif_transpose(Image.open(path))
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') and 'transparency' in im.info or im.mode == 'RGBA' else 'RGB')
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    if mark:
        im = watermark(im)
    while True:
        for q in (80, 75, 70, 65, 60, 55, 50):
            data = encode(im, q)
            if len(data) <= max_bytes:
                return data, im.size, q
        im = im.resize((round(im.width * 0.85), round(im.height * 0.85)), Image.LANCZOS)


def main():
    heroes = hero_names()
    own = own_photos()
    only = next((a.split('=', 1)[1].split(',') for a in sys.argv if a.startswith('--solo=')), None)
    before = after = 0
    converted = set()
    for d in DIRS:
        for path in sorted(glob.glob(os.path.join(d, '**', '*'), recursive=True)):
            rel = os.path.relpath(path, d)
            if not path.lower().endswith(EXT) or rel.split(os.sep)[0] in SKIP_DIRS or os.path.basename(path).startswith(SKIP_PREFIX):
                continue
            name = os.path.basename(path)
            if '_mobile' in name:
                max_w, max_b = 768, 120_000
            elif name in heroes:
                max_w, max_b = 1920, 200_000
            else:
                max_w, max_b = 1000, 110_000
            out = os.path.splitext(path)[0] + '.webp'
            converted.add(os.path.relpath(path, SITE).replace(os.sep, '/'))
            stem = os.path.splitext(name)[0]
            if only is not None and stem not in only:
                continue
            # En los heros la foto va recortada de fondo bajo el texto: ahí no se aplica (la marca quedaría cortada)
            is_hero = name in heroes or (stem.endswith('_mobile') and stem[:-7] + os.path.splitext(name)[1] in heroes)
            data, size, q = convert(path, max_w, max_b, mark=stem in own and 'mockups' not in path and not is_hero)
            open(out, 'wb').write(data)
            before += os.path.getsize(path); after += len(data)
    print(f'Convertidas {len(converted)} imágenes: {before/1e6:.1f} MB -> {after/1e6:.1f} MB')
    if '--solo-convertir' in sys.argv:
        return

    pattern = re.compile(r'((?:\.\./)?(assets/(?:img|mockups)/[\w./-]+?))\.(jpe?g|png)\b', re.I)

    def repl(m):
        key = f'{m.group(2)}.{m.group(3)}'
        return m.group(1) + '.webp' if key in converted else m.group(0)

    protected = re.compile(r'(<meta[^>]*>|<script type="application/ld\+json">.*?</script>)', re.S)
    changed = 0
    for f in text_files():
        p = os.path.join(SITE, f)
        txt = open(p, encoding='utf-8').read()
        parts = protected.split(txt)
        new = ''.join(part if protected.fullmatch(part) else pattern.sub(repl, part) for part in parts)
        if new != txt:
            open(p, 'w', encoding='utf-8').write(new); changed += 1
    print(f'Referencias actualizadas en {changed} archivos')


if __name__ == '__main__':
    os.chdir(SITE)
    main()
