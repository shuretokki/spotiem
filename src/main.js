/** @format */

import './style.css';
import { router } from './router.js';
import { homeTemplate, productDetailTemplate } from './templates.js';
import { Carousel, setupCarouselButtons } from './carousel.js';
import { MobileMenu } from './mobileMenu.js';
import {
  renderNewest,
  renderDiscover,
  setupCategoryFilters,
  setupSeeMoreButton,
  setupScrollNavigation,
} from './products.js';
import { initProductDetail, getProduct } from './productDetail.js';
import { BANNER_SLIDES, ANIMATIONS, LOADING } from './constants.js';

let carouselInstance = null;
let mobileMenuInstance = null;

function initializeRouter() {
  router.register('/', () => {
    renderHomePage();
  });

  router.register('/product/:id', (params) => {
    renderProductDetailPage(params.id);
  });

  setupLinkInterception();
}

function setupLinkInterception() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.product-link, a[href^="/"]');

    if (link && link.href) {
      const url = new URL(link.href);

      if (url.origin === window.location.origin) {
        e.preventDefault();
        router.navigate(url.pathname);
      }
    }
  });
}

function renderHomePage() {
  const appContent = document.getElementById('app-content');
  if (!appContent) return;

  appContent.innerHTML = homeTemplate();

  requestAnimationFrame(() => {
    initHomeComponents();
  });
}

function initHomeComponents() {
  renderNewest();
  renderDiscover();
  setupCategoryFilters();
  setupSeeMoreButton();
  setupScrollNavigation();

  if (carouselInstance) {
    carouselInstance.destroy();
  }
  carouselInstance = new Carousel(BANNER_SLIDES).init();
  setupCarouselButtons(carouselInstance);

  setTimeout(() => {
    if (carouselInstance) {
      carouselInstance.startAutoplay();
    }
  }, ANIMATIONS.NORMAL);
}

function renderProductDetailPage(productId) {
  const appContent = document.getElementById('app-content');
  if (!appContent) return;

  const product = getProduct(productId);

  if (!product) {
    appContent.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 px-4">
        <h1 class="text-4xl font-bold text-white mb-4">Product Not Found</h1>
        <p class="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
        <a href="/" class="product-link px-8 py-3 bg-[#57B660] text-white rounded-full hover:bg-[#4da555] transition-all">
          Back to Home
        </a>
      </div>
    `;
    return;
  }

  appContent.innerHTML = productDetailTemplate(product);

  requestAnimationFrame(() => {
    initProductDetail(productId);
  });
}

function initApp() {
  initializeRouter();

  if (mobileMenuInstance) {
    mobileMenuInstance.destroy();
  }
  mobileMenuInstance = new MobileMenu().init();

  router.handleRoute(window.location.pathname);

  hideLoadingScreen();

  console.log('✓ Spotiem initialized successfully');
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');

  if (loadingScreen) {
    loadingScreen.style.transition = 'opacity 0.4s ease-out';
    loadingScreen.style.opacity = '0';

    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.body.classList.add('loaded');
      document.body.style.transition = 'opacity 0.3s ease-in';
      document.body.style.opacity = '1';
    }, LOADING.PAGE_FADE);
  } else {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
  }
}

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      initApp();
    }, LOADING.SKELETON_MIN);
  });
});
