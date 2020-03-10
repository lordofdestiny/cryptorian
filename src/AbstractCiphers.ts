abstract class Cipher {
  abstract encrypt(text: string): string;
  abstract decrypt(text: string): string;
}

export abstract class KeyCipher extends Cipher {
  protected validateKey(key: object): void {
    return;
  }
  protected prepareKey(key: object): object {
    return key;
  }
  abstract encrypt(text: string): string;
  abstract decrypt(text: string): string;
  abstract isEquivalentKey(key: object): boolean;
}

export abstract class ProtocolCipher extends Cipher {
  protected buildCipher(init: any): Map<any, any> {
    return new Map();
  }
}
