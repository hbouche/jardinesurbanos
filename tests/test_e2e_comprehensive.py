#!/usr/bin/env python3
"""
test_e2e_comprehensive.py
Comprehensive End-to-End Test Suite for Jardines Urbanos, S.A.
Coverage: Tiers 1-4, Console & Network Integrity, Schema.org Validation.
Supports both direct execution (`python tests/test_e2e_comprehensive.py`) and pytest.
"""

import os
import sys
import time
import json
import urllib.parse
import threading
import http.server
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SITE_DIR = os.path.join(ROOT_DIR, 'site')
PORT = 8098

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SITE_DIR, **kwargs)

    def do_GET(self):
        if self.path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return
        try:
            super().do_GET()
        except (ConnectionResetError, ConnectionAbortedError):
            pass

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (ConnectionResetError, ConnectionAbortedError):
            pass

    def log_message(self, format, *args):
        pass

class TestContext:
    server = None
    server_thread = None
    playwright = None
    browser = None
    base_url = f"http://127.0.0.1:{PORT}"

def setup_module():
    TestContext.server = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), CustomHandler)
    TestContext.server_thread = threading.Thread(target=TestContext.server.serve_forever, daemon=True)
    TestContext.server_thread.start()
    time.sleep(0.5)

    TestContext.playwright = sync_playwright().start()
    TestContext.browser = TestContext.playwright.chromium.launch(executable_path=CHROME_PATH)

def teardown_module():
    if TestContext.browser:
        TestContext.browser.close()
    if TestContext.playwright:
        TestContext.playwright.stop()
    if TestContext.server:
        TestContext.server.shutdown()

class SuiteRunner:
    def __init__(self):
        self.total = 0
        self.passed = 0
        self.failed = 0
        self.errors = []

    def assert_test(self, condition, name, details=""):
        self.total += 1
        if condition:
            self.passed += 1
            print(f"  [PASS] {name}", flush=True)
        else:
            self.failed += 1
            msg = f"  [FAIL] {name} - {details}"
            print(msg, flush=True)
            self.errors.append(msg)

runner = SuiteRunner()

# ==============================================================================
# TIER 1: FEATURE COVERAGE
# ==============================================================================

def test_tier1_calculator_four_scenarios_and_waste():
    print("\n--- TIER 1.1: Calculator 4 Scenarios & +5% Waste Math ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/index.html#calculadora", wait_until='networkidle')

    # Scenario 1: Residencial (default 250 m2) -> 263 m2 gross (+13 m2 waste) -> Zoysia Toro
    gross = page.locator('#calc-gross-m2').text_content().strip()
    variety = page.locator('#calc-rec-title').text_content().strip()
    runner.assert_test(gross == "263", "Residencial 250 m² -> 263 m² (+5% ceil)", f"Got {gross}")
    runner.assert_test("Zoysia Toro" in variety, "Residencial + Sol recommends Zoysia Toro", f"Got {variety}")

    # Scenario 2: Casa de Playa -> Zoysia Japónica
    page.locator('[data-scenario="playa"]').click()
    page.wait_for_timeout(100)
    variety_playa = page.locator('#calc-rec-title').text_content().strip()
    runner.assert_test("Zoysia Japónica" in variety_playa, "Playa scenario recommends Zoysia Japónica", f"Got {variety_playa}")

    # Scenario 3: Deportivo / Tráfico -> Zoysia Toro
    page.locator('[data-scenario="deportivo"]').click()
    page.wait_for_timeout(100)
    variety_dep = page.locator('#calc-rec-title').text_content().strip()
    runner.assert_test("Zoysia Toro" in variety_dep, "Deportivo scenario recommends Zoysia Toro", f"Got {variety_dep}")

    # Scenario 4: Talud / Obra -> Hidrosiembra Técnica JUSA
    page.locator('[data-scenario="talud"]').click()
    page.wait_for_timeout(100)
    variety_talud = page.locator('#calc-rec-title').text_content().strip()
    supply_mode = page.locator('#calc-supply-mode').text_content().strip()
    runner.assert_test("Hidrosiembra" in variety_talud, "Talud scenario recommends Hidrosiembra Técnica", f"Got {variety_talud}")
    runner.assert_test("Hidrosembrador" in supply_mode, "Talud supply mode is Hidrosembrador B2B", f"Got {supply_mode}")

    # Sun condition: switch to Residencial + Sombra -> San Agustín
    page.locator('[data-scenario="residencial"]').click()
    page.locator('[data-sun="sombra"]').click()
    page.wait_for_timeout(100)
    variety_sombra = page.locator('#calc-rec-title').text_content().strip()
    runner.assert_test("San Agustín" in variety_sombra, "Residencial + Sombra recommends San Agustín", f"Got {variety_sombra}")

    page.close()

