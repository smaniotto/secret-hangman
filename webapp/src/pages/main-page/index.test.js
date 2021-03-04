import React from "react";
import { render } from "test-utils";

import MainPage from ".";

test("Render component successfully", () => {
  expect(() => render(<MainPage />)).not.toThrow();
});
