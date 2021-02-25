import React from "react";

import Key from "../../atoms/key";

import styles from "./styles.module.scss";

const KeyboardRow = ({ letters = [], disabled = false, usedLetters = [] }) => {
  return (
    <ul className={styles.container}>
      {letters.map((letter, index) => {
        const usedLetter = usedLetters.filter((el) => el === letter).length > 0 ? true : false;
        return (
          <li key={index} className={styles.letter}>
            <Key disabled={disabled} letter={letter} used={usedLetter} />
          </li>
        );
      })}
    </ul>
  );
};

export default KeyboardRow;
