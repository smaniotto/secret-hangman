import React from "react";

import styles from "./styles.module.scss";

import keyBorder from "./key-border.svg";
import keyUsed from "./key-used.svg";

const Key = ({ letter, disabled = false, used }) => {
  const disabledContainer = `${styles.disabled} ${styles.container}`;
  const style = !disabled ? styles.container : disabledContainer;

  return (
    <div
      className={style}
      onClick={(e) => {
        console.log(`Letter ${e.currentTarget.innerText} has been clicked.`);
      }}
    >
      {used && <img src={keyUsed} alt="Used key" className={styles.used} />}
      <img src={keyBorder} alt="Key" className={styles.border} />
      <p className={styles.text}>{letter}</p>
    </div>
  );
};

export default Key;
