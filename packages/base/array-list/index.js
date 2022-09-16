var ArrayList = /** @class */ (function () {
    function ArrayList(elements) {
        this.elements = elements;
    }
    ArrayList.prototype.get = function (index) {
        return this.elements[index];
    };
    ArrayList.prototype.show = function () {
        this.elements.forEach(function (element) { return console.log(element); });
    };
    ArrayList.prototype.remove = function (indexOrObj) {
        this.elements = this.elements.filter(function (ele, index) {
            if (typeof indexOrObj === "number") {
                return indexOrObj !== index;
            }
            else {
                return indexOrObj !== ele;
            }
        });
        return indexOrObj;
    };
    return ArrayList;
}());
export { ArrayList };
