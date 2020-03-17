import { RailFenceCipher } from "./index";
import "../../jestModule";

describe.skip("Rail Fence Cipher tests", () => {
  test.each([[1], [2], "xd"])(
    "Should fail to create instance (%p)",
    (railCount: any) => {
      expect(() => {
        new RailFenceCipher(railCount);
      }).toThrow();
    }
  );
  test.each([[3], [4]])("Encryption/decryption", rails => {
    const cyp = new RailFenceCipher(rails);
    const text = "defendtheeastwallofthecastle";
    const enc = cyp.encrypt(text);
    console.log(enc);
    const dec = cyp.decrypt(enc);
    console.log(dec);
    expect(dec).toEqual(text);
  });
});
