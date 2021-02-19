import React from "react";

import Key from "../../atoms/key";

import styles from "./styles.module.scss";

function KeyboardRow({ keys = ["q", "w", "e", "r", "t", "y"] }) {
  return (
    <ul className={styles.container}>
      {keys.map((key) => {
        return (
          <li id={key} className={styles.key}>
            <Key letter={key} />
          </li>
        );
      })}
    </ul>
  );
}

export default KeyboardRow;
