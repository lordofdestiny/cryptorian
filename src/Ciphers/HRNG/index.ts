//Hardwerski generator slucajnih brojeva
import { halfArray, nBaseArrayToDecimal } from "../../Utils/other";
import StringBilder from "../../Utils/StringBuilder";

//do one operation on the register
function shift(arr: number[], i1: number, i2: number) {
  //1. generate new bit from output pins i1 and i2
  const newFirst = (arr[i1] ^ arr[i2]) % 2;
  //2. push it to the front of the register ( array )
  arr.unshift(newFirst);
  //3. Pop last value from register (delte it from array )
  arr.pop();
  //4. Read last bit from register ( return last element of the array)
  return arr[arr.length - 1];
}

//Check if given state array is sequence repeated twice
function sequenceRepeatedTwice(feed: number[]) {
  //Since it's checking if it's repeated twice, it should always be even
  if (feed.length % 2 == 1) return false;
  //Find half of the length
  const halfLen = Math.floor(feed.length / 2);
  let i = 0;
  //Check from 0 and middle if inices are the same
  while (i < halfLen) {
    if (feed[i] != feed[halfLen + i]) return false;
    ++i;
  }

  return true;
}

function sameState(arr1: number[], arr2: number[]) {
  if (arr1.length != arr2.length) return false;
  const l = arr1.length;
  let i = 0;
  let same = true;
  while (i < l) {
    if (arr1[i] == arr2[i]) {
      ++i;
      continue;
    } else {
      same = false;
      break;
    }
  }
  return same;
}

export class HRNG {
  private pins: { pin1: number; pin2: number };
  private size: number;
  constructor(size: number, p1: number, p2: number) {
    this.size = size;
    if (p1 > p2) [p1, p2] = [p2, p1];
    this.pins = { pin1: p1, pin2: p2 };
  }

  //Base function for generating random binary sequnce
  _generate(arr: number[]) {
    //Save initial state
    const initState = arr.slice(0);
    //Array to save output too
    const feed = new Array();
    let isRepeating = false;

    do {
      //Preform one register operation
      const output = shift(arr, this.pins.pin1, this.pins.pin2);
      //Save ouput to the feed
      feed.push(output);
      isRepeating = sequenceRepeatedTwice(feed);
    } while (!sameState(initState, arr) && !isRepeating);

    const finalArr = isRepeating ? halfArray(arr) : feed.slice(0, -1);
    return finalArr;
  }

  _decideResult(sequence: number[], binary: boolean, reverse: boolean) {
    if (binary && reverse) {
      return sequence.reverse().join("");
    } else if (!binary && reverse) {
      return nBaseArrayToDecimal(sequence.reverse(), 2);
    } else if (binary && !reverse) {
      return sequence.join();
    } else {
      return nBaseArrayToDecimal(sequence, 2);
    }
  }

  //Generate a number without changing register state
  // binary argument means does function return result as binary or as decimal number ( def )
  //Reverse argument menas is sequence recersed before return
  generate(arr: number[], binary = false, reverse = true) {
    if (arr.length > this.size) {
      throw new Error("Sequence must me same length as generator  size!");
    }
    const sequence = this._generate(arr);
    return this._decideResult(sequence, binary, reverse);
  }

  drawHRNG() {
    const string = new StringBilder(50 * this.size);
    //A middle possition between 2 input pins from register
    const cmid = Math.floor(((this.pins.pin2 - this.pins.pin1 + 1) * 5) / 2);
    //A middle possition relative to first pin
    const c = this.pins.pin1 * 5 + cmid;
    //Indenrtaion for wire
    const ind = -5;

    //Write top edge of register
    for (let i = -5; i < 5 * this.size + 1; i++)
      string.append(i >= 0 ? "-" : " ");
    string.append("\n");

    //Draw the middle part of register
    for (let i = 0; i < 3; i++) {
      //If it's a middle row
      if (i == 1) {
        for (let j = ind; j < 5 * this.size + 1; j++) {
          if (j < -1) {
            //Draw wire comming into register
            string.append("-");
          } else if (j == -1) {
            //Draw connection arrow
            string.append(">");
          } else if (j % 5 == 0) {
            //Draw horizontal lines
            string.append("|");
          } else {
            //Pad spaces
            string.append(" ");
          }
        }
      }
      //If it's 1st or 3rd row
      if (i % 2 == 0) {
        for (let j = ind; j < 5 * this.size + 1; j++) {
          if (j != ind && j % 5 == 0 && i == 0) {
            //Draw first row
            string.append("|");
          } else if (j % 5 == 0 && i == 2) {
            //Draw third row
            string.append("|");
          } else {
            //Fill spaces
            string.append(" ");
          }
        }
      }
      string.append("\n");
    }

    //Draw bottom edge of register
    for (let i = ind; i < 5 * this.size + 1; i++) {
      if (i == ind) {
        //Draw wire at edge of image
        string.append("|");
      } else if (i >= 0) {
        //Draw bottom line of register
        string.append("-");
      } else {
        //Fill spaces
        string.append(" ");
      }
    }
    string.append("\n");

    //Draw wires comming out of register and edge wire
    for (let i = 0; i < 2; i++) {
      for (let j = ind; j < 5 * this.size + 1; j++) {
        //Draw indented part
        if (j < 0) {
          string.append(j == ind ? "|" : " ");
        } else if (j == this.pins.pin1 * 5 + 3 || j == this.pins.pin2 * 5 + 2) {
          //Draw wires comming out of register
          string.append("|");
        } else if (i == 1 && j >= c - 1 && j <= c + 1) {
          //Draw top of xor circuit
          string.append("-");
        } else {
          //Fill spaces
          string.append(" ");
        }
      }
      string.append("\n");
    }

    //Draw middle of xor circuit and wire comming out of it
    for (let i = ind; i < 5 * this.size + 1; i++) {
      if (i == ind) {
        //Draw edge wire
        string.append("|");
      } else if (i == ind + 1) {
        //Draw arrow
        string.append("<");
      } else if (i <= this.pins.pin2 * 5 + 2) {
        //Draw line only until the right out pin
        //draw rest
        if (i == c) {
          // In the middle between pins
          string.append("+");
        } else if (i == c - 1 || i == c + 1) {
          //Left and right of the middle
          string.append("|");
        } else {
          //Rest is wire
          string.append("-");
        }
      } else {
        //Fill spaces
        string.append(" ");
      }
    }
    string.append("\n");

    //draw bottom part of xor circuit
    for (let i = ind; i < 5 * this.size + 1; i++) {
      string.append(i >= c - 1 && i <= c + 1 ? "-" : " ");
    }
    string.append("\n");

    return string.toString();
  }
}
