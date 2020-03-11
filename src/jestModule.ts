export {};

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toEqualOneOf(...values: T[]): R;
      toBeInRange(min: number, max: number, inclusive?: boolean): R;
      toBeNan(): R;
      toBeString(): R;
      toBeArray(): R;
    }
  }
}

expect.extend({
  toEqualOneOf(received, ...values) {
    const pass = values.find(value => value === received) !== -1;
    const msg = `expected ${received}${
      pass ? "" : " not"
    } to be one of ${values}`;
    return {
      message: () => msg,
      pass
    };
  },
  toBeInRange(received, min, max, inclusive = true) {
    const pass = inclusive
      ? min <= received && received <= max
      : min < received && received < max;
    const range = `${inclusive ? "[" : "("}${min}, ${max}${
      inclusive ? "]" : ")"
    }`;

    const msg = `expected ${received}${
      pass ? "" : " not"
    } to be in range ${range}`;

    return {
      message: () => msg,
      pass
    };
  },
  toBeNan(received) {
    const pass = isNaN(received);
    const msg = `expected ${received}${pass ? "" : " not"} to be NaN`;
    return {
      message: () => msg,
      pass
    };
  },
  toBeString(received) {
    const pass = typeof received === "string";
    const msg = `expected ${received}${
      pass ? "" : " not"
    } to be of type string`;
    return {
      message: () => msg,
      pass
    };
  },
  toBeArray(received) {
    const pass = Array.isArray(received);
    const msg = `expected ${received}${
      pass ? "" : " not"
    } to be instance of Array`;
    return {
      message: () => msg,
      pass
    };
  }
});
