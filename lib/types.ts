import { Bool, Field, Int64, PrivateKey, PublicKey, SmartContract, UInt32, UInt64 } from "snarkyjs";

export type BoolLike = Bool | boolean;
export type FieldLike = Field | string | number | bigint;
export type Int64Like = string | number | bigint | Field | UInt64 | UInt32 | Int64;

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualBool(value: Bool | boolean): R;
      toEqualField(value: FieldLike): R;
      toEqualPrivateKey(value: PrivateKey): R;
      toEqualPublicKey(value: PublicKey): R;
      toEqualInt64(value: Int64Like): R;
    }
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTrue(): R;
      toBeFalse(): R;
    }
  }
}
