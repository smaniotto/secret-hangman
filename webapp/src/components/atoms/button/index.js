import React from "react";

import Border from "../border";

import styles from "./styles.module.scss";

const Button = ({ children, className, onClick, borderWidth, paddingInPixels = [3, 6] }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={{ padding: `${paddingInPixels[0]}px ${paddingInPixels[1]}px` }}
      onClick={onClick}
    >
      <Border
        borderWidth={borderWidth}
        borderImageOutset={`${paddingInPixels[0] + 1}px ${paddingInPixels[1] + 1}px`}
      >
        {children}
      </Border>
    </button>
  );
};

export default Button;
