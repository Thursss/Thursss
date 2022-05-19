/**
 * 对象劫持器
 * @param {} obj
 * @param {*} setBind
 * @param {*} getLogger
 * @returns
 */
function watchVmData (obj, setBind, getLogger) {
  return new Proxy(obj, {
    set(target, p, value) {
      setBind(target, p, value);
      return Reflect.set(target, p, value);
    },
    get (target, p) {
      getLogger(target, p);
      return Reflect.get(target, p);
    },
  });
}
