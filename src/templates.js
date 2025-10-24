/** @format */

import { BASE_URL } from './constants';

/**
 * @returns {string} HTML string for home page
 */
export function homeTemplate() {
  return `
    <!-- SECTION: BANNER CAROUSEL -->
    <section class="px-4 md:px-8 lg:px-16 py-1">
      <div class="relative w-full h-[124px] md:h-[204px] lg:h-[352px] overflow-hidden group">
        <!-- SUBSECTION: SKELETON LOADER -->
        <div id="banner-skeleton" class="skeleton-card w-full h-full rounded-2xl"></div>

        <!-- SUBSECTION: CAROUSEL CONTAINER -->
        <div id="banner-carousel" class="w-full h-full"></div>

        <!-- SUBSECTION: ARROWS -->
        <button
          id="banner-prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20 z-10"
          aria-label="Previous slide"
        >
          <!-- CONTENT: PREV ARROW ICON -->
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          id="banner-next"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20 z-10"
          aria-label="Next slide"
        >
          <!-- CONTENT: NEXT ARROW ICON -->
          <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- SUBSECTION: INDICATORS -->
        <div id="banner-indicators" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"></div>
      </div>
    </section>

    <!-- SECTION: NEWEST -->
    <section class="px-4 md:px-8 lg:px-16 py-4">
      <div class="flex items-center justify-between mb-3 md:mb-4">
        <!-- CONTENT: NEWEST TITLE -->
        <h2 class="text-xl md:text-2xl font-bold text-white">Newest</h2>
        <div class="hidden lg:flex gap-2 items-center">
          <!-- CONTENT: SCROLL LEFT BUTTON -->
          <button id="newest-scroll-left" class="w-10 h-10 rounded-full bg-[#57B660] flex items-center justify-center transition-all hover:bg-[#4da555]" aria-label="Scroll left">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <!-- CONTENT: SCROLL RIGHT BUTTON -->
          <button id="newest-scroll-right" class="w-10 h-10 rounded-full bg-[#57B660] flex items-center justify-center transition-all hover:bg-[#4da555]" aria-label="Scroll right">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- SUBSECTION: NEWEST GRID -->
      <div id="newest-grid" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:flex lg:gap-4 lg:overflow-x-auto lg:scroll-smooth scrollbar-hide pb-2">
      </div>
    </section>

    <!-- SECTION: DISCOVER -->
    <section class="px-4 md:px-8 lg:px-16 py-4 pb-8">
      <!-- CONTENT: DISCOVER TITLE -->
      <h2 class="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Discover</h2>

      <!-- SUBSECTION: CATEGORY FILTERS -->
      <div id="category-filters" class="flex gap-2 flex-wrap mb-4 md:mb-5">
        <!-- CONTENT: CATEGORY BUTTONS -->
        <button data-category="All" class="category-filter px-5 md:px-7 py-2 rounded-full bg-[#57B660] text-black text-xs md:text-sm font-medium transition-all hover:bg-[#4da555]">All</button>
        <button data-category="IEM" class="category-filter px-5 md:px-7 py-2 rounded-full bg-transparent border border-gray-600 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/10">IEM</button>
        <button data-category="Headphone" class="category-filter px-5 md:px-7 py-2 rounded-full bg-transparent border border-gray-600 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/10">Headphone</button>
        <button data-category="Eartips" class="category-filter px-5 md:px-7 py-2 rounded-full bg-transparent border border-gray-600 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/10">Eartips</button>
      </div>

      <!-- SUBSECTION: DISCOVER GRID -->
      <div id="discover-grid" class="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 lg:flex lg:flex-wrap lg:gap-6" style="transition: opacity 0.2s ease, transform 0.2s ease;">
      </div>

      <!-- SUBSECTION: SEE MORE BUTTON -->
      <div class="flex justify-center mt-6">
        <button id="see-more-btn" style="display: none; transition: all 0.3s ease;" class="px-8 py-3 rounded-full bg-transparent border-2 border-[#57B660] text-[#57B660] text-sm font-semibold hover:bg-[#57B660] hover:text-black transition-all duration-300">
          See More
        </button>
      </div>
    </section>
  `;
}

