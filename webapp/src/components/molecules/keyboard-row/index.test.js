import React from "react";
import { render } from "@testing-library/react";
import KeyboardRow from ".";

test("should render ordered array of letters", () => {
  const { getByText } = render(<KeyboardRow letters={["a", "b", "c"]} />);
  const firstListElement = getByText(/a/i);
  const secondListElement = getByText(/b/i);
  const thirdListElement = getByText(/c/i);
  expect(firstListElement).toBeInTheDocument();
  expect(secondListElement).toBeInTheDocument();
  expect(thirdListElement).toBeInTheDocument();
});
