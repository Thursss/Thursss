var Zue = /** @class */ (function () {
    function Zue(options) {
        var proxyObj = new Observe(options.data, function (target, property) {
            console.log("get: ", target, property);
        }, function (target, property, value) {
            console.log("set: ", target, property, value);
        }).proxyObj;
        this.$data = proxyObj;
        this.proxyData();
        options.mountded.call(this);
    }
    Zue.prototype.proxyData = function () {
        var _this = this;
        var _loop_1 = function (key) {
            Object.defineProperty(_this, key, {
                get: function () {
                    return _this.$data[key];
                },
                set: function (v) {
                    if (v === _this.$data[key])
                        return;
                    _this.$data[key] = v;
                },
            });
        };
        for (var key in _this.$data) {
            _loop_1(key);
        }
    };
    return Zue;
}());
var Observe = /** @class */ (function () {
    function Observe(obj, get, set, type) {
        var _this_1 = this;
        if (type === void 0) { type = "proxy"; }
        this.proxyObj = null;
        this.byProxy = function (obj) {
            var _this = _this_1;
            return new Proxy(obj, {
                get: function (target, property, receiver) {
                    var _a;
                    if (typeof target[property] === "object") {
                        return _this.byProxy.call(_this, target[property]);
                    }
                    (_a = _this.get) === null || _a === void 0 ? void 0 : _a.call(_this, target, property, receiver);
                    return Reflect.get(target, property, receiver);
                },
                set: function (target, property, value, receiver) {
                    var _a;
                    if (target[property] === value)
                        return false;
                    (_a = _this.set) === null || _a === void 0 ? void 0 : _a.call(_this, target, property, value, receiver);
                    return Reflect.set(target, property, value, receiver);
                },
            });
        };
        this.byDefineProperty = function (obj) {
            if (!obj || typeof obj !== "object")
                return;
            var _this = _this_1;
            var _loop_2 = function (key) {
                _this.byDefineProperty.call(_this, obj[key]);
                (function (val) {
                    Object.defineProperty(obj, key, {
                        enumerable: true,
                        configurable: true,
                        get: function () {
                            var _a;
                            (_a = _this.get) === null || _a === void 0 ? void 0 : _a.call(_this, obj, key, null);
                            return val;
                        },
                        set: function (newVal) {
                            var _a;
                            if (val === newVal)
                                return;
                            val = newVal;
                            (_a = _this.set) === null || _a === void 0 ? void 0 : _a.call(_this, obj, key, val, null);
                            obj[key] = val;
                        },
                    });
                })(obj[key]);
            };
            for (var key in obj) {
                _loop_2(key);
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
    return Observe;
}());
var PubSub = /** @class */ (function () {
    function PubSub() {
        this;
    }
    return PubSub;
}());
