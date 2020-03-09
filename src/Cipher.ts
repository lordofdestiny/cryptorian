abstract class Cipher {
  private key: object;
  constructor(key: object) {
    this.key = key;
  }

  /**
   * prepareKey
   *
   */
  abstract prepareKey(key: object): object;

  /**
   * encrypt
   */
  abstract encrypt(): string;
  /**
   * decrypt
   */
  abstract decrypt(): string;
}
