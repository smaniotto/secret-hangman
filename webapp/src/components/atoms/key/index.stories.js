import React from "react";
import { storiesOf } from "@storybook/react";

import Key from ".";

storiesOf("Key", module)
  .add("Default", () => <Key letter={"k"} />)
  .add("Used", () => <Key letter={"m"} used={true} />)
  .add("Disabled", () => <Key letter={"n"} disabled={true} />);
