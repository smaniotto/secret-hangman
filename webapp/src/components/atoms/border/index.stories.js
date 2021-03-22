import React from "react";
import { storiesOf } from "@storybook/react";

import Border from ".";

storiesOf("Border", module)
  .add("Key", () => (
    <div style={{ width: "45px", height: "45px", color: "white" }}>
      <Border borderWidth={2}>
        <div style={{ fontSize: "2.4rem" }}>K</div>
      </Border>
    </div>
  ))
  .add("Popup", () => (
    <div style={{ width: "200px", height: "200px", color: "white" }}>
      <Border borderWidth={5}>
        <div style={{ fontSize: "1rem" }}>This is a Popup Example</div>
      </Border>
    </div>
  ));
