const { isAlpha } = require("../../utils/helpers");

class Atbash {
  constructor() {
    this._init = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this._cypherMap = this._buildCypher();
    Object.freeze(this);
  }

  _buildCypher() {
    const map = new Map();

    this._init.forEach((char, i, arr) => {
      map.set(char, arr[25 - i]);
    });

    return map;
  }

  encrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .reduce(
        (acc, char) => acc + (isAlpha(char) ? this._cypherMap.get(char) : char),
        ""
      );
  }

  decrypt(text) {
    return this.encrypt(text);
  }
}

module.exports = Atbash;
