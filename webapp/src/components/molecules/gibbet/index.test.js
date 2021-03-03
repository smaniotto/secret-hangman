import React from "react";
import { render } from "test-utils";

import Gibbet from ".";

test("Return no image and no mistakes as Default", () => {
  const { getByText, queryByAltText } = render(<Gibbet />);
  const textContainer = getByText(/0/i);
  expect(textContainer).toBeInTheDocument();
  const imageContainer = queryByAltText(/Hangman/i);
  expect(imageContainer).toBeNull();
});

test("Renders according to number of mistakes", () => {
  const { getByText, queryByAltText } = render(<Gibbet mistakes={4} />);
  const textContainer = getByText(/4/i);
  expect(textContainer).toBeInTheDocument();
  const imageContainer = queryByAltText(/4/i);
  expect(imageContainer).toBeInTheDocument();
});
