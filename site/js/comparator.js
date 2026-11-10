/**
 * comparator.js
 * Jardines Urbanos, S.A. (Panamá) - Controlador Interactivo de Comparador Antes / Después
 * 
 * Especificaciones:
 * - Soporte para arrastre táctil (touch), arrastre de ratón (mouse) y teclado accesible (WCAG 2.1)
 * - Rango restringido seguro [5%, 95%] para evitar colapso visual de los extremos
 * - Soporte multi-instancia en la misma página (ej. Comparador Talud B2B y Comparador Jardín Residencial)
 * - Integración fluida con input range nativo o controles drag & drop personalizados
 * - Módulo UMD (Navegador: window.JUSA_Comparator, Node.js: module.exports)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JUSA_Comparator = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const DEFAULT_OPTIONS = {
    initialPosition: 50, // porcentaje 50%
    min: 5,              // mínimo seguro 5%
    max: 95,             // máximo seguro 95%
    step: 1,             // paso de incremento por teclado
    selectorBefore: '.ba-before, [data-ba="before"]',
    selectorAfter: '.ba-after, [data-ba="after"]',
    selectorHandle: '.ba-handle, [data-ba="handle"]',
    selectorRange: 'input[type="range"].ba-range, [data-ba="range"]',
    onChange: null
  };

  /**
   * Instancia de controlador Antes/Después para un elemento contenedor.
   * @param {HTMLElement|string} target - Elemento o selector CSS del contenedor
   * @param {Object} [options] - Opciones de configuración
   */
  function BeforeAfterComparator(target, options) {
    // Si se ejecuta en entorno Node.js o sin DOM
    if (typeof document === 'undefined') {
      this.isDomAvailable = false;
      this.position = (options && options.initialPosition) || DEFAULT_OPTIONS.initialPosition;
      return;
    }

    this.isDomAvailable = true;
    this.container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!this.container) {
      throw new Error(`[JUSA_Comparator] Contenedor no encontrado: ${target}`);
    }

    this.opts = Object.assign({}, DEFAULT_OPTIONS, options);
    this.position = this.clamp(this.opts.initialPosition);
    this.isDragging = false;

    // Elementos hijos
    this.beforeEl = this.container.querySelector(this.opts.selectorBefore);
    this.afterEl = this.container.querySelector(this.opts.selectorAfter);
    this.handleEl = this.container.querySelector(this.opts.selectorHandle);
    this.rangeEl = this.container.querySelector(this.opts.selectorRange);

    // Bindings de contexto
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onRangeInput = this._onRangeInput.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this.init();
  }

  /**
   * Restringe el porcentaje dentro de los límites de seguridad [min, max].
   * @param {number} value
   * @returns {number}
   */
  BeforeAfterComparator.prototype.clamp = function(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return DEFAULT_OPTIONS.initialPosition;
    return Math.max(this.opts ? this.opts.min : DEFAULT_OPTIONS.min,
      Math.min(this.opts ? this.opts.max : DEFAULT_OPTIONS.max, num));
  };

  /**
   * Inicializa escuchas de eventos y estado ARIA.
   */
  BeforeAfterComparator.prototype.init = function() {
    if (!this.isDomAvailable || !this.container) return;

    // Configuración de accesibilidad ARIA
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Comparador visual Antes y Después');

    if (this.handleEl) {
      this.handleEl.setAttribute('role', 'slider');
      this.handleEl.setAttribute('aria-valuemin', String(this.opts.min));
      this.handleEl.setAttribute('aria-valuemax', String(this.opts.max));
      this.handleEl.setAttribute('aria-valuenow', String(this.position));
      this.handleEl.setAttribute('tabindex', '0');
      this.handleEl.setAttribute('aria-label', 'Deslizador interactivo de comparación');
      this.handleEl.addEventListener('keydown', this._onKeyDown);
    }

    // Input range nativo sincronizado (si existe)
    if (this.rangeEl) {
      this.rangeEl.min = this.opts.min;
      this.rangeEl.max = this.opts.max;
      this.rangeEl.value = this.position;
      this.rangeEl.addEventListener('input', this._onRangeInput);
    }

    // Eventos pointer / touch / mouse en el contenedor
    if (window.PointerEvent) {
      this.container.addEventListener('pointerdown', this._onPointerDown);
    } else {
      this.container.addEventListener('mousedown', this._onPointerDown);
      this.container.addEventListener('touchstart', this._onPointerDown, { passive: false });
    }

    // Aplicar estado inicial
    this.setPosition(this.position);
  };

  /**
   * Establece la posición visual del divisor (porcentaje 5 a 95).
   * @param {number} percent
   */
  BeforeAfterComparator.prototype.setPosition = function(percent) {
    this.position = this.clamp(percent);

    if (!this.isDomAvailable) return;

    const pctStr = this.position + '%';

    // 1. Ajuste del contenedor "Before" (revelación de ancho o clip-path)
    if (this.beforeEl) {
      this.beforeEl.style.width = pctStr;
    }

    // 2. Ajuste de la posición del tirador / handle
    if (this.handleEl) {
      this.handleEl.style.left = pctStr;
      this.handleEl.setAttribute('aria-valuenow', String(Math.round(this.position)));
    }

    // 3. Sincronización del slider range si está presente
    if (this.rangeEl && Math.abs(parseFloat(this.rangeEl.value) - this.position) > 0.5) {
      this.rangeEl.value = this.position;
    }

    // 4. Callback de cambio
    if (typeof this.opts.onChange === 'function') {
      this.opts.onChange(this.position);
    }
  };

  /**
   * Obtiene la posición actual en porcentaje.
   * @returns {number}
   */
  BeforeAfterComparator.prototype.getPosition = function() {
    return this.position;
  };

  /**
   * Calcula el porcentaje correspondiente a una coordenada X en pantalla.
   * @param {number} clientX
   * @returns {number}
   */
  BeforeAfterComparator.prototype._calculatePercentage = function(clientX) {
    if (!this.container) return this.position;
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0) return this.position;
    const offsetX = clientX - rect.left;
    const rawPct = (offsetX / rect.width) * 100;
    return this.clamp(rawPct);
  };

  BeforeAfterComparator.prototype._onPointerDown = function(e) {
    // Si el evento proviene del input range nativo, dejarlo fluir
    if (e.target === this.rangeEl) return;

    this.isDragging = true;
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    this.setPosition(this._calculatePercentage(clientX));

    if (window.PointerEvent) {
      window.addEventListener('pointermove', this._onPointerMove);
      window.addEventListener('pointerup', this._onPointerUp);
      window.addEventListener('pointercancel', this._onPointerUp);
    } else {
      window.addEventListener('mousemove', this._onPointerMove);
      window.addEventListener('mouseup', this._onPointerUp);
      window.addEventListener('touchmove', this._onPointerMove, { passive: false });
      window.addEventListener('touchend', this._onPointerUp);
    }

    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
  };

  BeforeAfterComparator.prototype._onPointerMove = function(e) {
    if (!this.isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    this.setPosition(this._calculatePercentage(clientX));
    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
  };

  BeforeAfterComparator.prototype._onPointerUp = function() {
    this.isDragging = false;
    if (window.PointerEvent) {
      window.removeEventListener('pointermove', this._onPointerMove);
      window.removeEventListener('pointerup', this._onPointerUp);
      window.removeEventListener('pointercancel', this._onPointerUp);
    } else {
      window.removeEventListener('mousemove', this._onPointerMove);
      window.removeEventListener('mouseup', this._onPointerUp);
      window.removeEventListener('touchmove', this._onPointerMove);
      window.removeEventListener('touchend', this._onPointerUp);
    }
  };

  BeforeAfterComparator.prototype._onRangeInput = function(e) {
    this.setPosition(e.target.value);
  };

  BeforeAfterComparator.prototype._onKeyDown = function(e) {
    let handled = false;
    let newPos = this.position;
    const step = this.opts.step || 1;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newPos = this.position - step;
        handled = true;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newPos = this.position + step;
        handled = true;
        break;
      case 'PageDown':
        newPos = this.position - (step * 5);
        handled = true;
        break;
      case 'PageUp':
        newPos = this.position + (step * 5);
        handled = true;
        break;
      case 'Home':
        newPos = this.opts.min;
        handled = true;
        break;
      case 'End':
        newPos = this.opts.max;
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      this.setPosition(newPos);
    }
  };

  /**
   * Destruye la instancia y libera listeners.
   */
  BeforeAfterComparator.prototype.destroy = function() {
    if (!this.isDomAvailable || !this.container) return;

    if (this.handleEl) {
      this.handleEl.removeEventListener('keydown', this._onKeyDown);
    }
    if (this.rangeEl) {
      this.rangeEl.removeEventListener('input', this._onRangeInput);
    }
    if (window.PointerEvent) {
      this.container.removeEventListener('pointerdown', this._onPointerDown);
    } else {
      this.container.removeEventListener('mousedown', this._onPointerDown);
      this.container.removeEventListener('touchstart', this._onPointerDown);
    }
    this._onPointerUp();
  };

  /**
   * Inicializa todos los comparadores encontrados en la página.
   * @param {string} [selector='.ba-comparator, [data-comparator]']
   * @param {Object} [options]
   * @returns {Array<BeforeAfterComparator>}
   */
  function initAll(selector, options) {
    if (typeof document === 'undefined') return [];
    const sel = selector || '.ba-comparator, [data-comparator]';
    const elements = document.querySelectorAll(sel);
    const instances = [];
    elements.forEach(function(el) {
      instances.push(new BeforeAfterComparator(el, options));
    });
    return instances;
  }

  return {
    DEFAULT_OPTIONS: DEFAULT_OPTIONS,
    BeforeAfterComparator: BeforeAfterComparator,
    initAll: initAll
  };
}));
