import React from "react";

import keyUsed from "./key-used.svg";
import Button from "../button";

import styles from "./styles.module.scss";

const Key = ({ letter, disabled = false, used, onClick }) => {
  const disabledContainer =
    disabled || used ? `${styles.container} ${styles.disabled}` : styles.container;

  return (
    <Button
      className={disabledContainer}
      onClick={onClick}
      borderWidth={"20px"}
      paddingInPixels={[0, 7]}
    >
      {used && <img src={keyUsed} alt="Used key" className={styles.used} />}

      <p className={styles.text}>{letter}</p>
    </Button>
  );
};

export default Key;
