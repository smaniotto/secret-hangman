import React from "react";

import Border from "../border";

import styles from "./styles.module.scss";

const Button = (props) => {
  const { children, className, onClick, borderWidth = 2 } = props;

  return (
    <>
      <button className={styles.button} onClick={onClick}>
        <Border borderWidth={borderWidth} className={`${styles.border} ${className}`}>
          {children}
        </Border>
      </button>
    </>
  );
};

export default Button;
