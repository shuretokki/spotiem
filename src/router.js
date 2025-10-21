/** @format */

/**
 * @class
 */
class Router {
  #routes = new Map();
  #currentRoute = null;
  #params = {};
  #base = import.meta.env.BASE_URL ?? '/';

  constructor() {
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });
  }

  /**
   * @param {string} pattern - The route pattern (e.g. '/product/:id')
   * @param {Function} handler - The function to handle the route
   * @returns {Router} The Router instance
   */
  register(pattern, handler) {
    this.#routes.set(pattern, handler);
    return this;
  }

  /**
   * @param {string} path - The path to navigate to
   * @param {boolean} [pushState=true] - Whether to push state to history
   * @returns {void}
   */
  navigate(path, pushState = true) {
    const fullPath = path.startsWith(this.#base)
      ? path
      : `${this.#base}${path.slice(1)}`;

    if (pushState) {
      window.history.pushState({}, '', fullPath);
    }

    this.handleRoute(fullPath);
  }

  /**
   * @param {string} path - The path to handle
   * @returns {void}
   */
  handleRoute(path) {
    const relativePath = path.startsWith(this.#base)
      ? path.slice(this.#base.length - 1)
      : path;

    const matchedRoute = [...this.#routes].find(([pattern]) => {
      const params = this.#matchRoute(pattern, relativePath);
      if (params !== null) {
        this.#params = params;
        this.#currentRoute = pattern;
        return true;
      }
      return false;
    });

    if (matchedRoute) {
      const [, handler] = matchedRoute;
      handler(this.#params);
    } else {
      this.#routes.get('/')?.({});
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  /**
   * @param {string} pattern - The route pattern
   * @param {string} path - The path to match
   * @returns {Object|null} Params object if matched, otherwise null
   */
  #matchRoute(pattern, path) {
    if (pattern === path) return {};

    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) return null;

    const params = {};

    for (const [index, part] of patternParts.entries()) {
      if (part.startsWith(':')) {
        params[part.slice(1)] = pathParts[index];
      } else if (part !== pathParts[index]) {
        return null;
      }
    }

    return params;
  }

  /**
   * @returns {Object} The params object
   */
  getParams() {
    return this.#params;
  }
}

/**
 * @type {Router}
 */
export const router = new Router();
