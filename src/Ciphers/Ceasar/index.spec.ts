import CeasarCipher from "./index";
import "../../jestModule";

describe("Affine Cipher Class tests", () => {
  test("It should throw for invalid a = %i", key => {
    expect(() => {
      new CeasarCipher(-1);
    }).toThrow();
  });
  test("Should create class instance", () => {
    expect(() => {
      const affine = new CeasarCipher("text");
      expect(affine).toBeInstanceOf(CeasarCipher);
    });
  });
  test("Try getting and setting a key", () => {
    const key = 5
    const affine = new CeasarCipher(key);
    expect(affine.key).toEqual(key);
    const key2 = 31;
    affine.key = key2;
    expect(affine.key).toEqual(key2);
  });
  test("Check are keys equivalent", () => {
    const affine = new CeasarCipher("text");
    expect(affine.isEquivalentKey("T")).toEqual(true);
  });
  test("Encryption/decryption", () => {
    const affine = new CeasarCipher("xd");
    const text = "This is a text id like to encrypt".toUpperCase();
    const encrypted = affine.encrypt(text);
    const decrypted = affine.decrypt(encrypted);
    expect(decrypted).toEqual(text);
  });
});
