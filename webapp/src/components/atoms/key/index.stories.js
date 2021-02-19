import React from "react";
import { storiesOf } from "@storybook/react";

import Key from "./index";

storiesOf("Key", module)
  .add("Default", () => <Key />)
  .add("Used", () => <Key used={true} />);
