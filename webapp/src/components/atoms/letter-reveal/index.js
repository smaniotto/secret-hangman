import React from "react";

import styles from "./styles.module.scss";

import placeholder from "./placeholder.svg";

const LetterReveal = ({ letter = "" }) => {
  return (
    <div className={styles.container}>
      <p className={styles.letter}>{letter}</p>
      <img src={placeholder} alt="Letter Reveal Placeholder" className={styles.placeholder} />
    </div>
  );
};

export default LetterReveal;
