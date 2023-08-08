import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "../App";
import { auth } from "../firebase";

jest.mock("../firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => {
      // Using setTimeout to simulate asynchronous behavior
      setTimeout(() => callback(null), 0);
      // Mimic the unsubscribe behavior
      return jest.fn();
    }),
  },
  db: {
    collection: jest.fn(),
  },
}));

describe("App tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders App without crashing", async () => {
    auth.onAuthStateChanged.mockImplementationOnce((callback) => {
      setTimeout(() => callback(null), 0);
      return jest.fn(); // return mock unsubscribe
    });

    await act(async () => {
      render(<App />);
      // Adding a delay to ensure the async operation inside onAuthStateChanged completes
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText("SHARE-A-BITE")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    // If you expect "Next" to be present, uncomment the next line
    // expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("renders correctly when user is logged in", async () => {
    const mockUser = { uid: "sampleUid" };
    auth.onAuthStateChanged.mockImplementationOnce((callback) => {
      setTimeout(() => callback(mockUser), 0);
      return jest.fn(); // return mock unsubscribe
    });

    await act(async () => {
      render(<App />);
      // Adding a delay to ensure the async operation inside onAuthStateChanged completes
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText("SHARE-A-BITE")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    //expect(screen.getByText("Create Post")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
