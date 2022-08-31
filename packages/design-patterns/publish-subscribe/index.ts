// 订阅中心
class SubscriptionCenter {
  private contents: { [key: string]: any[] } = {};
  private listeners: { [key: string]: Function[] } = {};

  constructor() {}

  // 发布方法
  public pub(message: string, content: any) {
    if (!this.contents[message]) {
      this.contents[message] = [content];
      return;
    }
    this.contents[message].push(content);
  }

  // 订阅方法
  public sub(message: string, listener: Function) {
    if (!this.listeners[message]) {
      this.listeners[message] = [listener];
      return;
    }
    this.listeners[message].push(listener);
  }

  // 通知方法
  public notice(message: string) {
    const content = this.contents[message];
    const listener = this.listeners[message];
    if (!content || content.length <= 0) throw "content is null";
    if (!listener || listener.length <= 0) throw "listener is null";

    listener.forEach((cb, index) => {
      cb(content[index]);
    });
  }

  // 销毁内容
  public destroy(message: string) {
    const content = this.contents[message];
    const listener = this.listeners[message];
    if (!content || content.length <= 0) return "content is null";
    if (!listener || listener.length <= 0) return "listener is null";
    delete this.contents[message];
    delete this.listeners[message];
  }
}

// 发布者
class Promulgator {
  message: string;
  subscriptionCenter: SubscriptionCenter;
  constructor(message: string, subscriptionCenter: SubscriptionCenter) {
    this.message = message;
    this.subscriptionCenter = subscriptionCenter;
  }

  private pub(content: any) {
    this.subscriptionCenter.pub(this.message, content);
  }
}

// 订阅者
class Subscriber {
  message: string;
  subscriptionCenter: SubscriptionCenter;
  constructor(message: string, subscriptionCenter: SubscriptionCenter) {
    this.message = message;
    this.subscriptionCenter = subscriptionCenter;
  }

  private sub(listener: Function) {
    this.subscriptionCenter.sub(this.message, listener);
  }
}
