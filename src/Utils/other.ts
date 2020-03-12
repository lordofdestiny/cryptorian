//Return left half of the array
export function halfArray(arr: any[], left = true) {
  const middle = Math.ceil(arr.length / 2);
  return left ? arr.slice(0, middle) : arr.slice(middle);
}

export const reverseString = function(str: string) {
  let s = "";
  for (let i = str.length - 1; i > -1; --i) {
    s += str[i];
  }
  return s;
};

export const isAlpha = (text: string) => !!text.match(/^[a-z]+$/i);
export const isUpper = (text: string) => !!text.match(/^[A-Z]+$/);
export const isLower = (text: string) => !!text.match(/^[a-z]+$/);
export const isNum = (text: string) => !!text.match(/^[0-9]+$/i);
export const isAlphaNum = (text: string) => !!text.match(/^[0-9A-Z]+$/i);
export const isWhite = (text: string) => !!text.match(/[\s]/i); //Check later

//Convert array with diits of base n to decimal number
export const nBaseArrayToDecimal = function(arr: number[], n = 2) {
  let p = 1;
  let res = 0;
  for (let i = arr.length - 1; i > -1; --i) {
    res += arr[i] * p;
    p *= n;
  }
  return res;
};
