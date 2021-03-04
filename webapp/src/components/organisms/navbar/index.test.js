import React from "react";
import { render } from "test-utils";

import Navbar from ".";

test("Render component successfully", () => {
  expect(() => render(<Navbar />)).not.toThrow();
});
