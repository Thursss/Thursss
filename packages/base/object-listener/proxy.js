var ListenterObject = /** @class */ (function () {
    function ListenterObject(data, setBind, getBind) {
        this.setBind = setBind;
        this.getBind = getBind;
        this.data = this.wacthData(data);
    }
    ListenterObject.prototype.wacthData = function (data) {
        var _this = this;
        return new Proxy(data, {
            get: function (target, p, receiver) {
                if (typeof target[p] === "object")
                    return _this.wacthData.call(_this, target[p]);
                _this.getBind(target, p, receiver);
                return Reflect.get(target, p, receiver);
            },
            set: function (target, p, value, receiver) {
                if (target[p] === value)
                    return false;
                _this.setBind(target, p, value, receiver);
                return Reflect.set(target, p, value, receiver);
            },
        });
    };
    return ListenterObject;
}());
