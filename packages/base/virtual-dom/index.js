var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var VElement = /** @class */ (function () {
    function VElement(tag, props, children, key) {
        this.tag = tag;
        this.props = props;
        if (typeof children === "string") {
            this.key = children;
        }
        else {
            this.children = children;
        }
        if (key)
            this.key = key;
    }
    VElement.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f;
        var el = document.createElement(this.tag);
        var props = (_a = this.props) !== null && _a !== void 0 ? _a : {};
        for (var key in props.attr) {
            if (key === "className") {
                el.setAttribute("class", (_c = (_b = props.attr) === null || _b === void 0 ? void 0 : _b[key]) !== null && _c !== void 0 ? _c : "");
            }
            else {
                el.setAttribute(key, (_e = ((_d = props.attr) === null || _d === void 0 ? void 0 : _d[key]).toString()) !== null && _e !== void 0 ? _e : "");
            }
        }
        var chileren = (_f = this.children) !== null && _f !== void 0 ? _f : [];
        chileren.forEach(function (c) {
            var childDom = c instanceof VElement
                ? c.render()
                : document.createTextNode(c);
            el.appendChild(childDom);
        });
        this.el = el;
        return el;
    };
    return VElement;
}());
function h(tag, props, children) {
    return new VElement(tag, props, children);
}
function dfswalking(vNode) {
    var _a, _b, _c, _d, _e;
    if (!vNode.children ||
        vNode.children === "string" ||
        (vNode.children.length === 1 && typeof vNode.children[0] === "string")) {
        console.log("<".concat(vNode.tag, " class=\"").concat((_b = (_a = vNode.props) === null || _a === void 0 ? void 0 : _a.attr) === null || _b === void 0 ? void 0 : _b.className, "\">").concat((_c = vNode.children) === null || _c === void 0 ? void 0 : _c[0], "</").concat(vNode.tag, ">"));
    }
    else {
        console.log("<".concat(vNode.tag, " class=\"").concat((_e = (_d = vNode.props) === null || _d === void 0 ? void 0 : _d.attr) === null || _e === void 0 ? void 0 : _e.className, "\">"));
        vNode.children.forEach(function (vNode) {
            dfswalking(vNode);
        });
        console.log("</".concat(vNode.tag, ">"));
    }
}
function vDomDiff(oldDom, newDom) {
    var patches = {};
    var globalIndex = 0; //遍历时为节点添加索引，方便打补丁时找到节点
    dfsWalk(oldDom, newDom, globalIndex, patches);
    console.log(patches);
    return patches;
}
function dfsWalk(oldDom, newDom, index, patches) {
    var _a;
    var currentPatches = [];
    var nextIndex = index + 1;
    console.log(nextIndex, oldDom.el);
    if (!newDom) {
    }
    else {
        if (oldDom.tag === newDom.tag && oldDom.key === newDom.key) {
            var props = dfsProps(oldDom.props, newDom.props);
            if (props.length > 0) {
                currentPatches.push({
                    type: "ChangeProps",
                    props: props,
                });
            }
            if (oldDom.children && oldDom.children.length > 0) {
                (_a = oldDom.children) === null || _a === void 0 ? void 0 : _a.forEach(function (c, i) {
                    var _a, _b, _c;
                    if (c instanceof VElement) {
                        nextIndex = dfsWalk(c, (_a = newDom.children) === null || _a === void 0 ? void 0 : _a[i], nextIndex, patches);
                    }
                    else if (typeof c === "string") {
                        if (c !== ((_b = newDom.children) === null || _b === void 0 ? void 0 : _b[i])) {
                            patches[nextIndex] = [
                                {
                                    type: "ChangeInnerText",
                                    value: (_c = newDom.children) === null || _c === void 0 ? void 0 : _c[i],
                                },
                            ];
                        }
                    }
                });
            }
        }
        else {
            currentPatches.push({
                type: "Replace",
                node: newDom,
            });
        }
    }
    if (currentPatches.length > 0) {
        if (patches[index]) {
            patches[index] = __spreadArray(__spreadArray([], currentPatches, true), patches[index], true);
        }
        else {
            patches[index] = currentPatches;
        }
    }
    return nextIndex;
}
function dfsProps(oldProps, newProps) {
    var _a, _b, _c, _d;
    if (!oldProps && !newProps)
        return [];
    var currentPatches = [];
    for (var key in oldProps === null || oldProps === void 0 ? void 0 : oldProps.attr) {
        if (((_a = newProps === null || newProps === void 0 ? void 0 : newProps.attr) === null || _a === void 0 ? void 0 : _a[key]) === undefined) {
            currentPatches.push({
                type: "DEL",
                prop: key,
            });
        }
        else if (((_b = newProps.attr) === null || _b === void 0 ? void 0 : _b[key]) !== (oldProps === null || oldProps === void 0 ? void 0 : oldProps.attr[key])) {
            currentPatches.push({
                type: "MOD",
                prop: key,
                value: newProps.attr[key],
            });
        }
    }
    for (var key in newProps === null || newProps === void 0 ? void 0 : newProps.attr) {
        if (((_c = oldProps === null || oldProps === void 0 ? void 0 : oldProps.attr) === null || _c === void 0 ? void 0 : _c[key]) === undefined) {
            currentPatches.push({
                type: "NEW",
                prop: key,
                value: (_d = newProps === null || newProps === void 0 ? void 0 : newProps.attr) === null || _d === void 0 ? void 0 : _d[key],
            });
        }
    }
    return currentPatches;
}
function dfsChildren(oldChildren, newChildren, index, patches) {
    var _a;
    (_a = oldChildren) === null || _a === void 0 ? void 0 : _a.forEach(function (c, i) {
        if (c instanceof VElement) {
            index = dfsWalk(c, newChildren === null || newChildren === void 0 ? void 0 : newChildren[i], index, patches);
        }
        else if (typeof c === "string") {
            if (c !== (newChildren === null || newChildren === void 0 ? void 0 : newChildren[i])) {
                patches[index] = [
                    {
                        type: "ChangeInnerText",
                        value: newChildren === null || newChildren === void 0 ? void 0 : newChildren[i],
                    },
                ];
            }
        }
    });
    return index;
}
var tree = h("div", { attr: { className: "main", id: "body", cp: 0 } }, [
    h("div", { attr: { className: "sideBar" } }, [
        h("ul", { attr: { className: "sideBarContainer" } }, [
            h("li", { attr: { className: "sideBarItem" } }, ["page1"]),
            h("li", { attr: { className: "sideBarItem" } }, ["page2"]),
            h("li", { attr: { className: "sideBarItem" } }, ["page3"]),
        ]),
    ]),
    h("div", { attr: { className: "mainContent" } }, [
        h("div", { attr: { className: "header" } }, ["header zone"]),
        h("div", { attr: { className: "coreContent" } }, [
            h("div", { attr: { fx: 1 } }, ["flex1"]),
            h("div", { attr: { fx: 2 } }, ["flex2"]),
        ]),
        h("div", { attr: { className: "footer" } }, ["footer zone"]),
    ]),
]);
var app = document.getElementById("app");
app === null || app === void 0 ? void 0 : app.appendChild(tree.render());
var newTree = h("div", { attr: { className: "main", id: "body" } }, [
    //0
    h("div", { attr: { className: "sideBar", cp: 1 } }, [
        //1
        h("ul", { attr: { className: "sideBarContainer" } }, [
            //2
            h("li", { attr: { className: "sideBarItem" } }, ["page11"]),
            h("li", { attr: { className: "sideBarItem" } }, ["page2"]),
            h("li", { attr: { className: "sideBarItem" } }, ["page3"]), //5
        ]),
    ]),
    h("div", { attr: { className: "mainContent" } }, [
        //6
        h("div", { attr: { className: "header" } }, ["header zone"]),
        h("div", { attr: { className: "coreContent" } }, [
            //8
            h("div", { attr: { fx: 1 } }, ["flex1"]),
            h("div", { attr: { fx: 2 } }, ["flex2"]), //10
        ]),
        h("div", { attr: { className: "footer" } }, ["footer"]), //11
    ]),
]);
var patches = vDomDiff(tree, newTree);
function dfsPatches(oldTree, patches, index) {
    if (index === void 0) { index = 0; }
    var cuurentIndex = index + 1;
    // console.log(cuurentIndex, oldTree.el);
    if (patches[cuurentIndex] !== undefined) {
        changeDom(oldTree.el, patches[cuurentIndex]);
    }
    if (oldTree.children && oldTree.children.length > 0) {
        oldTree.children.forEach(function (c) {
            if (c instanceof VElement) {
                cuurentIndex = dfsPatches(c, patches, cuurentIndex);
            }
        });
    }
    return cuurentIndex;
}
function changeDom(el, patches) {
    console.log(el, patches);
}
dfsPatches(tree, patches);
