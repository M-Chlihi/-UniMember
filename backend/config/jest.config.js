module.exports = {
  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup/testDatabase.js"],

  clearMocks: true,

  restoreMocks: true,

  collectCoverageFrom: [
    "controllers/**/*.js",
    "services/**/*.js",
    "middleware/**/*.js",
    "utils/**/*.js",
    "validation/**/*.js",
    "!**/node_modules/**",
  ],

  testPathIgnorePatterns: ["/node_modules/"],
};
