/**
 * 发布订阅类
 */
 class PubSub {
  constructor() {
    this.message = {};
    this.listeners = {};
  }
  // 发布
  pub(type, content) {
    if (!this.message[type]) this.message[type] = [];
    this.message[type].push(content);
  }
  // 订阅
  sub(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
  }
  // 通知
  notify(type) {
    const messages = this.message[type];
    const listeners = this.listeners[type] || [];
    listeners.forEach((cb, index) => cb(messages[index]));
  }
}

/**
 * 发布者类
 */
class Pub {
  constructor(name, observe) {
    this.name = name;
    this.observe = observe;
  }
  static getName() {
    return this.name;
  }
  pub(type, content) {
    this.observe.pub(type, content);
  }
}

/**
 * 订阅者类
 */
class Sub {
  constructor(name, observe) {
    this.name = name;
    this.observe = observe;
  }
  static getName() {
    return this.name;
  }
  sub(type, cb) {
    this.observe.sub(type, cb);
  }
}