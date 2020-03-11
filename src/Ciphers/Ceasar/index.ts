import { isAlpha } from "../../Utils/other";
import { KeyCipher } from "../../AbstractCiphers";
import { mathMod } from "../../Utils/math";
import StringBilder from "../../Utils/StringBuilder";

type TKeyCeasarCipher = number | string;

enum ECryptAction {
  ENCRYPT,
  DECRYPT
}

/**
 * Implementation of Ceasar cipher
 */
export class CeasarCipher extends KeyCipher {
  private userKey: TKeyCeasarCipher;
  private workKey: number;
  private static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  constructor(key: TKeyCeasarCipher) {
    super();
    CeasarCipher.checkKey(key);
    this.userKey = key;
    this.workKey = CeasarCipher.prepareKey(key);
  }

  private static checkKey(key: TKeyCeasarCipher) {
    if (typeof key == "number") {
      if (key < 0) {
        throw new Error("Key must not be less than 0");
      }
    } else if (typeof key === "string") {
      if (key.length < 1) {
        throw new Error("Key must 1 or more charachters long!");
      } else if (!isAlpha(key)) {
        throw new Error("Key can only contain letters");
      }
    }
  }

  private static prepareKey(key: TKeyCeasarCipher) {
    if (typeof key == "number") {
      return key % 26;
    } else {
      return key[0].toUpperCase().charCodeAt(0) - 65;
    }
  }

  get key() {
    return this.userKey;
  }

  set key(key) {
    CeasarCipher.checkKey(key);
    this.userKey = key;
    this.workKey = CeasarCipher.prepareKey(key);
  }

  private cryptChar(text: string, action: ECryptAction) {
    if (!isAlpha(text)) {
      return text;
    }
    const charIndex = text.toUpperCase().charCodeAt(0) - 65;
    const wkFacktor = action === ECryptAction.ENCRYPT ? 1 : -1;
    const encCharIndex = mathMod(charIndex + wkFacktor * this.workKey, 26);
    return CeasarCipher.alphabet[encCharIndex];
  }

  public encrypt(text: string) {
    const buffer = new StringBilder(text.length);
    for (let i = 0; i < text.length; i++) {
      buffer.append(this.cryptChar(text[i], ECryptAction.ENCRYPT));
    }
    return buffer.toString();
  }

  public decrypt(text: string) {
    const buffer = new StringBilder(text.length);
    for (let i = 0; i < text.length; i++) {
      buffer.append(this.cryptChar(text[i], ECryptAction.DECRYPT));
    }
    return buffer.toString();
  }

  public isEquivalentKey(key: string): boolean;
  public isEquivalentKey(key: number): boolean;
  public isEquivalentKey(key: any) {
    if (typeof key == "number") {
      return this.workKey == key % 26;
    } else {
      return this.workKey == CeasarCipher.prepareKey(key);
    }
  }
}
