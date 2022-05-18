class Compiler {
  constructor(vm, node) {
    this.strategy = new Strategy()
    this.strategyKey = Object.keys(this.strategy.strategy)
  }

  compiler(vm, node) {
    if (node.nodeType === 3) {
    } else {
      this.compileNormalNode(vm, node);
    }
  }
  compileNormalNode(vm, node) {
    this.strategyKey.forEach(key => {
      const value = node.getAttribute(key)
      if (value) {
        this.strategy.strategy[key].call(vm, node, value)
      }
    });
    const childs = node.childNodes;
    if (childs.length > 0) {
      childs.forEach((child) => {
        this.compiler(vm, child);
      });
    }
  }
}
