import React from "react";

import Key from "../../atoms/key";

import styles from "./styles.module.scss";

const KeyboardRow = ({ letters = [], disabled = false }) => {
  return (
    <ul className={styles.container}>
      {letters.map((letter, index) => {
        return (
          <li key={index} className={styles.letter}>
            <Key disabled={disabled} letter={letter} />
          </li>
        );
      })}
    </ul>
  );
};

export default KeyboardRow;
