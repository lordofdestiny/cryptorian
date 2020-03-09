export {};

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toEqualOneOf(...values: T[]): R;
      toBeInRange(min: number, max: number, inclusive?: boolean): R;
    }
  }
}

expect.extend({
  toEqualOneOf(received, ...values) {
    const pass = values.find(value => value === received) !== -1;
    if (pass) {
      return {
        message: () => `expected ${received} not to be one of ${values}`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to be one of ${values}`,
        pass: false
      };
    }
  },
  toBeInRange(received, min, max, inclusive = true) {
    const pass = inclusive
      ? min <= received && received <= max
      : min < received && received < max;
    const range = `${inclusive ? "[" : "("}${min}, ${max}${
      inclusive ? "]" : ")"
    }`;
    if (pass) {
      return {
        message: () => `expected ${received} not to be in range ${range}`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to be in range ${range}`,
        pass: false
      };
    }
  },
  toBeNan(received) {
    const pass = isNaN(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be NaN`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to be NaN`,
        pass: false
      };
    }
  }
});
