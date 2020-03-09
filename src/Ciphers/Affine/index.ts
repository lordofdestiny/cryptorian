import { isAlpha, isNum, modularInverse, mathMod } from "../../Utils/helpers";

class Affine {
  _a: number;
  _b: number;
  _ami: number;
  constructor({ a, b }: { a: number; b: number }) {
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

  _encryptChar(char: string): string {
    if (isAlpha(char)) {
      const p = char.charCodeAt(0) - 65;
      const x = this._a * p + this._b;
      return String.fromCharCode(mathMod(x, 26) + 65);
    } else if (isNum(char)) {
      return this._encryptChar(String.fromCharCode(char.charCodeAt(0) + 17));
    } else return char;
  }

  _decryptChar(char: string) {
    return isAlpha(char)
      ? String.fromCharCode(
          mathMod(this._ami * (char.charCodeAt(0) - 65 - this._b), 26) + 65
        )
      : char;
  }

  encrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .reduce((acc, char) => acc + this._encryptChar(char), "");
  }

  decrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .reduce((acc, char) => acc + this._decryptChar(char), "");
  }
}

export default Affine;
