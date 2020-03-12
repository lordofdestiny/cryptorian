import { isAlpha, isAlphaNum } from "../../Utils/other";
import { div } from "../../Utils/math";
import { KeyCipher } from "../../AbstractCiphers";
import StringBilder from "../../Utils/StringBuilder";

type TWorkKeyMap = Map<string, string>;
type TCipherChars = Array<string> | string;
type TPrepareKeyTest = (string: string) => boolean;
const isTCipherChars = (v: any): v is TCipherChars => {
  return typeof v == "string" || Array.isArray(v);
};

/**
 * An implementation of Polybius square cipher
 */
export class PolybiusCipher extends KeyCipher {
  private size: 5 | 6;
  private userKey: string;
  private extended: boolean;
  private workKey!: TWorkKeyMap;
  private cipherChars!: TCipherChars;
  private prepareKeyTest: TPrepareKeyTest;
  constructor(key: string);
  constructor(key: string, cipherChars: TCipherChars);
  constructor(key: string, extended: boolean, cipherChars?: TCipherChars);
  constructor(key: any, arg0?: any, arg1?: any) {
    super();
    if (key == undefined || key == null) {
      throw new Error("You have to specify a key!");
    } else if (typeof key !== "string") {
      throw new Error("Key has to be of type string!");
    } else {
      //This is when only key is provided  or when 2nd argument is cipher chars
      if (arg0 == null || arg0 == undefined || isTCipherChars(arg0)) {
        this.extended = false;
        this.size = 5;
        this.checkKey(key);
        this.userKey = key;
        this.setCipherChars(arg0);
      } else {
        //This is in case if only 1st 2nd argument is specified
        //Or when both 2nd and 3rd are
        //Minorities are handleled by checkKey and  setCipher chars
        this.extended = arg0;
        this.size = arg0 ? 6 : 5;
        this.checkKey(key);
        this.userKey = key;
        this.setCipherChars(arg1);
      }
      this.prepareKeyTest = this.getPrepareKeyTest();
      this.prepareKey(key.toLowerCase());
    }
  }

  private defaultCipherChars() {
    return Array.from("ABCDEF").slice(0, this.size);
  }

  private checkKey(key: string) {
    if (this.size == 5) {
      if (!isAlpha(key)) {
        throw new Error("Key can contain only charachters!");
      }
    } else {
      if (!isAlphaNum(key)) {
        throw new Error("Key can only contain numbers and charachters!");
      }
    }
  }

  private setCipherChars(cipherChars: any) {
    if (cipherChars === null || cipherChars === undefined) {
      this.cipherChars = this.defaultCipherChars();
    } else if (!isTCipherChars(cipherChars)) {
      throw new Error("Cipher chars must be an array or string!");
    } else if (cipherChars.length < this.size) {
      throw new Error(
        `Cipher chars for size ${this.size}x${this.size} me at least ${this.size} long`
      );
    } else {
      this.cipherChars = cipherChars.slice(0, this.size);
    }
  }

  private makeByte(first: number, second: number) {
    return this.cipherChars[first] + this.cipherChars[second];
  }

  private prepareKey(key: string) {
    const allchars = key + this.charPool();
    this.workKey = new Map();

    let p = 0;
    for (const char of allchars) {
      const i = div(p, this.size);
      const j = p % this.size;
      if (this.prepareKeyTest(char)) {
        const encByte = this.makeByte(i, j);
        this.workKey.set(char, encByte);
        this.workKey.set(encByte, char);
        ++p;
      }
    }
  }

  private getPrepareKeyTest(): TPrepareKeyTest {
    if (this.extended) {
      return (char: string) => isAlphaNum(char) && !this.workKey.has(char);
    } else {
      return (char: string) =>
        isAlpha(char) && char != "j" && !this.workKey.has(char);
    }
  }

  private charPool() {
    return "abcdefgijklmnopqrstuvwxyz" + (this.extended ? "0123456789" : "");
  }

  private demap(char: string) {
    return this.workKey.get(char) || "";
  }

  public encrypt(text: string) {
    const buffer = new StringBilder(2 * text.length);
    for (let i = 0; i < text.length; ++i) {
      buffer.append(this.demap(text[i].toLowerCase()));
      buffer.append(" ");
    }
    return buffer.toString();
  }

  public decrypt(text: string, isSpaced = true) {
    const increment = isSpaced ? 3 : 2;
    const count = div(text.length + 1, increment);
    const buffer = new StringBilder(count);
    for (let i = 0; i < text.length; i += increment) {
      buffer.append(this.demap(text[i] + text[i + 1]));
    }
    return buffer.toString();
  }

  isEquivalentKey(key: any): boolean {
    const sbMain = new StringBilder(40);
    const sbTest = new StringBilder(40);
    const setMain = new Set();
    const setTest = new Set();
    const maxSize = this.extended ? 36 : 25;
    const fullKeyMain = (this.userKey + this.charPool()).toLowerCase();
    const fullKeyTest = (key + this.charPool()).toLowerCase();
    for (let i = 0; i < fullKeyMain.length; ++i) {
      if (setMain.has(fullKeyMain[i])) continue;
      else setMain.add(fullKeyMain[i]);
      sbMain.append(fullKeyMain[i]);
      if (setMain.size == maxSize) break;
    }
    for (let i = 0; i < fullKeyTest.length; ++i) {
      if (setMain.has(fullKeyTest[i])) continue;
      else setMain.add(fullKeyTest[i]);
      sbTest.append(fullKeyTest[i]);
      if (setTest.size == maxSize) break;
    }
    return sbTest.toString() == sbTest.toString();
  }
}
