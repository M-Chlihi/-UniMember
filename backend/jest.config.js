module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/setup/testEnv.js"],
  roots: ["<rootDir>/tests"],
  clearMocks: true,
  restoreMocks: true,
  collectCoverageFrom: [
    "controllers/**/*.js",
    "services/**/*.js",
    "middleware/**/*.js",
    "utils/**/*.js",
    "validation/**/*.js",
    "routes/**/*.js",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
};
