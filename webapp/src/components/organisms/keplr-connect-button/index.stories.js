import React from "react";
import { storiesOf } from "@storybook/react";
import decorators from "@storybook/addon-toolbars";

import KeplrConnectButton from ".";

storiesOf("KeplrConnectButton", module).add("Default", () => (
  <KeplrConnectButton decorators={decorators} />
));
