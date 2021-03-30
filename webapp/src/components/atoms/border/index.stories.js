import React from "react";
import { storiesOf } from "@storybook/react";

import Border from ".";

storiesOf("Border", module)
  .add("Default", () => (
    <Border>
      <p
        style={{
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          color: "#fff",
          width: "500px",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tenetur aspernatur maxime
        odio ratione, veniam dolore suscipit numquam soluta veritatis! Dignissimos quibusdam
        deleniti nemo sunt delectus, voluptate quod fugit dicta!
      </p>
    </Border>
  ))
  .add("Popup", () => (
    <Border>
      <div style={{ fontSize: "1rem", width: "100px", padding: "20px" }}>This is a Popup!</div>
    </Border>
  ));
