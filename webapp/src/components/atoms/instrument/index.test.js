import React from "react";
import { render } from "@testing-library/react";

import Instrument from ".";

test("Render component successfully", () => {
  expect(() => render(<Instrument />)).not.toThrow();
});
