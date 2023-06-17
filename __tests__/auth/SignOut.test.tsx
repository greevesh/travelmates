import { render, screen } from "@testing-library/react";
import SignOutBtn from "../../src/app/components/Header/SignOutBtn";

test("renders sign-out button", () => {
  render(<SignOutBtn />);
  const buttonElement = screen.getByRole("button", { name: /sign out/i });
  expect(buttonElement).toBeInTheDocument();
});
