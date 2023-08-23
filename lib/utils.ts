import { Signature, State } from "snarkyjs";
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