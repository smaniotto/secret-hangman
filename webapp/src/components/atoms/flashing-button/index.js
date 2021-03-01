import React from "react";

import styles from "./styles.module.scss";
import Button from "../button";

const FlashingButton = ({ children }) => {
  return <Button className={styles.main}>{children}</Button>;
};

export default FlashingButton;
