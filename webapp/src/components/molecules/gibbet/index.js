import React from "react";

import Mistakes from "../../atoms/mistakes";
import Person from "../../atoms/person";

import styles from "./styles.module.scss";

import gibbetStructure from "./gibbet-structure.svg";

const Gibbet = ({ mistakes = 0 }) => {
  return (
    <div className={styles.container}>
      <div>
        <img src={gibbetStructure} alt="Gibbet Structure" />
      </div>
      <div className={styles.hangman}>
        <Person mistakes={mistakes} />
        <Mistakes mistakes={mistakes} />
      </div>
    </div>
  );
};

export default Gibbet;
