import React from "react";

import { WalletProvider } from "context/wallet";

import "styles/base.scss";

const withWalletProvider = (Story, context) => {
  return (
    <WalletProvider>
      <Story {...context} />
    </WalletProvider>
  );
};
export const decorators = [withWalletProvider];
