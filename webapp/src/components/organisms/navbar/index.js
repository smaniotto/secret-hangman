import React, { useState } from "react";

import KeplrConnectButton from "../keplr-connect-button";
import Rules from "components/molecules/rules";
import border from "./navbar-border.svg";

import styles from "./styles.module.scss";

const Navbar = () => {
  const [rules, setRules] = useState(false);

  const closeRules = () => {
    setRules(false);
  };

  const openRules = () => {
    setRules(true);
  };

  return (
    <div className={styles.container}>
      {rules && <Rules closeRules={closeRules} />}
      <img src={border} alt="Navbar Border" className={styles.border} />
      <div className={styles.navLinks}>
        <p className={styles.title}>scrt.hangman</p>
        <p className={styles.title} onClick={openRules}>
          How to play
        </p>
      </div>
      <KeplrConnectButton />
    </div>
  );
};

export default Navbar;
