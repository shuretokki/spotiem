/** @format */

import { ANIMATIONS } from './constants';

/**
 * @class
 */
export class MobileMenu {
  #menu = document.getElementById('mobile-menu');
  #hamburgerBtn = document.getElementById('hamburger-btn');
  #closeBtn = document.getElementById('close-menu-btn');
  #body = document.body;
  #isOpen = false;

  /**
   * @returns {MobileMenu} The MobileMenu instance
   */
  init() {
    if (!this.#menu || !this.#hamburgerBtn) return this;

    this.#setupEventListeners();
    return this;
  }

  /**
   * @returns {void}
   */
  #setupEventListeners() {
    this.#hamburgerBtn.addEventListener('click', () => this.open());
    this.#closeBtn?.addEventListener('click', () => this.close());

    this.#menu.querySelectorAll('.mobile-menu-link').forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(() => this.close(), ANIMATIONS.FAST);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.#isOpen) {
        this.close();
      }
    });
  }

  /**
   * @returns {void}
   */
  open() {
    this.#menu.classList.add('active');
    this.#hamburgerBtn.classList.add('active');
    this.#body.classList.add('menu-open');
    this.#isOpen = true;
  }

  /**
   * @returns {void}
   */
  close() {
    this.#menu.classList.remove('active');
    this.#hamburgerBtn.classList.remove('active');
    this.#body.classList.remove('menu-open');
    this.#isOpen = false;
  }

  /**
   * @returns {void}
   */
  toggle() {
    this.#isOpen ? this.close() : this.open();
  }

  /**
   * @returns {void}
   */
  destroy() {
    this.close();
  }
}
