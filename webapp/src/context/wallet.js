import React, { useState, createContext, useEffect } from "react";

import LocalWalletService from "../services/local-wallet";
import KeplrWalletService from "../services/keplr-wallet";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [client, setClient] = useState();
  const [walletType, setWalletType] = useState();

  const enable = async (walletType = "local") => {
    // Once enabled, prevent initializing wallet connection again
    if (client) {
      return client;
    }

    let WalletService;
    if (walletType === "keplr") {
      WalletService = KeplrWalletService;
      setWalletType("keplr");
    } else {
      WalletService = LocalWalletService;
      setWalletType("local");
    }

    const _client = await WalletService.enable();
    setClient(_client);
    return _client;
  };

  return (
    <WalletContext.Provider value={{ client, walletType, enable }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
