import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.[jt]sx?$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '@/*': '<rootDir>/packages/src/*',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};

export default config;
