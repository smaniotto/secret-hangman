import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { WalletProvider } from "context/wallet";
import MainPage from "pages/main-page";
import decorators from "@storybook/addon-toolbars";

import "styles/base.scss";

ReactDOM.render(
  <WalletProvider decorators={decorators}>
    <StrictMode>
      <MainPage />
    </StrictMode>
  </WalletProvider>,
  document.getElementById("root")
);
