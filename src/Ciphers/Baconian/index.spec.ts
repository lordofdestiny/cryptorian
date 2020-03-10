import BaconianCipher from "./index";

import "../../jestModule";

describe("Baconian cipher test", () => {
  test("Fail creating instance because of bad code", () => {
    expect(() => {
      new BaconianCipher({ onState: "", offState: "B" }, false);
    }).toThrow();
  });
  test("Creaates instance of baconian class", () => {
    const cipher = new BaconianCipher({ onState: "A", offState: "B" }, false);
    expect(cipher).toBeInstanceOf(BaconianCipher);
  });
  test("Test encryption/decryption", () => {
    const cipher = new BaconianCipher({ onState: "A", offState: "B" }, false);
    const text = "This is text i wanna test with";
    const enc = cipher.encrypt(text);
    const dec = cipher.decrypt(enc);

    expect(dec).toEqual(text.toUpperCase().replace(/\s/g, ""));
  });
});
