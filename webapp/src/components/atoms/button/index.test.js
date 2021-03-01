import React from "react";
import { render } from "@testing-library/react";

import Button from ".";

test("Renders successfully", () => {
  expect(() => render(<Button />)).not.toThrow();
});

test("Renders children", () => {
  const { getByText, getByAltText } = render(<Button>children</Button>);
  const letterContainer = getByText(/children/i);
  expect(letterContainer).toBeInTheDocument();
});
