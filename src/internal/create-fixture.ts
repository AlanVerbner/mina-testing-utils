const memoize = require("memoizee");

export function createFixture(fn: any) {
    return memoize(fn, { length: false });
}