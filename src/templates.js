/** @format */

/**
 * Template Components - Reusable HTML templates
 * Keeps main.js and index.html clean and maintainable
 */

/**
 * Home Page Template
 * @returns {string} HTML string for home page
 */
export function homeTemplate() {
  return `
    <!-- Banner Carousel Section -->
    <section class="px-4 md:px-8 lg:px-16 py-1">
      <div class="relative w-full h-[124px] md:h-[204px] lg:h-[352px] rounded-2xl overflow-hidden group">
        <!-- Skeleton loader (will be removed when carousel loads) -->
        <div id="banner-skeleton" class="skeleton-card w-full h-full rounded-2xl"></div>

        <!-- Carousel container -->
        <div id="banner-carousel" class="w-full h-full"></div>

        <!-- Navigation Arrows -->
        <button
          id="banner-prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20 z-10"
          aria-label="Previous slide"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          id="banner-next"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20 z-10"
          aria-label="Next slide"
        >
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicators -->
        <div id="banner-indicators" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"></div>
      </div>
    </section>

    <!-- Newest Section -->
    <section class="px-4 md:px-8 lg:px-16 py-4">
      <div class="flex items-center justify-between mb-3 md:mb-4">
        <h2 class="text-xl md:text-2xl font-bold text-white">Newest</h2>
        <div class="hidden lg:flex gap-2 items-center">
          <button id="newest-scroll-left" class="w-10 h-10 rounded-full bg-[#57B660] flex items-center justify-center transition-all hover:bg-[#4da555]" aria-label="Scroll left">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button id="newest-scroll-right" class="w-10 h-10 rounded-full bg-[#57B660] flex items-center justify-center transition-all hover:bg-[#4da555]" aria-label="Scroll right">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div id="newest-grid" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:flex lg:gap-4 lg:overflow-x-auto lg:scroll-smooth scrollbar-hide pb-2">
        <!-- Skeleton loaders (will be replaced by actual products) -->
        <div class="skeleton-card aspect-square rounded-2xl"></div>
        <div class="skeleton-card aspect-square rounded-2xl"></div>
        <div class="skeleton-card aspect-square rounded-2xl"></div>
        <div class="skeleton-card aspect-square rounded-2xl"></div>
      </div>
    </section>

    <!-- Discover Section -->
    <section class="px-4 md:px-8 lg:px-16 py-4 pb-8">
      <h2 class="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Discover</h2>

      <div class="flex gap-2 flex-wrap mb-4 md:mb-5">
        <button class="px-5 md:px-7 py-2 rounded-full bg-[#57B660] text-white text-xs md:text-sm font-medium transition-all hover:bg-[#4da555]">All</button>
        <button class="px-5 md:px-7 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/20">IEM</button>
        <button class="px-5 md:px-7 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/20">Headphone</button>
        <button class="px-5 md:px-7 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/20">Eartips</button>
        <button class="px-5 md:px-7 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/20">Cable</button>
      </div>

      <div id="discover-grid" class="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 lg:flex lg:flex-wrap lg:gap-6">
        <!-- Skeleton loaders (will be replaced by actual products) -->
        <div class="skeleton-card aspect-square rounded-2xl"></div>
        <div class="skeleton-card aspect-square rounded-2xl"></div>
        <div class="skeleton-card aspect-square rounded-2xl"></div>
        <div class="skeleton-card aspect-square rounded-2xl"></div>
      </div>
    </section>
  `;
}

/**
 * Product Detail Page Template
 * @param {Object} product - Product data
 * @returns {string} HTML string for product detail page
 */
