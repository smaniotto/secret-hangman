import React from "react";

import styles from "./styles.module.scss";

const Border = ({ children, borderWidth, borderImageOutset }) => {
  return (
    <div
      style={{ borderImageWidth: borderWidth, borderImageOutset: borderImageOutset }}
      className={styles.border}
    >
      {children}
    </div>
  );
};

export default Border;
