import React from "react";
import { storiesOf } from "@storybook/react";

import Mistakes from ".";

storiesOf("Mistakes", module)
  .add("Default", () => <Mistakes />)
  .add("1 Mistake", () => <Mistakes mistakes={1} />)
  .add("3 Mistakes", () => <Mistakes mistakes={3} />)
  .add("6 Mistakes", () => <Mistakes mistakes={6} />);
