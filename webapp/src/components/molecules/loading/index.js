import React from "react";

import Popup from "components/atoms/popup";
import loading from "./loading.svg";

import styles from "./styles.module.scss";

const Loading = () => {
  return (
    <Popup>
      <div className={styles.container}>
        <p>Loading...</p>
        <img src={loading} alt="Loading Icon" />
      </div>
    </Popup>
  );
};

export default Loading;
