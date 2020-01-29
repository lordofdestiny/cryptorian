const { div } = require("../../utils/helpers");

class CTCipher {
  constructor(key) {
    this._key = CTCipher._checkKey(key);
    this._workingKey = this._key
      .split("")
      .sort()
      .join("");
    this._keyLen = this._key.length;
  }

  static _checkKey(key) {
    const type = typeof key;
    if (type != "string") {
      throw new Error(
        `Invalid type for key, expected "string", got ${type} instead!`
      );
    }
    if (key.length < 2) {
      throw new Error("Length must be at least 2 charachters");
    }
  }

  encrypt(text) {
    const rows = div(text.length, this._keyLen) + 1;
    const size = rows * this._keyLen;
    const encoded = new Array(size);
    for (let i = 0; i < size; ++i) {
      if (i > text.size) {
        encoded[i] = "x";
      }
    }
  }
}

module.exports = CTCipher;
