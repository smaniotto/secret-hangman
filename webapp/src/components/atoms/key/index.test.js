import React from "react";
import { render } from "@testing-library/react";
import Key from ".";

test("Renders the correct letter", () => {
  const { getByText, queryByAltText } = render(<Key letter="b" />);
  const letterContainer = getByText(/b/i);
  expect(letterContainer).toBeInTheDocument();
  const usedMask = queryByAltText("Used key");
  expect(usedMask).toBeNull();
});

test("Renders used state and letter", () => {
  const { getByText, getByAltText } = render(<Key letter="c" used={true} />);
  const letterContainer = getByText(/c/i);
  expect(letterContainer).toBeInTheDocument();
  const usedMask = getByAltText("Used key");
  expect(usedMask).toBeInTheDocument();
});
