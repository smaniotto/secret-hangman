import React, { useContext } from "react";

import { WalletContext } from "../../../context/wallet";

import styles from "./styles.module.scss";

const KeplrButton = () => {
  const { client, enable } = useContext(WalletContext);

  return client ? <p>Connected</p> : <button onClick={enable}>Connect to Keplr</button>;
};

export default KeplrButton;
