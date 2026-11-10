with open('site/pages/calculadora.html', 'r', encoding='utf-8') as f:
    calc = f.read()
import re
print("calculadora header tags:")
for m in re.finditer(r'<(header|section)[^>]*class=["\']([^"\']+)["\']', calc):
    print(" ", m.group(1), m.group(2))

with open('site/pages/contacto.html', 'r', encoding='utf-8') as f:
    cont = f.read()
print("contacto header tags:")
for m in re.finditer(r'<(header|section)[^>]*class=["\']([^"\']+)["\']', cont):
    print(" ", m.group(1), m.group(2))
