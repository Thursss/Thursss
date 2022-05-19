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
    // if (!this.message[type]) this.message[type] = [];
    this.message[type] = content;
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
    listeners.forEach((cb, index) => cb(messages));
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

  static getSingleton (name, observe) {
    if(!this.singleton && (!name || !observe)) throw 'err'
    if (!this.singleton) this.singleton = new Pub(name, observe);
    return this.singleton;
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

  static getSingleton (name, observe) {
    if(!this.singleton && (!name || !observe)) throw 'err'
    if (!this.singleton) this.singleton = new Sub(name, observe);
    return this.singleton;
  }

  sub(type, cb) {
    this.observe.sub(type, cb);
  }
}

const observe = new PubSub();
