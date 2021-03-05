import React from "react";

import Popup from "components/atoms/popup";
import Button from "components/atoms/button";

import styles from "./styles.module.scss";

const GameEnd = ({ status }) => {
  return (
    <Popup>
      <div className={styles.container}>
        {status === "lose" && <p className={styles.textLose}>You Lose</p>}
        {status === "win" && <p className={styles.textWin}>You Win!</p>}
        <div className={styles.buttonsContainer}>
          <Button className={styles.button}>Share</Button>
          <Button className={styles.button}>Retry</Button>
        </div>
      </div>
    </Popup>
  );
};

export default GameEnd;
