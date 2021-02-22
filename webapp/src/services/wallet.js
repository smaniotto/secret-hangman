import { SigningCosmWasmClient } from "secretjs";

const CHAIN_ID = process.env.REACT_APP_SECRET_CHAIN_ID;
const API_URL = process.env.REACT_APP_SECRET_API_URL;
const IS_PRODUCTION_BUILD = process.env.NODE_ENV === "production";

/*
  Pops-up a window for the user to allow Keplr access to the webpage.
 **/
const enable = async () => {
  await _isReady();

  if (!IS_PRODUCTION_BUILD) {
    await _enableDev();
  }
  await window.keplr.enable(CHAIN_ID);
  return await _setupOfflineSigner();
};

/*
  Waits for Keplr extension to be injected in the window object.
 **/
const _isReady = async () => {
  const sleep = (ms) => new Promise((accept) => setTimeout(accept, ms));

  // Wait for Keplr to be injected to the page
  while (!window.keplr && !window.getOfflineSigner && !window.getEnigmaUtils) {
    await sleep(10);
  }
};

/*
  Used for setting up Keplr wallet for **local and testnet** development.
 **/
const _enableDev = async () => {
  await window.keplr.experimentalSuggestChain({
    chainId: CHAIN_ID,
    chainName: "Local Secret Chain",
    rpc: `${API_URL}:26657`,
    rest: `${API_URL}:1337`,
    bip44: {
      coinType: 529,
    },
    coinType: 529,
    stakeCurrency: {
      coinDenom: "SCRT",
      coinMinimalDenom: "uscrt",
      coinDecimals: 6,
    },
    bech32Config: {
      bech32PrefixAccAddr: "secret",
      bech32PrefixAccPub: "secretpub",
      bech32PrefixValAddr: "secretvaloper",
      bech32PrefixValPub: "secretvaloperpub",
      bech32PrefixConsAddr: "secretvalcons",
      bech32PrefixConsPub: "secretvalconspub",
    },
    currencies: [
      {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
      },
    ],
    gasPriceStep: {
      low: 0.1,
      average: 0.25,
      high: 0.4,
    },
    features: ["secretwasm"],
  });
};

/*
  Set-up Keplr to pop-up a window for the user to sign on each tx sent
 **/
const _setupOfflineSigner = async () => {
  const offlineSigner = window.getOfflineSigner(CHAIN_ID);
  const accounts = await offlineSigner.getAccounts();

  return new SigningCosmWasmClient(
    API_URL,
    accounts[0].address,
    offlineSigner,
    window.getEnigmaUtils(CHAIN_ID)
  );
};

export default {
  enable,
};
