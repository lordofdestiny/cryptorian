/**
 * Implementation of StringBuilder. It optimizes basic string operations
 * using  an underlying array
 */
export default class StringBilder {
  private buffer: Array<string>;
  private bufferIndex = 0;
  private stringLength = 0;
  constructor();
  constructor(capacity: number);
  constructor(text: string);
  constructor(a0?: number | string) {
    if (a0 === undefined || a0 === null) {
      this.buffer = new Array(30).fill("\u0000");
    } else if (typeof a0 === "number") {
      const bufferCapacity = this.calculateCapacity(a0);
      this.buffer = new Array(bufferCapacity);
    } else if (typeof a0 === "string") {
      const bufferCapacity = this.calculateCapacity(a0.length);
      this.buffer = new Array(bufferCapacity);
      this.copyToBuffer(a0, 0);
      this.stringLength = a0.length;
      this.bufferIndex = a0.length;
    } else {
      this.buffer = [];
    }
  }

  private calculateCapacity(num: number) {
    return 2 * num + 2;
  }

  private copyToBuffer(str: string | string[], begin = 0) {
    for (let i = 0; i < str.length; ++i) {
      this.buffer[begin + i] = str[i];
    }
  }

  public get capacity() {
    return this.buffer.length;
  }

  public get length() {
    return this.stringLength;
  }

  private setCapacity(capacity: number) {
    this.buffer.length = capacity;
  }

  public ensureCapacity(minCapacity: number) {
    if (minCapacity > 0) {
      if (this.capacity < minCapacity) {
        const newCap = this.calculateCapacity(this.capacity);
        if (minCapacity > newCap) {
          this.setCapacity(minCapacity);
        } else {
          this.setCapacity(newCap);
        }
      }
    }
    return this.capacity;
  }

  public setLenght(len: number) {
    this.ensureCapacity(len);
    this.stringLength = len;
    if (len >= this.stringLength) {
      for (let i = 0; i < len; ++i) {
        this.buffer[this.bufferIndex + i] = "\u0000";
      }
    }
    this.bufferIndex = len;
  }

  public append(value: number | bigint | string | any[] | StringBilder) {
    const text = value.toString();
    this.ensureCapacity(this.length + text.length);
    this.copyToBuffer(text, this.bufferIndex);
    this.bufferIndex += text.length;
    this.stringLength += text.length;
    return this;
  }

  public delete(start = 0, end = this.length) {
    if (start > end) {
      throw new Error('"start" must me smaller than "end"');
    } else if (start < 0 || end < 0) {
      throw new Error('"start" and "end" must be positive');
    } else {
      const removeCount = end - start;
      for (let i = start; i <= end; ++i) {
        this.buffer[i] = this.buffer[removeCount + i];
      }
      this.bufferIndex -= removeCount;
      this.stringLength -= removeCount;
      return this;
    }
  }

  public charAt(index: number) {
    return this.buffer[index];
  }

  public deleteCharAt(index: number) {
    this.delete(index, index + 1);
    return this;
  }

  public indexOf(char: string) {
    if (char.length > 1) {
      throw new Error("Argument must be of length 1");
    } else {
      return this.buffer.indexOf(char);
    }
  }

  public lastIndexOf(char: string) {
    if (char.length > 1) {
      throw new Error("Argument must be of length 1");
    } else {
      return this.buffer.lastIndexOf(char);
    }
  }

  public replace(start: number, end: number, str: string) {
    end = Math.min(end, this.bufferIndex);
    const count = end - start;
    const newSize = this.length + str.length - count;
    this.ensureCapacity(newSize);
    if (end > end) {
      throw new Error('"start" must me smaller than "end"');
    } else if (start < 0 || end < 0) {
      throw new Error('"start" and "end" must be positive');
    } else {
      const keep = this.buffer.slice(end, this.bufferIndex);
      this.copyToBuffer(str, start);
      this.copyToBuffer(keep, end);
      this.bufferIndex = newSize;
      this.stringLength = newSize;
    }
    return this;
  }

  public reverse() {
    for (let i = 0; i < this.bufferIndex / 2; ++i) {
      const symInd = this.bufferIndex - 1 - i;
      const s = this.buffer[i];
      this.buffer[i] = this.buffer[symInd];
      this.buffer[symInd] = s;
    }
    return this;
  }

  public setCharAt(index: number, chr: string) {
    if (chr.length > 1) {
      throw new Error("Argument must be of length 1");
    } else if (index > this.bufferIndex) {
      throw new Error("Index of out bounds of buffer");
    } else {
      this.buffer[index] = chr;
    }
    return this;
  }

  public setCharCodeAt(index: number, charCode: number) {
    if (index > this.bufferIndex) {
      throw new Error("Index of out bounds of buffer");
    }
    this.buffer[index] = String.fromCharCode(charCode);
    return this;
  }

  public substring(index: number) {
    if (index < 0 || index > this.bufferIndex) {
      throw new Error("Index out of bounds of builder");
    } else {
      return this.buffer.slice(index, this.stringLength).join("");
    }
  }

  public toString() {
    return this.substring(0);
  }

  public trimToSize() {
    const required = this.calculateCapacity(this.length);
    if (this.capacity > required) {
      this.setCapacity(required);
    }
  }
}
