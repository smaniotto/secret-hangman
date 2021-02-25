import React from "react";
import { storiesOf } from "@storybook/react";

import Key from ".";

storiesOf("Key", module)
  .add("Default", () => <Key />)
  .add("Letter A", () => <Key letter="a" />)
  .add("Letter B Used", () => <Key letter="b" used={true} />);
