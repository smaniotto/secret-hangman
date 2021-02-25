import React from "react";
import { render } from "@testing-library/react";

import Navbar from ".";

test("Render component successfully", () => {
  expect(() => render(<Navbar />)).not.toThrow();
});
