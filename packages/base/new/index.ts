/**
 * 对象工厂 new 实现原理
 * @param fn
 * @param arg
 */
function objectFactory(fn: Function, ...arg: any[]) {
  // 判断参数是否是一个函数, 否则报异常
  if (typeof fn !== "function") throw "type error";

  // 以对象原型为基础创建对象（生成实例对象）
  const p = Object.create(fn.prototype);

  // 执行构造函数，并给p绑定参数（执行构造函数）
  const o = fn.apply(p, arg);

  // 如果构造函数有返回对象类型，则返回该对象
  if (typeof o === "object") return o;

  // 返回实例对象
  return p;
}


