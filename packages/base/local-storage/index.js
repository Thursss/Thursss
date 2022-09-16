var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        console.log("创建单例对象");
    }
    LocalStorage.getInstance = function () {
        if (!this.instance)
            this.instance = new LocalStorage();
        return this.instance;
    };
    LocalStorage.prototype.setItem = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
    LocalStorage.prototype.getItem = function () { };
    return LocalStorage;
}());
export default LocalStorage;
