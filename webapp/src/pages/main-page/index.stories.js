import React from "react";
import { storiesOf } from "@storybook/react";

import MainPage from ".";

storiesOf("MainPage", module)
  .add("Default", () => <MainPage />)
  .add("2 Mistakes", () => <MainPage mistakes={2} usedLetters={["q", "e"]} />)
  .add("2 Mistakes, 1 Accurate", () => (
    <MainPage mistakes={2} usedLetters={["q", "e", "a"]} letters={["", "", "a", "", "a"]} />
  ));
