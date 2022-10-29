export default {
    testEnvironment: "node",
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "package.json",
        "package-lock.json"
    ],
    collectCoverageFrom: [
        "routes/**/*.{js,jsx}",
        "middleware/**/*.{js,jsx}",


    ],
    collectCoverage: true,
    coverageReporters: ["json", "html","json", "lcov", "text"],
    transform: {
        "\\.js$": "<rootDir>/node_modules/babel-jest"
    }
};