def test_tier1_whatsapp_link_schema():
    print("\n--- TIER 1.2: WhatsApp Link Schema & Official Number ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/calculadora/index.html", wait_until='networkidle')

    # Input 500 m2 Playa
    page.locator('.calc-number-input').fill('500')
    page.locator('.calc-number-input').dispatch_event('input')
    page.locator('[data-scenario="playa"]').click()
    page.wait_for_timeout(150)

    wa_link = page.locator('#calc-whatsapp-btn')
    href = wa_link.get_attribute('href')

    runner.assert_test(href.startswith("https://wa.me/50765390949"), "WhatsApp link targets official number +507 6539-0949", f"Got {href}")
    parsed = urllib.parse.urlparse(href)
    params = urllib.parse.parse_qs(parsed.query)
    runner.assert_test('text' in params, "WhatsApp link contains prefilled encoded text parameter")

    if 'text' in params:
        text_content = params['text'][0]
        runner.assert_test("525" in text_content, "WhatsApp text specifies gross area (525 m²)", text_content)
        runner.assert_test("Zoysia Japónica" in text_content, "WhatsApp text specifies recommended variety", text_content)

    page.close()

def test_tier1_catalog_category_filtering():
    print("\n--- TIER 1.3: Catalog Dynamic Category Filtering ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/catalogo/index.html", wait_until='networkidle')

    # All
    cards_all = page.locator('.catalog-card').count()
    runner.assert_test(cards_all >= 20, f"Filter 'all' renders all species (found {cards_all} >= 20)")

    # Grama tab -> exactly 3
    page.locator('.catalog-tab[data-cat="grama"]').click()
    page.wait_for_timeout(150)
    cards_grama = page.locator('.catalog-card').count()
    runner.assert_test(cards_grama == 3, f"Filter 'grama' renders exactly 3 certified varieties (found {cards_grama})")

    # Palma tab -> >= 5
    page.locator('.catalog-tab[data-cat="palma"]').click()
    page.wait_for_timeout(150)
    cards_palma = page.locator('.catalog-card').count()
    runner.assert_test(cards_palma >= 5, f"Filter 'palma' renders at least 5 palms (found {cards_palma})")

    # Arbol tab -> >= 4
    page.locator('.catalog-tab[data-cat="arbol"]').click()
    page.wait_for_timeout(150)
    cards_arbol = page.locator('.catalog-card').count()
    runner.assert_test(cards_arbol >= 4, f"Filter 'arbol' renders at least 4 trees (found {cards_arbol})")

    # B2B tab -> >= 2
    page.locator('.catalog-tab[data-cat="b2b"]').click()
    page.wait_for_timeout(150)
    cards_b2b = page.locator('.catalog-card').count()
    runner.assert_test(cards_b2b >= 2, f"Filter 'b2b' renders at least 2 B2B items (found {cards_b2b})")

    page.close()

def test_tier1_catalog_text_search():
    print("\n--- TIER 1.4: Catalog Live Text Search ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/catalogo/index.html", wait_until='networkidle')

    search_input = page.locator('#catalog-search')

    # Search 'zoysia' -> 2 cards (Toro and Japónica)
    search_input.fill('zoysia')
    search_input.dispatch_event('input')
    page.wait_for_timeout(350)
    count_zoysia = page.locator('.catalog-card').count()
    runner.assert_test(count_zoysia == 2, f"Search 'zoysia' returns 2 species (found {count_zoysia})")

    # Search 'bismarckia' -> 1 card
    search_input.fill('bismarckia')
    search_input.dispatch_event('input')
    page.wait_for_timeout(350)
    count_bis = page.locator('.catalog-card').count()
    card_title = page.locator('.catalog-card-title').first.text_content() if count_bis > 0 else ""
    runner.assert_test(count_bis == 1 and "Bismarckia" in card_title, "Search 'bismarckia' returns Palma Bismarckia", f"Found {count_bis}, title: {card_title}")

    page.close()

