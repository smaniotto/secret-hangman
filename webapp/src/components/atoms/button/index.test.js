import React from "react";
import { render } from "@testing-library/react";

import Button from ".";

test("Renders successfully", () => {
  expect(() => render(<Button />)).not.toThrow();
});

test("Renders children", () => {
  const { getByText } = render(<Button>children</Button>);
  const container = getByText(/children/i);
  expect(container).toBeInTheDocument();
});
