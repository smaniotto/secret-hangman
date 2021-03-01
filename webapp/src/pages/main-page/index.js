import React, { useContext, useEffect } from "react";

import Gibbet from "components/molecules/gibbet";
import WordReveal from "components/molecules/word-reveal";
import Keyboard from "components/organisms/keyboard";
import Navbar from "components/organisms/navbar";
import Footer from "components/organisms/footer";
import { WalletContext } from "context/wallet";
import useSmartContract from "hooks/smart-contract";

import styles from "./styles.module.scss";

const MainPage = () => {
  const { client } = useContext(WalletContext);
  const [
    contractAddress,
    mistakes,
    wordLength,
    wordReveal,
    isLoading,
    queryStatus,
    guessLetter,
  ] = useSmartContract(client);

  useEffect(async () => {
    if (contractAddress) {
      setTimeout(async () => {
        await queryStatus();
        console.log("queryStatus", wordReveal, wordLength);
      }, 5000);
    }
  }, [contractAddress]);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.gibbet}>
            <Gibbet mistakes={mistakes} />
          </div>
          <div className={styles.word_reveal}>
            <WordReveal letters={wordReveal} />
          </div>
        </div>
        <div className={styles.lower}>
          <Keyboard usedLetters={["f", "g"]} onClick={guessLetter} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
