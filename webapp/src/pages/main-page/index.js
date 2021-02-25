import React from "react";

import Gibbet from "components/molecules/gibbet";
import WordReveal from "components/molecules/word-reveal";
import Keyboard from "components/organisms/keyboard";

import styles from "./styles.module.scss";

const MainPage = ({ mistakes, letters, usedLetters }) => {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.gibbet}>
          <Gibbet mistakes={mistakes} />
        </div>
        <div className={styles.word_reveal}>
          <WordReveal letters={letters} />
        </div>
      </div>
      <div className={styles.lower}>
        <Keyboard usedLetters={usedLetters} />
      </div>
    </div>
  );
};

export default MainPage;
