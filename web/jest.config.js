// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,ts}"],
  coverageDirectory: "./test/coverage",
  coverageReporters: ["clover", "json", "lcov", "text"],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "./test/result", outputName: "report.xml" },
    ],
  ],
};

module.exports = createJestConfig(customJestConfig);

