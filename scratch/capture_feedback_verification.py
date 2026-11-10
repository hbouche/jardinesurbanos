import os
from playwright.sync_api import sync_playwright

CHROME_PATH = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH)
    
    # 1. Mobile Galaxy S20 Viewport (360x800)
    context_mobile = browser.new_context(
        viewport={'width': 360, 'height': 800},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent='Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
    )
    page_m = context_mobile.new_page()
    page_m.goto('http://127.0.0.1:8090/index.html?v=feedback_rev', wait_until='networkidle')
    page_m.wait_for_timeout(600)
    page_m.screenshot(path='scratch/verify_home_mobile_topbar_hero.png')
    
    # Scroll to Nosotros mosaic
    nos = page_m.locator('.nosotros-grid')
    if nos.count() > 0:
        nos.scroll_into_view_if_needed()
        page_m.wait_for_timeout(600)
        page_m.screenshot(path='scratch/verify_home_mobile_nosotros_mosaic.png')

    # Test new comercial.html
    page_m.goto('http://127.0.0.1:8090/pages/comercial.html', wait_until='networkidle')
    page_m.wait_for_timeout(600)
    page_m.screenshot(path='scratch/verify_comercial_mobile.png')

    # 2. Desktop Viewport (1440x900)
    context_desktop = browser.new_context(viewport={'width': 1440, 'height': 900})
    page_d = context_desktop.new_page()
    page_d.goto('http://127.0.0.1:8090/index.html?v=feedback_rev', wait_until='networkidle')
    page_d.wait_for_timeout(600)
    page_d.screenshot(path='scratch/verify_home_desktop_hero.png')

    browser.close()
    print("Verification screenshots captured successfully.")
