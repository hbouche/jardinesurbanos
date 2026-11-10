import os

layout_replacement = '''  /* Hero & Rotating Marketing Banner */
  .hero {
    min-height: auto !important;
    padding-top: 2rem !important;
    padding-bottom: 3rem !important;
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
  }
  .hero-bg,
  .hero-carousel {
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  .hero-slide {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: 50% 35% !important;
    transform: none !important;
  }

  /* Specific Photographic Mobile Framing per Focal Point */
  /* 1. Hero de Inicio: Enfoque en campo, cosechador, hidrosiembra y palmas */
  .hero-slide[src*="DJI_0677-Mejorado-NR"] {
    object-position: 50% 35% !important; /* Centrado panorámico del cultivo de grama tecnificado en Río Grande */
  }
  .hero-slide[src*="hero_2_gramas_finca"] {
    object-position: 50% 38% !important; /* Centrado en tractor cosechador y rollos frescos de grama */
  }
  .hero-slide[src*="hero_3_hidrosiembra"] {
    object-position: 48% 42% !important; /* Centrado en máquina de hidrosiembra y estabilización de talud */
  }
  .hero-slide[src*="hero_4_vivero_palmas"] {
    object-position: 50% 30% !important; /* Centrado en copas y follaje de Palmas Reales monumentales */
  }

  /* 2. Hero de Nosotros: Cartelera monumental y equipo */
  .hero-slide[src*="letrero_finca_nosotros_derecha"] {
    object-position: 65% 50% !important; /* Cartelera monumental nítida y visible en pantallas verticales de 360px y 390px */
  }
  .hero-slide[src*="subhero_cont_2"] {
    object-position: 50% 35% !important;
  }
  .hero-slide[src*="subhero_cont_3"] {
    object-position: 50% 38% !important;
  }

  /* 3. Hero de Residencial & PH: Tapete de grama natural centrado */
  .hero-slide[src*="subhero_res_1"] {
    object-position: 50% 55% !important; /* Tapete verde Zoysia Japónica tolerante al salitre */
  }
  .hero-slide[src*="subhero_res_2"] {
    object-position: 50% 50% !important; /* Tapete denso de San Agustín bajo sombra */
  }
  .hero-slide[src*="subhero_res_3"] {
    object-position: 50% 50% !important; /* Tapete alfombra Zoysia Toro de alto tráfico */
  }
  .hero-slide[src*="subhero_res_4"] {
    object-position: 50% 50% !important; /* Tapete residencial con rollos frescos cosechados */
  }

  /* Hero Scrim Overlay - Sombra Ejecutiva de Lujo */
  .hero-overlay {
    background: linear-gradient(180deg, rgba(10, 27, 18, 0.85) 0%, rgba(10, 27, 18, 0.60) 50%, rgba(10, 27, 18, 0.45) 100%) !important;
    z-index: 2 !important;
  }

  /* Hero Content - Card de contraste ejecutivo oscuro con glassmorphism de lujo */
  .hero-content {
    position: relative !important;
    z-index: 3 !important;
    background: linear-gradient(180deg, rgba(10, 27, 18, 0.85) 0%, rgba(10, 27, 18, 0.65) 60%, rgba(10, 27, 18, 0.45) 100%) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    padding: 1.25rem 1rem !important;
    border-radius: 16px !important;
    border: 1px solid rgba(113, 179, 71, 0.3) !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45) !important;
  }

  .hero-eyebrow {
    background: rgba(10, 27, 18, 0.82) !important;
    border: 1px solid rgba(113, 179, 71, 0.5) !important;
    color: #8FD959 !important; /* Verde JUSA optimizado para contraste AA/AAA (10.4:1) */
    font-size: 0.72rem !important;
    padding: 0.35rem 0.75rem !important;
    border-radius: var(--radius-pill) !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.75) !important;
    margin-bottom: 0.75rem !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
  }

  .hero-title {
    font-size: 1.65rem !important;
    line-height: 1.25 !important;
    color: var(--color-sand) !important;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8) !important;
    margin-bottom: 0.75rem !important;
  }

  .hero-lead {
    font-size: 0.92rem !important;
    line-height: 1.5 !important;
    color: rgba(244, 241, 234, 0.95) !important;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7) !important;
    margin-bottom: 1.25rem !important;
  }
  .hero-lead strong {
    color: #FFFFFF !important;
    font-weight: 700 !important;
  }

  .hero-slider-bar {
    width: 100% !important;
    margin-top: 1rem !important;
    padding-top: 0.75rem !important;
    box-sizing: border-box !important;
  }

  /* Cartelera Rotativa Móvil (.hero-market-banner) con backdrop-filter y contraste ejecutivo */
  .hero-market-banner {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    background: rgba(10, 27, 18, 0.88) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(113, 179, 71, 0.45) !important;
    border-radius: 12px !important;
    padding: 10px 14px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    gap: 8px !important;
    white-space: normal !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
  }

  .hero-market-banner .hero-market-text {
    font-size: 0.86rem !important;
    line-height: 1.4 !important;
    color: var(--color-sand) !important; /* #F4F1EA con 15.8:1 ratio de contraste */
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
    white-space: normal !important;
    width: 100% !important;
    word-break: break-word !important;
  }

  .hero-market-banner .market-tag {
    color: #8FD959 !important; /* Verde JUSA vibrante con contraste AAA (10.4:1) */
    background: rgba(113, 179, 71, 0.22) !important;
    border: 1px solid rgba(113, 179, 71, 0.45) !important;
    font-weight: 700 !important;
    padding: 2px 8px !important;
    border-radius: 6px !important;
    display: inline-block !important;
    margin-right: 4px !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
    letter-spacing: 0.06em !important;
  }

  .hero-market-banner .market-phrase {
    color: var(--color-sand) !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6) !important;
    line-height: 1.35 !important;
  }

  .hero-market-banner .hero-market-cta {
    align-self: flex-start !important;
    font-size: 0.80rem !important;
    color: #8FD959 !important;
    font-weight: 700 !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7) !important;
    white-space: nowrap !important;
    padding: 4px 8px !important;
    background: rgba(113, 179, 71, 0.12) !important;
    border-radius: 6px !important;
  }

  .hero-actions,
  .hero-cta-group {
    flex-direction: column !important;
    width: 100% !important;
    gap: 10px !important;
  }
  .hero-actions .btn,
  .hero-cta-group .btn {
    width: 100% !important;
    max-width: 100% !important;
    text-align: center !important;
    white-space: normal !important;
  }'''

