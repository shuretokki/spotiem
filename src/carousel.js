/** @format */

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
