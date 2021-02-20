import React from "react";

import styles from "./styles.module.scss";

import keyBorder from "./key-border.svg";
import keyUsed from "./key-used.svg";

const Key = ({ letter, used = false, disabled = false }) => {
  const handleClick = (e) => {
    !disabled && console.log(e.target.element);
  };

  const disabledContainer = `${styles.disabled} ${styles.container}`;
  const style = !disabled ? styles.container : disabledContainer;

  return (
    <div className={style} onClick={handleClick}>
      {used && <img src={keyUsed} alt="Used key" className={styles.used} />}
      <img src={keyBorder} alt="Key" className={styles.border} />
      <p className={styles.text}>{letter}</p>
    </div>
  );
};

export default Key;
