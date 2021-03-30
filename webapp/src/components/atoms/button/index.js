import React from "react";

import Border from "../border";

import styles from "./styles.module.scss";

const Button = (props) => {
  const { children, className, onClick, borderWidth = 2, disabled } = props;

  const disabledStyle = disabled ? styles.disabled : null;

  return (
    <Border borderWidth={borderWidth} className={`${styles.border} ${disabledStyle} ${className}`}>
      <button className={`${styles.button}`} onClick={onClick}>
        {children}
      </button>
    </Border>
  );
};

export default Button;
