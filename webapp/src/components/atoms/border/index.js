import React from "react";

import styles from "./styles.module.scss";

const Border = ({ children, width, height }) => {
  return (
    <div style={{ width: width, height: height }} className={styles.border}>
      {children}
    </div>
  );
};

export default Border;
