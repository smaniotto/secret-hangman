import React from "react";
import { storiesOf } from "@storybook/react";

import Popup from ".";

storiesOf("Popup", module)
  .add("Default", () => (
    <Popup>
      <div>
        <h2 style={{ color: "red" }}>Watch out</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eum maiores odit, fugit
          natus repellat odio tempore sit?
        </p>
      </div>
    </Popup>
  ))
  .add("Centered Content", () => (
    <Popup>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "green" }}>You Win!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eum maiores odit, fugit
          natus repellat odio tempore sit? Doloribus sint totam voluptatem quidem facilis cumque
          consectetur cum quasi ab voluptate!
        </p>
      </div>
    </Popup>
  ))
  .add("Small", () => (
    <Popup size={"small"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "lightblue" }}>Reminder</h2>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
      </div>
    </Popup>
  ));
