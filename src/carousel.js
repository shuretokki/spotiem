/** @format */

/**
 * @module Carousel
 * @class Carousel
 *
 * @param {Array<Object>} slides - Array of slide objects with image sources and titles.
 * @param {Object} [options] - Optional configuration overrides.
 * @param {number} [options.autoplayDelay] - Delay in ms between auto-rotating slides.
 * @param {number} [options.transitionDuration] - Duration in ms for slide transitions.
 * @param {number} [options.threshold] - Intersection observer threshold.
 *
 * @property {Array<Object>} slides - The slides data.
 * @property {number} currentSlide - The index of the currently active slide.
 * @property {boolean} isTransitioning - Whether a slide transition is in progress.
 * @property {number|null} autoRotateInterval - Interval ID for autoplay.
 * @property {IntersectionObserver|null} observer - Intersection observer instance.
 * @property {Object} config - Carousel configuration.
 * @property {number} touchStart - X position for touch start.
 * @property {number} touchEnd - X position for touch end.
 *
 * @method init - Initializes the carousel, renders slides, sets up handlers.
 * @method removeSkeleton - Removes the loading skeleton if present.
 * @method createSlides - Renders all slides into the container.
 * @method createSlideElement - Creates a single slide element.
 * @method setupTouchHandlers - Adds touch event listeners for swipe navigation.
 * @method handleSwipe - Handles swipe gesture to navigate slides.
 * @method setupIntersectionObserver - Sets up observer for autoplay on visibility.
 * @method renderIndicators - Renders navigation indicators/buttons.
 * @method preloadImages - Preloads the first two slides' images for performance.
 * @method updatePosition - Updates the slide position and indicators.
 * @method next - Advances to the next slide.
 * @method prev - Goes to the previous slide.
 * @method goTo - Navigates to a specific slide index.
 * @method startAutoplay - Starts the autoplay interval.
 * @method stopAutoplay - Stops the autoplay interval.
 * @method resetAutoplay - Restarts autoplay after manual navigation.
 * @method destroy - Cleans up observers and intervals.
 */

import { CAROUSEL_CONFIG, COLORS, ANIMATIONS } from './constants.js';

export class Carousel {
  constructor(slides, options = {}) {
    this.slides = slides;
    this.currentSlide = 0;
    this.isTransitioning = false;
    this.autoRotateInterval = null;
    this.observer = null;

    this.config = {
      autoplayDelay: options.autoplayDelay || CAROUSEL_CONFIG.AUTOPLAY_DELAY,
      transitionDuration:
        options.transitionDuration || CAROUSEL_CONFIG.TRANSITION_DURATION,
      threshold: options.threshold || CAROUSEL_CONFIG.INTERSECTION_THRESHOLD,
      ...options,
    };

    this.touchStart = 0;
    this.touchEnd = 0;
  }

  init() {
    const banner = document.getElementById('banner-carousel');
    const indicatorsContainer = document.getElementById('banner-indicators');

    if (!banner || !indicatorsContainer) return;

    this.removeSkeleton();
    this.createSlides(banner);
    this.setupTouchHandlers(banner);
    this.setupIntersectionObserver(banner);
    this.renderIndicators(indicatorsContainer);
    this.preloadImages();

    return this;
  }

  removeSkeleton() {
    const skeleton = document.getElementById('banner-skeleton');
    if (skeleton) skeleton.remove();
  }

  createSlides(container) {
    container.innerHTML = '';

    const slidesContainer = document.createElement('div');
    slidesContainer.id = 'slides-container';
    slidesContainer.className = `flex transition-transform duration-[${CAROUSEL_CONFIG.TRANSITION_DURATION}ms] ease-in-out h-full`;
    slidesContainer.style.transform = 'translateX(0)';

    this.slides.forEach((slide, index) => {
      const slideElement = this.createSlideElement(slide, index);
      slidesContainer.appendChild(slideElement);
    });

    container.appendChild(slidesContainer);
  }

