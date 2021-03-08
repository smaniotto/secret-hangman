import React, { useContext } from "react";

import { WalletContext } from "context/wallet";
import PopUp from "../../atoms/popup";
import Button from "../../atoms/button";

import styles from "./styles.module.scss";

const WalletOptionsPopUp = ({ onClose }) => {
  const { client, enable } = useContext(WalletContext);
  return (
    <PopUp>
      <div>
        <div>1. Send funds a local wallet and have a fluid gameplay</div>
        <div>
          <Button
            onClick={async () => {
              console.log("local wallet");
              await enable("local");
              onClose();
            }}
          >
            Use local wallet
          </Button>
        </div>
      </div>
      <div>- OR -</div>
      <div>
        <div>Connect with Keplr wallet and verify each round with Keplr popup</div>
        <div>
          <Button
            onClick={async () => {
              console.log("keplr wallet");
              await enable("keplr");
              onClose();
            }}
          >
            Connecti with Keplr
          </Button>
        </div>
      </div>
    </PopUp>
  );
};

export default WalletOptionsPopUp;
