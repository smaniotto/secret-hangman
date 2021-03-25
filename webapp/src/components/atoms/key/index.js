import React from "react";

import keyUsed from "./key-used.svg";
import Button from "../button";

import styles from "./styles.module.scss";

const Key = ({ letter, disabled = false, used = false, onClick }) => {
  const containerStyle =
    disabled || used ? `${styles.container} ${styles.disabledContainer}` : styles.container;

  return (
    <Button className={containerStyle} onClick={onClick}>
      {used && <img src={keyUsed} alt="Used key" className={styles.used} />}
      <p className={styles.text}>{letter}</p>
    </Button>
  );
};

export default Key;