  createSlideElement(slide, index) {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'min-w-full h-full relative';
    slideDiv.dataset.index = index;

    const picture = document.createElement('picture');

    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width: 767px)';
    sourceMobile.srcset = slide.imageMobile;
    picture.appendChild(sourceMobile);

    const sourceTablet = document.createElement('source');
    sourceTablet.media = '(min-width: 768px) and (max-width: 1023px)';
    sourceTablet.srcset = slide.imageTablet;
    picture.appendChild(sourceTablet);

    const sourceDesktop = document.createElement('source');
    sourceDesktop.media = '(min-width: 1024px)';
    sourceDesktop.srcset = slide.imageDesktop;
    picture.appendChild(sourceDesktop);

    const img = document.createElement('img');
    img.src = slide.imageDesktop;
    img.alt = slide.title;
    img.className = `w-full h-full object-contain bg-[#080808] rounded-2xl`;
    img.loading = index === 0 ? 'eager' : 'lazy';
    picture.appendChild(img);

    slideDiv.appendChild(picture);
    return slideDiv;
  }

  setupTouchHandlers(element) {
    element.addEventListener(
      'touchstart',
      (e) => {
        this.touchStart = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    element.addEventListener(
      'touchend',
      (e) => {
        this.touchEnd = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true },
    );
  }

  handleSwipe() {
    const swipeThreshold = CAROUSEL_CONFIG.SWIPE_THRESHOLD;
    const diff = this.touchStart - this.touchEnd;

    if (Math.abs(diff) < swipeThreshold) return;

    if (diff > 0) {
      this.next();
    } else {
      this.prev();
    }
  }

  setupIntersectionObserver(element) {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAutoplay();
          } else {
            this.stopAutoplay();
          }
        });
      },
      { threshold: this.config.threshold },
    );

    this.observer.observe(element);
  }

  renderIndicators(container) {
    container.innerHTML = this.slides
      .map(
        (_, index) => `
        <button
          class="w-2 h-2 rounded-full transition-all duration-[${
            ANIMATIONS.NORMAL
          }ms] ${
          index === this.currentSlide
            ? `bg-[${COLORS.PRIMARY}] w-6`
            : 'bg-white/50 hover:bg-white/80'
        }"
          data-slide="${index}"
          aria-label="Go to slide ${index + 1}"
        ></button>
      `,
      )
      .join('');

    container.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetSlide = parseInt(btn.dataset.slide);
        if (targetSlide !== this.currentSlide && !this.isTransitioning) {
          this.goTo(targetSlide);
        }
      });
    });
  }

  preloadImages() {
    this.slides.slice(0, 2).forEach((slide) => {
      [slide.imageMobile, slide.imageTablet, slide.imageDesktop].forEach(
        (src) => {
          const img = new Image();
          img.src = src;
        },
      );
    });
  }

  updatePosition() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    const slidesContainer = document.getElementById('slides-container');
    if (!slidesContainer) return;

    const offset = -this.currentSlide * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;

    const indicatorsContainer = document.getElementById('banner-indicators');
    if (indicatorsContainer) {
      this.renderIndicators(indicatorsContainer);
    }

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.config.transitionDuration);
  }

  next() {
    if (this.isTransitioning) return;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updatePosition();
    this.resetAutoplay();
  }

  prev() {
    if (this.isTransitioning) return;
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updatePosition();
    this.resetAutoplay();
  }

  goTo(index) {
    if (this.isTransitioning || index === this.currentSlide) return;
    this.currentSlide = index;
    this.updatePosition();
    this.resetAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoRotateInterval = setInterval(() => {
      this.next();
    }, this.config.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  destroy() {
    this.stopAutoplay();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export function setupCarouselButtons(carousel) {
  const prevBtn = document.getElementById('banner-prev');
  const nextBtn = document.getElementById('banner-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => carousel.prev());
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => carousel.next());
  }
}
