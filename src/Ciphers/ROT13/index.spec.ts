import { ROT13Cipher } from "./index";

describe("ROT13 cipher tests", () => {
  test("Creating an instance", () => {
    const i1 = ROT13Cipher.getInstance();
    const i2 = ROT13Cipher.getInstance();
    expect(i1).toBeInstanceOf(ROT13Cipher); //No singleton instance exists
    expect(i2).toBeInstanceOf(ROT13Cipher); //Returns created instance
    expect(i1).toBe(i2);
  });

  test("Check if method is reversable", () => {
    const rot13 = ROT13Cipher.getInstance();
    const text = "Text that i want to encrypt 123";
    const enc = rot13.encrypt(text);
    expect(rot13.decrypt(enc)).toEqual(text.toUpperCase());
  });
});
