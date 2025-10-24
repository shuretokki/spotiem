/** @format */

import './style.css';
import { router } from './router.js';
import {
  homeTemplate,
  productDetailTemplate,
  contactTemplate,
  aboutTemplate,
  notFoundTemplate,
  blogTemplate,
} from './templates.js';
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
import { BANNER_SLIDES, ANIMATIONS, LOADING, COLORS } from './constants.js';

let carouselInstance = null;
let mobileMenuInstance = null;

const initializeRouter = () => {
  router.register('/', renderHomePage);
  router.register('/product/:id', ({ id }) => renderProductDetailPage(id));
  router.register('/contact', renderContactPage);
  router.register('/about', renderAboutPage);
  router.register('/blog', renderBlogPage);
  setupLinkInterception();
};

const setupLinkInterception = () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.product-link, a[href^="/"]');

    if (!link?.href) return;

    const url = new URL(link.href);

    if (url.origin === window.location.origin) {
      e.preventDefault();
      router.navigate(url.pathname);
    }
  });
};

const renderHomePage = () => {
  document.querySelector('app-content').innerHTML = homeTemplate();
  requestAnimationFrame(() => initHomeComponents());
};

const initHomeComponents = () => {
  renderNewest();
  renderDiscover();
  setupCategoryFilters();
  setupSeeMoreButton();
  setupScrollNavigation();

  carouselInstance?.destroy();
  carouselInstance = new Carousel(BANNER_SLIDES).init();
  setupCarouselButtons(carouselInstance);

  setTimeout(() => carouselInstance?.startAutoplay(), ANIMATIONS.NORMAL);
};

const renderContactPage = () => {
  document.querySelector('app-content').innerHTML = contactTemplate();
  requestAnimationFrame(() => setupContactForm());
};

export function setupContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-success');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 4000);
  });
}

const renderAboutPage = () => {
  const app = document.querySelector('app-content');
  app.innerHTML = aboutTemplate();
};

const renderBlogPage = () => {
  document.querySelector('app-content').innerHTML = blogTemplate();
};
const renderProductDetailPage = (productId) => {
  if (!getProduct(productId)) {
    document.querySelector('app-content').innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 px-4">
        <h1 class="text-4xl font-bold text-white mb-4">Product Not Found</h1>
        <p class="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
        <a href="/" class="product-link px-8 py-3 bg-[${COLORS.PRIMARY}] text-white rounded-full hover:bg-[${COLORS.PRIMARY_HOVER}] transition-all">
          Back to Home
        </a>
      </div>
    `;
    return;
  }

  document.querySelector('app-content').innerHTML = productDetailTemplate(
    getProduct(productId),
  );
  requestAnimationFrame(() => initProductDetail(productId));
};

const initApp = () => {
  initializeRouter();

  mobileMenuInstance?.destroy();
  mobileMenuInstance = new MobileMenu().init();

  router.handleRoute(window.location.pathname);
  hideLoadingScreen();
};

const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');

  if (!loadingScreen) {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
    return;
  }

  Object.assign(loadingScreen.style, {
    transition: 'opacity 0.4s ease-out',
    opacity: '0',
  });

  setTimeout(() => {
    loadingScreen.style.display = 'none';
    document.body.classList.add('loaded');
    Object.assign(document.body.style, {
      transition: 'opacity 0.3s ease-in',
      opacity: '1',
    });
  }, LOADING.PAGE_FADE);
};

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    setTimeout(initApp, LOADING.SKELETON_MIN);
  });
});
