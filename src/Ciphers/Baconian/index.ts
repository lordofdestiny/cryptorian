import { KeyCipher } from "../../AbstractCiphers";
import { div, binaryDivision } from "../../Utils/math";
import { isAlpha } from "../../Utils/other";
import { isArray } from "util";

interface CodeBaconianCipher {
  offState: string;
  onState: string;
}

type CipherTextValidator = (text: string) => boolean;

class BaconianCipher extends KeyCipher {
  private code: CodeBaconianCipher;
  private workingCode: CodeBaconianCipher;
  private validateCipherText: CipherTextValidator;
  private cipherMap: Map<string, string>;
  private strict: boolean;
  constructor(code: CodeBaconianCipher, strict = true) {
    super();
    this.ckeckKey(code);
    this.code = code;
    this.workingCode = this.prepareKey(code);
    this.cipherMap = BaconianCipher.buildCipherMap(this.code);
    this.validateCipherText = BaconianCipher.buildFomatChecker(this.code);
    this.strict = strict;
  }

  get isStatic() {
    return this.strict;
  }

  set isStatic(staic: boolean) {
    this.strict = staic;
  }

  get binaryCode() {
    return this.code;
  }

  set binaryCode(code: CodeBaconianCipher) {
    this.ckeckKey(code);
    this.code = code;
    this.workingCode = this.prepareKey(code);
    this.cipherMap = BaconianCipher.buildCipherMap(this.code);
    this.validateCipherText = BaconianCipher.buildFomatChecker(this.code);
  }

  protected ckeckKey(code: CodeBaconianCipher): void {
    if (code.offState.length < 1 || code.onState.length < 1) {
      throw new Error(
        "Both offState and onState must have a length of 1 or more"
      );
    }
  }

  protected prepareKey(code: CodeBaconianCipher) {
    return {
      onState: code.onState[0],
      offState: code.offState[0]
    };
  }

  private static buildFomatChecker(
    code: CodeBaconianCipher
  ): CipherTextValidator {
    const { offState: on, onState: off } = code;
    const regex = new RegExp(`^[${off}${on}]+$`, "gi");
    return (text: string) => !!text.match(regex);
  }

  private static constructAlphabeth() {
    function* alphabethGenerator() {
      for (let i = 0; i < 26; i++) {
        yield String.fromCharCode(65 + i);
      }
    }
    return Array.from(alphabethGenerator());
  }

  private static convertToBinary(
    num: number,
    code: CodeBaconianCipher
  ): string {
    const { offState, onState } = code;
    const digit: string = num % 2 == 0 ? offState : onState;
    if (num < 2) {
      return digit;
    } else {
      return BaconianCipher.convertToBinary(binaryDivision(num), code) + digit;
    }
  }

  static makeBinaryCode(num: number, code: CodeBaconianCipher) {
    const binaryCode = BaconianCipher.convertToBinary(num, code);
    return binaryCode.padStart(5, code.offState);
  }

  static constructBinaryAlphabeth(code: CodeBaconianCipher) {
    function* binaryAlphabethGenerator() {
      for (let i = 0; i < 26; i++) {
        yield BaconianCipher.makeBinaryCode(i, code);
      }
    }
    return Array.from(binaryAlphabethGenerator());
  }

  private static buildCipherMap(code: CodeBaconianCipher) {
    const alphabeth = BaconianCipher.constructAlphabeth();
    const binaryAlphabeth = BaconianCipher.constructBinaryAlphabeth(code);
    const map = new Map();

    for (let i = 0; i < 26; ++i) {
      map.set(alphabeth[i], binaryAlphabeth[i]);
      map.set(binaryAlphabeth[i], alphabeth[i]);
    }

    return map;
  }

  private validatePlainText(text: string) {
    return !!text.match(/^[\sA-Z]+$/gi);
  }

  public encrypt(text: string): string {
    return this.encryptToArray(text).join("");
  }

  public encryptToArray(text: string): string[] {
    const tidy = new String(text).toUpperCase().replace(/\s/g, "");
    if (!this.validatePlainText(tidy)) {
      throw new Error("Plain text may only contain letters and whitespaces!");
    }

    return tidy.split("").map((char: string) => this.cipherMap.get(char) || "");
  }

  public decrypt(text: any): string {
    return this.decryptToArray(text).join("");
  }

  public decryptToArray(text: string): string[] {
    if (text.length == 0) return [];
    const test = isArray(text) ? text.join("") : text;
    if (!this.validateCipherText(test)) {
      throw new Error("Cipher text is not valid for current off/on states!");
    }
    if (text.length % 5 != 0 && this.strict) {
      throw new Error("Cipher text length is not valid!");
    }

    const singleChar = new Array(5);
    const decrypted = new Array(div(text.length, 5));

    let index = 0;
    for (const char of text) {
      singleChar[index % 5] = char;
      if (index % 5 == 4) {
        decrypted[div(index, 5)] = this.cipherMap.get(singleChar.join(""));
      }
      index++;
    }

    return decrypted;
  }

  public isEquivalentKey(code: CodeBaconianCipher) {
    const c1 = this.workingCode.offState === code.offState[0];
    const c2 = this.workingCode.onState === code.onState[0];
    return c1 && c2;
  }
}

export default BaconianCipher;
