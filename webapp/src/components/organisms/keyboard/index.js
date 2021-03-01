import React from "react";

import KeyboardRow from "../../molecules/keyboard-row";

import styles from "./styles.module.scss";

const Keyboard = ({ disabled = false, usedLetters, onClick }) => {
  return (
    <ul className={styles.container}>
      <KeyboardRow
        disabled={disabled}
        letters={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]}
        usedLetters={usedLetters}
        onClick={onClick}
      />
      <KeyboardRow
        disabled={disabled}
        letters={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        usedLetters={usedLetters}
        onClick={onClick}
      />
      <KeyboardRow
        disabled={disabled}
        letters={["z", "x", "c", "v", "b", "n", "m"]}
        usedLetters={usedLetters}
        onClick={onClick}
      />
    </ul>
  );
};

export default Keyboard;
