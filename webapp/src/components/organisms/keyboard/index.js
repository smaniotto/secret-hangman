import React from "react";

import KeyboardRow from "../../molecules/keyboard-row";

import styles from "./styles.module.scss";

function Keyboard() {
  return (
    <ul className={styles.container}>
      <KeyboardRow keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
      <KeyboardRow keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} />
      <KeyboardRow keys={["z", "x", "c", "v", "b", "n", "m"]} />
    </ul>
  );
}

export default Keyboard;
