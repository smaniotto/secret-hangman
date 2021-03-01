import React from "react";
import { render } from "@testing-library/react";

import FlashingButton from ".";

test("Renders successfully", () => {
  expect(() => render(<FlashingButton />)).not.toThrow();
});

test("Renders children", () => {
  const { getByText } = render(<FlashingButton>children</FlashingButton>);
  const letterContainer = getByText(/children/i);
  expect(letterContainer).toBeInTheDocument();
});
