/** @format */

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

  register(pattern, handler) {
    this.#routes.set(pattern, handler);
    return this;
  }

  navigate(path, pushState = true) {
    const fullPath = path.startsWith(this.#base)
      ? path
      : `${this.#base}${path.slice(1)}`;

    if (pushState) {
      window.history.pushState({}, '', fullPath);
    }

    this.handleRoute(fullPath);
  }

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

  getParams() {
    return this.#params;
  }
}

export const router = new Router();
