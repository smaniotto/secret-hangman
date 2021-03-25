import React from "react";

import Border from "components/atoms/border";
import closeIcon from "./close-icon.png";

import styles from "./styles.module.scss";

const Popup = ({ children, className, handleClosePopup, size = "large" }) => {
  const innerContainer =
    size === "large"
      ? styles.innerContainer
      : `${styles.innerContainer} ${styles.innerContainerSmall}`;

  const borderWidth = size === "large" ? 4.5 : 3;

  return (
    <div className={styles.outterContainer}>
      <div className={`${innerContainer} ${className}`}>
        <Border borderWidth={borderWidth} className={styles.border}>
          <img
            src={closeIcon}
            alt="Close Icon"
            className={styles.closeIcon}
            onClick={handleClosePopup}
          />
          {children}
        </Border>
      </div>
    </div>
  );
};

export default Popup;
