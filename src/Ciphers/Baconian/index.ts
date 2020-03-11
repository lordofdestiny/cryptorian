import { KeyCipher } from "../../AbstractCiphers";
import { div, binaryDivision } from "../../Utils/math";
import { isArray } from "util";

/**
 *
 * Interface describing states of Baconian Cipher
 */
interface ICodeBaconianCipher {
  offState: string;
  onState: string;
}

/**
 * Type for function that checks if cipher text is valid
 */
type CipherTextValidator = (text: string) => boolean;

/**
 * Implementation of Baconian cipher
 */
export class BaconianCipher extends KeyCipher {
  private code: ICodeBaconianCipher;
  private validateCipherText: CipherTextValidator;
  private cipherMap: Map<string, string>;
  private strict: boolean;
  constructor(code: ICodeBaconianCipher, strict = true) {
    super();
    this.ckeckKey(code);
    this.code = this.prepareKey(code);
    this.cipherMap = BaconianCipher.buildCipherMap(this.code);
    this.validateCipherText = BaconianCipher.buildFomatChecker(this.code);
    this.strict = strict;
  }

  /**
   * whether or not cipher is in strict decryption mode
   */
  isStrict() {
    return this.strict;
  }

  /**
   * Sets strict mode on/off
   */
  setStrict(strict: boolean) {
    this.strict = strict;
  }

  get codeStates() {
    return this.code;
  }

  set codeStates(code: ICodeBaconianCipher) {
    this.ckeckKey(code);
    this.code = this.prepareKey(code);
    this.cipherMap = BaconianCipher.buildCipherMap(this.code);
    this.validateCipherText = BaconianCipher.buildFomatChecker(this.code);
  }

  /**
   * Validates wether codeStates are  valid
   *
   */
  protected ckeckKey(code: ICodeBaconianCipher): void {
    if (code.offState.length < 1 || code.onState.length < 1) {
      throw new Error(
        "Both offState and onState must have a length of 1 or more"
      );
    }
  }

  /**
   * Implemented because of KeyCipher Abstract class
   */
  protected prepareKey(code: ICodeBaconianCipher) {
    return code;
  }

  /**
   * Returns a function that validates cipher text
   */
  private static buildFomatChecker(
    code: ICodeBaconianCipher
  ): CipherTextValidator {
    const { offState: on, onState: off } = code;
    const regex = new RegExp(`^[${off}${on}]+$`, "gi");
    return (text: string) => !!text.match(regex);
  }

  /**
   * Convert a number of base 10 to binary using code states instead of 0 & 1
   */
  private static convertToBinary(
    num: number,
    code: ICodeBaconianCipher
  ): string {
    const { offState, onState } = code;
    const digit: string = num % 2 == 0 ? offState : onState;
    if (num < 2) {
      return digit;
    } else {
      return BaconianCipher.convertToBinary(binaryDivision(num), code) + digit;
    }
  }

  /**
   * Converts a alphabet charachter index to binary and pads it to 5 digits
   */
  private static makeBinaryCode(num: number, code: ICodeBaconianCipher) {
    const binaryCode = BaconianCipher.convertToBinary(num, code);
    return binaryCode.padStart(5, code.offState);
  }

  /**
   *
   * Generates an array of binary representations of alphabet charachter positions
   */
  private static constructBinaryAlphabeth(code: ICodeBaconianCipher) {
    function* binaryAlphabethGenerator() {
      for (let i = 0; i < 26; i++) {
        yield BaconianCipher.makeBinaryCode(i, code);
      }
    }
    return Array.from(binaryAlphabethGenerator());
  }

  /**
   * Creates a map for enctyption/decryption
   *
   */
  private static buildCipherMap(code: ICodeBaconianCipher) {
    const alphabeth = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const binaryAlphabeth = BaconianCipher.constructBinaryAlphabeth(code);
    const map = new Map();

    for (let i = 0; i < 26; ++i) {
      map.set(alphabeth[i], binaryAlphabeth[i]);
      map.set(binaryAlphabeth[i], alphabeth[i]);
    }

    return map;
  }

  /**
   * Checks if text only conatins spaces and letters
   */
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

  /**
   * Ensures that passed code is equivalent to one that instance is using
   */
  public isEquivalentKey(code: ICodeBaconianCipher) {
    const c1 = this.code.offState === code.offState[0];
    const c2 = this.code.onState === code.onState[0];
    return c1 && c2;
  }
}
