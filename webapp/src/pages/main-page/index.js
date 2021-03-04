import React, { useState, useContext, useEffect } from "react";

import Gibbet from "components/molecules/gibbet";
import WordReveal from "components/molecules/word-reveal";
import Keyboard from "components/organisms/keyboard";
import Navbar from "components/organisms/navbar";
import Footer from "components/organisms/footer";
import Loading from "components/atoms/loading";
import { WalletContext } from "context/wallet";
import useSmartContract from "hooks/smart-contract";

import styles from "./styles.module.scss";

const MainPage = () => {
  const { client } = useContext(WalletContext);

  const [
    contractAddress,
    mistakes,
    wordLength, // eslint-disable-line no-unused-vars
    wordReveal,
    isLoading, // eslint-disable-line no-unused-vars
    queryStatus,
    guessLetter,
  ] = useSmartContract(client);

  const [usedLetters, setUsedLetters] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const updateGameStatus = async () => {
      if (contractAddress) {
        setTimeout(async () => {
          await queryStatus();
        }, 5000);
      }
    };
    updateGameStatus();
  }, [contractAddress]);

  const handleGuess = async (letter) => {
    try {
      setIsProcessing(true);
      await guessLetter(letter);
      setUsedLetters([...usedLetters, letter]);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {(isProcessing || isLoading || (client && !wordLength)) && <Loading />}
      <Navbar />
      <div className={styles.mainSection}>
        <div className={styles.upper}>
          <div className={styles.gibbet}>
            <Gibbet mistakes={mistakes} />
          </div>
          <div className={styles.wordReveal}>
            <WordReveal letters={wordReveal} />
          </div>
        </div>
        <div className={styles.lower}>
          <Keyboard usedLetters={usedLetters} onClick={handleGuess} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
