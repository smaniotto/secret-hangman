import React from "react";

import Button from "../button";

import styles from "./styles.module.scss";

const KeplrButton = ({ children, logo = false, online = false }) => {
  const flashingStyle = !logo ? styles.flashing : null;
  const containerStyle = logo ? styles.containerLogo : styles.container;
  const childrenStyle = logo ? styles.childrenLogo : styles.children;
  return (
    <div className={flashingStyle}>
      <div className={containerStyle}>
        <Button className={styles.background}>
          <div className={childrenStyle}>{children}</div>
        </Button>
        {online && <span className={styles.online}></span>}
      </div>
    </div>
  );
};

export default KeplrButton;
