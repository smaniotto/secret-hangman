import React from "react";
import { render } from "@testing-library/react";

import Keyboard from ".";

test("Render component successfully", () => {
  expect(() => render(<Keyboard />)).not.toThrow();
});
