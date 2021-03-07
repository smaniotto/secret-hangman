import React from "react";

import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <nav className={styles.container}>
      <p className={styles.title}>
        <a href="https://scrt.network/" target="_blank">
          powered by secret network
        </a>
      </p>
    </nav>
  );
};

export default Footer;
