import React from "react";
import { render } from "@testing-library/react";

import Person from ".";

test("Render null as default", () => {
  const { queryByAltText } = render(<Person />);
  const image = queryByAltText(/Hangman/i);
  expect(image).toBeNull();
});

test("Render component according to number of mistakes", () => {
  const { queryByAltText } = render(<Person mistakes={3} />);
  const image3 = queryByAltText("Hangman 3 mistakes");
  expect(image3).toBeInTheDocument();
});
