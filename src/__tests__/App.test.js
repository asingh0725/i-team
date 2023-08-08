import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import App from "../App";
import { AuthContext } from "../AuthContext";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("redirects unauthenticated users from /create-post to /login", () => {
    let testHistory;
    render(
      <MemoryRouter initialEntries={["/create-post"]}>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <App />
          <Route
            path="*"
            render={(props) => {
              testHistory = props.history;
              return null;
            }}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(testHistory.location.pathname).toBe("/login");
  });

  it("allows authenticated users to access /feed", () => {
    let testHistory;
    render(
      <MemoryRouter initialEntries={["/feed"]}>
        <AuthContext.Provider value={{ isLoggedIn: true }}>
          <App />
          <Route
            path="*"
            render={(props) => {
              testHistory = props.history;
              return null;
            }}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(testHistory.location.pathname).toBe("/feed");
  });
});
