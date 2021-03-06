import React from "react";

import Popup from "components/atoms/popup";
import Button from "components/atoms/button";

import styles from "./styles.module.scss";

const GameEnd = ({ result, restart }) => {
  return (
    <Popup>
      <div className={styles.container}>
        {result === "lose" && <p className={styles.textLose}>You Lose</p>}
        {result === "win" && <p className={styles.textWin}>You Win!</p>}
        <div className={styles.buttonsContainer}>
          <Button className={styles.button}>Share</Button>
          <Button className={styles.button} onClick={restart}>
            Restart
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default GameEnd;
