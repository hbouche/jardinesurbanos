#!/usr/bin/env python3
"""
generate_screenshots.py
Automated high-resolution screenshot generator for Jardines Urbanos, S.A.
Captures Desktop (1440px) and Mobile (375px) views for all core views.
"""

import os
import sys
import time
import threading
import http.server

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from playwright.sync_api import sync_playwright

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SITE_DIR = os.path.join(ROOT_DIR, 'site')
OUTPUT_DIR = os.path.join(ROOT_DIR, 'docs', 'screenshots')
PORT = 8096

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
        super().do_GET()

    def log_message(self, format, *args):
        pass

def scroll_page_safely(page):
    """Safely scroll down and back up with termination guarantee to trigger lazy loading."""
    page.evaluate('''async () => {
        let lastTop = -1;
        for (let i = 0; i < 40; i++) {
            let curTop = document.scrollingElement.scrollTop;
            if (curTop === lastTop && i > 0) break;
            lastTop = curTop;
            document.scrollingElement.scrollBy(0, 500);
            await new Promise(r => setTimeout(r, 40));
        }
        document.scrollingElement.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 100));
    }''')
    page.wait_for_timeout(300)

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"[*] Starting local HTTP server at http://127.0.0.1:{PORT}", flush=True)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), CustomHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.5)

    targets = [
        ("index.html", "desktop_home.png", False),
        ("index.html", "mobile_home.png", True),
        ("calculadora/index.html", "desktop_calculadora.png", False),
        ("calculadora/index.html", "mobile_calculadora.png", True),
        ("catalogo/index.html", "desktop_catalogo.png", False),
        ("catalogo/index.html", "mobile_catalogo.png", True),
        ("hidrosiembra/index.html", "desktop_b2b_hidrosiembra.png", False),
        ("hidrosiembra/index.html", "mobile_b2b_hidrosiembra.png", True),
        ("residencial/index.html", "desktop_residencial.png", False),
        ("contacto/index.html", "desktop_contacto.png", False),
    ]

    print("[*] Launching headless browser with Playwright...", flush=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH)

        for rel_url, filename, is_mobile in targets:
            full_url = f"http://127.0.0.1:{PORT}/{rel_url}"
            out_path = os.path.join(OUTPUT_DIR, filename)

            if is_mobile:
                context = browser.new_context(
                    viewport={"width": 375, "height": 812},
                    is_mobile=True,
                    user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
                )
            else:
                context = browser.new_context(
                    viewport={"width": 1440, "height": 900}
                )

            page = context.new_page()
            print(f"  -> Capturing {filename} ({'Mobile 375×812' if is_mobile else 'Desktop 1440×900'})...", flush=True)
            page.goto(full_url, wait_until='networkidle')
            scroll_page_safely(page)
            page.screenshot(path=out_path, full_page=True)
            context.close()
            print(f"     [OK] {filename} ({os.path.getsize(out_path):,} bytes)", flush=True)

        # Capture interactive comparator
        print("  -> Capturing comparador_interactivo.png (focused slider state)...", flush=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto(f"http://127.0.0.1:{PORT}/index.html#comparador", wait_until='networkidle')
        scroll_page_safely(page)

        comp = page.locator('#comparador')
        comp.scroll_into_view_if_needed()
        range_input = page.locator('.ba-range-input').first
        if range_input.count() > 0:
            range_input.fill('40')
            range_input.dispatch_event('input')
            page.wait_for_timeout(300)

        out_path = os.path.join(OUTPUT_DIR, "comparador_interactivo.png")
        comp.screenshot(path=out_path)
        context.close()
        print(f"     [OK] comparador_interactivo.png ({os.path.getsize(out_path):,} bytes)", flush=True)

        browser.close()

    server.shutdown()
    print("[OK] All 11 screenshots successfully generated in docs/screenshots/", flush=True)

if __name__ == '__main__':
    main()
