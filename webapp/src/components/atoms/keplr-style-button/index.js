import React from "react";

import Button from "../button";

import styles from "./styles.module.scss";

const KeplrStyleButton = ({ children, logo = false }) => {
  const flashing = !logo ? styles.flashing : null;
  const containerStyle = logo ? styles.containerLogo : styles.container;
  const childrenStyle = logo ? styles.childrenLogo : styles.children;
  return (
    <div className={flashing}>
      <div className={containerStyle}>
        <Button className={styles.background}>
          <div className={childrenStyle}>{children}</div>
        </Button>
        {logo && <span className={styles.online}></span>}
      </div>
    </div>
  );
};

export default KeplrStyleButton;
