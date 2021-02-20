import React from "react";
import { storiesOf } from "@storybook/react";

import WordReveal from "./index";

storiesOf("WordReveal", module)
  .add("Default", () => <WordReveal letters={Array(6)} />)
  .add("Default", () => <WordReveal letters={["q", "", "", "", "h", ""]} />);
