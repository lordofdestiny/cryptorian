const { isAlpha } = require("../../utils/helpers");

class ROT13 {
  constructor() {
    this._init = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    Object.seal(this)
  }

  encrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .reduce(
        (acc, char) =>
          acc +
          (isAlpha(char)
            ? this._init[(char.charCodeAt(0) - 65 + 13) % 26]
            : char),
        ""
      );
  }

  decrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .reduce(
        (acc, char) =>
          acc +
          (isAlpha(char)
            ? this._init[(char.charCodeAt(0) - 65 + 13) % 26]
            : char),
        ""
      );
  }
}

module.exports = ROT13;
