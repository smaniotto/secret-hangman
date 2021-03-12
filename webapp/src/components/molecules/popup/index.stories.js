import React from "react";
import { storiesOf } from "@storybook/react";

import Popup from ".";

storiesOf("Popup", module)
  .add("Alert", () => (
    <Popup>
      <div>
        <h2 style={{ color: "red" }}>Danger</h2>
        <p>You have only ONE more mistake left!</p>
      </div>
    </Popup>
  ))
  .add("Win", () => (
    <Popup borderWidth={"1.2rem"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
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
  ));
