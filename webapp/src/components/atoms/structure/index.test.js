import React from "react";
import { render } from "@testing-library/react";
import Structure from ".";

test("Render component successfully", () => {
  expect(() => render(<Structure />)).not.toThrow();
});
