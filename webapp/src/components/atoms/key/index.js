import React from "react";

import styles from "./styles.module.scss";

import keyBorder from "./key-border.svg";
import keyUsed from "./key-used.svg";

function Key({ letter = "a", used = false }) {
  return (
    <div className={styles.container}>
      {used && <img src={keyUsed} alt="Used key" className={styles.used} />}
      <img src={keyBorder} alt="Key" className={styles.border} />
      <p className={styles.text}>{letter}</p>
    </div>
  );
}

export default Key;
