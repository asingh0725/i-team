import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../About";

describe("<About />", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("renders without crashing", () => {
    screen.getByText(/About Us/i);
  });

  it('displays the "Why Share-A-Bite?" section', () => {
    screen.getByText(/Why Share-A-Bite\?/i);
    screen.getByText(
      /Share-A-Bite is a platform that enables clubs and organizations to share information about their surplus food with hungry students at the University of Washington Seattle./i
    );
  });

  it('displays the "How do I use it?" section', () => {
    screen.getByText(/How do I use it\?/i);
    screen.getByText(/Log in using your UW netID/i);
    screen.getByText(
      /After logging in with your UW netID, you will gain access to Share-A-Bite's feed, which is filled with posts about available food options/i
    );
    screen.getByText(
      /To create a post, simply click on the "create post" button and provide all the necessary information as prompted/i
    );
    screen.getByText(/All posts get deleted after 24hrs/i);
  });
});
