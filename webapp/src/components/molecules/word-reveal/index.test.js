import React from "react";
import { render } from "@testing-library/react";
import WordReveal from ".";

test("Render component successfully", () => {
  const { getByText } = render(<WordReveal />);
  const linkElement = getByText(/CKL Create React App Template is ready/i);
  expect(linkElement).toBeInTheDocument();
});
