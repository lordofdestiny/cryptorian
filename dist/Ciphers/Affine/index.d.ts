declare class Affine {
    _a: number;
    _b: number;
    _ami: number;
    constructor({ a, b }: {
        a: number;
        b: number;
    });
    get a(): number;
    set a(value: number);
    get b(): number;
    set b(value: number);
    get key(): {
        a: number;
        b: number;
    };
    set key({ a, b }: {
        a: number;
        b: number;
    });
    _encryptChar(char: string): string;
    _decryptChar(char: string): string;
    encrypt(text: string): string;
    decrypt(text: string): string;
}
export default Affine;
