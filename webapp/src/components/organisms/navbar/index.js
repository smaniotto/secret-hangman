import React from "react";

import KeplrConnectButton from "../keplr-connect-button";
import border from "./navbar-border.svg";

import styles from "./styles.module.scss";

const Navbar = ({ openRules }) => {
  return (
    <nav className={styles.container}>
      <img src={border} alt="Navbar Border" className={styles.border} />
      <div className={styles.navLinks}>
        <p className={styles.title}>scrt.hangman</p>
        <p className={styles.title} onClick={openRules}>
          How to play
        </p>
      </div>
      <KeplrConnectButton />
    </nav>
  );
};

export default Navbar;
