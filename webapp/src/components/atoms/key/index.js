import React from "react";

import keyUsed from "./key-used.svg";
import Button from "../button";

import styles from "./styles.module.scss";

const Key = ({ letter, disabled = false, used, onClick }) => {
  const disabledStyle = (disabled || used) && {
    backgroundColor: "transparent",
    color: "#fff",
    cursor: "default",
  };

  return (
    <Button
      className={styles.container}
      onClick={onClick}
      borderWidth={2}
      height={50}
      width={50}
      style={disabledStyle}
    >
      {used && <img src={keyUsed} alt="Used key" className={styles.used} />}

      <p className={styles.text}>{letter}</p>
    </Button>
  );
};

export default Key;
