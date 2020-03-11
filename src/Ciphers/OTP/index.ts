import { Cipher } from "../../AbstractCiphers";
import StringBuilder from "../../Utils/StringBuilder";

/**
 * Implementation of One time ped
 */
export class OneTimePad extends Cipher {
  private fullKey: string;
  private safe: boolean;
  private used: boolean;
  constructor(key: string, safeMode = false) {
    super();
    this.fullKey = key;
    this.safe = safeMode;
    this.used = false;
  }

  public get key() {
    return this.fullKey;
  }

  public set key(key: string) {
    this.fullKey = key;
    this.used = false;
  }

  private xorChar(n: number, index: number): number;
  private xorChar(text: string, index: number): number;
  private xorChar(x: any, index: number) {
    const op2 = this.key.charCodeAt(index % this.key.length);
    if (typeof x === "string") {
      return x.charCodeAt(index) ^ op2;
    } else {
      return x ^ op2;
    }
  }

  public encrypt(text: string, toBytes = true) {
    if (this.safe && this.used) {
      throw new Error(
        "Key can be used only once for encryption while in safe mode!"
      );
    }
    this.used = true;
    if (toBytes) {
      const buffer = new Array<number>(text.length);
      for (let i = 0; i < text.length; ++i) {
        buffer[i] = this.xorChar(text, i);
      }
      return buffer;
    } else {
      const buffer = new StringBuilder(text);
      for (let i = 0; i < text.length; ++i) {
        buffer.setCharCodeAt(i, this.xorChar(text, i));
      }
      return buffer.toString();
    }
  }

  public decrypt(text: string): string;
  public decrypt(bytes: number[]): string;
  public decrypt(bytes: string[]): string;
  public decrypt(x: any) {
    if (typeof x === "string") {
      const buffer = new StringBuilder(x);
      for (let i = 0; i < x.length; ++i) {
        buffer.setCharCodeAt(i, this.xorChar(x, i));
      }
      return buffer.toString();
    } else if (Array.isArray(x)) {
      const buffer = new StringBuilder(x.length);
      for (let i = 0; i < x.length; ++i) {
        const op1 = typeof x[0] === "string" ? x : x[i];
        const charCode = String.fromCharCode(this.xorChar(op1, i));
        buffer.append(charCode);
      }
      return buffer.toString();
    }
  }
}
