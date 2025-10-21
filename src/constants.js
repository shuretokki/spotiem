/** @format */

export const BASE_URL = import.meta.env.BASE_URL;

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
  DURATION: 1500,
  REMOVE_DELAY: 200,
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
    title: 'Banner 1',
    subtitle: 'Banner',
    imageDesktop: 'banner.webp',
    imageTablet: 'banner.webp',
    imageMobile: 'banner.webp',
  },
  {
    title: 'Banner 2',
    subtitle: 'Banner',
    imageDesktop: 'banner.webp',
    imageTablet: 'banner.webp',
    imageMobile: 'banner.webp',
  },
  {
    title: 'Banner 3',
    subtitle: 'Banner',
    imageDesktop: 'banner.webp',
    imageTablet: 'banner.webp',
    imageMobile: 'banner.webp',
  },
];
