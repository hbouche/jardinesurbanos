#!/usr/bin/env python3
"""Genera los logos del sitio a partir del archivo maestro de identidad (LOGOJUSA.ai).

El .ai es compatible con PDF: se convierte a SVG con pdftocairo y se recomponen
las piezas vectoriales (símbolo + glifos del texto) en las versiones que usa el sitio:

  site/assets/img/brand/logo-horizontal-verde.svg   (fondos claros)
  site/assets/img/brand/logo-horizontal-blanco.svg  (fondos oscuros y sobre fotos)
  site/assets/img/brand/logo-apilado-verde.svg
  site/assets/img/brand/logo-apilado-blanco.svg
  site/assets/img/brand/simbolo.svg                 (favicon vectorial)
  site/assets/img/brand/favicon-32.png, apple-touch-icon-180.png, icon-192.png, icon-512.png

Uso: python3 scripts/generar_logos.py [ruta/LOGOJUSA.ai]
Requiere: pdftocairo (poppler-utils).
"""
import os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'Originales Julio', 'Logo', 'LOGOJUSA.ai')
OUT = os.path.join(ROOT, 'site', 'assets', 'img', 'brand')
TEXT_FILL = 'rgb(7.843018%, 41.960144%, 18.823242%)'  # verde del texto en el .ai (#146B30)

# Cajas en coordenadas del .ai (puntos PDF)
SYMBOL = (221.5, 282.8, 392.5, 473.0)        # símbolo (recortado por su clipPath)
TEXT_TOP, TEXT_BOTTOM = 480.2, 509.2         # línea de texto, incluida la "J"
SPLIT_X = 304.0                              # separa "Jardines" de "Urbanos"

os.makedirs(OUT, exist_ok=True)
tmp = tempfile.mkdtemp()
pdf = os.path.join(tmp, 'logo.pdf')
open(pdf, 'wb').write(open(SRC, 'rb').read())
subprocess.run(['pdftocairo', '-svg', pdf, os.path.join(tmp, 'logo.svg')], check=True)
svg = open(os.path.join(tmp, 'logo.svg')).read()

defs = re.search(r'<defs>.*?</defs>', svg, re.S).group(0)

# El degradado del sol trae cientos de <stop> repetidos: se dejan solo los cambios de color
def _dedupe_stops(m):
    stops = re.findall(r'<stop [^>]*/>', m.group(0))
    keep, last = [], None
    for i, st in enumerate(stops):
        color = re.search(r'stop-color="([^"]*)"', st).group(1)
        if color != last or i == len(stops) - 1:
            keep.append(st)
        last = color
    head = m.group(0)[:m.group(0).index('<stop')]
    return head + '\n'.join(keep) + '\n</radialGradient>'
defs = re.sub(r'<radialGradient.*?</radialGradient>', _dedupe_stops, defs, flags=re.S)
body = svg[svg.index('</defs>') + len('</defs>'):svg.rindex('</svg>')]

# Separar glifos del texto (paths con relleno de texto debajo del símbolo)
glyphs = []
def take(m):
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', m.group(1))))
    ys = nums[1::2]
    if TEXT_FILL in m.group(0) and min(ys) >= TEXT_TOP - 1:
        glyphs.append((min(nums[0::2]), m.group(0)))
        return ''
    return m.group(0)
symbol_body = re.sub(r'<path [^>]*d="([^"]*)"[^>]*/>', take, body)
assert len(glyphs) == 15, f'Se esperaban 15 glifos, hay {len(glyphs)}'
word1 = ''.join(g for x, g in glyphs if x < SPLIT_X)
word2 = ''.join(g for x, g in glyphs if x >= SPLIT_X)
full_text = word1 + word2

def svg_doc(w, h, inner, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{defs}{inner}</svg>\n')

def recolor(s, color):
    return s.replace(f'fill="{TEXT_FILL}"', f'fill="{color}"')

sx0, sy0, sx1, sy1 = SYMBOL
sw, sh = sx1 - sx0, sy1 - sy0
symbol_g = f'<g transform="translate({-sx0:.2f},{-sy0:.2f})">{symbol_body}</g>'

# Horizontal: símbolo a la izquierda, "Jardines" / "Urbanos" en dos líneas
S = 3.3                       # escala del texto
line_h = (504.5 - TEXT_TOP) * S
gap = 16
x_text = sw + 30
l1_top = 8
l2_top = l1_top + line_h + gap
w1 = [x for x, _ in glyphs if x < SPLIT_X]; w2 = [x for x, _ in glyphs if x >= SPLIT_X]
horiz_w = x_text + (424.4 - min(w2)) * S + 4
def horizontal(color):
    t1 = f'<g transform="translate({x_text:.2f},{l1_top:.2f}) scale({S}) translate({-min(w1):.2f},{-TEXT_TOP:.2f})">{recolor(word1, color)}</g>'
    t2 = f'<g transform="translate({x_text:.2f},{l2_top:.2f}) scale({S}) translate({-min(w2):.2f},{-TEXT_TOP:.2f})">{recolor(word2, color)}</g>'
    return svg_doc(horiz_w, sh, symbol_g + t1 + t2, 'Jardines Urbanos')

# Apilado (como el original): símbolo centrado arriba, texto en una línea debajo
ax0, ax1 = 188.0, 425.0
def stacked(color):
    inner = f'<g transform="translate({-ax0:.2f},{-sy0:.2f})">{symbol_body}{recolor(full_text, color)}</g>'
    return svg_doc(ax1 - ax0, TEXT_BOTTOM - sy0 + 1, inner, 'Jardines Urbanos')

# Símbolo cuadrado para favicon
pad = (sh - sw) / 2
symbol_svg = svg_doc(sh, sh, f'<g transform="translate({pad:.2f},0)">{symbol_g}</g>', 'Jardines Urbanos')

files = {
    'logo-horizontal-verde.svg': horizontal('#146B30'),
    'logo-horizontal-blanco.svg': horizontal('#FFFFFF'),
    'logo-apilado-verde.svg': stacked('#146B30'),
    'logo-apilado-blanco.svg': stacked('#FFFFFF'),
    'simbolo.svg': symbol_svg,
}
def _round(svg_text):
    # 2 decimales sobran para un logo (coordenadas en puntos PDF)
    return re.sub(r'(\d+\.\d{2})\d+', r'\1', svg_text)

for name, content in files.items():
    content = _round(content)
    open(os.path.join(OUT, name), 'w').write(content)

# PNG del símbolo (favicon / iconos) recortando directo del PDF
for size, name in [(32, 'favicon-32.png'), (180, 'apple-touch-icon-180.png'), (192, 'icon-192.png'), (512, 'icon-512.png')]:
    res = size / sh * 72
    x = (sx0 - pad) * res / 72; y = sy0 * res / 72
    base = os.path.join(tmp, name[:-4])
    subprocess.run(['pdftocairo', '-png', '-singlefile', '-transp', '-r', f'{res:.4f}',
                    '-x', str(int(round(x))), '-y', str(int(round(y))), '-W', str(size), '-H', str(size),
                    pdf, base], check=True)
    os.replace(base + '.png', os.path.join(OUT, name))
print('Logos generados en', OUT)
for f in sorted(os.listdir(OUT)):
    print(' ', f, os.path.getsize(os.path.join(OUT, f)), 'bytes')
