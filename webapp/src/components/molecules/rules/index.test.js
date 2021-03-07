import React from "react";
import { render } from "@testing-library/react";

import Rules from ".";

test("Renders successfully", () => {
  expect(() => render(<Rules />)).not.toThrow();
});
