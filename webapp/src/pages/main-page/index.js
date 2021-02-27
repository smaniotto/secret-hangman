import React from "react";

import Gibbet from "components/molecules/gibbet";
import WordReveal from "components/molecules/word-reveal";
import Keyboard from "components/organisms/keyboard";
import Navbar from "components/organisms/navbar";

import styles from "./styles.module.scss";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.gibbet}>
            <Gibbet mistakes={2} />
          </div>
          <div className={styles.word_reveal}>
            <WordReveal letters={["q"]} />
          </div>
        </div>
        <div className={styles.lower}>
          <Keyboard usedLetters={["f", "g"]} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
