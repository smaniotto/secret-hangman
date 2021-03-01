import React, { useContext } from "react";

import { WalletContext } from "../../../context/wallet";

import styles from "./styles.module.scss";
import FlashingButton from "components/atoms/flashing-button";
import KeplrStyleButton from "components/atoms/keplr-style-button";

const KeplrButton = () => {
  const { client, enable } = useContext(WalletContext);

  return client ? (
    <KeplrStyleButton>K</KeplrStyleButton>
  ) : (
    <FlashingButton onClick={enable}>Connect to Keplr</FlashingButton>
  );
};

export default KeplrButton;
