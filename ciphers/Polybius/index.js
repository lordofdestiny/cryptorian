const { isAlpha, isAlphaNum, div } = require("../../utils/helpers");

class Polybius {
  constructor({ key, cipherChars }) {
    const type = typeof key;
    if (type != "string") {
      throw new Error(`Invalid key type, expected  "string" , got ${type}!`);
    }

    if (cipherChars instanceof Array && cipherChars.length > 4) {
      this._cipherChars = cipherChars.slice(0, 5);
    } else {
      console.error("Cipher chars is not accaptable, defaulting to A-E!");
      this._cipherChars = ["A", "B", "C", "D", "E"];
    }
    this._startKey = key;
    this._workingKey = this._generateKeySqure(key.toLowerCase());
  }

  _makeByte(i, j) {
    return this._cipherChars[i] + this._cipherChars[j];
  }

  _generateKeySqure(key) {
    const allchars = key + "abcdefghiklmnoprstquvwxyz";
    const map = new Map();

    let p = 0;
    for (const char of allchars) {
      const i = div(p, 5);
      const j = p % 5;
      if (isAlpha(char) && char != "j" && !map.has(char)) {
        const encByte = this._makeByte(i, j);
        map.set(char, encByte);
        map.set(encByte, char);
        p++;
      }
    }

    return map;
  }

  _demap(char) {
    return isAlphaNum(char) ? this._workingKey.get(char) : "";
  }

  encrypt(text) {
    const result = new Array(text.length);
    for (let i = 0; i < text.length; ++i) {
      result[i] = this._demap(text[i].toLowerCase());
    }
    return result.join("");
  }

  decrypt(text) {
    const result = new Array(div(text.length, 2));
    for (let i = 0; i < text.length / 2; ++i) {
      result[i] = this._demap(text.substr(2 * i, 2));
    }

    return result.join("");
  }
}

module.exports = Polybius;
