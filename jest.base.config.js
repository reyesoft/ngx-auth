module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {"@lib/(.*)": "<rootDir>/src/lib/$1"},
  setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',
};
