// https://jestjs.io/docs/en/configuration
// https://blog.unresolved.xyz/jest-fetch-is-not-defined
module.exports = {
  verbose: true,
  testRegex: [/\.spec.tsx?/],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  //preset: "jest-puppeteer",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['./jest.setup.js'],
};
