import StringBilder from "./StringBuilder";

describe("String Builder class test", () => {
  describe("Test class initialization", () => {
    test.each([
      [null, 30],
      ["text", 10],
      [5, 12]
    ])("Bufffer with %p have size %p", (a1: any, size: number) => {
      const sbd = new StringBilder(a1);
      expect(sbd.capacity).toBe(size);
    });
  });
  describe("Buffer should not return full-size string", () => {
    test.each([
      ["12", 2],
      [10, 0],
      [null, 0]
    ])(
      "Buffer with %p should return string of len %p",
      (a0: any, size: number) => {
        const sdb = new StringBilder(a0);
        const str = sdb.toString();
        expect(str.length).toBe(size);
      }
    );
  });

  describe("Ensure Capacity test", () => {
    test.each([
      ["some short txt", 10, 30],
      ["some longer text", 35, 70],
      ["some nice txt", 100, 100]
    ])(
      '"%s" ensured with %d should have %d cap',
      (text: string, cap: number, newCap: number) => {
        const sbd = new StringBilder(text);
        sbd.ensureCapacity(cap);
        expect(sbd.capacity).toBe(newCap);
      }
    );
  });

  test("setLenght test", () => {
    const text = "some text";
    const sbd = new StringBilder(text);
    expect(sbd.length).toBe(text.length);
    sbd.setLenght(15);
    expect(sbd.length).toBe(15);
    sbd.setLenght(6);
    expect(sbd.toString()).toBe("some t");
  });

  test("Append values test", () => {
    const text = "text";
    const sbd = new StringBilder(text);
    sbd.append(" is");
    const str = sbd.toString();
    expect(str).toBe("text is");
    expect(str.length).toBe(7);
  });

  test("charAt test", () => {
    const sbd = new StringBilder();
    expect(sbd.charAt(0)).toEqual("\u0000");
    sbd.append("text");
    expect(sbd.charAt(2)).toEqual("x");
  });

  test("delete test", () => {
    const sbd = new StringBilder("this is some text");
    sbd.delete(3, 10);
    expect(sbd.length).toEqual(10);
    expect(sbd.toString()).toEqual("thime text");
    sbd.delete(5);
    expect(sbd.length).toEqual(5);
    expect(sbd.toString()).toEqual("thime");
    sbd.delete();
    expect(sbd.length).toEqual(0);
    expect(sbd.toString()).toEqual("");
  });

  test("deleteCharAt", () => {
    const sbd = new StringBilder("text");
    sbd.deleteCharAt(1);
    expect(sbd.toString()).toEqual("txt");
  });

  test("trimToSize", () => {
    const sbd = new StringBilder("text");
    sbd.append("tttteas");
    sbd.delete(5);
    sbd.trimToSize();
    expect(sbd.capacity).toEqual(12);
  });

  test("reverse buffer", () => {
    const txt = "text xd";
    const sbd = new StringBilder(txt);
    sbd.reverse();

    expect(sbd.toString()).toEqual(
      txt
        .split("")
        .reverse()
        .join("")
    );
  });

  test("replace", () => {
    const sbd = new StringBilder("text");
    sbd.replace(0, 2, "xd");
    expect(sbd.toString()).toEqual("xdxt");
    sbd.replace(1, 3, "aa");
    expect(sbd.toString()).toEqual("xaat");
    sbd.replace(0, 5, "lol");
    expect(sbd.toString()).toEqual("lol");
  });
});
