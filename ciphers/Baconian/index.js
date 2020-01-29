const { div, binaryDivision, isAlpha } = require("../../utils/helpers");

class Baconian {
  constructor({ code: { offState, onState }, strict = true }) {
    this._offState = offState.toString()[0];
    this._onState = onState.toString()[0];
    this._map = Baconian._buildCipherMap(this);
    this._validateCipherText = Baconian._buildFomatChecker(this);
    this._strict = strict;
  }

  get isStrict() {
    return this._strict;
  }

  set setStrict(strict) {
    this._strict = strict;
  }

  get code() {
    return {
      offState: this._offState,
      onState: this._onState
    };
  }

  set code({ onState, offState }) {
    this._offState = offState;
    this._onState = onState;
  }

  static _buildFomatChecker({ _offState: off, _onState: on }) {
    const regex = new RegExp(`^[${off}${on}]+$`, "gi");
    return text => !!text.match(regex);
  }

  static _constructAlphabeth() {
    function* alphabethGenerator() {
      for (let i = 0; i < 26; i++) {
        yield String.fromCharCode(65 + i);
      }
    }
    return Array.from(alphabethGenerator());
  }

  static _convertToBinary(number, offState, onState) {
    const digit = number % 2 == 0 ? offState : onState;
    if (number < 2) {
      return digit;
    } else {
      return (
        Baconian._convertToBinary(binaryDivision(number), offState, onState) +
        digit
      );
    }
  }

  static _makeBinaryCode(number, offState, onState) {
    const code = Baconian._convertToBinary(number, offState, onState);
    return code.padStart(5, offState);
  }

  static _constructBinaryAlphabeth(offState, onState) {
    function* binaryAlphabethGenerator() {
      for (let i = 0; i < 26; i++) {
        yield Baconian._makeBinaryCode(i, offState, onState);
      }
    }
    return Array.from(binaryAlphabethGenerator());
  }

  static _buildCipherMap({ _offState: offState, _onState: onState }) {
    const alphabeth = Baconian._constructAlphabeth();
    const binaryAlphabeth = Baconian._constructBinaryAlphabeth(
      offState,
      onState
    );
    const map = new Map();

    for (let i = 0; i < 26; ++i) {
      map.set(alphabeth[i], binaryAlphabeth[i]);
      map.set(binaryAlphabeth[i], alphabeth[i]);
    }

    return map;
  }

  _validatePlainText(text) {
    return !!text.match(/^[\sA-Z]+$/gi);
  }

  encrypt(text) {
    const test = text instanceof Array ? text.join("") : text;
    if (!this._validatePlainText(test)) {
      throw new Error("Plain text may only contain letters and whitespaces!");
    }

    const tidy = text.toUpperCase().replace(/\s/g, "");
    const toEncrypt = text instanceof Array ? tidy : tidy.split("");
    const encrpyted = toEncrypt.map(char => this._map.get(char));

    return encrpyted.join("");
  }

  decrypt(text, toArray = false) {
    if (text.lengt == 0) return "";
    const test = text instanceof Array ? text.join("") : text;
    if (!this._validateCipherText(test)) {
      throw new Error("Cipher text is not valid for current off/on states!");
    }
    if (text.lengt % 5 != 0 && this._strict) {
      throw new Error("Cipher text length is not valid!");
    }

    const singleChar = new Array(5);
    const decrypted = new Array(div(text.length, 5));

    let index = 0;
    for (const char of text) {
      singleChar[index % 5] = char;
      if (index % 5 == 4) {
        decrypted[div(index, 5)] = this._map.get(singleChar.join(""));
      }
      index++;
    }

    return toArray ? decrypted : decrypted.join("");
  }
}

module.exports = Baconian;
