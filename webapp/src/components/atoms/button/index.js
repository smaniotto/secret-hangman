import React from "react";

import styles from "./styles.module.scss";

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`${className} ${styles.button}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
