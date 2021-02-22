import React from "react";

import Mistakes from "../../atoms/mistakes";
import Person from "../../atoms/person";
import Structure from "../../atoms/structure";

import styles from "./styles.module.scss";

const Gibbet = ({ mistakes = 0 }) => {
  return (
    <div className={styles.container}>
      <div>
        <Structure />
      </div>
      <div className={styles.hangman}>
        <Person mistakes={mistakes} />
        <Mistakes mistakes={mistakes} />
      </div>
    </div>
  );
};

export default Gibbet;
