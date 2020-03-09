const { isAlpha } = require("../../utils/helpers");

class SSCipher {
  constructor(key) {
    this._startKey = SSCipher._checkKey(key);
    this._workingKey = SSCipher._generateKey(key.toUpperCase());
  }

  static _checkKey(key) {
    const type = typeof key;
    if (type != "string") {
      throw new Error(`Key must be of type "string", got "${type}" intsead!`);
    }
    const unique = new Set(key);
    if (unique.size !== 26) {
      throw new Error(`Key must contain 26 different charachters!`);
    }

    return key;
  }

  //Generate key for simple substitution cipher
  static _generateKey(key) {
    const encoder = Array.from(key, (char, index) => [
      String.fromCharCode(index + 65),
      char
    ]);
    const decoder = encoder.map(([v1, v2]) => [v2, v1]);
    return { encoder: new Map(encoder), decoder: new Map(decoder) };
  }

  static _crypter(text, map) {
    const array = new Array(text.length);
    for (let i = 0; i < text.length; ++i) {
      array[i] = isAlpha(text[i]) ? map.get(text[i].toUpperCase()) : text[i];
    }

    return array.join("");
  }

  encrypt(text) {
    return SSCipher._crypter(text, this._workingKey.encoder);
  }

  decrypt(text) {
    return SSCipher._crypter(text, this._workingKey.decoder);
  }
}

module.exports = SSCipher;
