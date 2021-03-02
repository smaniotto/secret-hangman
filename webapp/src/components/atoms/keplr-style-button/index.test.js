import React from "react";
import { render } from "@testing-library/react";

import KeplrStyleButton from ".";

test("Renders successfully", () => {
  expect(() => render(<KeplrStyleButton />)).not.toThrow();
});

test("Renders children", () => {
  const { getByText } = render(<KeplrStyleButton>children</KeplrStyleButton>);
  const letterContainer = getByText(/children/i);
  expect(letterContainer).toBeInTheDocument();
});

test("Renders logo version", () => {
  const { container } = render(<KeplrStyleButton logo={true}>K</KeplrStyleButton>);
  expect(container.firstChild.classList.contains(/flashing/i)).toBe(false);
  expect(
    container.firstChild.firstChild.firstChild.firstChild.classList.contains(/childrenLogo/i)
  ).toBe(true);
});