/**
 * @param {Object} product - Product data
 * @returns {string} HTML string for product detail page
 */
export function productDetailTemplate(product) {
  return `
    <!-- SECTION: PRODUCT DETAIL -->
    <section class="px-4 md:px-8 lg:px-32 py-4 md:py-8">
      <div class="flex flex-col lg:flex-row gap-5 lg:gap-5 items-start w-full max-w-[1920px] mx-auto">

        <!-- SUBSECTION: IMAGE & THUMBNAILS -->
        <div class="w-full lg:w-1/2 lg:max-w-[700px] flex flex-col gap-6 lg:gap-10 flex-shrink-0 fade-in-up">
          <div class="w-full aspect-square rounded-2xl lg:rounded-[32px] overflow-hidden bg-[#d9d9d9]">
            <!-- SUBSUBSECTION: FEATURED IMAGE -->
            <img
              id="featured-image"
              src="${BASE_URL}${product.images[0]}"
              alt="${product.title}"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- SUBSUBSECTION: THUMBNAIL GALLERY -->
          <div id="thumbnail-gallery" class="flex gap-3 lg:gap-5 w-full overflow-x-auto scrollbar-hide fade-in-up">
            ${product.images
              .map(
                (img, index) => `
              <button
                class="thumbnail-btn flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-2xl lg:rounded-[16px] overflow-hidden ${
                  index === 0 ? 'ring-2 ring-[#57B660]' : ''
                }"
                data-index="${index}"
              >
                <!-- CONTENT: THUMBNAIL IMAGE -->
                <img
                  src="${BASE_URL}${img}"
                  alt="${product.title} thumbnail ${index + 1}"
                  class="w-full h-full object-cover"
                />
              </button>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- SUBSECTION: PRODUCT INFO & PRICING -->
        <div class="w-full lg:flex-1 product-detail-card bg-gradient-to-b from-[rgba(15,15,15,0.12)] to-[rgba(247,159,26,0.12)] border border-white/12 rounded-2xl lg:rounded-[32px] p-6 md:p-8 lg:p-12 fade-in-up">

          <!-- SUBSUBSECTION: PRODUCT TITLE & SUBTITLE -->
          <div class="flex flex-col gap-4 items-center text-center mb-6 lg:mb-10">
            <h1 class="text-xl md:text-2xl lg:text-[24px] font-bold text-white leading-tight">
              ${product.title}
            </h1>
            <p class="text-xs lg:text-[12px] text-white/50">
              ${product.subtitle}
            </p>
          </div>

          <!-- SUBSUBSECTION: PRICE & BUTTONS -->
          <div class="flex flex-col items-center mb-6 lg:mb-10">
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-[#57B660] mb-4">
              ${product.price}
            </p>

            <div class="flex flex-col gap-4 lg:gap-5 w-full">
              <!-- CONTENT: WISHLIST BUTTON -->
              <button
                id="add-to-wishlist"
                class="w-full py-3 lg:py-[15.536px] px-10 border border-white rounded-full text-white text-base md:text-md lg:text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <!-- CONTENT: WISHLIST BUTTON ICON -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:scale-110">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Add to Wishlist
              </button>

              <!-- CONTENT: CART BUTTON -->
              <button
                id="add-to-cart"
                class="w-full py-3 lg:py-[15.536px] px-10 bg-[#57B660] rounded-full text-[#181414] text-base md:text-md lg:text-lg font-bold hover:bg-[#4da555] transition-all flex items-center justify-center gap-2 group"
              >
                <!-- CONTENT: CART BUTTON ICON -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:scale-110">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>

          <!-- SUBSECTION: ADDITIONAL INFO -->
          <div class="flex flex-col gap-6 lg:gap-10 px-0 lg:px-[18px]">

            <!-- SUBSUBSECTION: FEATURES -->
            <div class="flex flex-col gap-4 lg:gap-5">
              <h2 class="text-lg md:text-xl lg:text-[24px] font-bold text-white">Features</h2>
              <div class="w-full h-[1px] section-divider"></div>
              <div class="text-xs lg:text-[12px] text-white/50 leading-relaxed space-y-2">
                ${product.features
                  .map(
                    (feature) =>
                      `<!-- CONTENT: FEATURE --> <p class="mb-0 stagger-item">${feature}</p>`,
                  )
                  .join('')}
              </div>
            </div>

            <!-- SUBSUBSECTION: SPECIFICATIONS -->
            <div class="flex flex-col gap-4 lg:gap-5">
              <h2 class="text-lg md:text-xl lg:text-[24px] font-bold text-white">Specification</h2>
              <div class="w-full h-[1px] section-divider"></div>
              <div class="text-xs lg:text-[12px] text-white/50 leading-relaxed space-y-2">
                ${product.specifications
                  .map(
                    (spec) =>
                      `<!-- CONTENT: SPECIFICATION --> <p class="mb-0 stagger-item">${spec}</p>`,
                  )
                  .join('')}
              </div>
            </div>

            <!-- SUBSUBSECTION: PACKAGE -->
            <div class="flex flex-col gap-4 lg:gap-5">
              <h2 class="text-lg md:text-xl lg:text-[24px] font-bold text-white">Package</h2>
              <div class="w-full h-[1px] section-divider"></div>
              <div class="text-xs lg:text-[12px] text-white/50 leading-relaxed space-y-2">
                ${product.package
                  .map(
                    (item) =>
                      `<!-- CONTENT: PACKAGE ITEM --> <p class="mb-0 stagger-item">${item}</p>`,
                  )
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

export function contactTemplate() {
  return `
    <section class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-lg bg-[#181414] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 class="text-3xl font-bold text-[#57B660] mb-2 text-center">Contact Us</h1>
        <p class="text-white text-center mb-4">Have a question, feedback, or business inquiry? Fill out the form below and we'll get back to you soon!</p>
        <form id="contact-form" class="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Your Name" required class="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors" />
          <input type="email" name="email" placeholder="Your Email" required class="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors" />
          <textarea name="message" placeholder="Your Message" required rows="4" class="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors"></textarea>
          <button type="submit" class="w-full py-3 bg-[#57B660] rounded-md text-[#181414] text-base font-bold hover:bg-[#4da555] transition-all">Send Message</button>
        </form>
        <div id="contact-success" class="hidden text-green-500 text-center font-semibold mt-2">Thank you! We'll be in touch soon.</div>
      </div>
    </section>
  `;
}

export function aboutTemplate() {
  return `
    <section class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-2xl bg-[#181414] rounded-2xl shadow-lg p-8 flex flex-col gap-6 text-white">
        <h1 class="text-3xl font-bold text-[#57B660] mb-2 text-center">About Spotiem</h1>
        <p class="text-center mb-4 text-gray-300">
          Welcome to Spotiem, your ultimate destination for premium audio experiences.
          We are passionate about delivering the finest In-Ear Monitors (IEMs),
          headphones, and audio accessories to audiophiles and music lovers alike.
        </p>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-semibold text-[#57B660]">Our Mission</h2>
          <p class="text-gray-300">
            Our mission is to connect you with the perfect audio gear that
            transforms your listening experience. We carefully curate our collection,
            featuring products from renowned brands known for their exceptional
            sound quality, innovative technology, and superior craftsmanship.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-semibold text-[#57B660]">What We Offer</h2>
          <ul class="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>High-Fidelity IEMs:</strong> Discover a wide range of IEMs, from entry-level marvels to flagship models, designed for pristine audio reproduction.</li>
            <li><strong>Premium Headphones:</strong> Explore our selection of over-ear and on-ear headphones, offering immersive soundstages and unparalleled comfort.</li>
            <li><strong>Quality Accessories:</strong> Enhance your setup with our collection of eartips, cables, and cases, all chosen for their performance and durability.</li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-semibold text-[#57B660]">Why Choose Us?</h2>
          <ul class="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Curated Selection:</strong> Every product is hand-picked for its quality and performance.</li>
            <li><strong>Expert Advice:</strong> Our team is passionate about audio and ready to help you find your perfect match.</li>
            <li><strong>Customer Satisfaction:</strong> We are committed to providing an excellent shopping experience and after-sales support.</li>
          </ul>
        </div>

        <p class="text-center mt-4 text-gray-300">
          Join the Spotiem family and elevate your audio journey.
          Thank you for choosing us as your trusted audio partner!
        </p>
      </div>
    </section>
  `;
}

export function notFoundTemplate() {
  return `

    <section class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12"><div class="text-center"><h1 class="text-6xl font-bold text-[#57B660] mb-4">404</h1>
        <p class="text-xl text-white mb-8">Page Not Found</p>
        <a href="/" class="product-link px-8 py-3 bg-[#57B660] text-black rounded-full hover:bg-[#4da555] transition-all">Go to Homepage</a>
      </div>
    </section>
`;
}

export function blogTemplate() {
  return `    <section class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-2xl bg-[#181414] rounded-2xl shadow-lg p-8 flex flex-col gap-6 text-white">
        <h1 class="text-3xl font-bold text-[#57B660] mb-2 text-center">Our Blog</h1>
        <p class="text-center mb-4 text-gray-300">
          Stay updated with the latest news, reviews, and insights from the world of high-fidelity audio.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Blog Post 1 -->
          <article class="p-4 flex flex-col gap-3">
            <h3 class="text-xl font-semibold text-[#57B660]">The Evolution of IEMs</h3>
            <p class="text-gray-400 text-sm">
              Explore how In-Ear Monitors have transformed from simple earbuds to sophisticated audio devices.
            </p>
            <a href="/blog1.html" class="text-[#57B660] hover:underline text-sm self-end">Read More</a>
          </article>

          <!-- Blog Post 2 -->
          <article class="p-4 flex flex-col gap-3">
            <h3 class="text-xl font-semibold text-[#57B660]">Choosing Your First Audiophile Headphone</h3>
            <p class="text-gray-400 text-sm">
              A comprehensive guide to help beginners select the perfect pair of headphones.
            </p>
            <a href="#" class="text-[#57B660] hover:underline text-sm self-end">Read More</a>
          </article>

          <!-- Blog Post 3 -->
          <article class="p-4 flex flex-col gap-3">
            <h3 class="text-xl font-semibold text-[#57B660]">Top 5 Audio Accessories for Audiophiles</h3>
            <p class="text-gray-400 text-sm">Discover essential accessories that can elevate your listening experience to the next level.
            </p>
            <a href="#" class="text-[#57B660] hover:underline text-sm self-end">Read More</a>
          </article>

          <!-- Blog Post 4 -->
          <article class="p-4 flex flex-col gap-3">
            <h3 class="text-xl font-semibold text-[#57B660]">Understanding Frequency Response Charts</h3>
            <p class="text-gray-400 text-sm">
              Learn how to interpret frequency response graphs to understand the sound signature of your audio gear.
            </p>
            <a href="#" class="text-[#57B660] hover:underline text-sm self-end">Read More</a>
          </article>
        </div>

        <p class="text-center mt-4 text-gray-300">
          Want to contribute or suggest a topic? <a href="/contact" class="text-[#57B660] hover:underline product-link">Contact us!</a>
        </p>
      </div>
    </section>
  `;
}
