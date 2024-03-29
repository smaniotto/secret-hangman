import React from "react";
import { storiesOf } from "@storybook/react";

import LetterReveal from ".";

storiesOf("LetterReveal", module)
  .add("Default", () => <LetterReveal />)
  .add("Includes Letter", () => <LetterReveal letter="a" />);
