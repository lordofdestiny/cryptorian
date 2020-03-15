import { div } from "../../Utils/math";

export class RailFenceCipher {
  //Key represents number of rails cipher uses
  private railCount: number;
  private cycle: number;
  constructor(railCount: number) {
    RailFenceCipher.checkKey(railCount);
    this.railCount = railCount;
    this.cycle = this.findCycle();
  }

  //Check if key is good, if yes return, else throw
  private static checkKey(key: number) {
    if (typeof key !== "number") {
      throw new Error("Key must be an integer!");
    } else if (key < 2) {
      throw new Error("Key must be larger than 2!");
    }
  }

  //Length of one circle is a length of one zig-zag
  //See how cipher works online
  private findCycle() {
    return this.railCount * 2 - 2;
  }

  private railIndexFromText(index: number) {
    return (((index % this.cycle) - 1) % (this.railCount - 1)) + 1;
  }

  public encrypt(text: string) {
    //Array for each rail
    const rails = Array.from(new Array(this.railCount), () => new Array());

    //Fill rail arrays
    for (let i = 0; i < text.length; ++i) {
      const rail = this.railIndexFromText(i);
      rails[rail].push(text[i]);
    }

    //Concat rail arrays
    const encrypted = rails.reduce((prev, rail) => prev.concat(rail), []);

    return encrypted.join("");
  }

  public decrypt(text: string) {
    //Array to keep decrypted characters
    const decrypted = new Array(text.length);

    //Number of full cycles that are done in ecryption
    const fullCycles = div(text.length, this.cycle);
    //Number of characters in last, not-full cycle
    const rmd = text.length % this.cycle;

    //array with positions where each rail's first position is
    const beginAt = new Array(this.railCount);
    beginAt[0] = 0;
    for (let i = 1; i < this.railCount; ++i) {
      //If there is a char on a rail in last cycle add 1
      const bonus = Number(i - 1 < rmd);
      //Last element
      if (i == this.railCount - 1) {
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
    for (let i = 0; i < fullCycles + 1; ++i) {
      //Iterate over each char of cycle
      for (let j = 0; j < this.cycle; ++j) {
        //Exit if all characters were place at right place
        if (index == text.length) break;
        //Calculate current rail
        const currRail = ((j - 1) % (this.railCount - 1)) + 1;
        decrypted[index] = text[beginAt[currRail] + railIndices[currRail]];
        ++index;
        ++railIndices[currRail];
      }
    }

    return decrypted.join("");
  }
}
