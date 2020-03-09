import * as MyMath from "./math";

import "../jestModule";

describe("Math utility fucntions", () => {
  describe("Div test", () => {
    test.each([
      [2, 1, 2],
      [2, 2, 1],
      [1, 2, 0],
      [5, 2, 2]
    ])("div(%i,%i) should equal %i", () => {
      const value = MyMath.div(15, 4);
      expect(value).toEqual(3);
    });
  });

  describe("Binary division tests", () => {
    test.each([
      [2, 1],
      [1, 0],
      [5, 2]
    ])("binaryDivision(%i,%i) should equal %i", (a, expected) => {
      const value = MyMath.binaryDivision(a);
      expect(value).toEqual(expected);
    });
  });

  describe("Binary Exponent tests", () => {
    test.each([
      [0, 0, NaN],
      [1, 53, 1],
      [12, 0, 1],
      [5, -2, 1 / 25],
      [5, 2, 25],
      [2, 3, 8]
    ])("binaryExponent(%i,%i) should equal %i", (a, b, expected) => {
      const value = MyMath.binaryExponent(a, b);
      expect(value).toEqual(expected);
    });
  });

  describe("Greatest Common Divisor tests", () => {
    test.each([
      [2, 3, 1],
      [6, 3, 3],
      [10, 5, 5],
      [10, 10, 10]
    ])("gcd(%i,%i) should equal %i", (a, b, expected) => {
      const value = MyMath.gcd(a, b);
      expect(value).toEqual(expected);
    });
  });

  describe("Least common multiple tests", () => {
    test.each([
      [2, 3, 6],
      [1, 5, 5],
      [10, 10, 10],
      [15, 5, 15]
    ])("lcm(%i,%i) should equal %i", (a, b, expected) => {
      const value = MyMath.lcm(a, b);
      expect(value).toEqual(expected);
    });
  });

  describe("Extended Euclid tests", () => {
    test.each([
      [0, 12, 12],
      [3, 2, 1],
      [2, 4, 2],
      [6, 6, 6]
    ])("gcdExtender(%i,%i) should be %i", (a, b, expected) => {
      const [x, y, gcd] = MyMath.gcdExtended(a, b);
      const test = a * x + b * y;
      expect(gcd).toEqual(expected);
      expect(test).toEqual(gcd);
    });
  });

  describe("Modular Inverse tests", () => {
    test.each([
      [3, 3, NaN],
      [2, 4, NaN],
      [1, 2, 1],
      [2, 3, 2],
      [15, 4, 3]
    ])("modularInverse(%i,%i) shoudl be %i", (a, m, expected) => {
      const value = MyMath.modularInverse(a, m);
      expect(value).toEqual(expected);
    });
  });

  describe("Math modulo tests", () => {
    test.each([
      [2, 2, 0],
      [5, 3, 2],
      [1, 5, 1],
      [5, 1, 0],
      [-1, 3, 2],
      [-4, 2, 0]
    ])("mathMod(%i,%i)", (a, m, expected) => {
      const value = MyMath.mathMod(a, m);
      expect(value).toEqual(expected);
    });
  });
});
