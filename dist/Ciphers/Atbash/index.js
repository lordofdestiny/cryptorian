import { isAlpha } from "../../Utils/helpers";
var Atbash = (function () {
    function Atbash() {
        this._init = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this._cypherMap = this._buildCypher();
    }
    Atbash.prototype._buildCypher = function () {
        var map = new Map();
        this._init.split("").forEach(function (char, i, arr) {
            map.set(char, arr[25 - i]);
        });
        return map;
    };
    Atbash.prototype.encrypt = function (text) {
        var _this = this;
        return text
            .toUpperCase()
            .split("")
            .reduce(function (acc, char) { return acc + (isAlpha(char) ? _this._cypherMap.get(char) : char); }, "");
    };
    Atbash.prototype.decrypt = function (text) {
        return this.encrypt(text);
    };
    return Atbash;
}());
export default Atbash;
//# sourceMappingURL=index.js.map