export declare namespace jest {
  interface Matchers<R> {
    toEqual(value: number): R;
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
