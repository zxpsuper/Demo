import HashRouter from './HashRouter'
import HistoryRouter from './HistoryRouter';

class Router {
  constructor(routerConfig) {
    this._mode = routerConfig.mode || "hash";
    this._routes = routerConfig.routes;
    if (routerConfig.mode === "hash")
      this._router = new HashRouter(routerConfig);
    else this._router = new HistoryRouter(routerConfig);
    this._router.init();
  }
  back() {
    this._router.back();
  }
  front() {
    this._router.front();
  }
  go(n) {
    window.history.go(n);
  }
  push(option) {
    this._router.push(option);
  }
  replace(option) {
    this._router.replace(option);
  }
}

export default Router