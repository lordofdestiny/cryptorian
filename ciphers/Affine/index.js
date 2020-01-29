const {
  isAlpha,
  isNum,
  modularInverse,
  mathMod
} = require("../../utils/helpers");

class Affine {
  constructor({ a, b }) {
    const ka = a % 26;
    const ami = modularInverse(ka, 26);
    if (ami == -1) throw new Error(`"a" can not have common factors with 26`);
    this._a = ka;
    this._b = b % 26;
    this._ami = ami;
  }

  get a() {
    return this._a;
  }

  set a(value) {
    const ka = value % 26;
    const ami = modularInverse(ka, 26);
    if (ami == -1) throw new Error(`"a" can not have common factors with 26`);
    this._a = ka;
    this._ami = ami;
  }

  get b() {
    return this._b;
  }

  set b(value) {
    this._b = value % 26;
  }

  get key() {
    return { a: this._a, b: this._b };
  }

  set key({ a, b }) {
    this.a = a;
    this.b = b;
  }

  _encryptChar(char) {
    if (isAlpha(char)) {
      const p = char.charCodeAt(0) - 65;
      const x = this._a * p + this._b;
      return String.fromCharCode(mathMod(x, 26) + 65);
    } else if (isNum(char)) {
      return this._encryptChar(String.fromCharCode(char.charCodeAt(0) + 17));
    } else return char;
    // return isAlpha(char) ? String.fromCharCode(mathMod(this._a * (char.charCodeAt(0)- 65 +this._b),26)  + 65) : char;
  }

  _decryptChar(char) {
    return isAlpha(char)
      ? String.fromCharCode(
          mathMod(this._ami * (char.charCodeAt(0) - 65 - this._b), 26) + 65
        )
      : char;
  }

  encrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .reduce((acc, char) => acc + this._encryptChar(char), "");
  }

  decrypt(text) {
    return text
      .toUpperCase()
      .split("")
      .reduce((acc, char) => acc + this._decryptChar(char), "");
  }
}

module.exports = Affine;

//https://www.geeksforgeeks.org/implementation-affine-cipher/
//https://stackoverflow.com/questions/54583472/encrypting-decrypting-a-string-using-a-affine-cipher-using-the-original-128-asci
