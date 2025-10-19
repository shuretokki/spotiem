/** @format */

/**
 * SPOTIEM - Audio E-commerce SPA
 * Clean architecture with templates, routing, and modular components
 */

import './style.css';
import { router } from './router.js';
import { homeTemplate, productDetailTemplate } from './templates.js';
import { getAllProducts, getProductById } from './productData.js';

/**
 * ====================================================================
 * HOME PAGE LOGIC
 * ====================================================================
 */

/**
 * ====================================================================
 * HOME PAGE LOGIC
 * ====================================================================
 */

// Product Card Component for Newest Section
function createProductCard(
  product,
  isDesktopOnly = false,
  isMobileCentered = false,
) {
  const wrapperClasses = isMobileCentered
    ? 'md:hidden col-span-2 max-w-[188px] mx-auto'
    : isDesktopOnly
    ? 'hidden lg:block w-full lg:min-w-[168px] lg:max-w-[168px] lg:flex-shrink-0'
    : 'w-full lg:min-w-[168px] lg:max-w-[168px] lg:flex-shrink-0';

  const cardWrapper = document.createElement('div');
  cardWrapper.className = wrapperClasses;

  cardWrapper.innerHTML = `
    <a href="/product/${product.id}" class="product-link block group/card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer">
      <div class="aspect-square bg-transparent flex items-center justify-center overflow-hidden rounded-2xl relative">
        <img
          src="${product.image}"
          alt="${product.title}"
          loading="lazy"
          class="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-out group-hover/card:scale-110"
          onerror="this.style.display='none'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="p-3 pb-4 bg-[#181414] transform transition-transform duration-300">
        <h3 class="text-sm md:text-base font-bold truncate text-white leading-tight transition-colors duration-300 group-hover/card:text-[#57B660]">
          ${product.title}
        </h3>
        <p class="text-[11px] md:text-xs text-gray-400 truncate mt-1">
          ${product.artist}
        </p>
        <p class="text-sm md:text-base text-[#57B660] mt-2 font-bold">
          ${product.price}
        </p>
      </div>
    </a>
  `;

  return cardWrapper;
}

// Product Card Component for Discover Section (flex-wrap layout)
function createDiscoverCard(product, isMobileCentered = false) {
  const wrapperClasses = isMobileCentered
    ? 'md:hidden col-span-2 max-w-[188px] mx-auto'
    : 'w-full lg:w-[calc(25%-18px)]'; // 4 columns with gap-6 (24px)

  const cardWrapper = document.createElement('div');
  cardWrapper.className = wrapperClasses;

  cardWrapper.innerHTML = `
    <a href="/product/${product.id}" class="product-link block group/card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer">
      <div class="aspect-square bg-transparent flex items-center justify-center overflow-hidden rounded-2xl relative">
        <img
          src="${product.image}"
          alt="${product.title}"
          loading="lazy"
          class="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-out group-hover/card:scale-110"
          onerror="this.style.display='none'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="p-3 pb-4 bg-[#181414] transform transition-transform duration-300">
        <h3 class="text-sm md:text-base font-bold truncate text-white leading-tight transition-colors duration-300 group-hover/card:text-[#57B660]">
          ${product.title}
        </h3>
        <p class="text-[11px] md:text-xs text-gray-400 truncate mt-1">
          ${product.artist}
        </p>
        <p class="text-sm md:text-base text-[#57B660] mt-2 font-bold">
          ${product.price}
        </p>
      </div>
    </a>
  `;

  return cardWrapper;
}

// Render Newest Section (4 cards always visible, 4 more on desktop)
function renderNewestSection() {
  const products = getAllProducts();
  const newestGrid = document.getElementById('newest-grid');
  if (!newestGrid) return;

  // Remove skeleton loaders
  const skeletons = newestGrid.querySelectorAll('.skeleton-card');
  skeletons.forEach((skeleton) => skeleton.remove());

  // First 4 cards visible on all screens
  products.slice(0, 4).forEach((product) => {
    newestGrid.appendChild(createProductCard(product, false));
  });

  // Next 4 cards only on desktop (lg breakpoint)
  products.slice(4, 8).forEach((product) => {
    newestGrid.appendChild(createProductCard(product, true));
  });
}

