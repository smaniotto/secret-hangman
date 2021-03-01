import React from "react";

import styles from "./styles.module.scss";

const Button = ({ children, className }) => {
  return <button className={className}>{children}</button>;
};

export default Button;
