import React from "react";
import { storiesOf } from "@storybook/react";

import KeplrButton from ".";

storiesOf("Default", module)
  .add("Default", () => <KeplrButton>Connect to Keplr</KeplrButton>)
  .add("Logo", () => <KeplrButton logo={true}>K</KeplrButton>)
  .add("Logo Online", () => (
    <KeplrButton logo={true} online={true}>
      K
    </KeplrButton>
  ));
