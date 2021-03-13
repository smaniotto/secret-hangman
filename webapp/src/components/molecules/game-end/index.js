import React from "react";

import Popup from "components/molecules/popup";
import Button from "components/atoms/button";

import styles from "./styles.module.scss";

const GameEnd = ({ result, restart }) => {
  return (
    <Popup>
      <div className={styles.container}>
        {result === "lose" && <p className={styles.textLose}>You Lose</p>}
        {result === "win" && <p className={styles.textWin}>You Win!</p>}

        <Button className={styles.button} onClick={restart}>
          Restart
        </Button>
      </div>
    </Popup>
  );
};

export default GameEnd;
