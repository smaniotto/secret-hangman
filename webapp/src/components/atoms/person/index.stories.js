import React from "react";
import { storiesOf } from "@storybook/react";

import Person from ".";

storiesOf("Person", module)
  .add("Default", () => <Person />)
  .add("1 Mistake", () => <Person mistakes={1} />)
  .add("2 Mistakes", () => <Person mistakes={2} />)
  .add("3 Mistakes", () => <Person mistakes={3} />)
  .add("4 Mistakes", () => <Person mistakes={4} />)
  .add("5 Mistakes", () => <Person mistakes={5} />)
  .add("6 Mistakes", () => <Person mistakes={6} />);
