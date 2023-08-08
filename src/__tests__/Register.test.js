import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

describe("<Register />", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  });

  it("renders without crashing", () => {
    screen.getByText(/Email Address:/i);
    screen.getByText(/Password:/i);
  });

  it("updates the email and password fields", () => {
    const emailInput = screen.getByLabelText(/Email Address:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(emailInput, { target: { value: "test@uw.edu" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@uw.edu");
    expect(passwordInput.value).toBe("password123");
  });

  it('shows an alert if email does not end with "@uw.edu"', () => {
    const emailInput = screen.getByLabelText(/Email Address:/i);
    const registerButton = screen.getByText(/Register/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    window.alert = jest.fn();
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Please use a valid @uw.edu email address."
    );
  });
});
