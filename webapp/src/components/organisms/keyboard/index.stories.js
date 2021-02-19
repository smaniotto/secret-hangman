import React from "react";
import { storiesOf } from "@storybook/react";

import Keyboard from "./index";

storiesOf("Keyboard", module)
  .add("Default", () => <Keyboard />)
  .add("Disabled", () => <Keyboard disabled={true} />);
