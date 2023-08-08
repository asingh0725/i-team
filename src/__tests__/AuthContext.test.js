import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "../AuthContext";

describe("<AuthProvider />", () => {
  it("renders without crashing", () => {
    render(<AuthProvider />);
  });
});
