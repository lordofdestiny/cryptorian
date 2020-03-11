import { isAlpha } from "../../Utils/other";
import { KeyCipher } from "../../AbstractCiphers";

interface WorkKeySSCpiher {
  encoder: Map<string, string>;
  decoder: Map<string, string>;
}

type Pair = [string, string];

type CodeMap = Map<string, string>;

/**
 * Implementation of simple substitution cipher
 */
export class SSCipher extends KeyCipher {
  private userKey: string;
  private workKey: WorkKeySSCpiher;
  constructor(key: string) {
    super();
    SSCipher.checkKey(key);
    this.userKey = key;
    this.workKey = SSCipher.prepareKey(key.toUpperCase());
  }

  public get key() {
    return this.userKey;
  }

  public set key(key: string) {
    SSCipher.checkKey(key);
    this.userKey = key;
    this.workKey = SSCipher.prepareKey(key.toUpperCase());
  }

  private static checkKey(key: string) {
    const type = typeof key;
    if (type != "string") {
      throw new Error(`Key must be of type "string", got "${type}" intsead!`);
    }
    const unique = new Set(key);
    if (unique.size !== 26) {
      throw new Error(`Key must contain 26 different charachters!`);
    }
  }

  //Generate key for simple substitution cipher
  private static prepareKey(key: string) {
    const encoder: Pair[] = Array.from(key, (char, index) => [
      String.fromCharCode(index + 65),
      char
    ]);
    const decoder: Pair[] = encoder.map(([v1, v2]) => [v2, v1]);
    return { encoder: new Map(encoder), decoder: new Map(decoder) };
  }

  /**
   * Handles both encryption and decryption based on CodeMap passed
   */
  private static cryptHelper(text: string, map: CodeMap) {
    const array = new Array(text.length);
    for (let i = 0; i < text.length; ++i) {
      array[i] = isAlpha(text[i]) ? map.get(text[i].toUpperCase()) : text[i];
    }

    return array.join("");
  }

  public encrypt(text: string) {
    return SSCipher.cryptHelper(text, this.workKey.encoder);
  }

  public decrypt(text: string) {
    return SSCipher.cryptHelper(text, this.workKey.decoder);
  }

  public isEquivalentKey(key: string): boolean {
    return key.toUpperCase() === this.userKey.toUpperCase();
  }
}
