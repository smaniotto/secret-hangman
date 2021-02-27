# Secret Hangman

Secret Hangman is a hangman game:

1. When the game starts a word is drawn from a list, the word length is known to the
   user, displayed as dashes for each letter on the screen
2. Each round the user can guess one letter that may compose the word
3. If the word contains the guessed letter, it's displayed in the correct position from
   the dashes
4. If the word doesn't contain the letter, the user is marked with a mistake
5. The user can have a maximum of 6 mistakes

This project is composed of two parts:

- [Secret smart contract](contract/README.md) written in Rust to run in the Secret
  Network
- [React webapp](webapp/README.md) with a user interface integrated with the smart
  contract
