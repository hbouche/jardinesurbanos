import csv
import os
from PIL import Image

official_dir = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\01_sitio_oficial'
external_dir = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\02_referencias_externas'
verif_csv = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\VERIFICACION.csv'
fuentes_csv = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\FUENTES.csv'

with open(verif_csv, mode='r', encoding='utf-8-sig') as f:
    verif = {r['archivo'].replace('\\', '/'): r for r in csv.DictReader(f)}

with open(fuentes_csv, mode='r', encoding='utf-8-sig') as f:
    fuentes = {r['archivo'].replace('\\', '/'): r for r in csv.DictReader(f)}

def analyze_all():
    rows = []
    # 01_sitio_oficial
    for fn in sorted(os.listdir(official_dir)):
        rel = f"01_sitio_oficial/{fn}"
        fp = os.path.join(official_dir, fn)
        with Image.open(fp) as im:
            w, h = im.size
        vf = verif.get(rel, {})
        fu = fuentes.get(rel, {})
        rows.append({
            'source_dir': '01_sitio_oficial',
            'filename': fn,
            'rel_path': rel,
            'w': w,
            'h': h,
            'bytes': vf.get('bytes', os.path.getsize(fp)),
            'sha256': vf.get('sha256', ''),
            'wp_url': fu.get('url', ''),
            'is_real_jusa': True,
        })
    
    # 02_referencias_externas
    for fn in sorted(os.listdir(external_dir)):
        rel = f"02_referencias_externas/{fn}"
        fp = os.path.join(external_dir, fn)
        with Image.open(fp) as im:
            w, h = im.size
        vf = verif.get(rel, {})
        rows.append({
            'source_dir': '02_referencias_externas',
            'filename': fn,
            'rel_path': rel,
            'w': w,
            'h': h,
            'bytes': vf.get('bytes', os.path.getsize(fp)),
            'sha256': vf.get('sha256', ''),
            'wp_url': 'https://www.jardineriapanama.com/',
            'is_real_jusa': False,
        })
    return rows

rows = analyze_all()
print(f"Total processed: {len(rows)}")
for r in rows:
    print(f"{r['rel_path']} | {r['w']}x{r['h']} | {r['bytes']} B | Real JUSA: {r['is_real_jusa']}")