html_replacement = '''    /* 5. Hero & Rotating Marketing Banner */
    .hero {
      min-height: auto !important;
      padding-top: 2rem !important;
      padding-bottom: 3rem !important;
      overflow: hidden !important;
      width: 100% !important;
      max-width: 100vw !important;
      box-sizing: border-box !important;
    }
    .hero-bg, .hero-carousel {
      overflow: hidden !important;
      width: 100% !important;
      max-width: 100vw !important;
    }
    .hero-slide {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: 50% 35% !important;
      transform: none !important;
    }

    /* Specific Photographic Mobile Framing per Focal Point */
    /* 1. Hero de Inicio: Enfoque en campo, cosechador, hidrosiembra y palmas */
    .hero-slide[src*="DJI_0677-Mejorado-NR"] {
      object-position: 50% 35% !important; /* Centrado panorámico del cultivo de grama tecnificado en Río Grande */
    }
    .hero-slide[src*="hero_2_gramas_finca"] {
      object-position: 50% 38% !important; /* Centrado en tractor cosechador y rollos frescos de grama */
    }
    .hero-slide[src*="hero_3_hidrosiembra"] {
      object-position: 48% 42% !important; /* Centrado en máquina de hidrosiembra y estabilización de talud */
    }
    .hero-slide[src*="hero_4_vivero_palmas"] {
      object-position: 50% 30% !important; /* Centrado en copas y follaje de Palmas Reales monumentales */
    }

    /* 2. Hero de Nosotros: Cartelera monumental y equipo */
    .hero-slide[src*="letrero_finca_nosotros_derecha"] {
      object-position: 65% 50% !important; /* Cartelera monumental nítida y visible en pantallas verticales de 360px y 390px */
    }
    .hero-slide[src*="subhero_cont_2"] {
      object-position: 50% 35% !important;
    }
    .hero-slide[src*="subhero_cont_3"] {
      object-position: 50% 38% !important;
    }

    /* 3. Hero de Residencial & PH: Tapete de grama natural centrado */
    .hero-slide[src*="subhero_res_1"] {
      object-position: 50% 55% !important; /* Tapete verde Zoysia Japónica tolerante al salitre */
    }
    .hero-slide[src*="subhero_res_2"] {
      object-position: 50% 50% !important; /* Tapete denso de San Agustín bajo sombra */
    }
    .hero-slide[src*="subhero_res_3"] {
      object-position: 50% 50% !important; /* Tapete alfombra Zoysia Toro de alto tráfico */
    }
    .hero-slide[src*="subhero_res_4"] {
      object-position: 50% 50% !important; /* Tapete residencial con rollos frescos cosechados */
    }

    /* Hero Scrim Overlay - Sombra Ejecutiva de Lujo */
    .hero-overlay {
      background: linear-gradient(180deg, rgba(10, 27, 18, 0.85) 0%, rgba(10, 27, 18, 0.60) 50%, rgba(10, 27, 18, 0.45) 100%) !important;
      z-index: 2 !important;
    }

    /* Hero Content - Card de contraste ejecutivo oscuro con glassmorphism de lujo */
    .hero-content {
      position: relative !important;
      z-index: 3 !important;
      background: linear-gradient(180deg, rgba(10, 27, 18, 0.85) 0%, rgba(10, 27, 18, 0.65) 60%, rgba(10, 27, 18, 0.45) 100%) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      padding: 1.25rem 1rem !important;
      border-radius: 16px !important;
      border: 1px solid rgba(113, 179, 71, 0.3) !important;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45) !important;
    }

    .hero-eyebrow {
      background: rgba(10, 27, 18, 0.82) !important;
      border: 1px solid rgba(113, 179, 71, 0.5) !important;
      color: #8FD959 !important; /* Verde JUSA optimizado para contraste AA/AAA (10.4:1) */
      font-size: 0.72rem !important;
      padding: 0.35rem 0.75rem !important;
      border-radius: var(--radius-pill) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.75) !important;
      margin-bottom: 0.75rem !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
    }

    .hero-title {
      font-size: 1.65rem !important;
      line-height: 1.25 !important;
      color: var(--color-sand) !important;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8) !important;
      margin-bottom: 0.75rem !important;
    }

    .hero-lead {
      font-size: 0.92rem !important;
      line-height: 1.5 !important;
      color: rgba(244, 241, 234, 0.95) !important;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7) !important;
      margin-bottom: 1.25rem !important;
    }
    .hero-lead strong {
      color: #FFFFFF !important;
      font-weight: 700 !important;
    }

    .hero-slider-bar {
      width: 100% !important;
      margin-top: 1rem !important;
      padding-top: 0.75rem !important;
      box-sizing: border-box !important;
    }

    /* Cartelera Rotativa Móvil (.hero-market-banner) con backdrop-filter y contraste ejecutivo */
    .hero-market-banner {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      background: rgba(10, 27, 18, 0.88) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(113, 179, 71, 0.45) !important;
      border-radius: 12px !important;
      padding: 10px 14px !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      gap: 8px !important;
      white-space: normal !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
    }

    .hero-market-banner .hero-market-text {
      font-size: 0.86rem !important;
      line-height: 1.4 !important;
      color: var(--color-sand) !important; /* #F4F1EA con 15.8:1 ratio de contraste */
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
      white-space: normal !important;
      width: 100% !important;
      word-break: break-word !important;
    }

    .hero-market-banner .market-tag {
      color: #8FD959 !important; /* Verde JUSA vibrante con contraste AAA (10.4:1) */
      background: rgba(113, 179, 71, 0.22) !important;
      border: 1px solid rgba(113, 179, 71, 0.45) !important;
      font-weight: 700 !important;
      padding: 2px 8px !important;
      border-radius: 6px !important;
      display: inline-block !important;
      margin-right: 4px !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
      letter-spacing: 0.06em !important;
    }

    .hero-market-banner .market-phrase {
      color: var(--color-sand) !important;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6) !important;
      line-height: 1.35 !important;
    }

    .hero-market-banner .hero-market-cta {
      align-self: flex-start !important;
      font-size: 0.80rem !important;
      color: #8FD959 !important;
      font-weight: 700 !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7) !important;
      white-space: nowrap !important;
      padding: 4px 8px !important;
      background: rgba(113, 179, 71, 0.12) !important;
      border-radius: 6px !important;
    }

    .hero-actions,
    .hero-cta-group {
      flex-direction: column !important;
      width: 100% !important;
      gap: 10px !important;
    }
    .hero-actions .btn,
    .hero-cta-group .btn {
      width: 100% !important;
      max-width: 100% !important;
      text-align: center !important;
      white-space: normal !important;
    }'''

