import { ProtocolCipher } from "../../AbstractCiphers";
import { isAlpha, isNum } from "../../Utils/other";
import { modularInverse, mathMod, gcd } from "../../Utils/math";
import StringBilder from "../../Utils/StringBuilder";

/**
 * Format of Key that user passes
 */
interface IKeyAffineCipher {
  a: number;
  b: number;
}

/**
 * Fomrat of Key that is used by the class
 */
interface IWorkKeyAffineCipher extends IKeyAffineCipher {
  aModularInverse: number;
}

/**
 * Implementation of Affine cipher
 */
export class AffineCipher extends ProtocolCipher {
  private userKey: IKeyAffineCipher;
  private workingKey: IWorkKeyAffineCipher;
  constructor(key: IKeyAffineCipher) {
    super();
    AffineCipher.validateKey(key);
    this.userKey = key;
    this.workingKey = AffineCipher.prepareKey(key);
  }

  /**
   * Validates that passed key matches criteria
   */
  private static validateKey(key: IKeyAffineCipher): void {
    if (gcd(key.a, 26) != 1) {
      throw new Error("Value of a must not have common factors with 26!");
    }
  }

  /**
   * Creates workKey from userKey
   */
  private static prepareKey(key: IKeyAffineCipher): IWorkKeyAffineCipher {
    const a = mathMod(key.a, 26);
    const b = mathMod(key.b, 26);
    const aModularInverse = modularInverse(a, 26);
    return {
      a,
      b,
      aModularInverse
    };
  }

  public get key(): IKeyAffineCipher {
    return this.userKey;
  }

  public set key(key: IKeyAffineCipher) {
    AffineCipher.validateKey(key);
    this.userKey = key;
    this.workingKey = AffineCipher.prepareKey(key);
  }

  /**
   * Abstraction of encrypitng a single charachter
   */
  private encryptChar(char: string): string {
    if (isAlpha(char)) {
      const { a, b } = this.workingKey;
      const charVal = char.charCodeAt(0) - 65;
      const encryptVal = mathMod(a * charVal + b, 26);
      return String.fromCharCode(encryptVal + 65);
    } else if (isNum(char)) {
      return this.encryptChar(String.fromCharCode(char.charCodeAt(0) + 17));
    } else {
      return char;
    }
  }

  /**
   * Abstraction of dectypting a single charachter
   */
  private decryptChar(char: string): string {
    const { b, aModularInverse } = this.workingKey;
    if (isAlpha(char)) {
      const charVal = char.charCodeAt(0) - 65;
      const decryptVal = mathMod(aModularInverse * (charVal - b), 26);
      return String.fromCharCode(decryptVal + 65);
    } else {
      return char;
    }
  }

  public encrypt(text: string): string {
    const buffer = new StringBilder(text.length);
    for (const char of text) {
      buffer.append(this.encryptChar(char.toUpperCase()));
    }

    return buffer.toString();
  }

  public decrypt(text: string) {
    const buffer = new StringBilder(text.length);
    for (const char of text) {
      buffer.append(this.decryptChar(char.toUpperCase()));
    }

    return buffer.toString();
  }

  /**
   * Checks if current and passed key result in same encryption
   */
  public isEquivalentKey(key: IKeyAffineCipher): boolean {
    const c1 = key.a % 26 === this.workingKey.a;
    const c2 = key.b % 26 === this.workingKey.b;
    return c1 && c2;
  }
}