export function productDetailTemplate(product) {
  return `
    <section class="px-4 md:px-8 lg:px-32 py-4 md:py-8">
      <div class="flex flex-col lg:flex-row gap-5 lg:gap-5 items-start w-full max-w-[1920px] mx-auto">

        <!-- Left: Product Images -->
        <div class="w-full lg:w-1/2 lg:max-w-[700px] flex flex-col gap-6 lg:gap-10 flex-shrink-0 fade-in-up">
          <!-- Featured Image -->
          <div class="w-full aspect-square rounded-2xl lg:rounded-[32px] overflow-hidden bg-[#d9d9d9]">
            <img
              id="featured-image"
              src="${product.images[0]}"
              alt="${product.title}"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Thumbnail Gallery -->
          <div id="thumbnail-gallery" class="flex gap-3 lg:gap-5 items-center justify-center w-full overflow-x-auto scrollbar-hide fade-in-up">
            ${product.images
              .map(
                (img, index) => `
              <button
                class="thumbnail-btn flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-2xl lg:rounded-[16px] overflow-hidden ${
                  index === 0 ? 'ring-2 ring-[#57B660]' : ''
                }"
                data-index="${index}"
              >
                <img
                  src="${img}"
                  alt="${product.title} thumbnail ${index + 1}"
                  class="w-full h-full object-cover"
                />
              </button>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Right: Product Info & Pricing -->
        <div class="w-full lg:flex-1 product-detail-card bg-gradient-to-b from-[rgba(15,15,15,0.12)] to-[rgba(247,159,26,0.12)] border border-white/12 rounded-2xl lg:rounded-[32px] p-6 md:p-8 lg:p-12 fade-in-up">

          <!-- Product Title & Subtitle -->
          <div class="flex flex-col gap-4 items-center text-center mb-6 lg:mb-10">
            <h1 class="text-xl md:text-2xl lg:text-[24px] font-bold text-white leading-tight">
              ${product.title}
            </h1>
            <p class="text-xs lg:text-[12px] text-white/50">
              ${product.subtitle}
            </p>
          </div>

          <!-- Price & Buttons -->
          <div class="flex flex-col items-center mb-6 lg:mb-10">
            <p class="text-lg md:text-xl lg:text-[18px] font-bold text-[#57B660] mb-4">
              ${product.price}
            </p>

            <div class="flex flex-col gap-4 lg:gap-5 w-full">
              <button
                id="add-to-wishlist"
                class="w-full py-3 lg:py-[15.536px] px-10 border border-white rounded-full text-white text-xs lg:text-[12px] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:scale-110">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Add to Wishlist
              </button>

              <button
                id="add-to-cart"
                class="w-full py-3 lg:py-[15.536px] px-10 bg-[#57B660] rounded-full text-[#181414] text-xs lg:text-[12px] font-bold hover:bg-[#4da555] transition-all flex items-center justify-center gap-2 group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:scale-110">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>

          <!-- Additional Info: Features, Specifications, Package -->
          <div class="flex flex-col gap-6 lg:gap-10 px-0 lg:px-[18px]">

            <!-- Features -->
            <div class="flex flex-col gap-4 lg:gap-5">
              <h2 class="text-lg md:text-xl lg:text-[24px] font-bold text-white">Features</h2>
              <div class="w-full h-[1px] section-divider"></div>
              <div class="text-xs lg:text-[12px] text-white/50 leading-relaxed space-y-2">
                ${product.features
                  .map(
                    (feature) => `<p class="mb-0 stagger-item">${feature}</p>`,
                  )
                  .join('')}
              </div>
            </div>

            <!-- Specifications -->
            <div class="flex flex-col gap-4 lg:gap-5">
              <h2 class="text-lg md:text-xl lg:text-[24px] font-bold text-white">Specification</h2>
              <div class="w-full h-[1px] section-divider"></div>
              <div class="text-xs lg:text-[12px] text-white/50 leading-relaxed space-y-2">
                ${product.specifications
                  .map((spec) => `<p class="mb-0 stagger-item">${spec}</p>`)
                  .join('')}
              </div>
            </div>

            <!-- Package -->
            <div class="flex flex-col gap-4 lg:gap-5">
              <h2 class="text-lg md:text-xl lg:text-[24px] font-bold text-white">Package</h2>
              <div class="w-full h-[1px] section-divider"></div>
              <div class="text-xs lg:text-[12px] text-white/50 leading-relaxed space-y-2">
                ${product.package
                  .map((item) => `<p class="mb-0 stagger-item">${item}</p>`)
                  .join('')}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Loading Screen Template
 * @returns {string} HTML string for loading screen
 */
export function loadingScreenTemplate() {
  return `
    <div id="loading-screen" class="fixed inset-0 bg-[#181414] z-50 flex flex-col items-center justify-center">
      <div class="w-16 h-16 border-4 border-white/20 border-t-[#57B660] rounded-full animate-spin mb-4"></div>
      <p class="text-white text-sm animate-pulse">Loading...</p>
    </div>
  `;
}
