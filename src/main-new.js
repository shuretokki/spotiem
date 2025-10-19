/** @format */

/**
 * SPOTIEM - Audio E-commerce SPA
 * Modern, modular architecture with clean separation of concerns
 */

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

// Global instances
let carouselInstance = null;
let mobileMenuInstance = null;

/**
 * ====================================================================
 * ROUTER SETUP
 * ====================================================================
 */

/**
 * Initialize application router
 */
function initializeRouter() {
  // Home route
  router.register('/', () => {
    renderHomePage();
  });

  // Product detail route
  router.register('/product/:id', (params) => {
    renderProductDetailPage(params.id);
  });

  // Setup SPA link interception
  setupLinkInterception();
}

/**
 * Setup SPA link interception
 */
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

/**
 * ====================================================================
 * PAGE RENDERING
 * ====================================================================
 */

/**
 * Render home page
 */
function renderHomePage() {
  const appContent = document.getElementById('app-content');
  if (!appContent) return;

  // Load template
  appContent.innerHTML = homeTemplate();

  // Initialize components
  requestAnimationFrame(() => {
    initHomeComponents();
  });
}

/**
 * Initialize home page components
 */
function initHomeComponents() {
  // Products
  renderNewest();
  renderDiscover();
  setupCategoryFilters();
  setupSeeMoreButton();
  setupScrollNavigation();

  // Carousel
  if (carouselInstance) {
    carouselInstance.destroy();
  }
  carouselInstance = new Carousel(BANNER_SLIDES).init();
  setupCarouselButtons(carouselInstance);

  // Start autoplay after render
  setTimeout(() => {
    if (carouselInstance) {
      carouselInstance.startAutoplay();
    }
  }, ANIMATIONS.NORMAL);
}

/**
 * Render product detail page
 */
function renderProductDetailPage(productId) {
  const appContent = document.getElementById('app-content');
  if (!appContent) return;

  const product = getProduct(productId);

  if (!product) {
    // Product not found
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

  // Load product detail template
  appContent.innerHTML = productDetailTemplate(product);

  // Initialize product detail functionality
  requestAnimationFrame(() => {
    initProductDetail(productId);
  });
}

/**
 * ====================================================================
 * APPLICATION INITIALIZATION
 * ====================================================================
 */

/**
 * Initialize application
 */
function initApp() {
  // Initialize router
  initializeRouter();

  // Initialize mobile menu
  if (mobileMenuInstance) {
    mobileMenuInstance.destroy();
  }
  mobileMenuInstance = new MobileMenu().init();

  // Route to current path
  router.handleRoute(window.location.pathname);

  // Hide loading screen
  hideLoadingScreen();

  console.log('✓ Spotiem initialized successfully');
}

/**
 * Hide loading screen with fade animation
 */
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

/**
 * ====================================================================
 * STARTUP
 * ====================================================================
 */

// Wait for page load then initialize
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      initApp();
    }, LOADING.SKELETON_MIN);
  });
});
