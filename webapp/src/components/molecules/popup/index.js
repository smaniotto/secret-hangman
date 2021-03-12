import React from "react";

import Border from "components/atoms/border";
import closeIcon from "./close-icon.png";

import styles from "./styles.module.scss";

const Popup = ({ borderWidth, children, handleClosePopup, paddingInPixels = [10, 10], top }) => {
  return (
    <div className={styles.outterContainer}>
      <div
        className={styles.innerContainer}
        style={{ padding: `${paddingInPixels[0]}px ${paddingInPixels[1]}px`, top: top }}
      >
        <img
          src={closeIcon}
          alt="Close Icon"
          className={styles.closeIcon}
          onClick={handleClosePopup}
        />
        <Border
          borderWidth={borderWidth}
          borderImageOutset={`${paddingInPixels[0] + 1}px ${paddingInPixels[1] + 1}px`}
        >
          {children}
        </Border>
      </div>
    </div>
  );
};

export default Popup;
