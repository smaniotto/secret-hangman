import React from "react";

import Key from "../../atoms/key";

import styles from "./styles.module.scss";

const KeyboardRow = ({ letters = [], disabled = false, usedLetters = [], onClick }) => {
  return (
    <ul className={styles.container}>
      {letters.map((letter, index) => {
        const onClickWrapper = () => {
          onClick(letter);
        };
        const isUsed = usedLetters.includes(letter);
        return (
          <li key={index} className={styles.letter}>
            <Key disabled={disabled} letter={letter} used={isUsed} onClick={onClickWrapper} />
          </li>
        );
      })}
    </ul>
  );
};

export default KeyboardRow;
