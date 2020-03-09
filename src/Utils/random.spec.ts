import * as MyRandom from "./random";

import "../jestModule";

describe("Random utility functions", () => {
  describe("randomBit test", () => {
    test("Should return 0 or 1", () => {
      const bit = MyRandom.randomBit();
      expect(bit).toEqualOneOf(0, 1);
    });
  });
  describe("randomInt test", () => {
    test("Should be in range [0,100]", () => {
      for (let i = 0; i < 50; ++i) {
        const num = MyRandom.randomInt(0, 100);
        expect(num).toBeInRange(0, 100, true);
      }
    });
  });
  describe("randomBitSequence test", () => {
    test("Should return array of bits [0,1] of length 10", () => {
      const len = 10;
      const bits = MyRandom.randomBitSequence(len);
      expect(bits).toEqual(expect.arrayContaining([0, 1]));
      expect(bits).toHaveLength(len);
    });
  });
  describe("randomString test", () => {
    test("Should return random string of given length", () => {
      const len = 5;
      const soruce = "0123456789ABCDEF";
      const regex = new RegExp(`[${soruce}]*`);
      const rnd = MyRandom.randomString(len, soruce);

      expect(rnd).toHaveLength(len);
      expect(rnd).toMatch(regex);
    });
  });
  describe("randomize string test", () => {
    test("Should return randomized string", () => {
      const str = "Hi, I'm Peter!";
      const rnd = MyRandom.randomize(str);

      expect(rnd).toHaveLength(str.length);
      expect(rnd.split("").sort()).toEqual(str.split("").sort());
    });
  });
});
