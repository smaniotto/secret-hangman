const CODE_ID = process.env.REACT_APP_CONTRACT_CODE_ID;

const init = async (client) => {
  const result = await client.instantiate(CODE_ID, {}, `secret-hangman-${Date.now()}`);
  return result.contractAddress;
};

const queryStatus = async (client, contractAddress) => {
  const result = await client.queryContractSmart(contractAddress, { get_status: {} });

  const wordReveal = Array(result.word_length);
  result.word_reveal.forEach(({ letter, position }) => {
    wordReveal[position] = letter;
  });

  return {
    remainingGuesses: result.remaining_guesses,
    wordLength: result.word_length,
    wordReveal,
  };
};

const guessLetter = async (client, contractAddress, letter) => {
  const letterAscii = letter.charCodeAt(0);
  return await client.execute(contractAddress, {
    guess_letter: { letter: letterAscii },
  });
};

export default {
  init,
  queryStatus,
  guessLetter,
};
