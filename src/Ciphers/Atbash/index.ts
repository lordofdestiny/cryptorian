import { isAlpha } from "../../Utils/other";
import { ProtocolCipher } from "../../AbstractCiphers";

class AtbashCipher extends ProtocolCipher {
  private initializer: string;
  private cypherMap: Map<string, string>;
  private static instance: AtbashCipher;
  private constructor() {
    super();
    this.initializer = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.cypherMap = this.buildCypher();
  }

  public static getInstance() {
    if (!AtbashCipher.instance) {
      AtbashCipher.instance = new AtbashCipher();
    }
    return AtbashCipher.instance;
  }

  private buildCypher() {
    const map = new Map();

    this.initializer.split("").forEach((char, i, arr) => {
      map.set(char, arr[25 - i]);
    });

    return map;
  }

  public encrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .reduce(
        (acc, char) => acc + (isAlpha(char) ? this.cypherMap.get(char) : char),
        ""
      );
  }

  public decrypt(text: string) {
    return this.encrypt(text);
  }
}

export default AtbashCipher;
