/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  collectCoverage: true,
  // collectCoverageFrom: [
  //   "./app/**/*.ts",
  //   "!./app/**/*.js",
  //   "!./app/**/*.d.ts",
  //   "!./app/**/*.(spec|test).ts"
  // ]
};