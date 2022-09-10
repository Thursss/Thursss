// 订阅中心
var SubscriptionCenter = /** @class */ (function () {
    function SubscriptionCenter() {
        this.contents = {};
        this.listeners = {};
    }
    // 发布方法
    SubscriptionCenter.prototype.pub = function (message, content) {
        if (!this.contents[message]) {
            this.contents[message] = [content];
            return;
        }
        this.contents[message].push(content);
    };
    // 订阅方法
    SubscriptionCenter.prototype.sub = function (message, listener) {
        if (!this.listeners[message]) {
            this.listeners[message] = [listener];
            return;
        }
        this.listeners[message].push(listener);
    };
    // 通知方法
    SubscriptionCenter.prototype.notice = function (message) {
        var content = this.contents[message];
        var listener = this.listeners[message];
        if (!content || content.length <= 0)
            throw "content is null";
        if (!listener || listener.length <= 0)
            throw "listener is null";
        listener.forEach(function (cb, index) {
            cb(content[index]);
        });
    };
    // 销毁内容
    SubscriptionCenter.prototype.destroy = function (message) {
        var content = this.contents[message];
        var listener = this.listeners[message];
        if (!content || content.length <= 0)
            return "content is null";
        if (!listener || listener.length <= 0)
            return "listener is null";
        delete this.contents[message];
        delete this.listeners[message];
    };
    return SubscriptionCenter;
}());
// 发布者
var Promulgator = /** @class */ (function () {
    function Promulgator(message, subscriptionCenter) {
        this.message = message;
        this.subscriptionCenter = subscriptionCenter;
    }
    Promulgator.prototype.pub = function (content) {
        this.subscriptionCenter.pub(this.message, content);
    };
    return Promulgator;
}());
// 订阅者
var Subscriber = /** @class */ (function () {
    function Subscriber(message, subscriptionCenter) {
        this.message = message;
        this.subscriptionCenter = subscriptionCenter;
    }
    Subscriber.prototype.sub = function (listener) {
        this.subscriptionCenter.sub(this.message, listener);
    };
    return Subscriber;
}());
