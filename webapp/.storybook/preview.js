import React from "react";
import { addDecorator } from "@storybook/react";

import { WalletProvider } from "context/wallet";

import "styles/base.scss";

export const StorybookWrapper = (storyFn) => <WalletProvider>{storyFn()}</WalletProvider>;
addDecorator(StorybookWrapper);
