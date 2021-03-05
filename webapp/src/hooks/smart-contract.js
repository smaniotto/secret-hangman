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
    const initSmartContract = async () => {
      if (!client) return;
      setIsLoading(true);
      const contractAddress = await SmartContractService.init(client);
      setContractAddress(contractAddress);
    };
    initSmartContract();
  }, [client]);

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
    await queryStatus();
    await SmartContractService.restart(client, contractAddress);
    await queryStatus();
    setIsLoading(false);
  };

  useEffect(() => {
    if (wordLength > 0 && !wordReveal.includes("")) {
      setGameResult("win");
    }
    if (mistakes === 6) {
      setGameResult("lose");
    }
  }, [wordReveal]);

  return [
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
