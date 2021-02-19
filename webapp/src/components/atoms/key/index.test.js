import React from "react";
import { render } from "@testing-library/react";
import Key from ".";

test("Render component successfully", () => {
  const { getByText } = render(<Key />);
  const linkElement = getByText(/CKL Create React App Template is ready/i);
  expect(linkElement).toBeInTheDocument();
});
