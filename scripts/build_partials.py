#!/usr/bin/env python3
"""Inyecta los parciales compartidos (header, footer, iconos) en las páginas del sitio.

El sitio es HTML estático: cada página lleva su propia copia del header y del footer
para poder publicarse tal cual. La fuente única está en site/_partials/; este script
reescribe en cada página el bloque entre los marcadores:

    <!-- @parcial:header -->  ...  <!-- @fin:header -->
    <!-- @parcial:footer -->  ...  <!-- @fin:footer -->
    <!-- @parcial:iconos -->  ...  <!-- @fin:iconos -->

Tokens disponibles en los parciales:
    {{ROOT}}          ruta a site/ desde la página, para activos ("" o "../")
    {{HOME}}          enlace a Inicio ("./" o "../")
    {{PAGES}}         prefijo de los enlaces a otras páginas: las URLs son carpetas (nosotros/, ../nosotros/)
    {{ACTIVE:clave}}  " active" si la página actual es <clave>
    {{HEADER_CTA}}    botón del header propio de cada página (paginas.json)
    {{RED:nombre}}    URL de la red social (paginas.json > redes)
    {{CANONICAL}}     URL pública de la página (paginas.json > dominio + carpeta)

Uso:
    python3 scripts/build_partials.py           # reescribe las páginas
    python3 scripts/build_partials.py --check   # falla si alguna página está desactualizada
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
PARTIALS = os.path.join(SITE, '_partials')


def load(name):
    with open(os.path.join(PARTIALS, name), encoding='utf-8') as fh:
        return fh.read()


def render(template, key, page_cfg, cfg, in_pages):
    out = template
    out = out.replace('{{ROOT}}', '../' if in_pages else '')
    out = out.replace('{{HOME}}', '../' if in_pages else './')
    out = out.replace('{{PAGES}}', '../' if in_pages else '')
    out = out.replace('{{HEADER_CTA}}', page_cfg['cta_header'])
    carpeta = '' if page_cfg['archivo'] == 'index.html' else page_cfg['archivo'].rsplit('/', 1)[0] + '/'
    out = out.replace('{{CANONICAL}}', cfg['dominio'].rstrip('/') + '/' + carpeta)
    out = re.sub(r'\{\{ACTIVE:([\w-]+)\}\}', lambda m: ' active' if m.group(1) == key else '', out)
    out = re.sub(r'\{\{RED:(\w+)\}\}', lambda m: cfg['redes'][m.group(1)], out)
    left = re.findall(r'\{\{[^}]+\}\}', out)
    if left:
        raise SystemExit(f'{key}: tokens sin resolver {left}')
    return out


def block(name, content):
    return f'<!-- @parcial:{name} -->\n{content.rstrip()}\n<!-- @fin:{name} -->'


def apply(html, name, content):
    pattern = re.compile(r'<!-- @parcial:%s -->.*?<!-- @fin:%s -->' % (name, name), re.S)
    if not pattern.search(html):
        raise SystemExit(f'Falta el marcador @parcial:{name}')
    return pattern.sub(lambda _: block(name, content), html, count=1)


def main():
    check = '--check' in sys.argv
    cfg = json.loads(load('paginas.json'))
    templates = {n: load(f'{n}.html') for n in ('header', 'footer', 'iconos')}
    stale = []
    for key, page_cfg in cfg['paginas'].items():
        path = os.path.join(SITE, page_cfg['archivo'])
        in_pages = page_cfg['archivo'] != 'index.html'
        with open(path, encoding='utf-8') as fh:
            html = fh.read()
        new = html
        for name, tpl in templates.items():
            new = apply(new, name, render(tpl, key, page_cfg, cfg, in_pages))
        if new != html:
            stale.append(page_cfg['archivo'])
            if not check:
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(new)
    if check:
        if stale:
            print('Páginas desactualizadas (ejecutar scripts/build_partials.py):', ', '.join(stale))
            sys.exit(1)
        print('Parciales al día en', len(cfg['paginas']), 'páginas.')
    else:
        print('Actualizadas:', ', '.join(stale) if stale else 'ninguna (ya estaban al día)')


if __name__ == '__main__':
    main()
