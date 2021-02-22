import React from "react";

import styles from "./styles.module.scss";

const Mistakes = ({ mistakes = 0 }) => {
  return <div className={styles.container}>{mistakes} / 6</div>;
};

export default Mistakes;