target_layout = '''  /* Hero & Rotating Marketing Banner */
  .hero {
    min-height: auto !important;
    padding-top: 2rem !important;
    padding-bottom: 3rem !important;
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
  }
  .hero-bg,
  .hero-carousel {
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  .hero-slide {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .hero-slider-bar {
    width: 100% !important;
    margin-top: 1.25rem !important;
    padding-top: 0.75rem !important;
    box-sizing: border-box !important;
  }
  .hero-market-banner {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    border-radius: 12px !important;
    padding: 10px 14px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    gap: 8px !important;
    white-space: normal !important;
  }
  .hero-market-banner .hero-market-text {
    font-size: 0.85rem !important;
    line-height: 1.35 !important;
    white-space: normal !important;
    width: 100% !important;
    word-break: break-word !important;
  }
  .hero-market-banner .hero-market-cta {
    align-self: flex-start !important;
    font-size: 0.78rem !important;
    white-space: nowrap !important;
    padding: 4px 8px !important;
  }
  .hero-actions,
  .hero-cta-group {
    flex-direction: column !important;
    width: 100% !important;
    gap: 10px !important;
  }
  .hero-actions .btn,
  .hero-cta-group .btn {
    width: 100% !important;
    max-width: 100% !important;
    text-align: center !important;
    white-space: normal !important;
  }'''

