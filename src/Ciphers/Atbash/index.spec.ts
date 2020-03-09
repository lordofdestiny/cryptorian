import AtbashCipher from "./index";
import "../../jestModule";

describe("Atbash Cipher Class tests", () => {
  test("Should check if class is singleton", () => {
    expect(() => {
      const affine1 = AtbashCipher.getInstance();
      const affine2 = AtbashCipher.getInstance();
      expect(affine1).toBeInstanceOf(AtbashCipher);
      expect(affine2).toBeInstanceOf(AtbashCipher);
      expect(affine1).toBe(affine2);
    });
  });
  test("Should try to encrypt and decrypt text", () => {
    const affine = AtbashCipher.getInstance();
    const text = "This is text i'd like to encrypt".toUpperCase();
    const encrypted = affine.encrypt(text);
    const decrypted = affine.decrypt(encrypted);
    expect(decrypted).toEqual(text);
  });
});
