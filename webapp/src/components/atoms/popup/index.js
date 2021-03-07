import React from "react";

import smallPopupBorder from "./small-popup-border.svg";
import largePopupBorder from "./large-popup-border.svg";

import styles from "./styles.module.scss";

const Popup = ({ children, onClick, size = "small" }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {size === "small" && (
        <div className={styles.smallBorderContainer}>
          <img src={smallPopupBorder} alt="Small Popup Border" className={styles.border} />

          {children}
        </div>
      )}

      {size === "large" && (
        <div className={styles.largeBorderContainer}>
          <img src={largePopupBorder} alt="Large Popup Border" className={styles.border} />
          {children}
        </div>
      )}
    </div>
  );
};

export default Popup;
