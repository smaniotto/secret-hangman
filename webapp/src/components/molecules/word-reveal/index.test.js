import React from "react";
import { render } from "@testing-library/react";

import WordReveal from ".";

test("component should render list of letters", () => {
  const { getByText } = render(<WordReveal letters={["a", "b", "c"]} />);
  const firstLetterContainer = getByText(/a/i);
  const secondLetterContainer = getByText(/b/i);
  const thirdLetterContainer = getByText(/c/i);
  expect(firstLetterContainer).toBeInTheDocument();
  expect(secondLetterContainer).toBeInTheDocument();
  expect(thirdLetterContainer).toBeInTheDocument();
});
