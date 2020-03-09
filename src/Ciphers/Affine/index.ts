import { KeyCipher, Key, WorkKey, ProtocolCipher } from "../../AbstractCiphers";
import { isAlpha, isNum } from "../../Utils/other";
import { modularInverse, mathMod, gcd } from "../../Utils/math";

interface KeyAffineCipher extends Key {
  a: number;
  b: number;
}

interface WorkKeyAffineCipher extends WorkKey {
  a: number;
  b: number;
  aModularInverse: number;
}

class AffineCipher extends ProtocolCipher {
  private userKey: KeyAffineCipher;
  private workingKey: WorkKeyAffineCipher;
  constructor(key: KeyAffineCipher) {
    super();
    this.validateKey(key);
    this.userKey = key;
    this.workingKey = this.prepareKey(key);
  }

  protected validateKey(key: KeyAffineCipher): void {
    if (gcd(key.a, 26) != 1) {
      throw new Error("Value of a must not have common factors with 26!");
    }
  }

  protected prepareKey(key: KeyAffineCipher): WorkKeyAffineCipher {
    const a = mathMod(key.a, 26);
    const b = mathMod(key.b, 26);
    const aModularInverse = modularInverse(a, 26);
    return {
      a,
      b,
      aModularInverse
    };
  }

  get key(): KeyAffineCipher {
    return this.userKey;
  }

  set key(key: KeyAffineCipher) {
    this.validateKey(key);
    this.userKey = key;
    this.workingKey = this.prepareKey(key);
  }

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

  encrypt(text: string): string {
    return text
      .toUpperCase()
      .split("")
      .reduce((acc, char) => acc + this.encryptChar(char), "");
  }

  decrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .reduce((acc, char) => acc + this.decryptChar(char), "");
  }

  isEquivalentKey(key: KeyAffineCipher): boolean {
    const c1 = key.a % 26 === this.workingKey.a;
    const c2 = key.b % 26 === this.workingKey.b;
    return c1 && c2;
  }
}

export default AffineCipher;
