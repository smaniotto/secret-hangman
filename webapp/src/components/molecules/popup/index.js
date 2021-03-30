import React from "react";

import Border from "components/atoms/border";
import closeIcon from "./close-icon.png";

import styles from "./styles.module.scss";

const Popup = ({ children, className, handleClosePopup, size = "large" }) => {
  const innerContainer = size === "large" ? null : styles.innerContainerSmall;
  const borderWidth = size === "large" ? 4.5 : 3;

  return (
    <div className={styles.outterContainer}>
      <Border borderWidth={borderWidth}>
        <div className={`${styles.innerContainer} ${innerContainer} ${className}`}>
          <img
            src={closeIcon}
            alt="Close Icon"
            className={styles.closeIcon}
            onClick={handleClosePopup}
          />
          {children}
        </div>
      </Border>
    </div>
  );
};

export default Popup;
