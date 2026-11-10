import os, re

SITE_DIR = r"c:\Users\Usuario\Downloads\Jardines Urbanos\site"

# 1. Update CSS Tokens & Components for High Contrast & Social Icons
tokens_path = os.path.join(SITE_DIR, "css", "tokens.css")
with open(tokens_path, "r", encoding="utf-8") as f:
    tokens_css = f.read()

# Enhance text-dim to brighter tone for WCAG AAA
tokens_css = tokens_css.replace("--color-text-dim: #D1DAD4;", "--color-text-dim: #E8EFEA; /* Brighter high contrast for dark backgrounds (WCAG AAA) */")

with open(tokens_path, "w", encoding="utf-8") as f:
    f.write(tokens_css)
print("[OK] Updated tokens.css contrast")

# Add Social Icon & Photo Badge CSS to components.css if not present
comp_path = os.path.join(SITE_DIR, "css", "components.css")
with open(comp_path, "r", encoding="utf-8") as f:
    comp_css = f.read()

social_css_block = """
/* ============================================================
   Social Media Icon Bar & Official Photo Badges
   ============================================================ */
.social-icon-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.social-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(244, 241, 234, 0.12);
  border: 1px solid rgba(113, 179, 71, 0.35);
  color: var(--color-sand);
  transition: all 0.2s ease;
  text-decoration: none;
}
.social-icon-link:hover {
  background: var(--color-chlorophyll);
  border-color: var(--color-lime);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
}
.photo-auth-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.70rem;
  color: #F4F1EA;
  background: rgba(18, 43, 29, 0.85);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(113, 179, 71, 0.4);
  margin-top: 6px;
  letter-spacing: 0.02em;
}
"""

if ".social-icon-bar" not in comp_css:
    comp_css += "\n" + social_css_block
    with open(comp_path, "w", encoding="utf-8") as f:
        f.write(comp_css)
    print("[OK] Added social and badge CSS to components.css")

# Add High Contrast rules to layout.css
layout_path = os.path.join(SITE_DIR, "css", "layout.css")
with open(layout_path, "r", encoding="utf-8") as f:
    layout_css = f.read()

high_contrast_block = """
/* ============================================================
   High Contrast Typography over Dark Backgrounds (WCAG AAA >= 7:1)
   ============================================================ */
.section-dark .section-desc,
.hero-lead,
.hero-trust-text,
.card-dark p,
.top-bar,
.site-footer,
.site-footer p {
  color: #F4F1EA !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
}
.section-dark .section-desc strong,
.hero-trust-text strong,
.hero-lead strong,
.card-dark h3,
.card-dark h4 {
  color: #FFFFFF !important;
}
.hero-eyebrow,
.section-dark .section-eyebrow {
  color: #A8E67A !important;
  background: rgba(18, 43, 29, 0.90) !important;
  border: 1px solid rgba(168, 230, 122, 0.5) !important;
  text-transform: none !important;
  letter-spacing: 0.04em !important;
}
.top-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-bar-location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #F4F1EA;
  font-size: 0.85rem;
}
.top-bar-contacts {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.top-bar-socials {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.top-bar-divider {
  color: rgba(244, 241, 234, 0.3);
  font-size: 0.85rem;
}
@media (max-width: 768px) {
  .top-bar-inner {
    flex-direction: row !important;
    justify-content: space-between !important;
    padding: 6px 12px !important;
  }
  .top-bar-location {
    font-size: 0.78rem !important;
  }
  .top-bar-socials {
    display: none !important; /* Kept in mobile drawer and footer on small screens */
  }
  .top-bar-divider {
    display: none !important;
  }
  .top-bar-contacts {
    gap: 8px !important;
  }
  .top-bar-link span.phone-label {
    display: none !important;
  }
}
"""

if "High Contrast Typography over Dark Backgrounds" not in layout_css:
    layout_css += "\n" + high_contrast_block
    with open(layout_path, "w", encoding="utf-8") as f:
        f.write(layout_css)
    print("[OK] Added high contrast typography and top-bar CSS to layout.css")

print("[OK] Phase 1 CSS styling completed.")