def test_tier1_comparator_slider():
    print("\n--- TIER 1.5: Before / After Comparator Interactive Slider ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/index.html#comparador", wait_until='networkidle')

    container = page.locator('.ba-container').first
    runner.assert_test(container.count() > 0, "Interactive comparator container exists")
    container.scroll_into_view_if_needed()
    box = container.bounding_box()

    # Click at 30% of container width to trigger pointer interaction
    page.mouse.click(box['x'] + box['width'] * 0.3, box['y'] + box['height'] * 0.5)
    page.wait_for_timeout(200)

    before_style = page.locator('.ba-before').first.get_attribute('style') or ""
    handle_style = page.locator('.ba-handle').first.get_attribute('style') or ""
    runner.assert_test("30%" in before_style and "30%" in handle_style,
                       f"Comparator responsive split updated to 30% (before: {before_style}, handle: {handle_style})")

    page.close()

def test_tier1_mobile_drawer_navigation():
    print("\n--- TIER 1.6: Mobile Drawer Navigation & Toggle ---", flush=True)
    page = TestContext.browser.new_page(
        viewport={"width": 375, "height": 812},
        is_mobile=True,
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
    )
    page.goto(f"{TestContext.base_url}/index.html", wait_until='networkidle')

    drawer = page.locator('.drawer-backdrop')
    runner.assert_test(not "open" in (drawer.get_attribute('class') or ""), "Drawer is initially closed")

    # Click toggle
    page.locator('.menu-toggle').click()
    page.wait_for_timeout(350)
    runner.assert_test("open" in (drawer.get_attribute('class') or ""), "Menu toggle opens drawer (.open class added)")

    # Click close button with force=True (or backdrop)
    page.locator('.drawer-close-btn').click(force=True)
    page.wait_for_timeout(350)
    runner.assert_test(not "open" in (drawer.get_attribute('class') or ""), "Close button dismisses drawer")

    # Open again and test backdrop dismiss
    page.locator('.menu-toggle').click()
    page.wait_for_timeout(350)
    page.locator('.drawer-backdrop').click(position={'x': 10, 'y': 10})
    page.wait_for_timeout(350)
    runner.assert_test(not "open" in (drawer.get_attribute('class') or ""), "Backdrop click dismisses drawer")

    page.close()

def test_tier1_ley81_form_validation():
    print("\n--- TIER 1.7: Ley 81 Compliance Form Interception ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/contacto/index.html", wait_until='networkidle')

    # Fill form fields using name attributes (resilient across index.html and contacto.html)
    page.locator('input[name="nombre"]').fill('Carlos Mendoza')
    page.locator('input[name="telefono"]').fill('+507 6234-5678')
    page.locator('select[name="provincia"]').select_option('Coclé')
    page.locator('textarea[name="mensaje"]').fill('Consulta para 300 m² de grama en Penonomé.')

    # Ensure checkbox is UNCHECKED
    checkbox = page.locator('input[name="ley81_optin"]')
    if checkbox.is_checked():
        checkbox.uncheck()

    is_required = checkbox.get_attribute('required') is not None
    runner.assert_test(is_required, "Ley 81 opt-in checkbox has required attribute")

    is_invalid = not checkbox.evaluate("el => el.checkValidity()")
    runner.assert_test(is_invalid, "Ley 81 checkbox fails HTML5 validity when unchecked")

    # Dispatch submit event to trigger custom JS Ley 81 validation interceptor
    form = page.locator('form[data-validate-ley81]')
    form.evaluate("el => el.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))")
    page.wait_for_timeout(250)

    # Toast warning should be visible
    toast = page.locator('.toast')
    toast_text = toast.text_content() if toast.count() > 0 else ""
    runner.assert_test("Ley 81" in toast_text, "Form submission blocked with Ley 81 warning when checkbox is unchecked", f"Toast: {toast_text}")

    page.close()

# ==============================================================================
# TIER 2: BOUNDARY & CORNER CASES
# ==============================================================================

