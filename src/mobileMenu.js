/** @format */

export class MobileMenu {
  constructor() {
    this.menu = document.getElementById('mobile-menu');
    this.hamburgerBtn = document.getElementById('hamburger-btn');
    this.closeBtn = document.getElementById('close-menu-btn');
    this.body = document.body;
    this.isOpen = false;
  }

  init() {
    if (!this.menu || !this.hamburgerBtn) return this;

    this.setupEventListeners();
    return this;
  }

  setupEventListeners() {
    this.hamburgerBtn.addEventListener('click', () => this.open());

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    const menuLinks = this.menu.querySelectorAll('.mobile-menu-link');
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        setTimeout(() => this.close(), 150);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.menu.classList.add('active');
    this.hamburgerBtn.classList.add('active');
    this.body.classList.add('menu-open');
    this.isOpen = true;
  }

  close() {
    this.menu.classList.remove('active');
    this.hamburgerBtn.classList.remove('active');
    this.body.classList.remove('menu-open');
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  destroy() {
    this.close();
  }
}
