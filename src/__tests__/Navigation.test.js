import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { NavBarLoggedIn, NavBarNotLoggedIn } from "../Navigation";

describe("Navigation tests", () => {
  test("NavBarNotLoggedIn renders correctly", () => {
    render(
      <MemoryRouter>
        <NavBarNotLoggedIn />
      </MemoryRouter>
    );
    expect(screen.getByText("SHARE-A-BITE")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  test("NavBarLoggedIn renders correctly when user is logged in", () => {
    const userMock = { uid: "12345" };
    render(
      <AuthContext.Provider value={{ user: userMock }}>
        <MemoryRouter>
          <NavBarLoggedIn />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("SHARE-A-BITE")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Create Post")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });
});
