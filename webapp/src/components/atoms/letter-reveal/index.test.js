import React from "react";
import { render } from "test-utils";

import LetterReveal from ".";

test("component should render letter", () => {
  const { getByText } = render(<LetterReveal letter="a" />);
  const letterContainer = getByText(/a/i);
  expect(letterContainer).toBeInTheDocument();
});
