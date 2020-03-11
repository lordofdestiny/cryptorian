import { OneTimePad } from "./index";
import { randomString } from "../../Utils/random";
import "../../jestModule";

describe("One Time Pad Tests", () => {
  test("Instance creation", () => {
    const otp = new OneTimePad("This is some nc txt");
    expect(otp).toBeInstanceOf(OneTimePad);
  });

  test("Check encrypt", () => {
    const otp = new OneTimePad("This is some nc txt");
    expect(otp.encrypt("text", false)).toBeString();
    expect(otp.encrypt("text", true)).toBeArray();
  });

  test("Check decrypt", () => {
    const key = randomString(30, "abcdefghijklmnopqrstuvwxyz0123456789");
    const otp = new OneTimePad(key);

    const encTxt = otp.encrypt("some text", false) as string;
    const encBytes = otp.encrypt("some text", true) as number[];

    expect(otp.decrypt(encTxt)).toEqual("some text");
    expect(otp.decrypt(encBytes)).toEqual("some text");
  });

  test("Safe mode test", () => {
    const source = "abcdefghijklmnopqrstuvwxyz0123456789";
    const otp = new OneTimePad(randomString(30, source), true);
    otp.encrypt("text");
    expect(() => {
      otp.encrypt("more text");
    }).toThrow();
    otp.key = randomString(30, source);
    expect(() => {
      otp.encrypt("more text");
    }).not.toThrow();
  });
});
