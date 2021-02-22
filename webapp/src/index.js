import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import Key from "components/atoms/key";

import Wallet from "services/wallet";

import "styles/base.scss";

Wallet.enable();

ReactDOM.render(
  <StrictMode>
    <Key />
  </StrictMode>,
  document.getElementById("root")
);
