import "source-map-support/register";

import { AffineCipher } from "./Ciphers/Affine/index";
import { AtbashCipher } from "./Ciphers/Atbash/index";
import { BaconianCipher } from "./Ciphers/Baconian/index";
import { CeasarCipher } from "./Ciphers/Ceasar/index";
import { OneTimePad } from "./Ciphers/OTP";

import * as Random from "./Utils/random";

const Ciphers = {
  AffineCipher,
  AtbashCipher,
  BaconianCipher,
  CeasarCipher,
  OneTimePad
};
const Utils = { Random };

export { Ciphers, Utils };
