import React from "react";
import { storiesOf } from "@storybook/react";

import Button from ".";

storiesOf("Button", module)
  .add("Default", () => <Button />)
  .add("Add Green Button", () => <Button style={{ backgroundColor: green }}>Add</Button>);
