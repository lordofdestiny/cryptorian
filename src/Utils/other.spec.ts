import * as Other from "./other";
import "../jestModule";

describe("Other utility functions", () => {
  describe("Half array test", () => {
    test.each([
      [[1, 2, 3, 4], true, [1, 2]],
      [[1, 2, 3, 4], false, [3, 4]]
    ])("Should return half of the array", (array, left, expected) => {
      const value = Other.halfArray(array, left);
      expect(value).toEqual(expected);
    });
  });
  describe("Reverse string test", () => {
    test("Should reverse string", () => {
      const string = "abcdefg";
      const rev = Other.reverseString(string);

      expect(rev).toHaveLength(string.length);
      for (let i = 0; i < string.length; ++i) {
        expect(rev[i]).toBe(string[string.length - 1 - i]);
      }
    });
  });
  describe("nBaseArrayToDecimal test", () => {
    test.each([
      ["0101", 2],
      ["1111", 2],
      ["212", 3],
      ["232", 5]
    ])("Should convert n-based array to base 10 number", (number, base) => {
      const values = number.split("").map(value => parseInt(value));
      const value = Other.nBaseArrayToDecimal(values, base);
      expect(value).toEqual(parseInt(number, base));
    });
  });
});
