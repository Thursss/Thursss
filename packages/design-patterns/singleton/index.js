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
    this.c = 2;
  }

  static getSingleton() {
    if (!this.singleton) this.singleton = new Singleton();
    return this.singleton;
  }

  b = 1;
}

class Singleton {
  constructor(arg) {
    // 返回唯一实例
    if (typeof Singleton.instance === "object") {
      return Singleton.instance;
    }
    // 初次创建对象 把唯一保存在instance上
    this.arg = arg;
    Singleton.instance = this;
    return this;
  }
}