// Render Discover Section (8 cards + 1 mobile-centered) with flex-wrap
function renderDiscoverSection() {
  const products = getAllProducts();
  const discoverGrid = document.getElementById('discover-grid');
  if (!discoverGrid) return;

  // Remove skeleton loaders
  const skeletons = discoverGrid.querySelectorAll('.skeleton-card');
  skeletons.forEach((skeleton) => skeleton.remove());

  // First 8 cards
  products.slice(0, 8).forEach((product) => {
    discoverGrid.appendChild(createDiscoverCard(product, false));
  });

  // 9th card - centered on mobile only
  discoverGrid.appendChild(createDiscoverCard(products[0], true));
}

/**
 * Banner Carousel Data - Responsive Images (Production-Ready)
 *
 * IMPORTANT: Image Size Guidelines & Display Modes
 * =================================================
 *
 * RECOMMENDED SIZES (Design at these exact dimensions):
 * ------------------------------------------------------
 * Mobile (max-width: 767px):     375x124px (aspect ratio 3.024:1)
 * Tablet (768px - 1023px):       768x204px (aspect ratio 3.765:1)
 * Desktop (1024px+):            1440x352px (aspect ratio 4.091:1)
 *
 * CURRENT MODE: object-contain (Shows entire image, no cropping)
 * ----------------------------------------------------------------
 * ✅ Best for: Product-focused banners, promotional banners with text/prices
 * ✅ Behavior: All content visible, may have small letterbox bars
 * ✅ Examples: Amazon product promos, Shopee sale banners, product launches
 *
 * ALTERNATIVE: object-cover (Fills container, may crop edges)
 * ----------------------------------------------------------------
 * ❌ Use only for: Pure lifestyle/background images without critical text
 * ❌ Behavior: Fills entire space, crops edges if aspect ratio doesn't match
 * ❌ Requires: 20% padding zone around important content (safe zone)
 * ❌ Examples: Nike lifestyle banners, Spotify mood banners
 *
 * Production Tips:
 * ----------------
 * - Create images at EXACT dimensions above to minimize letterboxing
 * - Keep important content (text, products, CTAs) centered
 * - Use solid background colors that match your site (#181414)
 * - Test on real devices at all breakpoints
 * - WebP format, optimize to <150KB per image
 * - Consider adding subtle gradient overlay for text readability
 */
const bannerSlides = [
  {
    title: 'Premium Audio Collection',
    subtitle: 'Discover the finest sound quality',
    imageDesktop: '/Banner L.webp', // PUT YOUR 1440x352px IMAGE HERE
    imageTablet: '/Banner M.webp', // PUT YOUR 768x204px IMAGE HERE
    imageMobile: '/Banner S.webp', // PUT YOUR 375x124px IMAGE HERE
  },
  {
    title: 'Latest Arrivals',
    subtitle: 'Check out our newest products',
    imageDesktop: '/banner-2-desktop.webp', // PUT YOUR 1440x352px IMAGE HERE
    imageTablet: '/banner-2-tablet.webp', // PUT YOUR 768x204px IMAGE HERE
    imageMobile: '/banner-2-mobile.webp', // PUT YOUR 375x124px IMAGE HERE
  },
  {
    title: 'Special Offers',
    subtitle: 'Limited time deals on premium gear',
    imageDesktop: '/banner-3-desktop.webp', // PUT YOUR 1440x352px IMAGE HERE
    imageTablet: '/banner-3-tablet.webp', // PUT YOUR 768x204px IMAGE HERE
    imageMobile: '/banner-3-mobile.webp', // PUT YOUR 375x124px IMAGE HERE
  },
];

let currentSlide = 0;
let autoRotateInterval;
let isTransitioning = false;
let touchStartX = 0;
let touchEndX = 0;
let carouselObserver = null;

