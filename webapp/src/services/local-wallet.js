import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from "secretjs";
import { Bip39, Random } from "@iov/crypto";

const REST_API_URL = process.env.REACT_APP_SECRET_REST_API_URL;

const enable = async () => {
  const [accAddress, signingPen] = await _createLocalWallet();
  return _getClient(accAddress, signingPen);
};

const _createLocalWallet = async () => {
  const mnemonic = _getMnemonic();
  const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const accAddress = _getAccAddress(signingPen);
  return [accAddress, signingPen];
};

const _getMnemonic = () => {
  let mnemonic = localStorage.getItem("SH_LOCALWALLET_MNEMONIC");
  if (!mnemonic) {
    mnemonic = Bip39.encode(Random.getBytes(16)).toString();
    localStorage.setItem("SH_LOCALWALLET_MNEMONIC", mnemonic);
  }
  return mnemonic;
};

const _getAccAddress = (signingPen) => {
  let accAddress = localStorage.getItem("SH_LOCALWALLET_ACCADDRESS");
  if (!accAddress) {
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    accAddress = pubkeyToAddress(pubkey, "secret");
    localStorage.setItem("SH_LOCALWALLET_ACCADDRESS", accAddress);
  }
  return accAddress;
};

const _getClient = (accAddress, signingPen) => {
  const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
  return new SigningCosmWasmClient(
    REST_API_URL,
    accAddress,
    (signBytes) => signingPen.sign(signBytes),
    txEncryptionSeed
  );
};

const LocalWalletService = {
  enable,
};

export default LocalWalletService;
