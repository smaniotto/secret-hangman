import React from "react";
import { storiesOf } from "@storybook/react";

import Border from ".";

storiesOf("Border", module)
  .add("Default", () => (
    <Border>
      <div
        style={{
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          color: "#fff",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tenetur aspernatur maxime
        odio ratione, veniam dolore suscipit numquam soluta veritatis! Dignissimos quibusdam
        deleniti nemo sunt delectus, voluptate quod fugit dicta!
      </div>
    </Border>
  ))
  .add("Popup", () => (
    <div style={{ width: "200px", height: "200px", color: "#fff" }}>
      <Border>
        <div style={{ fontSize: "1rem" }}>This is a Popup!</div>
      </Border>
    </div>
  ));