target_html = '''    /* 5. Hero & Rotating Marketing Banner */
    .hero {
      min-height: auto !important;
      padding-top: 2rem !important;
      padding-bottom: 3rem !important;
      overflow: hidden !important;
      width: 100% !important;
      max-width: 100vw !important;
      box-sizing: border-box !important;
    }
    .hero-bg, .hero-carousel {
      overflow: hidden !important;
      width: 100% !important;
      max-width: 100vw !important;
    }
    .hero-slide {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      transform: none !important;
    }
    .hero-slider-bar {
      width: 100% !important;
      margin-top: 1.25rem !important;
      padding-top: 0.75rem !important;
      box-sizing: border-box !important;
    }
    .hero-market-banner {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      border-radius: 12px !important;
      padding: 10px 14px !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      gap: 8px !important;
      white-space: normal !important;
    }
    .hero-market-banner .hero-market-text {
      font-size: 0.85rem !important;
      line-height: 1.35 !important;
      white-space: normal !important;
      width: 100% !important;
      word-break: break-word !important;
    }
    .hero-market-banner .hero-market-cta {
      align-self: flex-start !important;
      font-size: 0.78rem !important;
      white-space: nowrap !important;
      padding: 4px 8px !important;
    }
    .hero-actions, .hero-cta-group {
      flex-direction: column !important;
      width: 100% !important;
      gap: 10px !important;
    }
    .hero-actions .btn, .hero-cta-group .btn {
      width: 100% !important;
      max-width: 100% !important;
      text-align: center !important;
      white-space: normal !important;
    }'''

def update_file(path, target, replacement):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    # Normalize \r\n to \n for searching
    c_norm = c.replace('\r\n', '\n')
    target_norm = target.replace('\r\n', '\n')
    replacement_norm = replacement.replace('\r\n', '\n')
    if target_norm in c_norm:
        c_new = c_norm.replace(target_norm, replacement_norm, 1)
        # Preserve original line endings if CRLF was present
        if '\r\n' in c:
            c_new = c_new.replace('\n', '\r\n')
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(c_new)
        print(f'Successfully updated: {path}')
    else:
        print(f'TARGET NOT FOUND in: {path}')

update_file('site/css/layout.css', target_layout, layout_replacement)
update_file('site/index.html', target_html, html_replacement)
update_file('site/pages/nosotros.html', target_html, html_replacement)
update_file('site/pages/residencial.html', target_html, html_replacement)
