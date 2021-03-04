import React from "react";
import { render } from "test-utils";

import Footer from ".";

test("Render component successfully", () => {
  expect(() => render(<Footer />)).not.toThrow();
});
