import { PolybiusCipher } from "./index";
import "../../jestModule";

describe("Polybius Cipher", () => {
  test.each([
    ["123", null, null],
    ["abcde", "ABCD", null],
    ["xywyz", "1234", null],
    ["A345", false, "124"],
    ["A345", true, "124"],
    ["A41", false, "12345"]
  ])("Should fail to init (%p,%p,%p)", (key: any, arg0: any, arg1: any) => {
    expect(() => {
      new PolybiusCipher(key, arg0, arg1);
    }).toThrow();
  });
  test("Should check that encrypt/decrypt always ciphers well", () => {
    const cipher = new PolybiusCipher("thiskey", true);
    const text = cipher.encrypt("abc1");
    expect(cipher.decrypt(text)).toEqual("abc1");
  });
  test("Should check for key equivalence", () => {
    const key1 = "1abab2bc0ccd";
    const key2 = "1ab2c0ddbbd";
    expect(new PolybiusCipher(key1, true).isEquivalentKey(key2)).toBe(true);
  });
});
