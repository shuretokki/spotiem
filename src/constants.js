/** @format */

export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 700,
  STAGGER: 50,
};

export const COLORS = {
};

// Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  MAX: 1440,
};

export const CAROUSEL_CONFIG = {
  AUTOPLAY_DELAY: 5000,
  TRANSITION_DURATION: 700,
  INTERSECTION_THRESHOLD: 0.5,
  SWIPE_THRESHOLD: 50,
};

export const BANNER_SIZES = {
  MOBILE: { width: 375, height: 124, ratio: '3.024:1' },
  TABLET: { width: 768, height: 204, ratio: '3.765:1' },
  DESKTOP: { width: 1440, height: 352, ratio: '4.091:1' },
};

export const PRODUCTS_CONFIG = {
  NEWEST_VISIBLE: 4,
  NEWEST_DESKTOP: 8,
  DISCOVER_INITIAL: 8,
  DISCOVER_LOAD_MORE: 6,
  SCROLL_AMOUNT: 184 * 2,
};

export const LOADING = {
  SKELETON_MIN: 300,
  PAGE_FADE: 400,
  IMAGE_PRELOAD: 2,
};

// Toast configuration
export const TOAST_CONFIG = {
  DURATION: 3000,
  POSITION: 'bottom-center',
  ICONS: {
    success: '✓',
    error: '✕',
    info: 'i',
    warning: '⚠',
  },
  COLORS: {
    success: COLORS.PRIMARY,
    error: '#EF4444',
    info: '#3B82F6',
    warning: '#F59E0B',
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product/:id',
  CATEGORY: '/category/:name',
  CART: '/cart',
  WISHLIST: '/wishlist',
};

// CSS Classes (reusable Tailwind combinations)
export const CSS_CLASSES = {
  BUTTON_PRIMARY:
    'px-6 py-2 bg-[#57B660] rounded-full text-black text-sm font-medium hover:bg-[#4da555] transition-all',
  BUTTON_SECONDARY:
    'px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-[#181414] transition-all',
  CARD: 'aspect-square bg-transparent rounded-2xl overflow-hidden transition-all duration-300',
  INPUT:
    'w-full bg-transparent border border-gray-600 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#57B660] transition-colors',
  FADE_IN: 'opacity-0 translate-y-2 transition-all duration-300',
  FADE_OUT: 'opacity-100 translate-y-0 transition-all duration-300',
};

// Banner slides data
export const BANNER_SLIDES = [
  {
    title: 'Premium Audio Collection',
    subtitle: 'Discover the finest sound quality',
    imageDesktop: '/Banner L.webp',
    imageTablet: '/Banner M.webp',
    imageMobile: '/Banner S.webp',
  },
  {
    title: 'Latest Arrivals',
    subtitle: 'Check out our newest products',
    imageDesktop: '/banner-2-desktop.webp',
    imageTablet: '/banner-2-tablet.webp',
    imageMobile: '/banner-2-mobile.webp',
  },
  {
    title: 'Special Offers',
    subtitle: 'Limited time deals on premium gear',
    imageDesktop: '/banner-3-desktop.webp',
    imageTablet: '/banner-3-tablet.webp',
    imageMobile: '/banner-3-mobile.webp',
  },
];
