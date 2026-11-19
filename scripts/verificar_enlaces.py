#!/usr/bin/env python3
"""Verifica que todos los enlaces y recursos locales (href/src/srcset/url()) del sitio existan.
Las URLs de carpeta (nosotros/) se resuelven a su index.html. Uso: python3 scripts/verificar_enlaces.py"""
import glob, os, re, sys
SITE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'site')
pages = ['index.html'] + sorted(glob.glob(os.path.join(SITE, '*', 'index.html')))
bad = 0
for page in pages:
    page = os.path.join(SITE, page)
    base = os.path.dirname(page)
    html = open(page, encoding='utf-8').read()
    refs = re.findall(r'(?:href|src|data-cta-href|poster)=["\']([^"\']+)["\']', html)
    for srcset in re.findall(r'srcset=["\']([^"\']+)["\']', html):
        refs += [p.strip().split(' ')[0] for p in srcset.split(',')]
    refs += re.findall(r'url\(["\']?([^"\')]+)["\']?\)', html)
    for ref in refs:
        if re.match(r'^(https?:|mailto:|tel:|data:|#|javascript:|\{\{)', ref) or '${' in ref:
            continue
        path = ref.split('#')[0].split('?')[0]
        if not path:
            continue
        target = os.path.normpath(os.path.join(base, path))
        if path.endswith('/') or os.path.isdir(target):
            target = os.path.join(target, 'index.html')
        if not os.path.exists(target):
            bad += 1
            print(f'ROTO  {os.path.relpath(page, SITE)} -> {ref}')
print(f'{len(pages)} páginas revisadas, {bad} enlaces rotos')
sys.exit(1 if bad else 0)
