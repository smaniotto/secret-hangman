import React from "react";
import { render } from "@testing-library/react";

import Popup from ".";

test("Renders successfully", () => {
  expect(() => render(<Popup />)).not.toThrow();
});
