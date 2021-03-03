import React from "react";
import { render } from "@testing-library/react";

import MainPage from ".";

test("Render component successfully", () => {
  expect(() => render(<MainPage />)).not.toThrow();
});
