import React from "react";

import KeyboardRow from "../../molecules/keyboard-row";

import styles from "./styles.module.scss";

function Keyboard({ disabled = false }) {
  return (
    <ul className={styles.container}>
      <KeyboardRow disabled={disabled} keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
      <KeyboardRow disabled={disabled} keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} />
      <KeyboardRow disabled={disabled} keys={["z", "x", "c", "v", "b", "n", "m"]} />
    </ul>
  );
}

export default Keyboard;
