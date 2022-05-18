/**
 * 发布订阅模式
 */
class PubSub {
  constructor() {
    this.message = {};
    this.listeners = {};
  }

  pub(type, content) {
    if (!this.message[type]) this.message[type] = [];
    this.message[type].push(content);
  }
  sub(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
  }

  notify (type) {
    const message = this.message[type];
    const subscribers = this.listeners[type] || [];
    subscribers.forEach((cb, index) => {
      cb(message[index]);
    });
  }
}