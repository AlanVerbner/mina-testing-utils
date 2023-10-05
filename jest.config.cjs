module.exports = {
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t)s$": "ts-jest",
    // '^.+\\.(j)s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(tslib|o1js/node_modules/tslib))",
  ],
  resolver: "<rootDir>/jest-resolver.cjs",
  testTimeout: 1_000_000,
  testMatch: ["**/test/**/*.spec.ts"],
};
