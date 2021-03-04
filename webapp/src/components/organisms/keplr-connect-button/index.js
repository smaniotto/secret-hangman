import React, { useContext } from "react";

import { WalletContext } from "../../../context/wallet";
import KeplrButton from "../../atoms/keplr-button";

const KeplrConnectButton = () => {
  const { client, enable } = useContext(WalletContext);

  return client ? (
    <KeplrButton logo={true} online={true}>
      K
    </KeplrButton>
  ) : (
    <KeplrButton logo={false} onClick={enable}>
      Connect to Keplr
    </KeplrButton>
  );
};

export default KeplrConnectButton;