// Initialize Banner Carousel with responsive images
function initBannerCarousel() {
  const banner = document.getElementById('banner-carousel');
  const indicatorsContainer = document.getElementById('banner-indicators');
  if (!banner || !indicatorsContainer) return;

  // Remove skeleton loader
  const skeleton = document.getElementById('banner-skeleton');
  if (skeleton) {
    skeleton.remove();
  }

  // Clear existing content
  banner.innerHTML = '';

  // Create slides container with hardware-accelerated transform
  const slidesContainer = document.createElement('div');
  slidesContainer.id = 'slides-container';
  slidesContainer.className =
    'flex transition-transform duration-700 ease-in-out h-full';
  slidesContainer.style.transform = 'translateX(0)';

  // Create all slides at once with responsive images
  bannerSlides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'min-w-full h-full relative';
    slideDiv.dataset.index = index;

    // Create picture element for responsive images
    const picture = document.createElement('picture');

    // Mobile image (max-width: 767px) - 375x124px
    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width: 767px)';
    sourceMobile.srcset = slide.imageMobile;
    picture.appendChild(sourceMobile);

    // Tablet image (min-width: 768px, max-width: 1023px) - 768x204px
    const sourceTablet = document.createElement('source');
    sourceTablet.media = '(min-width: 768px) and (max-width: 1023px)';
    sourceTablet.srcset = slide.imageTablet;
    picture.appendChild(sourceTablet);

    // Desktop image (min-width: 1024px) - 1440x352px
    const sourceDesktop = document.createElement('source');
    sourceDesktop.media = '(min-width: 1024px)';
    sourceDesktop.srcset = slide.imageDesktop;
    picture.appendChild(sourceDesktop);

    // Fallback img tag
    const img = document.createElement('img');
    img.src = slide.imageDesktop;
    img.alt = slide.title;
    // Production standard: object-contain for content-heavy banners (preserves all content)
    // Use object-cover only if banner is pure background/lifestyle image without critical text
    img.className = 'w-full h-full object-contain bg-[#181414]';
    // Only first slide loads immediately, others lazy load for performance
    img.loading = index === 0 ? 'eager' : 'lazy';
    picture.appendChild(img);

    slideDiv.appendChild(picture);

    // Optional: Add text overlay container for title/subtitle
    const overlayDiv = document.createElement('div');
    overlayDiv.className =
      'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-8 lg:p-12';
    overlayDiv.innerHTML = `
      <div class="text-white max-w-2xl">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">${slide.title}</h2>
        <p class="text-sm md:text-base lg:text-lg text-gray-200">${slide.subtitle}</p>
      </div>
    `;
    // Uncomment the line below to show text overlay
    // slideDiv.appendChild(overlayDiv);

    slidesContainer.appendChild(slideDiv);
  });

  banner.appendChild(slidesContainer);

  // Preload only first 2 slides for better performance (production standard)
  bannerSlides.slice(0, 2).forEach((slide) => {
    const imgMobile = new Image();
    imgMobile.src = slide.imageMobile;
    const imgTablet = new Image();
    imgTablet.src = slide.imageTablet;
    const imgDesktop = new Image();
    imgDesktop.src = slide.imageDesktop;
  });

  // Add touch/swipe support for mobile (production standard)
  setupTouchHandlers(banner);

  // Setup Intersection Observer to pause when off-screen (production standard)
  setupCarouselObserver(banner);

  // Render indicators
  renderIndicators();
}

// Touch/Swipe handlers for mobile (like AliExpress, Spotify)
function setupTouchHandlers(element) {
  element.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  element.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );
}

function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance for swipe
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < swipeThreshold) return;

  if (diff > 0) {
    // Swiped left - next slide
    navigateCarousel('next');
  } else {
    // Swiped right - previous slide
    navigateCarousel('prev');
  }
}

// Intersection Observer: pause autoplay when carousel not visible (production optimization)
function setupCarouselObserver(element) {
  if (!('IntersectionObserver' in window)) return;

  carouselObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Carousel is visible, resume autoplay
          startAutoRotate();
        } else {
          // Carousel is off-screen, pause autoplay to save resources
          clearInterval(autoRotateInterval);
        }
      });
    },
    { threshold: 0.5 }, // Trigger when 50% visible
  );

  carouselObserver.observe(element);
}

