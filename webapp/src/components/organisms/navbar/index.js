import React from "react";

import KeplrButton from "../keplr-button";
import border from "./navbar-border.svg";

import styles from "./styles.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <img src={border} alt="Navbar Border" className={styles.border} />
      <p className={styles.title}>scrt.hangman</p>
      <KeplrButton />
    </nav>
  );
};

export default Navbar;
