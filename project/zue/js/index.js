"use strict";
class Zue {
    constructor(options) {
        const { proxyObj } = new Observe(options.data, (target, property) => {
            console.log("get: ", target, property);
        }, (target, property, value) => {
            console.log("set: ", target, property, value);
        });
        this.$data = proxyObj;
        this.proxyData();
        options.mountded.call(this);
    }
    proxyData() {
        const _this = this;
        for (const key in _this.$data) {
            Object.defineProperty(_this, key, {
                get() {
                    return _this.$data[key];
                },
                set(v) {
                    if (v === _this.$data[key])
                        return;
                    _this.$data[key] = v;
                },
            });
        }
    }
}
class Observe {
    constructor(obj, get, set, type = "proxy") {
        this.proxyObj = null;
        this.byProxy = (obj) => {
            const _this = this;
            return new Proxy(obj, {
                get(target, property, receiver) {
                    var _a;
                    if (typeof target[property] === "object") {
                        return _this.byProxy.call(_this, target[property]);
                    }
                    (_a = _this.get) === null || _a === void 0 ? void 0 : _a.call(_this, target, property, receiver);
                    return Reflect.get(target, property, receiver);
                },
                set(target, property, value, receiver) {
                    var _a;
                    if (target[property] === value)
                        return false;
                    (_a = _this.set) === null || _a === void 0 ? void 0 : _a.call(_this, target, property, value, receiver);
                    return Reflect.set(target, property, value, receiver);
                },
            });
        };
        this.byDefineProperty = (obj) => {
            if (!obj || typeof obj !== "object")
                return;
            const _this = this;
            for (const key in obj) {
                _this.byDefineProperty.call(_this, obj[key]);
                (function (val) {
                    Object.defineProperty(obj, key, {
                        enumerable: true,
                        configurable: true,
                        get() {
                            var _a;
                            (_a = _this.get) === null || _a === void 0 ? void 0 : _a.call(_this, obj, key, null);
                            return val;
                        },
                        set(newVal) {
                            var _a;
                            if (val === newVal)
                                return;
                            val = newVal;
                            (_a = _this.set) === null || _a === void 0 ? void 0 : _a.call(_this, obj, key, val, null);
                            obj[key] = val;
                        },
                    });
                })(obj[key]);
            }
            return obj;
        };
        this.obj = obj;
        this.get = get;
        this.set = set;
        switch (type) {
            case "proxy":
                this.proxyObj = this.byProxy(obj);
                break;
            case "defefineProperty":
                this.proxyObj = this.byDefineProperty(obj);
                break;
            default:
                break;
        }
    }
}
class PubSub {
    constructor() {
        this;
    }
}
