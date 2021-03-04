import React from "react";
import { storiesOf } from "@storybook/react";

import GameEnd from ".";

storiesOf("GameEnd", module)
  .add("Win", () => <GameEnd result={"win"} />)
  .add("Lose", () => <GameEnd result={"lose"} />);
