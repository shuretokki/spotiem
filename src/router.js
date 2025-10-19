/** @format */

/**
 * SPA Router - Clean URL routing without page reloads
 * 
 * Usage:
 * - router.navigate('/product/123') - Navigate to product detail
 * - router.navigate('/') - Navigate to home
 * - Handles browser back/forward buttons
 * - Updates URL without page reload
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.params = {};
    
    // Listen for browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });
  }

  /**
   * Register a route with pattern matching
   * @param {string} pattern - Route pattern (e.g., '/product/:id')
   * @param {Function} handler - Function to call when route matches
   */
  register(pattern, handler) {
    this.routes.set(pattern, handler);
  }

  /**
   * Navigate to a new route
   * @param {string} path - Path to navigate to
   * @param {boolean} pushState - Whether to add to browser history (default: true)
   */
  navigate(path, pushState = true) {
    if (pushState) {
      window.history.pushState({}, '', path);
    }
    this.handleRoute(path);
  }

  /**
   * Match path against registered routes
   * @param {string} path - Current path
   */
  handleRoute(path) {
    let matched = false;

    for (const [pattern, handler] of this.routes) {
      const params = this.matchRoute(pattern, path);
      if (params !== null) {
        this.params = params;
        this.currentRoute = pattern;
        handler(params);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Default to home if no route matches
      const homeHandler = this.routes.get('/');
      if (homeHandler) {
        homeHandler({});
      }
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Match a route pattern against a path
   * @param {string} pattern - Route pattern with :param placeholders
   * @param {string} path - Actual path to match
   * @returns {Object|null} - Extracted params or null if no match
   */
  matchRoute(pattern, path) {
    // Exact match
    if (pattern === path) {
      return {};
    }

    // Pattern with parameters (e.g., /product/:id)
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        // Extract parameter
        const paramName = patternParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return params;
  }

  /**
   * Get current route parameters
   */
  getParams() {
    return this.params;
  }
}

// Export singleton instance
export const router = new Router();
