const { isAlpha } = require("../../utils/helpers");

class Ceasar {
  constructor(key) {
    //This is a starting key, it can be either a number or a string
    this._startKey = key;
    this._workingKey = _generateKey(key);
    this._init = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  get key() {
    return this._startKey;
  }

  set key(key) {
    this._startKey = key;
    this._workingKey = _generateKey(key);
  }

  encrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .map(char =>
        isAlpha(char)
          ? this._init[(char.charCodeAt(0) - 65 + this._workingKey) % 26]
          : char
      )
      .join("");
  }

  decrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .map(char =>
        isAlpha(char)
          ? this._init[(char.charCodeAt(0) - 65 + 26 - this._workingKey) % 26]
          : char
      )
      .join("");
  }

  static _generateKey(key) {
    /*Generate key creates a working key for Ceasar's cypher.
      If starting key is a number, it will be uses a as a working key
      If starting key is a string, first character will be converted to it's
      place in alphabeth and then be used as a working key
    */
    let workingKey = null;

    if (typeof key == "number") {
      workingKey = key;
    } else if (typeof key == "string" && isAlpha(key)) {
      workingKey = key.charCodeAt(0).toUpperCase() - 65;
    } else {
      /* "Invalid key provided!" */
      throw new Error(`Invalid key provided! ${key} ${typeof key}`);
    }
    return workingKey;
  }
}
module.exports = Ceasar;
