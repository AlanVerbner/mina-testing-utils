import { Bool, Field, SmartContract } from "snarkyjs";

export type BoolLike = Bool | boolean;
export type FieldLike = Field | string | number | bigint;

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualBool(value: Bool | boolean): R;
      toEqualField(value: FieldLike): R;
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
