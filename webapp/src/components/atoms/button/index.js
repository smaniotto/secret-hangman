import React from "react";

import Border from "../border";

import styles from "./styles.module.scss";

const Button = (props) => {
  const { children, className, onClick, borderWidth, padding = 3, width, height, style } = props;

  const paddingButton = `${padding}px ${padding * 2}px`;

  return (
    <>
      <button
        className={`${styles.button} ${className}`}
        onClick={onClick}
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Border
          borderWidth={borderWidth}
          padding={paddingButton}
          className={styles.borderButton}
          style={style}
        >
          {children}
        </Border>
      </button>
    </>
  );
};

export default Button;
