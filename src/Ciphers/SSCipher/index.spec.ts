import { SSCipher } from "./index";
import { randomize } from "../../Utils/random";
import "../../jestModule";

describe("Simple substitution cipher test", () => {
  describe("Instance creation test", () => {
    test.each([[3], ["a"], ["abcdefghijklmnopqrstuvwxyzAcDgsxay"]])(
      "Should throw with %p",
      (key: any) => {
        expect(() => {
          new SSCipher(key);
        }).toThrow();
      }
    );
    test("Should create new instance", () => {
      const key = "yzabcdklpnoqrstemhijuvwxfg";
      expect(new SSCipher(key)).toBeInstanceOf(SSCipher);
    });
  });
  test("Should correctly encode & decode", () => {
    const key = randomize("yzabcdklpnoqrstemhijuvwxfg");
    const text = "This is text i want to encrypt";
    const ssc = new SSCipher(key);
    const enc = ssc.encrypt(text);
    const dec = ssc.decrypt(enc);
    expect(dec).toEqual(text.toUpperCase());
  });
});
