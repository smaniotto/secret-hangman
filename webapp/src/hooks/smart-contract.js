import { useState, useEffect } from "react";

import SmartContractService from "../services/smart-contract";

const useSmartContract = (client) => {
  const [contractAddress, setContractAddress] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(0);
  const [wordLength, setWordLength] = useState(0);
  const [wordReveal, setWordReveal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    if (!client) return;

    const contractAddress = await SmartContractService.init(client);
    setContractAddress(contractAddress);
  }, [client]);

  const queryStatus = async () => {
    setIsLoading(true);
    const status = await SmartContractService.queryStatus(client, contractAddress);
    setIsLoading(false);

    setRemainingGuesses(status.remainingGuesses);
    setWordLength(status.wordLength);
    setWordReveal(status.wordReveal);
  };

  const guessLetter = async (letter) => {
    setIsLoading(true);
    await SmartContractService.guessLetter(client, contractAddress, letter);
    setIsLoading(false);

    await queryStatus();
  };

  return [
    contractAddress,
    remainingGuesses,
    wordLength,
    wordReveal,
    isLoading,
    queryStatus,
    guessLetter,
  ];
};

export default useSmartContract;
