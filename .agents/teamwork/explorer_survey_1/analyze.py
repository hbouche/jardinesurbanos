import csv
import os

inv_path = r'c:\Users\Usuario\Downloads\Jardines Urbanos\docs\media_inventory_site.csv'
official_dir = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\01_sitio_oficial'
external_dir = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\02_referencias_externas'
fuentes_csv = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\FUENTES.csv'
verif_csv = r'c:\Users\Usuario\Downloads\Jardines Urbanos\imagenes\VERIFICACION.csv'
out_path = r'c:\Users\Usuario\Downloads\Jardines Urbanos\.agents\teamwork\explorer_survey_1\analysis_clean.txt'

with open(inv_path, mode='r', encoding='utf-8-sig') as f:
    inventory = list(csv.DictReader(f))

with open(fuentes_csv, mode='r', encoding='utf-8-sig') as f:
    fuentes = list(csv.DictReader(f))

with open(verif_csv, mode='r', encoding='utf-8-sig') as f:
    verif = list(csv.DictReader(f))

downloaded_official = os.listdir(official_dir)
downloaded_external = os.listdir(external_dir)

verif_map = {row['archivo'].replace('\\', '/'): row for row in verif}
fuentes_map = {row['archivo'].replace('\\', '/'): row for row in fuentes}

with open(out_path, mode='w', encoding='utf-8') as out:
    out.write(f"Total downloaded official: {len(downloaded_official)}\n")
    out.write(f"Total downloaded external: {len(downloaded_external)}\n")
    out.write(f"Total WP inventory items: {len(inventory)}\n")

    out.write("\n--- DOWNLOADED OFFICIAL IMAGES (33) ---\n")
    for f in sorted(downloaded_official):
        rel_path = f"01_sitio_oficial/{f}"
        v = verif_map.get(rel_path, {})
        fu = fuentes_map.get(rel_path, {})
        out.write(f"FILE: {f} | WxH: {v.get('ancho')}x{v.get('alto')} | BYTES: {v.get('bytes')} | URL: {fu.get('url')}\n")

    out.write("\n--- DOWNLOADED EXTERNAL IMAGES (2) ---\n")
    for f in sorted(downloaded_external):
        rel_path = f"02_referencias_externas/{f}"
        v = verif_map.get(rel_path, {})
        out.write(f"FILE: {f} | WxH: {v.get('ancho')}x{v.get('alto')} | BYTES: {v.get('bytes')}\n")

    out.write("\n--- WP MEDIA INVENTORY: BOTANICAL SPECIES (42 species in library) ---\n")
    botanical_in_wp = []
    for item in inventory:
        fn = item['url'].split('/')[-1]
        t = item['title']
        if any(w in t.lower() or w in fn.lower() for w in ['arbol', 'abrol', 'palma', 'planta']):
            botanical_in_wp.append(item)
            is_dl = "DOWNLOADED" if fn in downloaded_official else "NOT_DOWNLOADED"
            out.write(f"ID: {item.get('id')} | TITLE: {t} | FILE: {fn} | WxH: {item.get('w')}x{item.get('h')} | STATUS: {is_dl} | URL: {item.get('url')}\n")

    out.write(f"\nTotal botanical species items in WP: {len(botanical_in_wp)}\n")

    out.write("\n--- OTHER ITEMS IN WP INVENTORY ---\n")
    for item in inventory:
        fn = item['url'].split('/')[-1]
        if item not in botanical_in_wp:
            is_dl = "DOWNLOADED" if fn in downloaded_official else "NOT_DOWNLOADED"
            out.write(f"ID: {item.get('id')} | TITLE: {item.get('title')} | FILE: {fn} | WxH: {item.get('w')}x{item.get('h')} | STATUS: {is_dl}\n")
