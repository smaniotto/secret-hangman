import React from "react";
import { render } from "@testing-library/react";

import GameEnd from ".";

test("Renders successfully", () => {
  expect(() => render(<GameEnd />)).not.toThrow();
});

test("Renders correct result", () => {
  const { getByText } = render(<GameEnd result={"win"} />);
  const winContainer = getByText(/win/i);
  expect(winContainer).toBeInTheDocument();
});
