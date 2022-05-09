(function () {
  function Router() {
    this.registeredRouter = [];
  }

  Router.prototype.init = function () {
    var _this = this;
    window.addEventListener("hashchange", function () {
      _this.go(this.location.hash);
    });
  };

  Router.prototype._hasThisRouter = function (path) {
    const _path = path.startsWith("#") ? path.slice(1) : path;
    const target = this.registeredRouter.filter(
      (router) => router.path === _path
    );
    return target ? target[0]['component'] : false;
  };

  /**
   * 注册路由
   * @param {string} router
   * @param {string} component
   * @returns Router
   */
  Router.prototype.when = function (path, component) {
    this.registeredRouter.push({ path: path, component: component });
    return this;
  };

  /**
   * 路由跳转
   * @param {string} path
   */
  Router.prototype.go = function (path) {
    const component = this._hasThisRouter(path) || '404'
    this.render(component);
  };

  /**
   * 渲染路由组件
   * @param {string} component
   */
  Router.prototype.render = function (component) {
    document.querySelector("div[ui-view]").innerHTML = component;
  };

  var router = new Router();
  window.$hashRouter = router;
})();
