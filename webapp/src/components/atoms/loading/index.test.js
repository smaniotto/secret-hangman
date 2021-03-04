import React from "react";
import { render } from "@testing-library/react";

import Loading from ".";

test("Renders successfully", () => {
  expect(() => render(<Loading />)).not.toThrow();
});
