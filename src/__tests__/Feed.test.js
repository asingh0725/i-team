import React from "react";
import { render, act } from "@testing-library/react";
import { collection, getDocs } from "firebase/firestore";
import Feed from "../Feed";

// Import the mock from firebaseMock.js
jest.doMock("../../__mocks__/firebaseMock");

describe("Feed tests", () => {
  test("renders Feed component without crashing", async () => {
    // Mock firestore collection and getDocs functions
    const mockCollection = collection;
    const mockGetDocs = getDocs;

    // Render the Feed component
    await act(async () => {
      render(<Feed />);
    });
  });
});
