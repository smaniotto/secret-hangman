import React, { useState, createContext } from "react";

import WalletService from "../services/wallet";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [client, setClient] = useState();

  const enable = async () => {
    // Once enabled, prevent initializing wallet connection again
    if (client) {
      return client;
    }

    const _client = await WalletService.enable();
    setClient(_client);
    return _client;
  };

  return <WalletContext.Provider value={{ client, enable }}>{children}</WalletContext.Provider>;
};

export { WalletContext, WalletProvider };
