import React from "react";

import LetterReveal from "../../atoms/letter-reveal";

import styles from "./styles.module.scss";

const WordReveal = ({ letters = Array(6) }) => {
  return (
    <ul className={styles.container}>
      {letters.map((letter, index) => {
        return (
          <li key={index} className={styles.letter}>
            <LetterReveal letter={letter} />
          </li>
        );
      })}
    </ul>
  );
};

export default WordReveal;