// Render indicators (separated for better performance)
function renderIndicators() {
  const indicatorsContainer = document.getElementById('banner-indicators');
  if (!indicatorsContainer) return;

  indicatorsContainer.innerHTML = bannerSlides
    .map(
      (_, index) => `
    <button
      class="w-2 h-2 rounded-full transition-all duration-300 ${
        index === currentSlide
          ? 'bg-[#57B660] w-6'
          : 'bg-white/50 hover:bg-white/80'
      }"
      data-slide="${index}"
      aria-label="Go to slide ${index + 1}"
    ></button>
  `,
    )
    .join('');

  // Add click handlers to indicators
  indicatorsContainer.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isTransitioning) return; // Prevent clicks during transition
      const targetSlide = parseInt(btn.dataset.slide);
      if (targetSlide !== currentSlide) {
        currentSlide = targetSlide;
        updateCarousel();
        resetAutoRotate();
      }
    });
  });
}

// Update carousel position (hardware-accelerated)
function updateCarousel() {
  if (isTransitioning) return;

  isTransitioning = true;
  const slidesContainer = document.getElementById('slides-container');
  if (!slidesContainer) return;

  // Use transform for hardware acceleration (better performance)
  const offset = -currentSlide * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;

  // Update indicators
  renderIndicators();

  // Reset transition flag after animation completes
  setTimeout(() => {
    isTransitioning = false;
  }, 700); // Match transition duration
}

// Navigate carousel
function navigateCarousel(direction) {
  if (isTransitioning) return; // Prevent navigation during transition

  if (direction === 'next') {
    currentSlide = (currentSlide + 1) % bannerSlides.length;
  } else {
    currentSlide =
      (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
  }
  updateCarousel();
  resetAutoRotate();
}

// Auto-rotate carousel
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    navigateCarousel('next');
  }, 5000); // 5 seconds
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  startAutoRotate();
}

// Horizontal Scroll Navigation with improved UX
function setupScrollNavigation() {
  const newestScrollLeft = document.getElementById('newest-scroll-left');
  const newestScrollRight = document.getElementById('newest-scroll-right');
  const newestGrid = document.getElementById('newest-grid');

  if (newestScrollLeft && newestScrollRight && newestGrid) {
    // Calculate scroll amount based on card width + gap (168px card + 16px gap)
    const scrollAmount = 184 * 2; // Scroll 2 cards at a time for better UX

    newestScrollLeft.addEventListener('click', () => {
      newestGrid.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
      // Add haptic feedback with scale animation
      newestScrollLeft.style.transform = 'scale(0.9)';
      setTimeout(() => {
        newestScrollLeft.style.transform = '';
      }, 150);
    });

    newestScrollRight.addEventListener('click', () => {
      newestGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      // Add haptic feedback with scale animation
      newestScrollRight.style.transform = 'scale(0.9)';
      setTimeout(() => {
        newestScrollRight.style.transform = '';
      }, 150);
    });

    // Update arrow visibility based on scroll position
    // Defer to avoid forced layout before CSS loads
    const updateArrowVisibility = () => {
      // Use double requestAnimationFrame for maximum safety
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const maxScroll = newestGrid.scrollWidth - newestGrid.clientWidth;
          newestScrollLeft.style.opacity =
            newestGrid.scrollLeft <= 0 ? '0.3' : '';
          newestScrollRight.style.opacity =
            newestGrid.scrollLeft >= maxScroll ? '0.3' : '';
        });
      });
    };

    newestGrid.addEventListener('scroll', updateArrowVisibility);

    // Delay initial visibility check significantly to ensure styles are loaded
    setTimeout(() => {
      updateArrowVisibility();
    }, 500);
  }
}

