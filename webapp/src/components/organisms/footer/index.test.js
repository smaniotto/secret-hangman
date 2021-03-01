import React from "react";
import { render } from "@testing-library/react";

import Footer from ".";

test("Render component successfully", () => {
  expect(() => render(<Footer />)).not.toThrow();
});