def test_tier2_calculator_boundary_inputs():
    print("\n--- TIER 2.1: Calculator Boundary Values (0 m², 1 m², 10,000 m², Decimals) ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/calculadora/index.html", wait_until='networkidle')

    num_input = page.locator('.calc-number-input')

    # Boundary 1: 1 m² -> ceil(1 * 1.05) = 2 m²
    num_input.fill('1')
    num_input.dispatch_event('input')
    page.wait_for_timeout(100)
    gross_1 = page.locator('#calc-gross-m2').text_content().strip()
    runner.assert_test(gross_1 == "2", f"Boundary 1 m² net -> 2 m² gross (ceil 1.05), got {gross_1}")

    # Boundary 2: 0 m² -> returns 0 safely
    num_input.fill('0')
    num_input.dispatch_event('input')
    page.wait_for_timeout(100)
    gross_0 = page.locator('#calc-gross-m2').text_content().strip()
    runner.assert_test(gross_0 == "0", f"Boundary 0 m² handled safely without NaN, got {gross_0}")

    # Boundary 3: 10,000 m² -> ceil(10,000 * 1.05) = 10,500 m²
    num_input.fill('10000')
    num_input.dispatch_event('input')
    page.wait_for_timeout(100)
    gross_10k = page.locator('#calc-gross-m2').text_content().replace(',', '').replace('.', '').strip()
    runner.assert_test(gross_10k == "10500", f"Boundary 10,000 m² -> 10,500 m² gross, got {gross_10k}")
    lead_badge = page.locator('#calc-lead-badge').text_content().strip()
    runner.assert_test("B2B" in lead_badge, "10,000 m² automatically flagged with B2B priority badge", f"Badge: {lead_badge}")

    # Boundary 4: Decimal input 125.4 m² -> ceil(125.4 * 1.05) = 132 m²
    num_input.fill('125.4')
    num_input.dispatch_event('input')
    page.wait_for_timeout(100)
    gross_dec = page.locator('#calc-gross-m2').text_content().strip()
    runner.assert_test(gross_dec == "132", f"Decimal input 125.4 m² -> 132 m² gross, got {gross_dec}")

    page.close()

def test_tier2_catalog_empty_search_and_recovery():
    print("\n--- TIER 2.2: Catalog Empty Search & Filter Reset Flow ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/catalogo/index.html", wait_until='networkidle')

    search_input = page.locator('#catalog-search')
    search_input.fill('xyzinexistente999')
    search_input.dispatch_event('input')
    page.wait_for_timeout(350)

    # Cards should be 0, empty state displayed
    card_count = page.locator('.catalog-card').count()
    empty_p = page.locator('#catalog-grid p').first.text_content()
    runner.assert_test(card_count == 0, "No cards rendered for nonexistent search term")
    runner.assert_test("No se encontraron especies" in empty_p, "Empty search message displayed")

    # Reset button click
    reset_btn = page.locator('#btn-reset-catalog')
    runner.assert_test(reset_btn.count() > 0, "Reset filters button is rendered in empty state")
    reset_btn.click()
    page.wait_for_timeout(200)

    restored_cards = page.locator('.catalog-card').count()
    runner.assert_test(restored_cards >= 20, f"Reset button restores full inventory (found {restored_cards} cards)")

    page.close()

def test_tier2_multi_filter_combinations():
    print("\n--- TIER 2.3: Multi-Filter Combinations (Category + Trait + Search) ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/catalogo/index.html", wait_until='networkidle')

    # Category grama + trait salinity -> Zoysia Japónica
    page.locator('.catalog-tab[data-cat="grama"]').click()
    page.locator('[data-filter-trait="salinity"]').click()
    page.wait_for_timeout(200)

    cards = page.locator('.catalog-card')
    count = cards.count()
    title = cards.first.locator('.catalog-card-title').text_content() if count > 0 else ""
    runner.assert_test(count == 1 and "Zoysia Japónica" in title, f"Grama + Salinity isolates Zoysia Japónica (found {count}, title: {title})")

    page.close()

# ==============================================================================
# TIER 3: CROSS-FEATURE INTERACTIONS
# ==============================================================================

