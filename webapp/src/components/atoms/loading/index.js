import React from "react";

import Popup from "components/molecules/popup";
import loading from "./loading.svg";

import styles from "./styles.module.scss";

const Loading = () => {
  return (
    <Popup>
      <p className={styles.word}>Loading...</p>
      <img src={loading} alt="Loading Icon" className={styles.icon} />
    </Popup>
  );
};

export default Loading;
