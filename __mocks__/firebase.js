// src/__mocks__/firebase.js
export const db = {
  collection: jest.fn(() => ({
    add: jest.fn(),
  })),
};

export const storage = {
  ref: jest.fn(() => ({
    child: jest.fn(() => ({
      put: jest.fn(() =>
        Promise.resolve({
          ref: {
            getDownloadURL: jest.fn(() => Promise.resolve("mockImageUrl")),
          },
        })
      ),
    })),
  })),
};
