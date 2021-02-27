import React from "react";

import KeplrButton from "../keplr-button";

import styles from "./styles.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <p className={styles.title}>scrt.hangman</p>
      <KeplrButton />
    </nav>
  );
};

export default Navbar;
