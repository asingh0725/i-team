import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "../Navigation";
import { AuthContext } from "../AuthContext";

describe("<NavBar />", () => {
  it("renders without crashing", () => {
    render(<NavBar />);
  });

  it("always contains the basic links (Home and About)", () => {
    const { getByText } = render(<NavBar />);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("About")).toBeInTheDocument();
  });

  it("renders additional links/buttons when user is logged in", () => {
    const user = { uid: "12345" };
    const { getByText } = render(
      <AuthContext.Provider value={{ user, isLoggedIn: true }}>
        <NavBar />
      </AuthContext.Provider>
    );

    expect(getByText("Create Post")).toBeInTheDocument();
    expect(getByText("Log Out")).toBeInTheDocument();
  });
});
