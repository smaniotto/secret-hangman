import React from "react";
import { render } from "@testing-library/react";
import LetterReveal from ".";

test("component should render letter", () => {
  const { getByText } = render(<LetterReveal letter="a" />);
  const letterContainer = getByText(/a/i);
  expect(letterContainer).toBeInTheDocument();
});
