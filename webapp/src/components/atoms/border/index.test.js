import React from "react";
import { render } from "test-utils";

import Border from ".";

test("Renders successfully", () => {
  expect(() => render(<Border />)).not.toThrow();
});

test("Renders children", () => {
  const { getByText } = render(<Border>children</Border>);
  const container = getByText(/children/i);
  expect(container).toBeInTheDocument();
});
