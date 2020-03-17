import { ProtocolCipher } from "../../AbstractCiphers";
import StringBilder from "../../Utils/StringBuilder";

export class ROT13Cipher extends ProtocolCipher {
  private static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static instance: ROT13Cipher | null = null;
  constructor() {
    super();
  }

  public static getInstance() {
    if (ROT13Cipher.instance == null) {
      ROT13Cipher.instance = new ROT13Cipher();
    }
    return ROT13Cipher.instance;
  }

  private static translateChar(code: number) {
    if (code < 65 || code > 90) {
      return String.fromCharCode(code);
    }
    const index = (code - 65 + 13) % 26;
    return ROT13Cipher.alphabet.charAt(index);
  }

  private static translate(text: string) {
    const buffer = new StringBilder(text.length);
    const toTransalte = text.toUpperCase();
    for (let i = 0; i < toTransalte.length; ++i) {
      buffer.append(ROT13Cipher.translateChar(toTransalte.charCodeAt(i)));
    }

    return buffer.toString();
  }

  public encrypt(text: string) {
    return ROT13Cipher.translate(text);
  }

  decrypt(text: string) {
    return ROT13Cipher.translate(text);
  }
}
