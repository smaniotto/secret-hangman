import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { WalletProvider } from "context/wallet";
import KeplrButton from "components/organisms/keplr-button";

import "styles/base.scss";

ReactDOM.render(
  <WalletProvider>
    <StrictMode>
      <KeplrButton />
    </StrictMode>
  </WalletProvider>,
  document.getElementById("root")
);
