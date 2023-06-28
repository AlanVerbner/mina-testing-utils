import { supportProperBool } from "./properBool";
import { supportProperField } from "./properField";
import { supportProperPublicKey } from "./properPublicKey";
import { supportProperPrivateKey } from "./properPrivateKey";


export function minaChaiMatchers(
  chai: Chai.ChaiStatic,
  utils: Chai.ChaiUtils
) {
  supportProperField(chai.Assertion);
  supportProperBool(chai.Assertion);
  supportProperPublicKey(chai.Assertion);
  supportProperPrivateKey(chai.Assertion);
}