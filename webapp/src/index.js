import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import Key from "components/atoms/key";

import WalletService from "services/wallet";
import SmartContractService from "services/smart-contract";

import "styles/base.scss";

const init = async () => {
  const client = await WalletService.enable();
  await SmartContractService.init(client);
  await SmartContractService.queryStatus();
  await SmartContractService.guessLetter("a");
};
init();

ReactDOM.render(
  <StrictMode>
    <Key />
  </StrictMode>,
  document.getElementById("root")
);
