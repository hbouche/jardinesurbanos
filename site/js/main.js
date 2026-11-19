/**
 * main.js
 * Jardines Urbanos, S.A. (Panamá) - Master UI Controller & Interaction Orchestrator
 * Visual Direction: "Tropical Luxury & Agro-Tech"
 */

(function() {
  'use strict';

  // Helper to determine asset relative prefix (root vs pages/)
  const isSubPage = window.location.pathname.includes('/pages/') || 
                    window.location.pathname.endsWith('residencial.html') ||
                    window.location.pathname.endsWith('b2b-hidrosiembra.html') ||
                    window.location.pathname.endsWith('catalogo.html') ||
                    window.location.pathname.endsWith('calculadora.html') ||
                    window.location.pathname.endsWith('contacto.html');
  const assetPrefix = isSubPage ? '../' : '';

  /**
   * 1. Toast Notification Utility
   */
  function showToast(message, duration) {
    const time = duration || 3200;
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span><svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(function() {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, time);
  }
  window.JUSA_ShowToast = showToast;

  /**
   * 2. Header Scroll Effect & Mobile Drawer Navigation
   */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Mobile Drawer Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');
    const drawerLinks = document.querySelectorAll('.drawer-nav-link');

    function openDrawer() {
      if (drawerBackdrop) {
        drawerBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (drawerBackdrop) {
        drawerBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        openDrawer();
      });
    }

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', function(e) {
        if (e.target === drawerBackdrop) {
          closeDrawer();
        }
      });
    }

    drawerLinks.forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });

    // Mobile Thumb Bar: auto-hide when interacting with inputs
    const thumbBar = document.querySelector('.thumb-bar');
    if (thumbBar) {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(function(inp) {
        inp.addEventListener('focus', function() {
          thumbBar.classList.add('hidden');
        });
        inp.addEventListener('blur', function() {
          thumbBar.classList.remove('hidden');
        });
      });
    }
  }

  /**
   * 3. Interactive m² Calculator Binding
   */
  function initCalculator() {
    const calcWidget = document.querySelector('.calc-widget');
    if (!calcWidget || typeof window.JUSA_Calculator === 'undefined') return;

    const calc = window.JUSA_Calculator;

    // State
    const state = {
      areaNet: 250,
      scenario: 'residencial',
      sun: 'sol',
      location: '',
      includeInstall: 'Solo suministro en obra / finca'
    };

    // DOM Elements
    const rangeInput = calcWidget.querySelector('.range-slider');
    const numberInput = calcWidget.querySelector('.calc-number-input');
    const scenarioPills = calcWidget.querySelectorAll('[data-scenario]');
    const sunButtons = calcWidget.querySelectorAll('[data-sun]');
    const installCheckbox = calcWidget.querySelector('#calc-install-checkbox');
    const locationInput = calcWidget.querySelector('#calc-location-input');

    // Outputs
    const grossM2El = calcWidget.querySelector('#calc-gross-m2');
    const netM2El = calcWidget.querySelector('#calc-net-m2');
    const wasteM2El = calcWidget.querySelector('#calc-waste-m2');
    const recTitleEl = calcWidget.querySelector('#calc-rec-title');
    const recSciEl = calcWidget.querySelector('#calc-rec-sci');
    const recDescEl = calcWidget.querySelector('#calc-rec-desc');
    const supplyModeEl = calcWidget.querySelector('#calc-supply-mode');
    const palletsEl = calcWidget.querySelector('#calc-pallets');
    const leadBadgeEl = calcWidget.querySelector('#calc-lead-badge');
    const whatsappBtn = calcWidget.querySelector('#calc-whatsapp-btn');
    const summaryTextEl = calcWidget.querySelector('#calc-summary-text');

    function updateView() {
      const quote = calc.calculateLawnQuote(state);

      if (grossM2El) grossM2El.textContent = quote.areaGross.toLocaleString('es-PA');
      if (netM2El) netM2El.textContent = `${quote.areaNet.toLocaleString('es-PA')} m²`;
      if (wasteM2El) wasteM2El.textContent = `+${quote.wasteM2} m² (+5%)`;
      if (recTitleEl) recTitleEl.textContent = quote.recommendedVariety;

      const refPriceEl = calcWidget.querySelector('#calc-ref-price');
      if (refPriceEl) {
        let unitP = '$3.75 / m² (ref.)';
        let unitVal = 3.75;
        if (quote.varietyKey === 'zoysia_japonica') { unitP = '$4.25 / m² (ref.)'; unitVal = 4.25; }
        else if (quote.varietyKey === 'san_agustin') { unitP = '$3.25 / m² (ref.)'; unitVal = 3.25; }
        else if (quote.varietyKey === 'hidrosiembra') { unitP = '$1.85 / m² (ref.)'; unitVal = 1.85; }
        else { unitP = '$3.75 / m² (ref.)'; unitVal = 3.75; }

        const totalEst = quote.areaGross > 0 ? ` • Est. Total: $${(quote.areaGross * unitVal).toLocaleString('es-PA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '';
        refPriceEl.innerHTML = `${unitP}<span style="font-size:0.75rem; color:var(--color-sand-muted); font-weight:normal;">${totalEst}</span>`;
      }
      if (recSciEl) recSciEl.textContent = quote.scientificName;
      if (recDescEl) recDescEl.textContent = quote.description;
      if (supplyModeEl) supplyModeEl.textContent = quote.supplyMode;
      
      if (palletsEl) {
        if (quote.isHydroseeding) {
          palletsEl.textContent = 'Aplicación mecanizada en obra';
        } else {
          palletsEl.textContent = `~${quote.estimatedPallets} tarimas de finca`;
        }
      }

      if (leadBadgeEl) {
        if (quote.isB2B) {
          leadBadgeEl.textContent = 'Prioridad obra civil';
          leadBadgeEl.className = 'badge badge-b2b';
        } else {
          leadBadgeEl.textContent = 'Residencial';
          leadBadgeEl.className = 'badge badge-official';
        }
      }

      if (whatsappBtn) {
        whatsappBtn.href = quote.whatsappUrl;
        whatsappBtn.setAttribute('data-area-m2', quote.areaGross);
        whatsappBtn.setAttribute('data-grass-variety', quote.recommendedVariety);
        whatsappBtn.setAttribute('data-product-category', quote.isB2B ? 'B2B' : 'Residencial');
      }

      if (summaryTextEl) {
        summaryTextEl.textContent = quote.summaryText;
      }
    }

    // Synchronize inputs
    if (rangeInput && numberInput) {
      rangeInput.addEventListener('input', function() {
        state.areaNet = parseInt(rangeInput.value, 10) || 20;
        numberInput.value = state.areaNet;
        updateView();
      });

      numberInput.addEventListener('input', function() {
        let val = parseInt(numberInput.value, 10) || 0;
        if (val > 100000) val = 100000;
        state.areaNet = val;
        rangeInput.value = Math.min(5000, Math.max(20, val));
        updateView();
      });
    }

    // Scenario selection
    scenarioPills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        scenarioPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.scenario = pill.getAttribute('data-scenario') || 'residencial';
        updateView();
      });
    });

    // Sun selection
    sunButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        sunButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.sun = btn.getAttribute('data-sun') || 'sol';
        updateView();
      });
    });

    // Optional install checkbox
    if (installCheckbox) {
      installCheckbox.addEventListener('change', function() {
        state.includeInstall = installCheckbox.checked ? 
          'Suministro e instalación profesional en obra' : 
          'Solo suministro en obra / finca';
        updateView();
      });
    }

    const clientNameInput = calcWidget.querySelector('#calc-client-name');
    const clientPhoneInput = calcWidget.querySelector('#calc-client-phone');
    const clientEmailInput = calcWidget.querySelector('#calc-client-email');

    function syncLeadFields() {
      const nameVal = clientNameInput ? clientNameInput.value.trim() : '';
      const phoneVal = clientPhoneInput ? clientPhoneInput.value.trim() : '';
      const emailVal = clientEmailInput ? clientEmailInput.value.trim() : '';
      const locVal = locationInput ? locationInput.value.trim() : '';
      const parts = [];
      if (locVal) parts.push(locVal);
      if (nameVal) parts.push('Cliente: ' + nameVal);
      if (phoneVal) parts.push('Tel: ' + phoneVal);
      if (emailVal) parts.push('Email: ' + emailVal);
      state.location = parts.join(' | ');
      updateView();
    }

    [locationInput, clientNameInput, clientPhoneInput, clientEmailInput].forEach(function(inp) {
      if (inp) {
        inp.addEventListener('input', syncLeadFields);
      }
    });

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', function() {
        const leadRecord = {
          timestamp: new Date().toISOString(),
          name: clientNameInput ? clientNameInput.value.trim() : '',
          phone: clientPhoneInput ? clientPhoneInput.value.trim() : '',
          email: clientEmailInput ? clientEmailInput.value.trim() : '',
          location: locationInput ? locationInput.value.trim() : '',
          areaNet: state.areaNet,
          scenario: state.scenario,
          sun: state.sun
        };
        try {
          const existing = JSON.parse(localStorage.getItem('jusa_captured_leads') || '[]');
          existing.push(leadRecord);
          localStorage.setItem('jusa_captured_leads', JSON.stringify(existing));
        } catch (err) {}
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: 'calculator_lead_captured' }, leadRecord));
      });
    }


    const pdfBtn = calcWidget.querySelector('#calc-pdf-btn');
    const emailBtn = calcWidget.querySelector('#calc-email-btn');

    function validateClientLead() {
      const nameVal = clientNameInput ? clientNameInput.value.trim() : '';
      const phoneVal = clientPhoneInput ? clientPhoneInput.value.trim() : '';
      const emailVal = clientEmailInput ? clientEmailInput.value.trim() : '';
      if (!nameVal || (!phoneVal && !emailVal)) {
        showToast('Por favor ingresa tu Nombre y Teléfono o Correo en el Paso 4 para emitir la cotización.');
        if (clientNameInput && !nameVal) clientNameInput.focus();
        else if (clientPhoneInput) clientPhoneInput.focus();
        return null;
      }
      return {
        name: nameVal,
        phone: phoneVal || 'No especificado',
        email: emailVal || 'No especificado',
        location: (locationInput ? locationInput.value.trim() : '') || 'Panamá'
      };
    }

    if (pdfBtn) {
      pdfBtn.addEventListener('click', function() {
        const lead = validateClientLead();
        if (!lead) return;
        const quote = calc.calculateLawnQuote(state);
        const quoteNum = 'JUSA-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
        const dateStr = new Date().toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric' });
        const win = window.open('', '_blank');
        if (!win) {
          showToast('Permite ventanas emergentes para descargar el PDF de cotización.');
          return;
        }
        win.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cotización Técnica ${quoteNum} - Jardines Urbanos, S.A.</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; color: #122B1D; background: #F4F1EA; padding: 24px; }
    .sheet { max-width: 800px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #D8D2C5; box-shadow: 0 12px 32px rgba(18,43,29,0.12); }
    .header { background: #122B1D; color: #F4F1EA; padding: 28px 32px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #71B347; }
    .brand h1 { font-family: 'Fraunces', serif; font-size: 24px; letter-spacing: 0.03em; color: #F4F1EA; }
    .brand p { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71B347; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px; }
    .meta { text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
    .meta strong { color: #71B347; font-size: 15px; display: block; }
    .body { padding: 32px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .box { background: #F8F6F1; border: 1px solid #E5E0D5; border-radius: 10px; padding: 16px 20px; }
    .box-title { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #2E6F40; margin-bottom: 8px; font-weight: 700; }
    .row { display: flex; justify-content: space-between; font-size: 13px; padding: 5px 0; border-bottom: 1px dashed #E0DBD0; }
    .row:last-child { border-bottom: none; }
    .highlight-banner { background: #122B1D; color: #F4F1EA; border-radius: 12px; padding: 22px 26px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .highlight-banner .big { font-family: 'JetBrains Mono', monospace; font-size: 36px; font-weight: 700; color: #71B347; }
    .rec-card { border-left: 4px solid #71B347; background: #F4F1EA; padding: 18px 22px; border-radius: 0 10px 10px 0; margin-bottom: 24px; }
    .rec-card h3 { font-family: 'Fraunces', serif; font-size: 20px; color: #122B1D; }
    .rec-card em { color: #2E6F40; font-size: 13px; display: block; margin-bottom: 8px; }
    .footer { background: #F4F1EA; padding: 20px 32px; border-top: 1px solid #E5E0D5; display: flex; justify-content: space-between; font-size: 12px; color: #4A5D52; }
    .no-print { text-align: center; margin-bottom: 16px; }
    .btn-print { background: #2E6F40; color: #fff; border: none; padding: 10px 22px; border-radius: 99px; font-weight: 700; cursor: pointer; font-size: 14px; }
    @media print { body { background: #fff; padding: 0; } .sheet { box-shadow: none; border: none; } .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn-print" onclick="window.print()"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg> Guardar como PDF / Imprimir Cotización</button>
  </div>
  <div class="sheet">
    <div class="header">
      <div class="brand">
        <h1>JARDINES URBANOS, S.A.</h1>
        <p>Productores desde 1999 • Fincas en Río Grande, Coclé (Km 168)</p>
      </div>
      <div class="meta">
        <strong>PRE-COTIZACIÓN #${quoteNum}</strong>
        <span>Fecha: ${dateStr}</span>
      </div>
    </div>
    <div class="body">
      <div class="grid-2">
        <div class="box">
          <div class="box-title">Datos del Solicitante</div>
          <div class="row"><span>Cliente / Empresa:</span><strong>${lead.name}</strong></div>
          <div class="row"><span>Teléfono / WhatsApp:</span><strong>${lead.phone}</strong></div>
          <div class="row"><span>Correo Electrónico:</span><strong>${lead.email}</strong></div>
          <div class="row"><span>Ubicación de Obra:</span><strong>${lead.location}</strong></div>
        </div>
        <div class="box">
          <div class="box-title">Parámetros del Terreno</div>
          <div class="row"><span>Escenario:</span><strong>${quote.scenarioLabel}</strong></div>
          <div class="row"><span>Exposición solar:</span><strong>${quote.sunLabel}</strong></div>
          <div class="row"><span>Modalidad:</span><strong>${state.includeInstall}</strong></div>
          <div class="row"><span>Clasificación:</span><strong>${quote.isB2B ? 'Proyecto de obra / ingeniería' : 'Residencial'}</strong></div>
        </div>
      </div>

      <div class="highlight-banner">
        <div>
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:#A8E67A;">Volumen Total Recomendado (+5% Merma Técnica)</div>
          <div style="font-size:13px; color:#D8E2DC; margin-top:4px;">Área Neta: ${quote.areaNet.toLocaleString('es-PA')} m² + Merma de corte: +${quote.wasteM2} m²</div>
        </div>
        <div style="text-align:right;">
          <span class="big">${quote.areaGross.toLocaleString('es-PA')} m²</span>
          <div style="font-size:12px; color:#71B347;">${quote.isHydroseeding ? 'Aplicación mecanizada en obra' : '~' + quote.estimatedPallets + ' Tarimas de Finca'}</div>
        </div>
      </div>

      <div class="rec-card">
        <div class="box-title">Prescripción Agronómica Recomendada</div>
        <h3>${quote.recommendedVariety}</h3>
        <em>${quote.scientificName}</em>
        <p style="font-size:13.5px; line-height:1.55; color:#2C3E35;">${quote.description}</p>
      </div>

      <div class="box">
        <div class="box-title">Próximo Paso para Confirmación de Despacho</div>
        <p style="font-size:13px; line-height:1.5; color:#2C3E35;">
          Esta hoja técnica constituye el cómputo métrico oficial de su proyecto. Nuestro departamento comercial confirmará la tarifa vigente según ubicación de flete desde Carretera Interamericana Km 168, Río Grande, Coclé.
        </p>
      </div>
    </div>
    <div class="footer">
      <div><strong>Jardines Urbanos, S.A.</strong> • RUC / Finca Río Grande, Coclé, Panamá</div>
      <div>Tel: (+507) 226-0494 • WhatsApp: (+507) 6539-0949 • ventas@jardinesurbanos.com</div>
    </div>
  </div>
  <script>setTimeout(function(){ window.print(); }, 600);</script>
</body>
</html>`);
        win.document.close();
        showToast('Cotización en PDF generada.');
      });
    }

    if (emailBtn) {
      emailBtn.addEventListener('click', function() {
        const lead = validateClientLead();
        if (!lead) return;
        const quote = calc.calculateLawnQuote(state);
        const subject = encodeURIComponent(`Solicitud de Cotización (${quote.areaGross} m² - ${quote.recommendedVariety}) - ${lead.name}`);
        const body = encodeURIComponent(
          `Hola equipo de Ventas de Jardines Urbanos, S.A.,

` +
          `Adjunto los datos de mi proyecto calculados en el cotizador técnico web:

` +
          `• Cliente / Empresa: ${lead.name}
` +
          `• Teléfono / WhatsApp: ${lead.phone}
` +
          `• Correo Electrónico: ${lead.email}
` +
          `• Ubicación de Entrega: ${lead.location}
` +
          `--------------------------------------------------
` +
          `• Variedad Recomendada: ${quote.recommendedVariety} (${quote.scientificName})
` +
          `• Área Neta del Terreno: ${quote.areaNet} m²
` +
          `• Total con +5% Merma Técnica: ${quote.areaGross} m²
` +
          `• Logística estimada: ${quote.isHydroseeding ? 'Hidrosiembra mecanizada' : '~' + quote.estimatedPallets + ' tarimas'}
` +
          `• Modalidad: ${state.includeInstall}

` +
          `Quedo atento a la cotización formal en PDF.
Saludos cordiales,
${lead.name}`
        );
        window.location.href = `mailto:ventas@jardinesurbanos.com?cc=${encodeURIComponent(lead.email !== 'No especificado' ? lead.email : '')}&subject=${subject}&body=${body}`;
        showToast('Abriendo cliente de correo con la cotización técnica lista...');
      });
    }

    // Initial render
    updateView();
  }

  /**
   * 4. Live Botanical Catalog Rendering & Dynamic Filtering
   */
  function initCatalog() {
    const catalogGrid = document.querySelector('#catalog-grid');
    if (!catalogGrid || typeof window.JUSA_Catalog === 'undefined') return;

    const catalog = window.JUSA_Catalog;

    let currentCategory = 'all';
    let searchQuery = '';
    let filterSun = false;
    let filterSalinity = false;
    let filterTraffic = false;

    const categoryTabs = document.querySelectorAll('.catalog-tab[data-cat]');
    const searchInput = document.querySelector('#catalog-search');
    const traitButtons = document.querySelectorAll('[data-filter-trait]');

    function renderSpeciesCards(items) {
      catalogGrid.innerHTML = '';

      if (!items || items.length === 0) {
        catalogGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
            <p style="font-size: 1.25rem; font-weight: 600; color: var(--color-forest);">No se encontraron especies con los filtros seleccionados.</p>
            <p style="color: var(--color-text-muted);">Prueba ajustando los términos de búsqueda o seleccionando "Todo el inventario".</p>
            <button class="btn btn-outline btn-sm" id="btn-reset-catalog" style="margin-top: 1rem;">Restablecer Filtros</button>
          </div>
        `;
        const resetBtn = document.querySelector('#btn-reset-catalog');
        if (resetBtn) {
          resetBtn.addEventListener('click', function() {
            currentCategory = 'all';
            searchQuery = '';
            filterSun = false;
            filterSalinity = false;
            filterTraffic = false;
            categoryTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-cat') === 'all'));
            if (searchInput) searchInput.value = '';
            traitButtons.forEach(b => b.classList.remove('active'));
            applyFilters();
          });
        }
        return;
      }

      items.forEach(function(item) {
        const card = document.createElement('article');
        card.className = 'catalog-card';
        card.setAttribute('data-id', item.id);

        const imgPath = assetPrefix + item.photoUrl;

        let badgeHtml = item.isOfficial
          ? `<span class="badge badge-official">${item.badge}</span>`
          : `<span class="badge badge-mockup">${item.badge}</span>`;

        let traitsHtml = '';
        if (item.sunRequirement === 'sol') {
          traitsHtml += `<span class="badge badge-sun"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> Sol</span>`;
        } else if (item.sunRequirement === 'sombra') {
          traitsHtml += `<span class="badge badge-shade"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg> Sombra</span>`;
        }

        if (item.coastalSalinityTolerance) {
          traitsHtml += `<span class="badge badge-salinity"><svg class="svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M2 19c2 1.5 4.5 1.5 6.5 0s4.5-1.5 6.5 0 4.5 1.5 6.5 0"/></svg> Costero</span>`;
        }

        if (item.trafficTolerance) {
          traitsHtml += `<span class="badge badge-traffic"><svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Tráfico</span>`;
        }

        const waUrl = (catalog && typeof catalog.getSpeciesWhatsAppUrl === 'function')
          ? catalog.getSpeciesWhatsAppUrl(item.name)
          : `https://wa.me/50765390949?text=Hola,%20deseo%20consultar%20disponibilidad%20de%20${encodeURIComponent(item.name)}`;

        if (catalog && typeof catalog.renderSpeciesCardHtml === 'function') {
          card.innerHTML = catalog.renderSpeciesCardHtml(item, assetPrefix);
        } else {
          card.innerHTML = `
            <div class="catalog-card-img-wrap">
              <img src="${imgPath}" alt="${item.name} - Jardines Urbanos Panamá" class="catalog-card-img" loading="lazy" width="400" height="300">
              <div class="catalog-card-badge-pos">${badgeHtml}</div>
            </div>
            <div class="catalog-card-body">
              <h3 class="catalog-card-title">${item.name}</h3>
              <p class="catalog-card-sci">${item.scientificName}</p>
              <div class="catalog-card-traits">${traitsHtml}</div>
              <p class="catalog-card-desc">${item.shortDescription}</p>
              <div class="catalog-card-footer">
                <span class="catalog-price-tag" title="Precio referencial en vivero">${item.price}</span>
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" data-grass-variety="${item.name}" data-product-category="Catálogo" title="Cotizar o consultar disponibilidad por WhatsApp">
                  <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg> Consultar
                </a>
              </div>
            </div>
          `;
        }

        // Click card to open detail modal
        card.addEventListener('click', function(e) {
          // If clicked the whatsapp button directly, allow normal link navigation
          if (e.target.closest('.btn-whatsapp')) return;
          openCatalogModal(item);
        });

        catalogGrid.appendChild(card);
      });
    }

    function applyFilters() {
      const filtered = catalog.filterBotanicalCatalog({
        category: currentCategory,
        query: searchQuery,
        sun: filterSun ? 'sol' : undefined,
        salinity: filterSalinity ? true : undefined,
        traffic: filterTraffic ? true : undefined
      });
      renderSpeciesCards(filtered);
    }

    // Category Tabs Click
    categoryTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.getAttribute('data-cat') || 'all';
        applyFilters();
      });
    });

    // Search Input Typing (Debounced)
    if (searchInput) {
      let timeout = null;
      searchInput.addEventListener('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          searchQuery = searchInput.value.trim();
          applyFilters();
        }, 180);
      });
    }

    // Trait Buttons
    traitButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        btn.classList.toggle('active');
        const trait = btn.getAttribute('data-filter-trait');
        if (trait === 'sun') filterSun = btn.classList.contains('active');
        if (trait === 'salinity') filterSalinity = btn.classList.contains('active');
        if (trait === 'traffic') filterTraffic = btn.classList.contains('active');
        applyFilters();
      });
    });

    // Initial render
    applyFilters();
  }

  /**
   * 5. Catalog Quick View Modal
   */
  function openCatalogModal(item) {
    let overlay = document.querySelector('#catalog-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'catalog-modal-overlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <h3 id="modal-title" style="font-family: var(--font-display); font-size: 1.5rem; color: var(--color-forest);"></h3>
              <p id="modal-sci" style="font-style: italic; color: var(--color-chlorophyll); font-size: 0.95rem; margin-top: 2px;"></p>
            </div>
            <button class="modal-close-btn" aria-label="Cerrar ventana">&times;</button>
          </div>
          <div class="modal-body">
            <div id="modal-img-container" style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; max-height: 320px;">
              <img id="modal-img" src="" alt="" style="width: 100%; height: 320px; object-fit: cover;">
            </div>
            <div id="modal-badge-container" style="margin-bottom: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;"></div>
            <p id="modal-desc" style="font-size: 1rem; line-height: 1.6; color: var(--color-text-dark); margin-bottom: 1.25rem;"></p>
            <div style="background: var(--color-sand); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-forest); margin-bottom: 0.5rem;">Características de Finca & Cultivo:</h4>
              <ul id="modal-features" style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6;"></ul>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-sand-muted); padding-top: 1rem;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block;">Precio Referencial:</span>
                <span class="catalog-price-tag">${item.price}</span>
              </div>
              <a id="modal-wa-btn" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg> Solicitar Disponibilidad
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeBtn = overlay.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', function() {
        overlay.classList.remove('open');
      });

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.classList.remove('open');
        }
      });
    }

    // Populate modal
    const imgPath = assetPrefix + item.photoUrl;
    overlay.querySelector('#modal-title').textContent = item.name;
    overlay.querySelector('#modal-sci').textContent = item.scientificName;
    overlay.querySelector('#modal-img').src = imgPath;
    overlay.querySelector('#modal-img').alt = item.name;
    overlay.querySelector('#modal-desc').textContent = item.shortDescription;

    const badgeContainer = overlay.querySelector('#modal-badge-container');
    badgeContainer.innerHTML = item.isOfficial
      ? `<span class="badge badge-official">${item.sourceTag}</span>`
      : `<span class="badge badge-mockup">${item.sourceTag}</span>`;

    const featuresList = overlay.querySelector('#modal-features');
    featuresList.innerHTML = '';
    if (item.features && item.features.length) {
      item.features.forEach(function(feat) {
        const li = document.createElement('li');
        li.textContent = feat;
        featuresList.appendChild(li);
      });
    } else {
      featuresList.innerHTML = '<li>Cultivado y aclimatado para el clima tropical húmedo de Panamá.</li>';
    }

    const waMsg = encodeURIComponent(`Hola Jardines Urbanos, deseo solicitar disponibilidad y cotización de vivero para: ${item.name} (${item.scientificName}).`);
    overlay.querySelector('#modal-wa-btn').href = `https://wa.me/50765390949?text=${waMsg}`;

    overlay.classList.add('open');
  }

  /**
   * 6. Before / After Comparison Sliders
   */
  function initComparators() {
    if (typeof window.JUSA_Comparator !== 'undefined') {
      window.JUSA_Comparator.initAll();
    }
  }

  /**
   * 7. 1-Click BoQ Spec Copier
   */
  function initBoQSpecCopier() {
    const copyBtns = document.querySelectorAll('[data-action="copy-spec"]');
    copyBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const targetSelector = btn.getAttribute('data-target');
        const targetEl = targetSelector ? document.querySelector(targetSelector) : null;
        const textToCopy = targetEl ? targetEl.innerText.trim() : (btn.getAttribute('data-text') || '');

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(function() {
            showToast('Especificación técnica copiada al portapapeles');
          }).catch(function() {
            fallbackCopy(textToCopy);
          });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Especificación copiada');
      } catch (err) {
        alert('Copia el siguiente texto:\n\n' + text);
      }
      document.body.removeChild(textarea);
    }
  }

  /**
   * 8. Form Validation & Ley 81 Compliance
   */
  function initForms() {
    const forms = document.querySelectorAll('form[data-validate-ley81]');
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        const leyCheckbox = form.querySelector('input[type="checkbox"][name="ley81_optin"]');
        if (leyCheckbox && !leyCheckbox.checked) {
          e.preventDefault();
          showToast('<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Debe aceptar el tratamiento de datos según la Ley 81 de Panamá');
          leyCheckbox.focus();
          const label = leyCheckbox.closest('label');
          if (label) {
            label.style.outline = '2px solid var(--color-terracotta)';
            setTimeout(function() { label.style.outline = 'none'; }, 3000);
          }
          return;
        }

        // Check if form should route to WhatsApp
        if (form.getAttribute('data-route') === 'whatsapp') {
          e.preventDefault();
          const name = (form.querySelector('[name="nombre"]') || {}).value || '';
          const phone = (form.querySelector('[name="telefono"]') || {}).value || '';
          const prov = (form.querySelector('[name="provincia"]') || {}).value || '';
          const msg = (form.querySelector('[name="mensaje"]') || {}).value || '';

          const fullMsg = `Hola Jardines Urbanos, mi nombre es ${name} (Tel: ${phone}), ubicado en ${prov}. Consulta: ${msg}`;
          const waUrl = `https://wa.me/50765390949?text=${encodeURIComponent(fullMsg)}`;
          window.open(waUrl, '_blank');
          showToast('Abriendo WhatsApp de Jardines Urbanos...');
        }
      });
    });
  }

  /**
   * 9. Omnichannel Handlers
   */
  function initOmnichannel() {
    if (typeof window.JUSA_Omnichannel !== 'undefined') {
      window.JUSA_Omnichannel.attachWhatsAppHandlers();
    }
  }

  /**
   * Bootstrap on DOM Ready
   */
              /**
   * 10. Rotating Hero Carousel with Market-Driven Dynamic Captions & CTAs
   * Reads data attributes directly from each slide for 100% synchronization across all pages.
   */
  function initHeroCarouselAndVideoReel() {
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
      const slides = carousel.querySelectorAll('.hero-slide');
      const pips = document.querySelectorAll('.hero-nav-pip');
      const marketText = document.getElementById('hero-market-text');
      const marketCta = document.getElementById('hero-market-cta');
      let currentSlide = 0;
      let timer = null;

      function goToSlide(idx) {
        if (!slides.length) return;
        currentSlide = (idx + slides.length) % slides.length;
        
        // Toggle active slide
        slides.forEach(function(s, i) {
          s.classList.toggle('active', i === currentSlide);
        });

        // Toggle active pip indicator
        pips.forEach(function(p, i) {
          p.classList.toggle('active', i === currentSlide);
        });
        
        // Read directly from the slide node
        const activeSlide = slides[currentSlide];
        if (activeSlide) {
          const tag = activeSlide.getAttribute('data-market-tag') || 'JARDINES URBANOS';
          const phrase = activeSlide.getAttribute('data-market-phrase') || activeSlide.getAttribute('data-slide-caption') || '';
          const ctaText = activeSlide.getAttribute('data-cta-text') || 'Conoce más';
          const ctaHref = activeSlide.getAttribute('data-cta-href') || '#';

          if (marketText) {
            marketText.style.opacity = '0';
            marketText.style.transform = 'translateY(3px)';
            setTimeout(function() {
              marketText.innerHTML = '<span class="market-tag">' + tag + '</span> <span class="market-phrase">' + phrase + '</span>';
              marketText.style.opacity = '1';
              marketText.style.transform = 'translateY(0)';
            }, 120);
          }

          if (marketCta) {
            marketCta.href = ctaHref;
            marketCta.innerHTML = '<span>' + ctaText + '</span> →';
          }
        }
      }

      function startAutoRotate() {
        if (timer) clearInterval(timer);
        timer = setInterval(function() {
          goToSlide(currentSlide + 1);
        }, 4500);
      }

      pips.forEach(function(pip, i) {
        pip.addEventListener('click', function() {
          goToSlide(i);
          startAutoRotate();
        });
      });

      // Initialize first slide caption immediately
      goToSlide(0);
      startAutoRotate();
    }

    // ============================================================
    // Continuous Automated Looping Video Reel on Homepage
    // ============================================================
    const featuredVideo = document.getElementById('home-featured-video');
    const playlistContainer = document.getElementById('video-playlist-pills');
    if (featuredVideo && playlistContainer) {
      const playlist = [
        {
          src: 'assets/video/finca_oficial_jusa.mp4',
          svgIcon: '<svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 11 1-3h4l2 3v4h-3"/><circle cx="18" cy="17" r="3"/><circle cx="6" cy="15" r="5"/><path d="M6 10h5l1 5"/><path d="M11 15h4"/></svg>',
          title: 'Nuestras fincas en plena acción en Río Grande, Coclé',
          desc: 'Observa la escala de nuestras 7 hectáreas tecnificadas, el cuidado agronómico y la preparación de despachos a nivel nacional.'
        },
        {
          src: 'assets/video/gramas_oficial_jusa.mp4',
          svgIcon: '<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
          title: 'Cosecha fresca de grama en rollos cortada el mismo día para tu obra',
          desc: 'Césped vivo de alta densidad listo para entrega inmediata con 100% de prendimiento garantizado en suelos panameños.'
        },
        {
          src: 'assets/video/viveros_oficial_jusa.mp4',
          svgIcon: '<svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22V8"/><path d="M12 8C8 8 5 5 5 2c4 0 7 3 7 6Z"/><path d="M12 8c4 0 7-3 7-6-4 0-7 3-7 6Z"/><path d="M12 11c-4 1-7-1-9-4 3-1 7 0 9 4Z"/><path d="M12 11c4 1 7-1 9-4-3-1-7 0-9 4Z"/></svg>',
          title: 'Vivero botánico completo con palmas reales y árboles en cepellón',
          desc: 'Recorre nuestros lotes de ejemplares adultos preparados con poda radicular para proyectos residenciales y urbanísticos.'
        },
        {
          src: 'assets/video/recorrido_finca_jusa.mp4',
          svgIcon: '<svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
          title: 'Soluciones de ingeniería vial, hidrosiembra y control de erosión',
          desc: 'Operación continua en todo Panamá con maquinaria pesada propia para estabilizar taludes viales en tiempo récord.'
        }
      ];

      let currentVideoIdx = 0;
      let isSwitching = false;
      const titleEl = document.getElementById('video-market-title');
      const descEl = document.getElementById('video-market-desc');
      const headlineEl = document.getElementById('video-market-headline');
      const pipBtns = playlistContainer.querySelectorAll('.video-pip-btn');

      // Ensure proper muted autoplay support
      featuredVideo.muted = true;
      featuredVideo.defaultMuted = true;
      featuredVideo.playsInline = true;

      function switchVideo(idx, userInitiated) {
        currentVideoIdx = (idx + playlist.length) % playlist.length;
        const item = playlist[currentVideoIdx];

        // Animate text headline and description
        if (titleEl && descEl) {
          titleEl.style.opacity = '0';
          descEl.style.opacity = '0';
          setTimeout(function() {
            if (headlineEl) {
              const iconSpan = headlineEl.querySelector('#video-market-icon') || headlineEl.querySelector('span:first-child');
              if (iconSpan) iconSpan.innerHTML = item.svgIcon;
            }
            titleEl.textContent = item.title;
            descEl.textContent = item.desc;
            titleEl.style.opacity = '1';
            descEl.style.opacity = '1';
          }, 120);
        }

        // Update active indicator button
        pipBtns.forEach(function(b, i) {
          b.classList.toggle('active', i === currentVideoIdx);
        });

        // Switch video source and play smoothly
        try {
          featuredVideo.pause();
          featuredVideo.src = item.src;
          featuredVideo.muted = true;
          featuredVideo.load();
          const p = featuredVideo.play();
          if (p !== undefined) {
            p.catch(function(err) {
              // Browser autoplay policy catch
              console.log('Video play caught:', err);
            });
          }
        } catch (e) {
          console.error('Video switch error:', e);
        }
      }

      // Loop to next video when current video ends
      featuredVideo.addEventListener('ended', function() {
        switchVideo(currentVideoIdx + 1, false);
      });

      // Backup: timeupdate check near video duration end (in case browser ended event is skipped)
      featuredVideo.addEventListener('timeupdate', function() {
        if (featuredVideo.duration && featuredVideo.currentTime >= (featuredVideo.duration - 0.35)) {
          if (!isSwitching) {
            isSwitching = true;
            switchVideo(currentVideoIdx + 1, false);
            setTimeout(function() { isSwitching = false; }, 1500);
          }
        }
      });

      // Error recovery
      featuredVideo.addEventListener('error', function() {
        setTimeout(function() { switchVideo(currentVideoIdx + 1, false); }, 1000);
      });

      // User one-click selection
      pipBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const targetIdx = parseInt(btn.getAttribute('data-video-index'), 10) || 0;
          switchVideo(targetIdx, true);
        });
      });
    }
  }

  function onReady() {
    initNavigation();
    initHeroCarouselAndVideoReel();
    initCalculator();
    initCatalog();
    initComparators();
    initBoQSpecCopier();
    initForms();
    initOmnichannel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
