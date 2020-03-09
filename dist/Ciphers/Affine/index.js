import { isAlpha, isNum, modularInverse, mathMod } from "../../Utils/helpers";
var Affine = (function () {
    function Affine(_c) {
        var a = _c.a, b = _c.b;
        var ka = a % 26;
        var ami = modularInverse(ka, 26);
        if (ami == -1)
            throw new Error("\"a\" can not have common factors with 26");
        this._a = ka;
        this._b = b % 26;
        this._ami = ami;
    }
    Object.defineProperty(Affine.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (value) {
            var ka = value % 26;
            var ami = modularInverse(ka, 26);
            if (ami == -1)
                throw new Error("\"a\" can not have common factors with 26");
            this._a = ka;
            this._ami = ami;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Affine.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (value) {
            this._b = value % 26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Affine.prototype, "key", {
        get: function () {
            return { a: this._a, b: this._b };
        },
        set: function (_c) {
            var a = _c.a, b = _c.b;
            this.a = a;
            this.b = b;
        },
        enumerable: true,
        configurable: true
    });
    Affine.prototype._encryptChar = function (char) {
        if (isAlpha(char)) {
            var p = char.charCodeAt(0) - 65;
            var x = this._a * p + this._b;
            return String.fromCharCode(mathMod(x, 26) + 65);
        }
        else if (isNum(char)) {
            return this._encryptChar(String.fromCharCode(char.charCodeAt(0) + 17));
        }
        else
            return char;
    };
    Affine.prototype._decryptChar = function (char) {
        return isAlpha(char)
            ? String.fromCharCode(mathMod(this._ami * (char.charCodeAt(0) - 65 - this._b), 26) + 65)
            : char;
    };
    Affine.prototype.encrypt = function (text) {
        var _this = this;
        return text
            .toUpperCase()
            .split("")
            .reduce(function (acc, char) { return acc + _this._encryptChar(char); }, "");
    };
    Affine.prototype.decrypt = function (text) {
        var _this = this;
        return text
            .toUpperCase()
            .split("")
            .reduce(function (acc, char) { return acc + _this._decryptChar(char); }, "");
    };
    return Affine;
}());
export default Affine;
//# sourceMappingURL=index.js.map