/** @format */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.params = {};
    this.base = import.meta.env.BASE_URL || '/';

    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });
  }

  register(pattern, handler) {
    this.routes.set(pattern, handler);
  }

  navigate(path, pushState = true) {
    const fullPath = path.startsWith(this.base)
      ? path
      : this.base + path.slice(1);
    if (pushState) {
      window.history.pushState({}, '', fullPath);
    }
    this.handleRoute(fullPath);
  }

  handleRoute(path) {
    let matched = false;
    const relativePath = path.startsWith(this.base)
      ? path.slice(this.base.length - 1)
      : path;

    for (const [pattern, handler] of this.routes) {
      const params = this.matchRoute(pattern, relativePath);
      if (params !== null) {
        this.params = params;
        this.currentRoute = pattern;
        handler(params);
        matched = true;
        break;
      }
    }

    if (!matched) {
      const homeHandler = this.routes.get('/');
      if (homeHandler) {
        homeHandler({});
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  matchRoute(pattern, path) {
    if (pattern === path) {
      return {};
    }

    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return params;
  }

  getParams() {
    return this.params;
  }
}

export const router = new Router();
