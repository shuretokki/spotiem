/** @format */

export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 700,
  STAGGER: 50,
};

export const COLORS = {
  PRIMARY: '#57B660',
  PRIMARY_HOVER: '#4da555',
  BACKGROUND: '#181414',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
  WARNING: '#F59E0B',
};

export const CAROUSEL_CONFIG = {
  AUTOPLAY_DELAY: 5000,
  TRANSITION_DURATION: 700,
  INTERSECTION_THRESHOLD: 0.5,
  SWIPE_THRESHOLD: 50,
};

export const PRODUCTS_CONFIG = {
  NEWEST_VISIBLE: 4,
  NEWEST_DESKTOP: 8,
  DISCOVER_INITIAL: 8,
  DISCOVER_LOAD_MORE: 6,
  SCROLL_AMOUNT: 184 * 2,
  FADE_DELAY: 200,
};

export const LOADING = {
  SKELETON_MIN: 300,
  PAGE_FADE: 400,
  IMAGE_PRELOAD: 2,
};

export const TOAST_CONFIG = {
  DURATION: 3000,
  REMOVE_DELAY: 300,
  ICONS: {
    success: '✓',
    error: '✕',
    info: 'i',
    warning: '⚠',
  },
  COLORS: {
    success: COLORS.PRIMARY,
    error: COLORS.ERROR,
    info: COLORS.INFO,
    warning: COLORS.WARNING,
  },
};

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
