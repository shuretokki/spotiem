/** @format */

import { getAllProducts, getProductsByCategory } from './productData.js';

const state = {
  discover: {
    category: 'All',
    displayCount: 8,
    isLoading: false
  }
};

export function createProductCard(product, options = {}) {
  const {
    layout = 'grid', // 'grid' or 'flex'
    isDesktopOnly = false,
    isMobileCentered = false
  } = options;

  const wrapperClasses = layout === 'flex'
    ? 'w-full lg:w-[calc(25%-18px)]'
    : isMobileCentered
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

export function renderNewest() {
  const products = getAllProducts();
  const grid = document.getElementById('newest-grid');
  if (!grid) return;

  // Remove skeletons
  grid.querySelectorAll('.skeleton-card').forEach(el => el.remove());

  // Render first 4 cards (visible on all screens)
  products.slice(0, 4).forEach((product) => {
    grid.appendChild(createProductCard(product, { layout: 'grid' }));
  });

  // Render next 4 cards (desktop only)
  products.slice(4, 8).forEach((product) => {
    grid.appendChild(createProductCard(product, { 
      layout: 'grid',
      isDesktopOnly: true 
    }));
  });
}

export function renderDiscover(category = 'All', append = false) {
  const products = getProductsByCategory(category);
  const grid = document.getElementById('discover-grid');
  const seeMoreBtn = document.getElementById('see-more-btn');
  
  if (!grid) return;

  state.discover.category = category;

  if (!append) {
    // Reset and fade out
    state.discover.displayCount = 8;
    grid.classList.add('fade-out');
    
    setTimeout(() => {
      grid.innerHTML = '';
      
      const initialCount = Math.min(8, products.length);
      products.slice(0, initialCount).forEach((product) => {
        grid.appendChild(createProductCard(product, { layout: 'flex' }));
      });

      grid.classList.remove('fade-out');
      grid.classList.add('fade-in');
      updateSeeMoreButton(products.length);
    }, 200);
  } else {
    // Load more products
    const startIndex = state.discover.displayCount;
    const endIndex = startIndex + 6;
    const newProducts = products.slice(startIndex, endIndex);

    newProducts.forEach((product, index) => {
      const card = createProductCard(product, { layout: 'flex' });
      card.classList.add('card-enter', `stagger-${index + 1}`);
      grid.appendChild(card);

      setTimeout(() => {
        card.classList.remove('card-enter');
        card.classList.add('card-enter-active');
      }, index * 50);
    });

    state.discover.displayCount += newProducts.length;
    updateSeeMoreButton(products.length);
  }
}

function updateSeeMoreButton(totalProducts) {
  const btn = document.getElementById('see-more-btn');
  if (!btn) return;

  if (state.discover.category === 'All' && state.discover.displayCount < totalProducts) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
}

export function setupCategoryFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;

  if (container._filterHandler) {
    container.removeEventListener('click', container._filterHandler);
  }

  const handler = (e) => {
    const button = e.target.closest('.category-filter');
    if (!button) return;

    const category = button.dataset.category;
    if (category === state.discover.category) return;

    container.querySelectorAll('.category-filter').forEach((btn) => {
      if (btn === button) {
        btn.className = 'category-filter px-5 md:px-7 py-2 rounded-full bg-[#57B660] text-black text-xs md:text-sm font-bold transition-all hover:bg-[#4da555]';
      } else {
        btn.className = 'category-filter px-5 md:px-7 py-2 rounded-full bg-transparent border border-gray-600 text-white text-xs md:text-sm font-medium transition-all hover:bg-white/10';
      }
    });

    renderDiscover(category, false);
  };

  container._filterHandler = handler;
  container.addEventListener('click', handler);
}

export function setupSeeMoreButton() {
  const btn = document.getElementById('see-more-btn');
  if (!btn) return;

  // Remove old listener if exists
  if (btn._clickHandler) {
    btn.removeEventListener('click', btn._clickHandler);
  }

  const handler = () => {
    renderDiscover(state.discover.category, true);
  };

  btn._clickHandler = handler;
  btn.addEventListener('click', handler);
}

export function setupScrollNavigation() {
  const leftBtn = document.getElementById('newest-scroll-left');
  const rightBtn = document.getElementById('newest-scroll-right');
  const grid = document.getElementById('newest-grid');

  if (!leftBtn || !rightBtn || !grid) return;

  const scrollAmount = 184 * 2;

  const scrollLeft = () => {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    leftBtn.style.transform = 'scale(0.9)';
    setTimeout(() => { leftBtn.style.transform = ''; }, 150);
  };

  const scrollRight = () => {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    rightBtn.style.transform = 'scale(0.9)';
    setTimeout(() => { rightBtn.style.transform = ''; }, 150);
  };

  // Remove old listeners if exist
  if (leftBtn._scrollHandler) {
    leftBtn.removeEventListener('click', leftBtn._scrollHandler);
  }
  if (rightBtn._scrollHandler) {
    rightBtn.removeEventListener('click', rightBtn._scrollHandler);
  }

  leftBtn._scrollHandler = scrollLeft;
  rightBtn._scrollHandler = scrollRight;

  leftBtn.addEventListener('click', scrollLeft);
  rightBtn.addEventListener('click', scrollRight);

  const updateArrowVisibility = () => {
    requestAnimationFrame(() => {
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      leftBtn.style.opacity = grid.scrollLeft <= 0 ? '0.3' : '';
      rightBtn.style.opacity = grid.scrollLeft >= maxScroll ? '0.3' : '';
    });
  };

  grid.addEventListener('scroll', updateArrowVisibility);
  setTimeout(updateArrowVisibility, 500);
}

export function getDiscoverState() {
  return { ...state.discover };
}
