import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreatePost from "../CreatePost";
import { AuthContext } from "../AuthContext";

// Mock global alert
global.alert = jest.fn();

jest.mock("../firebase", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(),
    })),
  },
  storage: {
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
  },
}));

const mockUser = {
  uid: "testUID",
};

describe("<CreatePost />", () => {
  it("renders without crashing", () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <CreatePost />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });
});
