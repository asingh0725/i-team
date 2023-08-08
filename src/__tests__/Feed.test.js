import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import Feed from "../Feed";
import { AuthContext } from "../AuthContext";

// Mocking Firebase and other external functionalities
jest.mock("./firebase", () => ({
  db: {
    collection: () => ({
      getDocs: async () => ({
        docs: [
          {
            data: () => ({
              location: "Test Location",
              imageArray: ["test1.jpg", "test2.jpg"],
              caption: "Test Caption",
              uid: "testUID",
            }),
          },
          {
            data: () => ({
              location: "Test Location 2",
              imageArray: ["test3.jpg"],
              caption: "Test Caption 2",
              uid: "testUID2",
            }),
          },
        ],
      }),
    }),
    doc: () => ({
      getDoc: async () => ({
        exists: true,
        data: () => ({
          profileImage: "testProfile.jpg",
        }),
      }),
    }),
  },
}));

const mockDataLoaded = {
  navBar: true,
  feed: true,
};

describe("<Feed />", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ dataLoaded: mockDataLoaded }}>
          <Feed />
        </AuthContext.Provider>
      );
    });
  });

  it("renders posts correctly", async () => {
    const { findByText } = render(
      <AuthContext.Provider value={{ dataLoaded: mockDataLoaded }}>
        <Feed />
      </AuthContext.Provider>
    );

    const location = await findByText("Test Location");
    const caption = await findByText("Test Caption");

    expect(location).toBeInTheDocument();
    expect(caption).toBeInTheDocument();
  });

  it("handles pagination", async () => {
    const { findByText } = render(
      <AuthContext.Provider value={{ dataLoaded: mockDataLoaded }}>
        <Feed />
      </AuthContext.Provider>
    );

    const nextButton = await findByText("Next");
    fireEvent.click(nextButton);
  });
});
