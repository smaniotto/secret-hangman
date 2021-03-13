import React from "react";

import Popup from "components/molecules/popup";
import Button from "components/atoms/button";

import styles from "./styles.module.scss";

const Rules = ({ closeRules }) => {
  return (
    <Popup size="large">
      <div className={styles.container}>
        <h1 className={styles.title}>scrt.hangman</h1>
        <h3 className={styles.subtitle}>How to play</h3>
        <ul className={styles.list}>
          <li>1. Connect to your Keplr Wallet</li>
          <li>2. Secret Network will generate a new random secret word.</li>
          <li>3. Authorize the fee for each try.</li>
          <li>4. If you find out the word before making 6 mistakes, you win.</li>
        </ul>
        <Button className={styles.button} onClick={closeRules}>
          Play
        </Button>
      </div>
    </Popup>
  );
};

export default Rules;
