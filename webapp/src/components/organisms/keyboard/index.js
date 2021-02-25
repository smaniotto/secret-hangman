import React from "react";

import KeyboardRow from "../../molecules/keyboard-row";

import styles from "./styles.module.scss";

const Keyboard = ({ disabled = false, usedLetters }) => {
  return (
    <ul className={styles.container}>
      <KeyboardRow
        disabled={disabled}
        letters={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]}
        usedLetters={usedLetters}
      />
      <KeyboardRow
        disabled={disabled}
        letters={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        usedLetters={usedLetters}
      />
      <KeyboardRow
        disabled={disabled}
        letters={["z", "x", "c", "v", "b", "n", "m"]}
        usedLetters={usedLetters}
      />
    </ul>
  );
};

export default Keyboard;
