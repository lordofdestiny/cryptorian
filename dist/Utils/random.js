export var randomInt = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
};
export var randomBit = function () { return Math.round(Math.random()); };
export var randomBitSequence = function (length) {
    return Array.from({ length: length }, randomBit);
};
//# sourceMappingURL=random.js.map