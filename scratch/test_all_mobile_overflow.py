import os, time
from playwright.sync_api import sync_playwright

CHROME_PATH = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

pages_to_test = [
    'index.html',
    'pages/nosotros.html',
    'pages/residencial.html',
    'pages/comercial.html',
    'pages/b2b-hidrosiembra.html',
    'pages/catalogo.html',
    'pages/calculadora.html',
    'pages/contacto.html'
]

viewports = [
    {'name': 'Galaxy_360', 'w': 360, 'h': 800},
    {'name': 'iPhone_375', 'w': 375, 'h': 667},
    {'name': 'iPhone_390', 'w': 390, 'h': 844}
]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH)
    
    for vp in viewports:
        vname = vp['name']
        vw = vp['w']
        vh = vp['h']
        print(f"=== TESTING VIEWPORT: {vname} ({vw}x{vh}) ===")
        context = browser.new_context(viewport={'width': vw, 'height': vh}, is_mobile=True, has_touch=True)
        page = context.new_page()
        
        for p_name in pages_to_test:
            url = f"http://127.0.0.1:8090/{p_name}"
            page.goto(url, wait_until='networkidle')
            page.wait_for_timeout(400)
            
            # Check scrollWidth vs clientWidth
            sw = page.evaluate("document.documentElement.scrollWidth")
            cw = page.evaluate("document.documentElement.clientWidth")
            body_sw = page.evaluate("document.body.scrollWidth")
            
            has_overflow = sw > cw or body_sw > cw
            status = "FAIL OVERFLOW" if has_overflow else "PASS OK"
            print(f"  [{status}] {p_name}: scrollWidth={sw}, bodyScrollWidth={body_sw}, clientWidth={cw}")
            
            if has_overflow:
                bad = page.evaluate("""() => {
                    const cw = document.documentElement.clientWidth;
                    const items = [];
                    for (const el of document.querySelectorAll('*')) {
                        const r = el.getBoundingClientRect();
                        if (r.right > cw + 1.5) {
                            items.push({
                                tag: el.tagName,
                                cls: (el.className || '').toString().substring(0, 40),
                                id: el.id,
                                right: Math.round(r.right),
                                width: Math.round(r.width),
                                text: (el.innerText || '').substring(0, 25).trim()
                            });
                        }
                    }
                    return items.slice(0, 10);
                }""")
                print("      Overflow elements:", bad)
                
        context.close()
    browser.close()