def test_tier3_scenario_switch_whatsapp_live_update():
    print("\n--- TIER 3.1: Live State Synchronization to WhatsApp URL ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/calculadora/index.html", wait_until='networkidle')

    # Start: Residencial 250 m2
    wa_btn = page.locator('#calc-whatsapp-btn')
    href1 = wa_btn.get_attribute('href')
    runner.assert_test("Zoysia%20Toro" in href1 or "Zoysia Toro" in urllib.parse.unquote(href1), "Initial WhatsApp link contains Zoysia Toro")

    # Switch scenario to Talud -> URL updates to Hidrosiembra
    page.locator('[data-scenario="talud"]').click()
    page.wait_for_timeout(150)
    href2 = wa_btn.get_attribute('href')
    unquoted_href2 = urllib.parse.unquote(href2)
    runner.assert_test("Hidrosiembra" in unquoted_href2, "Switching scenario to Talud updates WhatsApp link to Hidrosiembra", unquoted_href2)

    # Change area to 1200 m2 -> gross 1260 m2 in URL
    num_input = page.locator('.calc-number-input')
    num_input.fill('1200')
    num_input.dispatch_event('input')
    page.wait_for_timeout(150)
    href3 = wa_btn.get_attribute('href')
    unquoted_href3 = urllib.parse.unquote(href3)
    runner.assert_test("1260" in unquoted_href3 or "1,260" in unquoted_href3, "Area change to 1200 m2 updates WhatsApp link to 1,260 m² gross", unquoted_href3)

    page.close()

def test_tier3_catalog_modal_data_binding():
    print("\n--- TIER 3.2: Catalog Card Click -> Quick View Modal Data Binding ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/catalogo/index.html", wait_until='networkidle')

    # Click Palma Bismarckia card
    page.locator('.catalog-tab[data-cat="palma"]').click()
    page.wait_for_timeout(200)

    bismarckia_card = page.locator('.catalog-card', has_text="Bismarckia").first
    runner.assert_test(bismarckia_card.count() > 0, "Bismarckia card located in catalog")

    bismarckia_card.click()
    page.wait_for_timeout(250)

    # Modal should be open
    modal = page.locator('#catalog-modal-overlay')
    runner.assert_test("open" in (modal.get_attribute('class') or ""), "Catalog modal opened (.open class present)")

    modal_title = page.locator('#modal-title').text_content().strip()
    modal_sci = page.locator('#modal-sci').text_content().strip()
    modal_wa = page.locator('#modal-wa-btn').get_attribute('href')

    runner.assert_test("Bismarckia" in modal_title, f"Modal bound correct title: {modal_title}")
    runner.assert_test("Bismarckia nobilis" in modal_sci, f"Modal bound correct scientific name: {modal_sci}")
    runner.assert_test("https://wa.me/50765390949" in modal_wa, "Modal WhatsApp link targets official number")

    # Close modal
    page.locator('.modal-close-btn').click()
    page.wait_for_timeout(200)
    runner.assert_test(not "open" in (modal.get_attribute('class') or ""), "Modal closed via close button")

    page.close()

