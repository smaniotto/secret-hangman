import React from "react";
import { render } from "@testing-library/react";

import MainPage from ".";

test("Render component successfully", () => {
  expect(() => render(<MainPage />)).not.toThrow();
});

test("Render reveal letters", () => {
  const { getAllByText } = render(<MainPage letters={["z", "", "z"]} />);
  const zLetterContainers = getAllByText("z");
  expect(zLetterContainers.length).toBe(3);
});

test("Renders mistakes", () => {
  const { getByText } = render(<MainPage mistakes={3} />);
  const textContainer = getByText(/3/i);
  expect(textContainer).toBeInTheDocument();
});

test("Renders used letters", () => {
  const { getByText, getByAltText } = render(<MainPage letters={["g"]} usedLetters={["g"]} />);
  const letterContainer = getByText(/y/i);
  expect(letterContainer).toBeInTheDocument();
  const usedMask = getByAltText("Used key");
  expect(usedMask).toBeInTheDocument();
});
