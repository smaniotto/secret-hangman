import React from "react";
import { storiesOf } from "@storybook/react";

import Popup from ".";

storiesOf("Popup", module)
  .add("Alert", () => (
    <Popup width={150}>
      <div>
        <h2 style={{ color: "red" }}>Watch out</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eum maiores odit, fugit
          natus repellat odio tempore sit?
        </p>
      </div>
    </Popup>
  ))
  .add("Win", () => (
    <Popup width={400}>
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
  .add("Dramatic Alert", () => (
    <Popup width={600} borderWidth={10}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "red" }}>ATTENTION</h1>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eum maiores odit, fugit
          natus repellat odio tempore sit? Doloribus sint totam voluptatem quidem facilis cumque
          consectetur cum quasi ab voluptate!
        </h3>
      </div>
    </Popup>
  ));
