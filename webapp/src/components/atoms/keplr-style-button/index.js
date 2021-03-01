import React from "react";

import styles from "./styles.module.scss";
import Button from "../button";

const KeplrStyleButton = ({ children }) => {
  return (
    <div className={styles.container}>
      <Button className={styles.background}>
        <div className={styles.children}>{children}</div>
      </Button>
      <span className={styles.online}></span>
    </div>
  );
};

export default KeplrStyleButton;
