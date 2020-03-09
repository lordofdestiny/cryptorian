import { isAlpha } from "../../Utils/helpers";

class Atbash {
  _init: string;
  _cypherMap: Map<string, string>;
  constructor() {
    this._init = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this._cypherMap = this._buildCypher();
  }

  _buildCypher() {
    const map = new Map();

    this._init.split("").forEach((char, i, arr) => {
      map.set(char, arr[25 - i]);
    });

    return map;
  }

  encrypt(text: string) {
    return text
      .toUpperCase()
      .split("")
      .reduce(
        (acc, char) => acc + (isAlpha(char) ? this._cypherMap.get(char) : char),
        ""
      );
  }

  decrypt(text: string) {
    return this.encrypt(text);
  }
}

export default Atbash;
