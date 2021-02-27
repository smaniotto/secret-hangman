import React from "react";
import { render } from "@testing-library/react";

import KeplrButton from ".";

test("Render component successfully", () => {
  expect(() => render(<KeplrButton />)).not.toThrow();
});
