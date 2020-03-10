import { CeasarCipher } from "./index";
import "../../jestModule";

describe("Ceasar Cipher Class tests", () => {
  test.each([[-1], [""]])("It, should throw for invalid a = %i", key => {
    expect(() => {
      new CeasarCipher(key);
    }).toThrow();
  });
  test("Should create class instance", () => {
    expect(() => {
      const ceasar = new CeasarCipher("text");
      expect(ceasar).toBeInstanceOf(CeasarCipher);
    });
  });
  test("Try getting and setting a key", () => {
    const key = 5;
    const ceasar = new CeasarCipher(key);
    expect(ceasar.key).toEqual(key);
    const key2 = 31;
    ceasar.key = key2;
    expect(ceasar.key).toEqual(key2);
  });
  test("Check are keys equivalent", () => {
    const ceasar = new CeasarCipher("text");
    expect(ceasar.isEquivalentKey(19)).toEqual(true);
  });
  test("Encryption/decryption", () => {
    const ceasar = new CeasarCipher("xd");
    const text = "This is a text id like to encrypt".toUpperCase();
    const encrypted = ceasar.encrypt(text);
    const decrypted = ceasar.decrypt(encrypted);
    expect(decrypted).toEqual(text);
  });
});
