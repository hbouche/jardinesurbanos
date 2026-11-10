import os, re

SITE_DIR = r"c:\Users\Usuario\Downloads\Jardines Urbanos\site"

# SVG definitions
SVG_LOCATION = '<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
SVG_PHONE = '<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
SVG_WA = '<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>'

SOCIAL_BAR_HTML = '''<div class="top-bar-socials" aria-label="Redes sociales oficiales">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Instagram">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="LinkedIn">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="YouTube">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
          </a>
        </div>'''

FOOTER_SOCIAL_HTML = '''<div class="social-icon-bar" style="margin-top: 1rem;">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Instagram">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="LinkedIn">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="YouTube">
            <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
          </a>
        </div>'''

DRAWER_SOCIAL_HTML = '''<div style="text-align: center; margin-bottom: 12px;">
          <p style="font-size: 0.75rem; color: #F4F1EA; margin-bottom: 8px;">Síguenos en redes:</p>
          <div class="social-icon-bar" style="justify-content: center;">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Instagram">
              <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="LinkedIn">
              <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
              <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="YouTube">
              <svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
            </a>
          </div>
        </div>'''

def update_top_bar(content):
    new_top_bar = f'''  <div class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-location">
        {SVG_LOCATION}
        <span>Rio Grande, Coclé</span>
      </div>
      <div class="top-bar-contacts">
        {SOCIAL_BAR_HTML}
        <span class="top-bar-divider" aria-hidden="true">|</span>
        <a href="tel:+5072260494" class="top-bar-link">
          {SVG_PHONE}
          <span class="phone-label">Fijo:</span> (+507) 226-0494
        </a>
        <a href="https://wa.me/50765390949" target="_blank" rel="noopener noreferrer" class="top-bar-link" style="color: var(--color-jusa);">
          {SVG_WA}
          <span class="phone-label">WhatsApp:</span> (+507) 6539-0949
        </a>
      </div>
    </div>
  </div>'''
    
    # Replace old top-bar
    content = re.sub(r'<div class="top-bar">.*?</div>\s*</div>\s*</div>', new_top_bar, content, count=1, flags=re.DOTALL)
    return content

files = [
    "index.html",
    "pages/nosotros.html",
    "pages/residencial.html",
    "pages/b2b-hidrosiembra.html",
    "pages/catalogo.html",
    "pages/calculadora.html",
    "pages/contacto.html"
]

