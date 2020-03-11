import { AffineCipher } from "./index";
import "../../jestModule";

describe("Affine Cipher Class tests", () => {
  describe("Should fail creating an instance", () => {
    test.each([8, 4, 13, 26])("a = %i", a => {
      expect(() => {
        new AffineCipher({ a, b: 2 });
      }).toThrow();
    });
  });
  test("Should create class instance", () => {
    expect(() => {
      const affine = new AffineCipher({ a: 5, b: 13 });
      expect(affine).toBeInstanceOf(AffineCipher);
    });
  });
  test("Try getting and setting a key", () => {
    let key = { a: 7, b: 12 };
    const affine = new AffineCipher(key);
    expect(affine.key).toEqual(key);
    key = { a: 9, b: 2 };
    affine.key = key;
    expect(affine.key).toEqual(key);
  });
  test("Check are keys equivalent", () => {
    const affine = new AffineCipher({ a: 3, b: 1 });
    expect(affine.isEquivalentKey({ a: 29, b: 53 })).toEqual(true);
  });
  test("Encryption/decryption", () => {
    const affine = new AffineCipher({ a: 5, b: 4 });
    const text = "This is a text id like to encrypt".toUpperCase();
    const encrypted = affine.encrypt(text);
    const decrypted = affine.decrypt(encrypted);
    expect(decrypted).toEqual(text);
  });
});