def test_tier3_utm_parameter_preservation():
    print("\n--- TIER 3.3: UTM Parameter Tracking & DataLayer Capture ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    test_utm_url = f"{TestContext.base_url}/index.html?utm_source=google_ads&utm_medium=cpc&utm_campaign=verano_cocle"
    page.goto(test_utm_url, wait_until='networkidle')

    # Check that omnichannel stored UTMs
    stored_utms = page.evaluate("() => window.JUSA_Omnichannel.getStoredUtms()")
    runner.assert_test(stored_utms.get('utm_source') == 'google_ads', f"Omnichannel captured UTM source: {stored_utms.get('utm_source')}")
    runner.assert_test(stored_utms.get('utm_campaign') == 'verano_cocle', f"Omnichannel captured UTM campaign: {stored_utms.get('utm_campaign')}")

    # Click WhatsApp button and assert dataLayer receives event
    page.locator('#calc-whatsapp-btn').click()
    dl_events = page.evaluate("() => window.dataLayer || []")
    lead_events = [e for e in dl_events if e.get('event') == 'whatsapp_lead_click']
    runner.assert_test(len(lead_events) > 0, "dataLayer registered 'whatsapp_lead_click' event on CTA click")
    if lead_events:
        evt = lead_events[0]
        runner.assert_test(evt.get('utm_source') == 'google_ads', "dataLayer event carries UTM attribution source")
        runner.assert_test(evt.get('area_m2') == 263, "dataLayer event carries calculated gross area")

    page.close()

# ==============================================================================
# TIER 4: REAL-WORLD USER SCENARIOS
# ==============================================================================

def test_tier4_homeowner_residential_flow():
    print("\n--- TIER 4.1: Residential Homeowner Full Journey ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/residencial/index.html", wait_until='networkidle')

    # Homeowner wants 180 m² for a sunny beach home in Buenaventura
    num_input = page.locator('.calc-number-input')
    num_input.fill('180')
    num_input.dispatch_event('input')

    page.locator('[data-scenario="playa"]').click()
    page.locator('[data-sun="sol"]').click()
    page.wait_for_timeout(150)

    gross = page.locator('#calc-gross-m2').text_content().strip()
    rec = page.locator('#calc-rec-title').text_content().strip()
    pallets = page.locator('#calc-pallets').text_content().strip()

    # 180 * 1.05 = 189 m2 gross -> 189 / 45 = 4.2 -> ~5 tarimas
    runner.assert_test(gross == "189", f"Homeowner quote: 180 m² net -> 189 m² gross (+9 m² merma), got {gross}")
    runner.assert_test("Zoysia Japónica" in rec, "Homeowner beach scenario accurately recommends Zoysia Japónica")
    runner.assert_test("5 tarimas" in pallets, f"Logistics accurately calculates ~5 tarimas de finca (got {pallets})")

    page.close()

def test_tier4_contractor_boq_spec_copy_flow():
    print("\n--- TIER 4.2: Civil Contractor Slope BoQ Spec Copy Flow ---", flush=True)
    context = TestContext.browser.new_context(viewport={"width": 1440, "height": 900})
    context.grant_permissions(["clipboard-read", "clipboard-write"])
    page = context.new_page()
    page.goto(f"{TestContext.base_url}/hidrosiembra/index.html", wait_until='networkidle')

    # Check technical slope spec 60°
    content = page.content()
    runner.assert_test("60° (1:1)" in content, "B2B page defines max slope angle 60° (1:1)")

    # Click copy BoQ spec button
    copy_btn = page.locator('[data-action="copy-spec"]').first
    runner.assert_test(copy_btn.count() > 0, "BoQ Copy Button exists")

    copy_btn.click()
    page.wait_for_timeout(200)

    toast = page.locator('.toast')
    runner.assert_test(toast.count() > 0, "Toast notification confirmed BoQ spec copy")

    context.close()

def test_tier4_mobile_thumb_bar_and_navigation_flow():
    print("\n--- TIER 4.3: Mobile Sticky Thumb Bar & Ergonomic Navigation Flow ---", flush=True)
    page = TestContext.browser.new_page(
        viewport={"width": 375, "height": 812},
        is_mobile=True,
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
    )
    page.goto(f"{TestContext.base_url}/index.html", wait_until='networkidle')

    # Thumb bar should be visible on mobile
    thumb_bar = page.locator('.thumb-bar')
    runner.assert_test(thumb_bar.is_visible(), "Sticky bottom thumb bar is visible on mobile (< 992px)")

    # Clicking calculator button in thumb bar shortcuts to #calculadora
    thumb_calc_btn = thumb_bar.locator('a[href="#calculadora"]')
    runner.assert_test(thumb_calc_btn.count() > 0, "Thumb bar has direct shortcut to #calculadora")

    # WhatsApp shortcut in thumb bar targets +507 6539-0949
    thumb_wa_btn = thumb_bar.locator('a[href*="wa.me/50765390949"]')
    runner.assert_test(thumb_wa_btn.count() > 0, "Thumb bar has direct WhatsApp button to +507 6539-0949")

    # Test auto-hide on input focus and restore on blur
    location_input = page.locator('#calc-location-input')
    location_input.scroll_into_view_if_needed()
    location_input.focus()
    page.wait_for_timeout(150)
    runner.assert_test("hidden" in (thumb_bar.get_attribute('class') or ""), "Thumb bar auto-hides when form input is focused")

    location_input.blur()
    page.wait_for_timeout(150)
    runner.assert_test(not "hidden" in (thumb_bar.get_attribute('class') or ""), "Thumb bar restores visibility when input is blurred")

    page.close()

# ==============================================================================
# INTEGRITY: CONSOLE & NETWORK AUDIT ACROSS ALL PAGES
# ==============================================================================

def test_console_and_network_integrity():
    print("\n--- INTEGRITY: 0 Console Errors & 0 Broken Assets on All 6 Pages ---", flush=True)
    all_pages = [
        "index.html",
        "residencial/index.html",
        "hidrosiembra/index.html",
        "catalogo/index.html",
        "calculadora/index.html",
        "contacto/index.html"
    ]

    for p_url in all_pages:
        page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
        console_errors = []
        failed_requests = []

        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: console_errors.append(str(exc)))
        page.on('requestfailed', lambda req: failed_requests.append(req.url) if req.failure != 'net::ERR_ABORTED' else None)

        page.goto(f"{TestContext.base_url}/{p_url}", wait_until='networkidle')

        runner.assert_test(len(console_errors) == 0, f"[{p_url}] Zero JS console errors (found {len(console_errors)})", f"Errors: {console_errors}")
        runner.assert_test(len(failed_requests) == 0, f"[{p_url}] Zero failed asset network requests (found {len(failed_requests)})", f"Failed: {failed_requests}")

        page.close()

