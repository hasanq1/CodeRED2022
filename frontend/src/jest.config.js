module.exports = {
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "verbose": true,
    "transform": { "^.+\\.js?$": "babel-jest" },
    "coverageThreshold": {
        "global": {
            "branches": 78,
            "functions": 90,
            "lines": 90,
            "statements": 90
        }
    },
    "setupFiles": ["<rootDir>/setupTests"],
    "moduleNameMapper": {
        "^src/(.*)": "<rootDir>/src/$1",
    },
    "modulePaths": [
        "<rootDir>"
    ]
}