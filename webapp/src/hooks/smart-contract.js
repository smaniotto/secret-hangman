import { useState, useEffect } from "react";

import SmartContractService from "../services/smart-contract";

const useSmartContract = (client) => {
  const [contractAddress, setContractAddress] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [wordLength, setWordLength] = useState(0);
  const [wordReveal, setWordReveal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("ongoing");

  useEffect(() => {
    const initSmartContract = async () => {
      if (!client) return;

      const contractAddress = await SmartContractService.init(client);
      setContractAddress(contractAddress);
    };
    initSmartContract();
  }, [client]);

  const queryStatus = async () => {
    setIsLoading(true);
    const status = await SmartContractService.queryStatus(client, contractAddress);
    setIsLoading(false);
    setMistakes(status.mistakes);
    setWordLength(status.wordLength);
    setWordReveal(status.wordReveal);
  };

  const guessLetter = async (letter) => {
    setIsLoading(true);
    await SmartContractService.guessLetter(client, contractAddress, letter);
    setIsLoading(false);
    await queryStatus();
  };

  if (wordLength.length > 0 && !wordReveal.includes("")) {
    setStatus("win");
  }
  if (mistakes === 6) {
    setStatus("lose");
  }

  return [
    contractAddress,
    mistakes,
    wordLength,
    wordReveal,
    status,
    isLoading,
    queryStatus,
    guessLetter,
  ];
};

export default useSmartContract;
