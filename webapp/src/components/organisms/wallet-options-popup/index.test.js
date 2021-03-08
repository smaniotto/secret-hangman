import React from "react";
import { render } from "test-utils";

import WalletOptionsPopUp from ".";

test("Render component successfully", () => {
  expect(() => render(<WalletOptionsPopUp />)).not.toThrow();
});
