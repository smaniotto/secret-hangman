import React from "react";
import { storiesOf } from "@storybook/react";

import Gibbet from ".";

storiesOf("Gibbet", module)
  .add("Default", () => <Gibbet />)
  .add("Mistakes", () => <Gibbet mistakes={3} />);
