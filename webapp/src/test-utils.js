import { render } from "@testing-library/react";

import { WalletProvider } from "context/wallet";

const AllProviders = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
