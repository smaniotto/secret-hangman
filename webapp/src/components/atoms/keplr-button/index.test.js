import React from "react";
import { render } from "@testing-library/react";

import KeplrButton from ".";

test("Renders successfully", () => {
  expect(() => render(<KeplrButton />)).not.toThrow();
});

test("Renders children", () => {
  const { getByText } = render(<KeplrButton>children</KeplrButton>);
  const letterContainer = getByText(/children/i);
  expect(letterContainer).toBeInTheDocument();
});

test("Renders logo version", () => {
  const { container } = render(<KeplrButton logo={true}>K</KeplrButton>);
  expect(container.firstChild.classList.contains(/flashingStyle/i)).toBe(false);
  expect(container.getByText(/K/i).classList.contains(/childrenLogo/i)).toBe(true);
});
