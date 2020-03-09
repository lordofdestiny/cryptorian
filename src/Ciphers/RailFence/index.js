const {} = require("../../utils/helpers.js");

class RailFence {
  constructor(key) {
    this._key = RailFence._checkKey(key);
    this._cycle = RailFence._getCycle();
  }

  get key() {
    return this._key;
  }

  set key(key) {
    this._key = RailFence._checkKey(key);
    this._cycle = RailFence._getCycle(key);
  }

  //Check if key is good, if yes return, else throw
  static _checkKey(key) {
    if (typeof key !== "number") {
      throw new Error("Key must be an integer!");
    } else if (key < 2) {
      throw new Error("Key must be larger than 2!");
    }
    return key;
  }

  //Length of one circle is a length of one zig-zag
  //See how cipher works online
  static _getCycle(key) {
    return key * 2 - 2;
  }

  encrypt(text) {
    const { length } = text;
    const { _key: railCount, _cycle: cyc } = this;

    //Array for each rail
    const rails = Array.from(new Array(railCount), () => new Array());

    //Fill rail arrays
    for (let i = 0; i < length; i++) {
      //Calculate rail to push to
      const rail = (((i % cyc) - 1) % (railCount - 1)) + 1;
      rails[rail].push(text[i]);
    }

    //Concat raik arrays
    const encrypted = rails.reduce((prev, rail) => prev.concat(rail), []);

    return encrypted.join("");
  }

  decrypt(text) {
    //Length of text to decrypt
    const { length } = text;
    //Array to keep decrypted characters
    const decrypted = new Array(length);
    const { _key: rails, _cycle: cyc } = this;

    //Number of full cycles that are done in ecryption
    const fullCycles = Math.floor(length / cyc);
    //Number of characters in last, not-full cycle
    const rmd = length % cyc;

    //array with positions where each rail's first position is
    const beginAt = new Array(rails);
    beginAt[0] = 0;
    for (let i = 1; i < rails; i++) {
      //If there is a char on a rail in last cycle add 1
      const bonus = Number(i - 1 < rmd);
      //Last element
      if (i == rails - 1) {
        beginAt[i] = beginAt[i - 1] + 2 * fullCycles + bonus;
      } else {
        beginAt[i] = beginAt[i - 1] + fullCycles + bonus;
      }
    }

    //Current index for decrypted
    let index = 0;
    //Indices with current positions for each rail
    const railIndices = new Array(3).fill(0);
    //Iterate of each cycle
    for (let i = 0; i < fullCycles + 1; i++) {
      //Iterate over each char of cycle
      for (let j = 0; j < cyc; j++) {
        //Exit if all characters were place at right place
        if (index == length) break;
        //Calculate current rail
        const currRail = ((j - 1) % (rails - 1)) + 1;
        decrypted[index] = text[beginAt[currRail] + railIndices[currRail]];
        index++;
        railIndices[currRail]++;
      }
    }

    return decrypted.join("");
  }
}

module.exports = RailFence;
