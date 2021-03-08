import { SigningCosmWasmClient } from "secretjs";

const CHAIN_ID = process.env.REACT_APP_SECRET_CHAIN_ID;
const REST_API_URL = process.env.REACT_APP_SECRET_REST_API_URL;
const RPC_API_URL = process.env.REACT_APP_SECRET_RPC_API_URL;
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
  return await _getClient();
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
    rpc: RPC_API_URL,
    rest: REST_API_URL,
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
      low: 0.02,
      average: 0.025,
      high: 0.03,
    },
    features: ["secretwasm"],
  });
};

/*
  Set-up Keplr client, with window to pop-up for the user to sign on each tx sent
 **/
const _getClient = async () => {
  const offlineSigner = window.getOfflineSigner(CHAIN_ID);
  const accounts = await offlineSigner.getAccounts();

  return new SigningCosmWasmClient(
    REST_API_URL,
    accounts[0].address,
    offlineSigner,
    window.getEnigmaUtils(CHAIN_ID)
  );
};

const WalletService = {
  enable,
};

export default WalletService;
