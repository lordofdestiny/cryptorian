declare class Atbash {
    _init: string;
    _cypherMap: Map<string, string>;
    constructor();
    _buildCypher(): Map<any, any>;
    encrypt(text: string): string;
    decrypt(text: string): string;
}
export default Atbash;
