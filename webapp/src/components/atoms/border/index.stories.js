import React from "react";
import { storiesOf } from "@storybook/react";

import Border from ".";

storiesOf("Border", module)
  .add("Key", () => (
    <Border width={"40px"} height={"40px"}>
      <div style={{ fontSize: "2.4rem" }}>K</div>
    </Border>
  ))
  .add("Popup", () => (
    <Border width={"200px"} height={"200px"}>
      <div style={{ fontSize: "1rem" }}>This is a Popup Example</div>
    </Border>
  ));
