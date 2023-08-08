module.exports = {
  automock: false,
  setupFiles: ["<rootDir>/src/__mocks__/firebase.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/fileMock.js",
    "^@firebase/app$": "<rootDir>/src/__mocks__/firebase.js",
    "^@firebase/firestore$": "<rootDir>/src/__mocks__/firebase.js",
    "^@firebase/storage$": "<rootDir>/src/__mocks__/firebase.js",
    "^firebaseConfig$": "<rootDir>/src/__mocks__/firebaseConfig.js",
  },
  maxWorkers: 1,
};
