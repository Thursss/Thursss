"use strict";
// 订阅中心
class SubscriptionCenter {
    constructor() {
        this.contents = {};
        this.listeners = {};
    }
    // 发布方法
    pub(message, content) {
        if (!this.contents[message]) {
            this.contents[message] = [content];
            return;
        }
        this.contents[message].push(content);
    }
    // 订阅方法
    sub(message, listener) {
        if (!this.listeners[message]) {
            this.listeners[message] = [listener];
            return;
        }
        this.listeners[message].push(listener);
    }
    // 通知方法
    notice(message) {
        const content = this.contents[message];
        const listener = this.listeners[message];
        if (!content || content.length <= 0)
            throw "content is null";
        if (!listener || listener.length <= 0)
            throw "listener is null";
        listener.forEach((cb, index) => {
            cb(content[index]);
        });
    }
    // 销毁内容
    destroy(message) {
        const content = this.contents[message];
        const listener = this.listeners[message];
        if (!content || content.length <= 0)
            return "content is null";
        if (!listener || listener.length <= 0)
            return "listener is null";
        delete this.contents[message];
        delete this.listeners[message];
    }
}
// 发布者
class Promulgator {
    constructor(message, subscriptionCenter) {
        this.message = message;
        this.subscriptionCenter = subscriptionCenter;
    }
    pub(content) {
        this.subscriptionCenter.pub(this.message, content);
    }
}
// 订阅者
class Subscriber {
    constructor(message, subscriptionCenter) {
        this.message = message;
        this.subscriptionCenter = subscriptionCenter;
    }
    sub(listener) {
        this.subscriptionCenter.sub(this.message, listener);
    }
}
