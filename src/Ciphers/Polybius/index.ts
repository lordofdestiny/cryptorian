import { isAlpha, isAlphaNum } from "../../Utils/other";
import { div } from "../../Utils/math";
import { KeyCipher } from "../../AbstractCiphers";

type TCipherChars = Array<string>;

export class PolybiusCipher extends KeyCipher {
  private userKey: string;
  private workKey: Map<string, string>;
  private cipherChars: TCipherChars;
  constructor(key: string, cipherChars?: TCipherChars) {
    super();
    PolybiusCipher.checkKey(key);
    this.userKey = key;

    if (
      cipherChars === null ||
      cipherChars === undefined ||
      !Array.isArray(cipherChars) ||
      cipherChars.length < 5
    ) {
      this.cipherChars = PolybiusCipher.defaultCipherChars(false);
    } else {
      this.cipherChars = cipherChars.slice(0, 5 || 6);
    }
    this.workKey = this.prepareKey(key.toLowerCase());
  }

  private static defaultCipherChars(extended: boolean) {
    if (extended) {
      return ["A", "B", "C", "D", "E"];
    } else {
      return ["A", "B", "C", "D", "E", "F"];
    }
  }

  private static checkKey(key: string) {
    if (!isAlpha(key)) {
      throw new Error("Key can only contain charachters");
    }
  }

  private makeByte(first: number, second: number) {
    return this.cipherChars[first] + this.cipherChars[second];
  }

  private prepareKey(key: string) {
    const allchars = key + "abcdefghiklmnoprstquvwxyz";
    const map = new Map();

    let p = 0;
    for (const char of allchars) {
      const i = div(p, 5);
      const j = p % 5;
      if (isAlpha(char) && char != "j" && !map.has(char)) {
        const encByte = this.makeByte(i, j);
        map.set(char, encByte);
        map.set(encByte, char);
        ++p;
      }
    }

    return map;
  }

  private demap(char: string) {
    return this.workKey.get(char) || "";
  }

  encrypt(text: string) {
    const result = new Array(text.length);
    for (let i = 0; i < text.length; ++i) {
      result[i] = this.demap(text[i].toLowerCase());
    }
    return result.join("");
  }

  decrypt(text: string) {
    const result = new Array(div(text.length, 2));
    for (let i = 0; i < text.length / 2; ++i) {
      result[i] = this.demap(text.substr(2 * i, 2));
    }

    return result.join("");
  }

  isEquivalentKey(key: any): boolean {
    throw new Error("Method not implemented.");
  }
}
