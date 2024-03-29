import React from "react";
import { storiesOf } from "@storybook/react";

import WordReveal from ".";

storiesOf("WordReveal", module)
  .add("Default", () => <WordReveal />)
  .add("Includes letters", () => <WordReveal letters={["q", "", "", "", "h", ""]} />);
