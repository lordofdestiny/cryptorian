import { ProtocolCipher } from "../../AbstractCiphers";
import StringBilder from "../../Utils/StringBuilder";

/**
 * Singleton class implementaion for Atbash Cipher
 */
export class AtbashCipher extends ProtocolCipher {
  private cypherMap: Map<string, string>;
  private static initializer = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static instance: AtbashCipher;
  private constructor() {
    super();
    this.cypherMap = this.buildCypher();
  }

  /**
   * Creates an singleton instance
   */
  public static getInstance() {
    if (!AtbashCipher.instance) {
      AtbashCipher.instance = new AtbashCipher();
    }
    return AtbashCipher.instance;
  }

  /**
   * Creates charachter enctypt/decrpyt mapping
   */
  private buildCypher() {
    const map = new Map();

    AtbashCipher.initializer.split("").forEach((char, i, arr) => {
      map.set(char, arr[25 - i]);
    });

    return map;
  }

  public encrypt(text: string) {
    const buffer = new StringBilder(text.length);
    for (let i = 0; i < text.length; ++i) {
      const char = this.cypherMap.get(text[i].toUpperCase()) || text[i];
      buffer.append(char);
    }

    return buffer.toString();
  }

  public decrypt(text: string) {
    return this.encrypt(text);
  }
}
