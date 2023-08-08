import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("<Footer />", () => {
  it("renders without crashing", () => {
    render(<Footer />);
  });

  it("contains the correct copyright notice", () => {
    const { getByText } = render(<Footer />);
    expect(
      getByText("© 2023 Share-A-Bite All Rights Reserved.")
    ).toBeInTheDocument();
  });
});
