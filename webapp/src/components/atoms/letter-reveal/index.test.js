import React from "react";
import { render } from "@testing-library/react";
import LetterReveal from ".";

test("Render component successfully", () => {
  const { getByText } = render(<LetterReveal />);
  const linkElement = getByText(/CKL Create React App Template is ready/i);
  expect(linkElement).toBeInTheDocument();
});
