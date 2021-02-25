import React from "react";
import { storiesOf } from "@storybook/react";

import KeyboardRow from ".";

storiesOf("KeyboardRow", module)
  .add("Default", () => <KeyboardRow />)
  .add("Letters", () => <KeyboardRow letters={["a", "b", "c"]} />)
  .add("Used Letter", () => <KeyboardRow letters={["d", "e", "f"]} usedLetters={["d"]} />);
