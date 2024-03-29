/**
 * MVVM
 */
class Zt {
  constructor(options) {
    this.options = options;
    this.init(options);
    this.compiler(options);
  }
  init(options) {
    const { ele, data } = options;
    if (!ele) throw "错误";
    this.root = document.querySelector(ele);
    this.data = watchVmData(
      data,
      (target, p, value) => {
        const pub = Pub.getSingleton('z-html', observe)
        pub.pub(p, value)
        observe.notify(p)
      },
      (target, p) => {
        const pub = Pub.getSingleton('z-html', observe)
        pub.pub(p, target[p])
      }
    );
  }
  compiler(options) {
    const { ele } = options;
    if (!ele) throw "错误";
    const c = new Compiler();
    c.compiler(this, document.querySelector(ele));
  }
}
