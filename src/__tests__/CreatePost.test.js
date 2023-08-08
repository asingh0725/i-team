import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CreatePost from "../CreatePost";
import { AuthContext } from "../AuthContext";

// Mocking Firebase and other external functionalities
jest.mock("../firebase", () => ({
  // Mock the required Firebase functionalities
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

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<CreatePost />", () => {
  it("renders without crashing", () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <CreatePost />
      </AuthContext.Provider>
    );
  });

  it("handles image upload", async () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <CreatePost />
      </AuthContext.Provider>
    );

    const uploadButton = getByText("Upload now");
    fireEvent.click(uploadButton);

    // Since Firebase storage is mocked, we're not testing the real storage functionality here.
  });

  it("handles post button click with missing fields", () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <CreatePost />
      </AuthContext.Provider>
    );

    const postButton = getByText("Post");
    fireEvent.click(postButton);
  });
});
