import { Field, Signature, State } from "snarkyjs";
import { BoolLike, FieldLike } from "./types";

/**
 * Extracts a value from a state object or returns the value itself if it's not a state object.
 * @param val - The value to extract from.
 * @returns The extracted value.
 */
export function extractFromState<T extends Signature | BoolLike | FieldLike>(
    val: T & State<T>
  ): T {
    return val.get ? val.get() : val;
  }

/**
 * 
 * @param expected FieldLike object that can be casted to Field
 * @param actual Field object
 * @returns true if both match
 */
export function matchesField(expected: FieldLike, actual: FieldLike): boolean {
  return Field.from(actual).equals(Field.from(expected)).toBoolean();
}

/**
 * 
 */
export function parseMina(amount: FieldLike): Field {
  return Field.from(amount).mul(new Field("1000000000"))
}