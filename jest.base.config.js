module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: { "@lib/(.*)": "<rootDir>/src/lib/$1" },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json'
    },
    '__TRANSFORM_HTML__': true
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: [
    "<rootDir>/**/*.spec.ts"
  ],
};
