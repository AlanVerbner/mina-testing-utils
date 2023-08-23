import { Bool, Field, Int64, PublicKey, Signature, UInt32, UInt64 } from "snarkyjs";

export type BoolLike = Bool | boolean;
export type FieldLike = Field | string | number | bigint;
export type Int64Like = string | number | bigint | Field | UInt64 | UInt32 | Int64;
export type UInt32Like = string | number | bigint | Field | UInt32;
export type UInt64Like = string | number | bigint | Field | UInt64 | UInt32;

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualBool(value: Bool | boolean): R;
      toEqualField(value: FieldLike): R;
      toEqualPublicKey(value: PublicKey): R;
      toEqualInt64(value: Int64Like): R;
      toEqualUInt64(value: UInt64Like): R;
      toEqualUInt32(value: UInt32Like): R;
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

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualSignature(value: Signature): R;
      signerToBe(publicKey: PublicKey, msg: Field[])
    }
  }
}