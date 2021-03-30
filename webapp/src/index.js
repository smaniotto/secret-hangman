import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { WalletProvider } from "context/wallet";
import MainPage from "pages/main-page";

import "styles/base.scss";

ReactDOM.render(
  <WalletProvider>
    <StrictMode>
      <MainPage />
    </StrictMode>
  </WalletProvider>,
  document.getElementById("root")
);
