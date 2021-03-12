import React from "react";

import Border from "../border";

import styles from "./styles.module.scss";

const Button = ({ children, className, onClick, borderWidth, paddingInPixels = [5, 10] }) => {
  return (
    <button
      className={`${className} ${styles.button}`}
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
