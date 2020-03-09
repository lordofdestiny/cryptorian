export interface Key {}
export interface WorkKey {}

abstract class Cipher {
  abstract encrypt(text: string): string;
  abstract decrypt(text: string): string;
}

export abstract class KeyCipher extends Cipher {
  protected validateKey(key: Key): void {
    return;
  }
  protected prepareKey(key: Key): WorkKey {
    return key;
  }
  abstract encrypt(text: string): string;
  abstract decrypt(text: string): string;
  abstract isEquivalentKey(key: Key): boolean;
}

export abstract class ProtocolCipher extends Cipher {
  protected buildCipher(init: any): Map<any, any> {
    return new Map();
  }
}
