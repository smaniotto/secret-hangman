import React from "react";
import { render } from "test-utils";

import KeplrConnectButton from ".";

test("Render component successfully", () => {
  expect(() => render(<KeplrConnectButton />)).not.toThrow();
});
