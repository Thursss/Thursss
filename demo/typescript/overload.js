function overload(params, b) {
    if (typeof params === "string")
        return "params";
    if (typeof params === "number")
        return 11;
    return 1;
}
var a = overload('1', true);
