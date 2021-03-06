import React from "react";

import Popup from "../popup";
import loading from "./loading.svg";

import styles from "./styles.module.scss";

const Loading = () => {
  return (
    <Popup>
      <div className={styles.container}>
        <p className={styles.word}>Loading...</p>
        <img src={loading} alt="Loading Icon" className={styles.icon} />
      </div>
    </Popup>
  );
};

export default Loading;
