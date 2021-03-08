import { useState, useEffect } from "react";

import SmartContractService from "../services/smart-contract";

const useSmartContract = (client) => {
  const [contractAddress, setContractAddress] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [wordLength, setWordLength] = useState(0);
  const [wordReveal, setWordReveal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    if (wordLength > 0 && wordReveal.length > 0 && !wordReveal.includes("")) {
      setGameResult("win");
    }
    if (mistakes === 6) {
      setGameResult("lose");
    }
  }, [wordReveal, wordLength, mistakes]);

  const init = async () => {
    if (!client) {
      return;
    }

    setIsLoading(true);
    const contractAddress = await SmartContractService.init(client);
    setContractAddress(contractAddress);
    setIsLoading(false);
  };

  const queryStatus = async () => {
    setIsLoading(true);
    const status = await SmartContractService.queryStatus(client, contractAddress);
    setMistakes(status.mistakes);
    setWordLength(status.wordLength);
    setWordReveal(status.wordReveal);
    setIsLoading(false);
  };

  const guessLetter = async (letter) => {
    setIsLoading(true);
    await SmartContractService.guessLetter(client, contractAddress, letter);
    await queryStatus();
    setIsLoading(false);
  };

  const restart = async () => {
    setGameResult(null);
    setIsLoading(true);
    await SmartContractService.restart(client, contractAddress);
    await queryStatus();
    setIsLoading(false);
  };

  return [
    init,
    contractAddress,
    mistakes,
    wordLength,
    wordReveal,
    gameResult,
    isLoading,
    queryStatus,
    guessLetter,
    restart,
  ];
};

export default useSmartContract;