for frel in files:
    fpath = os.path.join(SITE_DIR, frel)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()

    # 1. Update Top Bar
    c = update_top_bar(c)

    # 2. General nomenclature & sentence case replacements
    # Vivero monumental -> Vivero
    c = c.replace('data-market-tag="VIVERO MONUMENTAL"', 'data-market-tag="VIVERO"')
    c = c.replace('VIVERO MONUMENTAL', 'VIVERO')
    c = c.replace('Vivero monumental', 'Vivero')
    c = c.replace('Vivero Monumental', 'Vivero')

    # Cotizar para mi Jardín/PH -> Cotizar para mi jardín/residencial
    c = c.replace('Cotizar para mi Jardín / PH', 'Cotizar para mi jardín/residencial')
    c = c.replace('Cotizar para mi Jardín/PH', 'Cotizar para mi jardín/residencial')

    # Km 168 user facing texts -> Fincas propias Rio Grande, Coclé
    c = c.replace('Km 168 de la Carretera Interamericana (Río Grande, Coclé)', 'Fincas propias en Río Grande, Coclé')
    c = c.replace('Río Grande (Km 168)', 'Río Grande, Coclé')
    c = c.replace('Km 168 de la Carretera Interamericana', 'fincas propias en Río Grande, Coclé')
    
    # Update navigation in desktop menu: Residencial & PH -> Residencial, and split B2B & Hidrosiembra
    prefix = "" if frel == "index.html" else "../"
    p_prefix = "pages/" if frel == "index.html" else ""
    
    # Navbar links
    old_nav_regex = r'<ul class="nav-menu">.*?</ul>'
    active_inicio = ' active' if frel == 'index.html' else ''
    active_nosotros = ' active' if 'nosotros' in frel else ''
    active_residencial = ' active' if 'residencial' in frel else ''
    active_comercial = ' active' if 'comercial' in frel else ''
    active_hidro = ' active' if 'b2b-hidrosiembra' in frel else ''
    active_cat = ' active' if 'catalogo' in frel else ''
    active_calc = ' active' if 'calculadora' in frel else ''
    active_cont = ' active' if 'contacto' in frel else ''

    new_nav = f'''<ul class="nav-menu">
          <li><a href="{prefix}index.html" class="nav-link{active_inicio}">Inicio</a></li>
          <li><a href="{prefix}{p_prefix}nosotros.html" class="nav-link{active_nosotros}">Sobre Nosotros</a></li>
          <li><a href="{prefix}{p_prefix}residencial.html" class="nav-link{active_residencial}">Residencial</a></li>
          <li><a href="{prefix}{p_prefix}comercial.html" class="nav-link{active_comercial}">Comercial</a></li>
          <li><a href="{prefix}{p_prefix}b2b-hidrosiembra.html" class="nav-link{active_hidro}">Hidrosiembra</a></li>
          <li><a href="{prefix}{p_prefix}catalogo.html" class="nav-link{active_cat}">Catálogo</a></li>
          <li><a href="{prefix}{p_prefix}calculadora.html" class="nav-link{active_calc}">Calculadora</a></li>
          <li><a href="{prefix}{p_prefix}contacto.html" class="nav-link{active_cont}">Contacto</a></li>
        </ul>'''
    c = re.sub(old_nav_regex, new_nav, c, count=1, flags=re.DOTALL)

    # Mobile drawer links
    new_drawer_list = f'''<ul class="drawer-nav-list">
          <li><a href="{prefix}index.html" class="drawer-nav-link{active_inicio}">Inicio</a></li>
          <li><a href="{prefix}{p_prefix}nosotros.html" class="drawer-nav-link{active_nosotros}">Sobre Nosotros</a></li>
          <li><a href="{prefix}{p_prefix}residencial.html" class="drawer-nav-link{active_residencial}">Residencial</a></li>
          <li><a href="{prefix}{p_prefix}comercial.html" class="drawer-nav-link{active_comercial}">Comercial</a></li>
          <li><a href="{prefix}{p_prefix}b2b-hidrosiembra.html" class="drawer-nav-link{active_hidro}">Hidrosiembra</a></li>
          <li><a href="{prefix}{p_prefix}catalogo.html" class="drawer-nav-link{active_cat}">Catálogo</a></li>
          <li><a href="{prefix}{p_prefix}calculadora.html" class="drawer-nav-link{active_calc}">Calculadora</a></li>
          <li><a href="{prefix}{p_prefix}contacto.html" class="drawer-nav-link{active_cont}">Contacto</a></li>
        </ul>'''
    c = re.sub(r'<ul class="drawer-nav-list">.*?</ul>', new_drawer_list, c, count=1, flags=re.DOTALL)

    # Add social icons in drawer before whatsapp button if not present
    if 'Síguenos en redes:' not in c:
        c = re.sub(r'(<div style="border-top: 1px solid var\(--color-border-dark\); padding-top: var\(--space-4\);"[^>]*>)', r'\1\n' + DRAWER_SOCIAL_HTML, c, count=1)

    # Add footer social icons if not present
    if 'class="footer-col-brand"' in c and 'social-icon-bar' not in c.split('footer-col-brand')[1].split('footer-col-nav')[0]:
        c = re.sub(r'(<p class="footer-desc">.*?</p>)', r'\1\n' + FOOTER_SOCIAL_HTML, c, count=1)

    # Update footer links (Residencial, Comercial, Hidrosiembra)
    new_footer_links = f'''<ul class="footer-links">
          <li><a href="{prefix}index.html" class="footer-link">Inicio</a></li>
          <li><a href="{prefix}{p_prefix}nosotros.html" class="footer-link">Sobre Nosotros</a></li>
          <li><a href="{prefix}{p_prefix}residencial.html" class="footer-link">Residencial</a></li>
          <li><a href="{prefix}{p_prefix}comercial.html" class="footer-link">Comercial</a></li>
          <li><a href="{prefix}{p_prefix}b2b-hidrosiembra.html" class="footer-link">Hidrosiembra</a></li>
          <li><a href="{prefix}{p_prefix}catalogo.html" class="footer-link">Catálogo</a></li>
          <li><a href="{prefix}{p_prefix}calculadora.html" class="footer-link">Calculadora</a></li>
          <li><a href="{prefix}{p_prefix}contacto.html" class="footer-link">Contacto</a></li>
        </ul>'''
    c = re.sub(r'<ul class="footer-links">.*?</ul>', new_footer_links, c, count=1, flags=re.DOTALL)

    # Specific file custom updates:
    if frel == "index.html":
        # Hero Eyebrow
        c = c.replace('FINCAS EN RÍO GRANDE, COCLÉ (KM 168) • DESDE 1999', 'Fincas propias en Río Grande, Coclé • Desde 1999')
        # Hero Title sentence case
        c = c.replace('Venta de Gramas Naturales, Hidrosiembra y Vivero en Panamá', 'Venta de gramas naturales, hidrosiembra y vivero en Panamá')
        
        # Hero Actions: 3 buttons (Punto 8)
        old_hero_actions = r'<div class="hero-actions">.*?</div>'
        new_hero_actions = '''<div class="hero-actions">
            <a href="#calculadora" class="btn btn-accent btn-lg">Cotizar para mi jardín/residencial</a>
            <a href="pages/comercial.html" class="btn btn-primary btn-lg">Cotizar Comercial</a>
            <a href="pages/b2b-hidrosiembra.html" class="btn btn-outline-light btn-lg">Cotizar Hidrosiembra</a>
          </div>'''
        c = re.sub(old_hero_actions, new_hero_actions, c, count=1, flags=re.DOTALL)
        
        # Section Titles sentence case
        c = c.replace('Nuestras Tres Variedades de Grama Certificada', 'Nuestras tres variedades de grama certificada')
        c = c.replace('Calculadora de Grama e Hidrosiembra para tu Proyecto', 'Calculadora de grama e hidrosiembra para tu proyecto')
        c = c.replace('Especies Aclimatadas de Finca y Vivero', 'Especies aclimatadas de finca y vivero')
        c = c.replace('Transformación Real: Resultados Comprobados', 'Resultados reales antes y después de la siembra')
        c = c.replace('Soluciones de Hidrosiembra y Control de Erosión', 'Soluciones de hidrosiembra y control de erosión')
        c = c.replace('Nosotros: Más de 25 Años Vistiendo de Verde a Panamá', 'Nosotros: más de 25 años vistiendo de verde a Panamá')
        
        # Nosotros mosaic: replace Nosotros1.jpg (valla) with SAE-PARA-COSECHA_mision.jpg (Punto 10)
        c = c.replace('assets/img/Nosotros1.jpg" alt="Fundadores y equipo de Jardines Urbanos en finca"', 'assets/img/SAE-PARA-COSECHA_mision.jpg" alt="Cosecha tecnificada y despacho fresco de grama en Coclé"')
        c = c.replace('<figcaption>Liderazgo familiar y atención directa en campo</figcaption>', '<figcaption>Cosecha tecnificada y despacho fresco en finca Coclé</figcaption>\n                <span class="photo-auth-badge">© Propiedad de Jardines Urbanos, S.A.</span>')
        c = c.replace('<figcaption>Nuestros colaboradores en finca Río Grande, Coclé</figcaption>', '<figcaption>Nuestros colaboradores en finca Río Grande, Coclé</figcaption>\n                <span class="photo-auth-badge">© Propiedad de Jardines Urbanos, S.A.</span>')
        c = c.replace('<figcaption>Preparación y selección botánica en vivero</figcaption>', '<figcaption>Preparación y selección botánica en vivero</figcaption>\n                <span class="photo-auth-badge">© Propiedad de Jardines Urbanos, S.A.</span>')
        c = c.replace('<figcaption>Compromiso y orgullo en cada despacho</figcaption>', '<figcaption>Compromiso y orgullo en cada despacho</figcaption>\n                <span class="photo-auth-badge">© Propiedad de Jardines Urbanos, S.A.</span>')

        # Stat 3
        c = c.replace('Km 168</strong>\n                <span style="font-size: 0.75rem; color: var(--color-text-muted);">Río Grande, Coclé</span>', 'Fincas propias</strong>\n                <span style="font-size: 0.75rem; color: var(--color-text-muted);">Río Grande, Coclé</span>')

    if frel == "pages/nosotros.html":
        # Remove billboard on line 1088
        c = c.replace('../assets/img/Nosotros1.jpg', '../assets/img/SAE-PARA-COSECHA_mision.jpg')
        c = c.replace('alt="Liderazgo familiar de Jardines Urbanos en finca"', 'alt="Cosecha mecanizada en finca Coclé"')
        c = c.replace('Liderazgo familiar y atención directa en finca', 'Cosecha tecnificada y despacho fresco en finca Coclé')
        c = c.replace('Km 168 de la Carretera Interamericana', 'fincas propias en Río Grande, Coclé')

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(c)
    print(f"[OK] Updated {frel}")

print("[OK] All HTML files updated successfully.")
