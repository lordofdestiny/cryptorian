abstract class Cipher {
  abstract encrypt(text: string): string;
  abstract decrypt(text: string): string;
}

export abstract class KeyCipher extends Cipher {
  abstract encrypt(text: string): string;
  abstract decrypt(text: string): string;
  abstract isEquivalentKey(key: any): boolean;
}

export abstract class ProtocolCipher extends Cipher {
  protected buildCipher(init: any): Map<any, any> {
    return new Map();
  }
}
