export var div = function (num, divisor) { return Math.floor(num / divisor); };
export var binaryDivision = function (num) { return num >> 1; };
export var gcd = function (a, b) {
    while (b != 0) {
        var p = a % b;
        a = b;
        b = p;
    }
    return a;
};
export var gcdExtended = function (a, b) {
    if (a == 0) {
        return [0, 1, b];
    }
    var _a = gcdExtended(b % a, a), x1 = _a[0], y1 = _a[1], gcd = _a[2];
    var x = y1 - Math.floor(b / a) * x1;
    var y = x1;
    return [x, y, gcd];
};
export var modularInverse = function (a, m) {
    var _a = gcdExtended(a, m), x = _a[0], y = _a[1], gcd = _a[2];
    return gcd != 1 ? -1 : ((x % m) + m) % m;
};
export var mathMod = function (a, m) { return ((a % m) + m) % m; };
export var halfArray = function (arr) {
    return arr.slice(0, Math.ceil(arr.length / 2));
};
export var reverseString = function (str) {
    var s = "";
    for (var i = str.length - 1; i > -1; --i) {
        s += str[i];
    }
    return s;
};
export var isAlpha = function (text) { return !!text.match(/[a-z]/i); };
export var isNum = function (text) { return !!text.match(/[0-9]/i); };
export var isAlphaNum = function (text) { return !!text.match(/[0-9A-Z]/i); };
export var isWhite = function (text) { return !!text.match(/[\s]/i); };
export var randomString = function (len, source) {
    var str = new Array(len);
    var sl = source.length;
    for (var i = 0; i < len; i++) {
        str[i] = source.charAt(Math.floor(Math.random() * sl));
    }
    return str.join("");
};
import { randomInt } from "./random";
export var randomize = function (str) {
    var newstr = Array.from(str);
    var p = "";
    for (var i = str.length - 1; i > -1; --i) {
        var index = randomInt(0, i);
        p = newstr[index];
        newstr[index] = newstr[i];
        newstr[i] = p;
    }
    return newstr.join("");
};
export var nBaseArrayToDecimal = function (arr, n) {
    if (n === void 0) { n = 2; }
    var p = 1;
    var res = 0;
    for (var i = arr.length - 1; i > -1; --i) {
        res += arr[i] * p;
        p *= n;
    }
    return res;
};
//# sourceMappingURL=helpers.js.map