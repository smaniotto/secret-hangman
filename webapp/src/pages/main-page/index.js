import React, { useState, useContext, useEffect } from "react";

import Gibbet from "components/molecules/gibbet";
import WordReveal from "components/molecules/word-reveal";
import Keyboard from "components/organisms/keyboard";
import Navbar from "components/organisms/navbar";
import Footer from "components/organisms/footer";
import Loading from "components/atoms/loading";
import GameEnd from "components/molecules/game-end";
import Rules from "components/molecules/rules";
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
    gameResult,
    isLoading,
    queryStatus,
    guessLetter,
    restart,
  ] = useSmartContract(client);

  const [usedLetters, setUsedLetters] = useState([]);
  const [isWaitingForWord, setIsWaitingForWord] = useState(false);
  const [rules, setRules] = useState(false);

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

  useEffect(() => {
    if (!client) {
      return;
    }
    !wordLength && setIsWaitingForWord(true);
    wordLength && setIsWaitingForWord(false);
  }, [client, wordLength]);

  const handleGuess = async (letter) => {
    try {
      await guessLetter(letter);
      setUsedLetters([...usedLetters, letter]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestart = async () => {
    try {
      setUsedLetters([]);
      await restart();
    } catch (error) {
      console.log(error);
    }
  };

  const closeRules = () => {
    setRules(false);
  };

  const openRules = () => {
    setRules(true);
  };

  const loading = isLoading || isWaitingForWord;

  return (
    <div className={styles.container}>
      {rules && <Rules closeRules={closeRules} />}
      {loading && <Loading />}
      {gameResult && <GameEnd result={gameResult} restart={handleRestart} />}
      <Navbar openRules={openRules} />
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