// Initialize after page is fully loaded (including stylesheets)
window.addEventListener('load', () => {
  // Initialize router first
  initializeRouter();

  // Performance optimization: Batch DOM operations
  requestAnimationFrame(() => {
    // Route to current path (handles initial load and direct URLs)
    router.handleRoute(window.location.pathname);

    // Hide loading screen and fade in content after a short delay
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        // Add smooth fade out transition
        loadingScreen.style.transition = 'opacity 0.4s ease-out';
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
          loadingScreen.style.display = 'none';

          // Make body visible and add loaded class
          document.body.classList.add('loaded');
          document.body.style.transition = 'opacity 0.3s ease-in';
          document.body.style.opacity = '1';
        }, 400);
      } else {
        // Fallback if no loading screen
        document.body.classList.add('loaded');
        document.body.style.transition = 'opacity 0.3s ease-in';
        document.body.style.opacity = '1';
      }
    }, 300); // Reduced to 300ms for faster display

    console.log('Spotiem SPA initialized!');
  });
});

/**
 * ====================================================================
 * PRODUCT DETAIL PAGE LOGIC
 * ====================================================================
 */

/**
 * Initialize product detail page functionality
 */
function initProductDetail(productId) {
  const product = getProductById(productId);

  if (!product) {
    // Product not found - redirect to home
    router.navigate('/');
    return;
  }

  // Setup thumbnail gallery
  setupThumbnailGallery();

  // Setup add to cart/wishlist buttons
  setupProductButtons(product);
}

/**
 * Setup thumbnail gallery image switching
 */
function setupThumbnailGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail-btn');
  const featuredImage = document.getElementById('featured-image');

  if (!thumbnails.length || !featuredImage) return;

  thumbnails.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      const img = btn.querySelector('img');

      if (img && img.src) {
        // Update featured image
        featuredImage.src = img.src;

        // Update active state
        thumbnails.forEach((t) =>
          t.classList.remove('ring-2', 'ring-[#57B660]'),
        );
        btn.classList.add('ring-2', 'ring-[#57B660]');
      }
    });
  });
}

/**
 * Setup product action buttons
 */
function setupProductButtons(product) {
  const addToWishlistBtn = document.getElementById('add-to-wishlist');
  const addToCartBtn = document.getElementById('add-to-cart');

  if (addToWishlistBtn) {
    addToWishlistBtn.addEventListener('click', () => {
      console.log('Added to wishlist:', product.title);
      // TODO: Implement wishlist functionality (localStorage, API call, etc.)
      alert(`${product.title} added to wishlist!`);
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      console.log('Added to cart:', product.title);
      // TODO: Implement cart functionality (localStorage, API call, etc.)
      alert(`${product.title} added to cart!`);
    });
  }
}

/**
 * ====================================================================
 * SPA ROUTER SETUP
 * ====================================================================
 */

/**
 * Initialize router with all routes
 */
function initializeRouter() {
  // Home route
  router.register('/', () => {
    renderHomePage();
  });

  // Product detail route (pattern: /product/:id)
  router.register('/product/:id', (params) => {
    renderProductDetailPage(params.id);
  });

  // Setup link click interception for SPA navigation
  setupLinkInterception();
}

/**
 * Render home page
 */
function renderHomePage() {
  const appContent = document.getElementById('app-content');
  if (!appContent) return;

  // Load home template
  appContent.innerHTML = homeTemplate();

  // Initialize home page components
  requestAnimationFrame(() => {
    renderNewestSection();
    renderDiscoverSection();
    initBannerCarousel();
    setupScrollNavigation();

    // Banner navigation buttons
    const bannerPrev = document.getElementById('banner-prev');
    const bannerNext = document.getElementById('banner-next');

    if (bannerPrev) {
      bannerPrev.addEventListener('click', () => navigateCarousel('prev'));
    }

    if (bannerNext) {
      bannerNext.addEventListener('click', () => navigateCarousel('next'));
    }

    // Start autoplay after initial render
    setTimeout(() => {
      startAutoRotate();
    }, 100);
  });
}

/**
 * Render product detail page
 */
function renderProductDetailPage(productId) {
  const appContent = document.getElementById('app-content');
  if (!appContent) return;

  const product = getProductById(productId);

  if (!product) {
    // Product not found - show 404 or redirect home
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
 * Setup SPA link interception
 */
function setupLinkInterception() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.product-link, a[href^="/"]');

    if (link && link.href) {
      const url = new URL(link.href);

      // Only intercept same-origin links
      if (url.origin === window.location.origin) {
        e.preventDefault();
        router.navigate(url.pathname);
      }
    }
  });
}
