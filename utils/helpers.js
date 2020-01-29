//RNG helpers
module.exports.randomInt = (a, b) =>
  Math.floor(Math.random() * (b - a + 1)) + a;
module.exports.randomBit = () => Math.round(Math.random());
module.exports.randomBitSequence = length => Array.from({ length }, randomBit);

//Math helpers
module.exports.div = (number, divisor) => Math.floor(number / divisor);
module.exports.binaryDivision = number => number >> 1;
module.exports.gcd = (a, b) => {
  while (b != 0) {
    const p = a % b;
    a = b;
    b = p;
  }
  return a;
};

const gcdExtended = (a, b) => {
  if (a == 0) {
    return [0, 1, b];
  }

  const [x1, y1, gcd] = gcdExtended(b % a, a);
  const x = y1 - Math.floor(b / a) * x1;
  const y = x1;

  return [x, y, gcd];
};
module.exports.gcdExtended = gcdExtended;

module.exports.modularInverse = (a, m) => {
  const [x, y, gcd] = gcdExtended(a, m);
  //console.log("gcd: ",gcd);
  //console.log("MMI" , (x%m+m)%m);
  return gcd != 1 ? -1 : ((x % m) + m) % m;
};

//Mathematical mod funtion
module.exports.mathMod = (a, m) => ((a % m) + m) % m;

//String function
//Transform array to concated binary string
module.exports.stateToString = arr => arr.join("");

//Return left half of the array
module.exports.halfArray = arr => arr.slice(0, Math.ceil(arr.length / 2));

module.exports.reverseString = function(str) {
  let s = "";
  for (let i = str.length - 1; i > -1; --i) {
    s += str[i];
  }
  return s;
};

module.exports.isAlpha = text => !!text.match(/[a-z]/i);
module.exports.isNum = text => !!text.match(/[0-9]/i);
module.exports.isAlphaNum = text => !!text.match(/[0-9A-Z]/i);
module.exports.isWhite = text => !!text.match(/[\s]/i);

module.exports.randomString = (len, source) => {
  const str = new Array(len);
  const sl = source.length;
  for (let i = 0; i < len; i++) {
    str[i] = source.charAt(Math.floor(Math.random() * sl));
  }

  return str.join("");
};

module.exports.randomize = str => {
  const newstr = Array.from(str);
  let p = "";
  for (let i = str.length - 1; i > -1; --i) {
    const index = this.randomInt(0, i);
    p = newstr[index];
    newstr[index] = newstr[i];
    newstr[i] = p;
  }

  return newstr.join("");
};

//Convert array with diits of base n to decimal number
module.exports.nBaseArrayToDecimal = function(arr, n = 2) {
  let p = 1;
  let res = 0;
  for (let i = arr.length - 1; i > -1; --i) {
    res += arr[i] * p;
    p *= n;
  }
  return res;
};
