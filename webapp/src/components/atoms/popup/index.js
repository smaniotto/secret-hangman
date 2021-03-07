import React from "react";

import smallPopupBorder from "./small-popup-border.svg";
import largePopupBorder from "./large-popup-border.svg";

import styles from "./styles.module.scss";

const Popup = ({ children, onClick, size = "small" }) => {
  const borderImage = size === "small" ? smallPopupBorder : largePopupBorder;
  const borderStyle =
    size === "small"
      ? styles.borderContainer
      : `${styles.borderContainer} ${styles.borderContainerLarge}`;

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={borderStyle}>
        <img src={borderImage} alt="Popup Border" className={styles.border} />
        {children}
      </div>
    </div>
  );
};

export default Popup;
