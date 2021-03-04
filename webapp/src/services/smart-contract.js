import { amountToUscrt } from "utils/scrt.js";

const CODE_ID = process.env.REACT_APP_CONTRACT_CODE_ID;

const init = async (client) => {
  const result = await client.instantiate(
    CODE_ID,
    {},
    `secret-hangman-${Date.now()}`,
    "Secret Hangman - Instantiate",
    [],
    {
      amount: [amountToUscrt(0.0625)],
      gas: "250000",
    }
  );
  return result.contractAddress;
};

const queryStatus = async (client, contractAddress) => {
  const result = await client.queryContractSmart(contractAddress, { get_status: {} });

  const wordReveal = Array(result.word_length).fill("");
  result.word_reveal.forEach(({ letter, position }) => {
    wordReveal[position] = String.fromCharCode(letter);
  });

  return {
    mistakes: result.mistakes,
    wordLength: result.word_length,
    wordReveal,
  };
};

const guessLetter = async (client, contractAddress, letter) => {
  const letterAscii = letter.charCodeAt(0);
  return await client.execute(
    contractAddress,
    {
      guess_letter: { letter: letterAscii },
    },
    "Secret Hangman - Guess",
    [],
    {
      amount: [amountToUscrt(0.0225)],
      gas: "150000",
    }
  );
};

const SmartContractService = {
  init,
  queryStatus,
  guessLetter,
};

export default SmartContractService;