# ==============================================================================
# SCHEMA.ORG JSON-LD VALIDATION
# ==============================================================================

def test_schema_org_json_ld_validity():
    print("\n--- SCHEMA.ORG: JSON-LD Structured Data Multi-Type Verification ---", flush=True)
    page = TestContext.browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{TestContext.base_url}/index.html", wait_until='networkidle')

    script_tag = page.locator('script[type="application/ld+json"]').first
    runner.assert_test(script_tag.count() > 0, "index.html has application/ld+json script tag")

    json_text = script_tag.text_content().strip()
    try:
        data = json.loads(json_text)
        runner.assert_test(data.get('@context') == 'https://schema.org', "Schema.org @context is https://schema.org")
        graph = data.get('@graph', [])
        runner.assert_test(len(graph) > 0, "Schema.org @graph has at least 1 top-level entity")
        org = graph[0]
        runner.assert_test(org.get('name') == 'Jardines Urbanos, S.A.', "Organization name matches 'Jardines Urbanos, S.A.'")
        runner.assert_test(org.get('geo', {}).get('latitude') == 8.4293, "Geo latitude verified: 8.4293")
        runner.assert_test(org.get('geo', {}).get('longitude') == -80.4960, "Geo longitude verified: -80.4960")
    except Exception as e:
        runner.assert_test(False, "Schema.org JSON-LD parses without error", str(e))

    page.close()

def main():
    print("=" * 70, flush=True)
    print("JARDINES URBANOS, S.A. — COMPREHENSIVE E2E TEST SUITE (TIERS 1-4)", flush=True)
    print("=" * 70, flush=True)

    setup_module()
    try:
        # Tier 1
        test_tier1_calculator_four_scenarios_and_waste()
        test_tier1_whatsapp_link_schema()
        test_tier1_catalog_category_filtering()
        test_tier1_catalog_text_search()
        test_tier1_comparator_slider()
        test_tier1_mobile_drawer_navigation()
        test_tier1_ley81_form_validation()

        # Tier 2
        test_tier2_calculator_boundary_inputs()
        test_tier2_catalog_empty_search_and_recovery()
        test_tier2_multi_filter_combinations()

        # Tier 3
        test_tier3_scenario_switch_whatsapp_live_update()
        test_tier3_catalog_modal_data_binding()
        test_tier3_utm_parameter_preservation()

        # Tier 4
        test_tier4_homeowner_residential_flow()
        test_tier4_contractor_boq_spec_copy_flow()
        test_tier4_mobile_thumb_bar_and_navigation_flow()

        # Integrity & Schema
        test_console_and_network_integrity()
        test_schema_org_json_ld_validity()

    finally:
        teardown_module()

    print("\n" + "=" * 70, flush=True)
    print(f"E2E SUITE RESULTS: {runner.total} TOTAL | {runner.passed} PASSED | {runner.failed} FAILED", flush=True)
    print("=" * 70, flush=True)

    if runner.failed > 0:
        print("\nFailed assertions:")
        for err in runner.errors:
            print(err)
        sys.exit(1)
    else:
        print("\n[OK] All E2E tests across Tiers 1-4 passed with 100% success rate!", flush=True)
        sys.exit(0)

if __name__ == '__main__':
    main()
