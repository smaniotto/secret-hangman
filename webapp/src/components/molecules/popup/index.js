import React from "react";

import Border from "components/atoms/border";
import closeIcon from "./close-icon.png";

import styles from "./styles.module.scss";

const Popup = ({
  children,
  handleClosePopup,
  width = 200,
  borderWidth = 4.5 + width / 300,
  padding = 10,
}) => {
  return (
    <div className={styles.outterContainer}>
      <div>
        <Border borderWidth={borderWidth}>
          <div
            className={styles.innerContainer}
            style={{
              width: width ? `${width}px` : "auto",
              padding: `${padding}px`,
            }}
          >
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
    </div>
  );
};

export default Popup;
