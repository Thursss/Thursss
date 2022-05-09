(function () {
  function Router() {
    this.registeredRouter = [];
  }

  /**
   * 启动路由
   */
  Router.prototype.init = function () {
    const routerLink = document.querySelectorAll("a[ui-sref]");
    var _this = this;
    routerLink.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        _this.go(link.getAttribute("ui-sref"));
      });
    });
  };

  /**
   *
   * @param {string} path
   * @returns
   */
  Router.prototype._hasThisRouter = function (path) {
    const target = this.registeredRouter.filter(
      (router) => router.path === path
    );
    return target ? target[0].component : false;
  };

  /**
   * 利用h5 history API更改url地址栏的显示字段
   * @param  {[type]} router [description]
   * @return {[type]}        [description]
   */
  Router.prototype._changeUrl = function (path) {
    history.pushState(
      {
        url: location.origin + "/" + path,
        title: location.title,
        path: path,
      },
      "",
      path
    );
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
    const component = this._hasThisRouter(path) || "404";
    this._changeUrl(path);
    this.render(component);
  };

  /**
   * 渲染组件
   * @param {string} component
   */
  Router.prototype.render = function (component) {
    document.querySelector("div[ui-view]").innerHTML = component;
  };

  var router = new Router();
  window.$historyRouter = router;
})();
