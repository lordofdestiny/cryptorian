//Math helpers
export const div = (num: number, divisor: number) => Math.floor(num / divisor);

export const binaryDivision = (num: number) => num >> 1;

export function binaryExponent(base: number, exponent: number): number {
  if (base == 0 && exponent == 0) return NaN;
  if (base == 1) return 1;
  if (exponent == 0) return 1;
  if (exponent == 1) return base;
  if (exponent < 0) return 1 / binaryExponent(base, -exponent);
  if (exponent % 2 == 0) {
    return binaryExponent(base * base, div(exponent, 2));
  } else {
    return base * binaryExponent(base * base, div(exponent, 2));
  }
}

export const gcd = (a: number, b: number) => {
  while (b != 0) {
    const p = a % b;
    a = b;
    b = p;
  }
  return a;
};

export const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

export const gcdExtended = (a: number, b: number): [number, number, number] => {
  if (a == 0) {
    return [0, 1, b];
  }

  const [x1, y1, gcd] = gcdExtended(b % a, a);
  const x = y1 - Math.floor(b / a) * x1;
  const y = x1;

  return [x, y, gcd];
};

export const modularInverse = (a: number, m: number) => {
  const [x, , gcd] = gcdExtended(a, m);
  return gcd != 1 ? NaN : ((x % m) + m) % m;
};

//Mathematical mod funtion
export const mathMod = (a: number, m: number) => ((a % m) + m) % m;
