import React from "react";
import { storiesOf } from "@storybook/react";

import KeplrStyleButton from ".";

storiesOf("Default", module)
  .add("Default", () => <KeplrStyleButton>Connect to Keplr</KeplrStyleButton>)
  .add("Logo", () => <KeplrStyleButton logo={true}>K</KeplrStyleButton>);
