export const randomInt = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

export const randomBit = () => Math.round(Math.random());

export const randomBitSequence = (length: number) =>
  Array.from({ length }, randomBit);

export const randomString = (len: number, source: string) => {
  const str = new Array(len);
  const sl = source.length;
  for (let i = 0; i < len; i++) {
    str[i] = source.charAt(Math.floor(Math.random() * sl));
  }

  return str.join("");
};
