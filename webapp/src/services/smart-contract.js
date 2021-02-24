const CODE_ID = process.env.REACT_APP_CONTRACT_CODE_ID;

let _client = {};
let _contractAddress = "";

const init = async (client) => {
  _client = client;

  const result = await _client.instantiate(CODE_ID, {}, `secret-hangman-${Date.now()}`);
  _contractAddress = result.contractAddress;

  return _contractAddress;
};

const queryStatus = async () => {
  const result = await _client.queryContractSmart(_contractAddress, { get_status: {} });

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

const guessLetter = async (letter) => {
  const letter_ascii = letter.charCodeAt(0);
  const result = await _client.execute(_contractAddress, {
    guess_letter: { letter: letter_ascii },
  });
  return await queryStatus();
};

export default {
  init,
  queryStatus,
  guessLetter,
};
