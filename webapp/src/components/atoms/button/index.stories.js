import React from "react";
import { storiesOf } from "@storybook/react";

import Button from ".";

storiesOf("Button", module)
  .add("Default", () => <Button>Click me!</Button>)
  .add("Disabled", () => <Button disabled={true}>Disabled Button</Button>);
