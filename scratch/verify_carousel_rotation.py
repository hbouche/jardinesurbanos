import os, time
from playwright.sync_api import sync_playwright

CHROME_PATH = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH)
    # Using real Galaxy S20 viewport 360x800 with Android Chrome User Agent
    context = browser.new_context(
        viewport={'width': 360, 'height': 800},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent='Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
    )
    page = context.new_page()
    page.goto('http://127.0.0.1:8090/index.html?v=test_rotation', wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # 1. Slide 0
    page.screenshot(path='scratch/carousel_slide_0.png')
    active_src = page.evaluate("() => document.querySelector('.hero-slide.active').currentSrc || document.querySelector('.hero-slide.active').src")
    print(f"Slide 0 active src: {active_src}")
    
    # Wait for transition to Slide 1 (4.5s cycle)
    print("Waiting 5.5 seconds for carousel transition to slide 1...")
    page.wait_for_timeout(5500)
    page.screenshot(path='scratch/carousel_slide_1.png')
    active_src = page.evaluate("() => document.querySelector('.hero-slide.active').currentSrc || document.querySelector('.hero-slide.active').src")
    print(f"Slide 1 active src: {active_src}")
    
    # Wait for transition to Slide 2
    print("Waiting 5.5 seconds for carousel transition to slide 2...")
    page.wait_for_timeout(5500)
    page.screenshot(path='scratch/carousel_slide_2.png')
    active_src = page.evaluate("() => document.querySelector('.hero-slide.active').currentSrc || document.querySelector('.hero-slide.active').src")
    print(f"Slide 2 active src: {active_src}")

    # Capture Nosotros Card
    nos = page.locator('.nosotros-grid')
    if nos.count() > 0:
        nos.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.screenshot(path='scratch/verified_nosotros_card.png')
        
    # Capture Calculator
    calc = page.locator('#calculadora')
    if calc.count() > 0:
        calc.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.screenshot(path='scratch/verified_calc_mobile.png')

    # Capture Catalog
    cat = page.locator('#catalogo')
    if cat.count() > 0:
        cat.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.screenshot(path='scratch/verified_catalog_mobile.png')
        
    browser.close()
    print("All carousel verification captures completed.")
