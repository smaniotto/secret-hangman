import React from "react";

import styles from "./styles.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <p className={styles.title}>scrt.hangman</p>
    </nav>
  );
};

export default Navbar;
