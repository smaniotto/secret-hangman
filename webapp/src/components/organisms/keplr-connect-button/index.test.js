import React from "react";
import { render } from "@testing-library/react";

import KeplrConnectButton from ".";

test("Render component successfully", () => {
  expect(() => render(<KeplrConnectButton />)).not.toThrow();
});
