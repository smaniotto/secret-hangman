import React from "react";

import Popup from "components/atoms/popup";
import Button from "components/atoms/button";

import styles from "./styles.module.scss";

const YouLose = () => {
  return (
    <Popup>
      <div className={styles.container}>
        <p className={styles.text}>You Lose</p>
        <div className={styles.buttonsContainer}>
          <Button className={styles.button}>Share</Button>
          <Button className={styles.button}>Retry</Button>
        </div>
      </div>
    </Popup>
  );
};

export default YouLose;
