import React from "react";
import { render } from "@testing-library/react";

import YouLose from ".";

test("Renders successfully", () => {
  expect(() => render(<YouLose />)).not.toThrow();
});
