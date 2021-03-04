import React from "react";
import { render } from "test-utils";

import Mistakes from ".";

test("Render 0 as default", () => {
  const { getByText } = render(<Mistakes />);
  const numberContainer = getByText(/0/i);
  expect(numberContainer).toBeInTheDocument();
});

test("Render component according to number of mistakes", () => {
  const { getByText } = render(<Mistakes mistakes={3} />);
  const textElement = getByText(/3/i);
  expect(textElement).toBeInTheDocument();
});
