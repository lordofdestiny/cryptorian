//String function

//Return left half of the array
export const halfArray = (arr: [any]) =>
  arr.slice(0, Math.ceil(arr.length / 2));

export const reverseString = function(str: string) {
  let s = "";
  for (let i = str.length - 1; i > -1; --i) {
    s += str[i];
  }
  return s;
};

export const isAlpha = (text: string) => !!text.match(/[a-z]/i);
export const isNum = (text: string) => !!text.match(/[0-9]/i);
export const isAlphaNum = (text: string) => !!text.match(/[0-9A-Z]/i);
export const isWhite = (text: string) => !!text.match(/[\s]/i);

import { randomInt } from "./random";
export const randomize = (str: string) => {
  const newstr = Array.from(str);
  let p = "";
  for (let i = str.length - 1; i > -1; --i) {
    const index = randomInt(0, i);
    p = newstr[index];
    newstr[index] = newstr[i];
    newstr[i] = p;
  }

  return newstr.join("");
};

//Convert array with diits of base n to decimal number
export const nBaseArrayToDecimal = function(arr: [number], n = 2) {
  let p = 1;
  let res = 0;
  for (let i = arr.length - 1; i > -1; --i) {
    res += arr[i] * p;
    p *= n;
  }
  return res;
};
