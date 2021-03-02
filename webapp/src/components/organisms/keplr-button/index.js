import React, { useContext } from "react";

import { WalletContext } from "../../../context/wallet";
import KeplrStyleButton from "components/atoms/keplr-style-button";

import styles from "./styles.module.scss";

const KeplrButton = () => {
  const { client, enable } = useContext(WalletContext);

  return client ? (
    <KeplrStyleButton logo={true}>K</KeplrStyleButton>
  ) : (
    <KeplrStyleButton logo={false} onClick={enable}>
      Connect to Keplr
    </KeplrStyleButton>
  );
};

export default KeplrButton;
