import { PolybiusCipher } from "./index";
import "../../jestModule";

describe("Polybius Cipher", () => {
  test.each([["123", "a1basdasfg4"]])("Should fail to initialize", key => {
    expect(() => {
      new PolybiusCipher(key);
    }).toThrow();
  });
  test("Should check that encrypt returns", () => {
    const cipher = new PolybiusCipher("thiskey");
    const text = cipher.encrypt("abc1");

    expect(text).toBeString();
  });

  test("Should check that decrypt returns", () => {
    const cipher = new PolybiusCipher("thiskey");
    const text = cipher.encrypt("abc");
    const deced = cipher.decrypt(text);
    expect(deced).toBeString();
    expect(deced).toEqual("abc");
  });
});
