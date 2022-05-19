/**
 * 指令集类
 */
class Strategy {
  constructor() {
    this.strategy = {
      "z-html": function (node, value) {
        const vm = this
        node.innerHTML = vm.data[value];
        const sub = Sub.getSingleton('z-html', observe)
        sub.sub(value, function (v) {
          node.innerHTML = v;
        })
      },
    };
  }
}
