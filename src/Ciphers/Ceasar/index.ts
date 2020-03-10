import { isAlpha } from "../../Utils/other";
import { KeyCipher } from "../../AbstractCiphers";

type KeyCeasarCipher = number | string;

export class CeasarCipher extends KeyCipher {
  private userKey: KeyCeasarCipher;
  private workKey: number;
  private static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  constructor(key: KeyCeasarCipher) {
    super();
    CeasarCipher.checkKey(key);
    this.userKey = key;
    this.workKey = CeasarCipher.prepareKey(key);
  }

  private static checkKey(key: KeyCeasarCipher) {
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

  private static prepareKey(key: KeyCeasarCipher) {
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

  public encrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .map(char =>
        isAlpha(char)
          ? CeasarCipher.alphabet[(char.charCodeAt(0) - 65 + this.workKey) % 26]
          : char
      )
      .join("");
  }

  public decrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .map(char =>
        isAlpha(char)
          ? CeasarCipher.alphabet[
              (char.charCodeAt(0) - 65 + 26 - this.workKey) % 26
            ]
          : char
      )
      .join("");
  }

  public isEquivalentKey(key: KeyCeasarCipher): boolean {
    if (typeof key == "number") {
      return this.workKey == key % 26;
    } else {
      return this.workKey == CeasarCipher.prepareKey(key);
    }
  }
}
