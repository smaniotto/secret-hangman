import React from "react";

import popupBorder from "./popup-border.svg";

import styles from "./styles.module.scss";

const Popup = ({ children, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.borderContainer}>
        <img src={popupBorder} alt="Popup Border" className={styles.border} />
        {children}
      </div>
    </div>
  );
};

export default Popup;
