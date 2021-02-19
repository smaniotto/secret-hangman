import React from "react";

import styles from "./styles.module.scss";

import keyBorder from "./key-border.svg";

function Key({ letter = "a" }) {
  return (
    <div className={styles.container}>
      <img src={keyBorder} alt="Key" className={styles.border} />
      <p className={styles.text}>{letter}</p>
    </div>
  );
}

export default Key;
