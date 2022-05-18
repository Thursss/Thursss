/**
 * 单例模式
 * 闭包实现
 */
const singleton = (function () {
  function singleton() {
    this.b = 1;
  }
  singleton.prototype.a = "1";
  return new singleton();
})();

/**
 * 单例模式
 * 类实现
 */

class Singleton {
  constructor() {
    this.singleton = null;
    this.c=2
  }

  static getSingleton() {
    if (!this.singleton) this.singleton = new Singleton();
    return this.singleton;
  }

  b = 1
}
