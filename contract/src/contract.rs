use std::{char, u64};

use cosmwasm_std::{
    to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier,
    StdError, StdResult, Storage,
};
use rand::{RngCore, SeedableRng};
use rand_chacha::ChaChaRng;
use sha2::{Digest, Sha256};

use crate::wordlist::WORDLIST;
use crate::msg::{
    HandleMsg, InitMsg, QueryMsg, StatusResponse
};
use crate::state::{config, config_read, State, LetterReveal};


// -------- Init --------

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> StdResult<InitResponse> {
    let seed = generate_seed(&env);
    let word = random_word(seed);
    let word_length = word.chars().count();
    let state = State {
        player: deps.api.canonical_address(&env.message.sender)?,
        word: word,
        word_length: word_length as u8,
        word_reveal: vec![],
        remaining_guesses: 5,
        winner: false,
    };

    config(&mut deps.storage).save(&state)?;

    Ok(InitResponse::default())
}

fn generate_seed(env: &Env) -> u64 {
    let send_key_u64: u64 = env.message.sender.to_string().into_bytes().into_iter().map(|x| x as u64).sum();
    env.block.height + env.block.time + send_key_u64
}

fn random_word(seed: u64) -> String {
    let seed: [u8; 32] = Sha256::digest(&seed.to_be_bytes()).into();
    let mut rng = ChaChaRng::from_seed(seed);
    let index = (rng.next_u32() % (WORDLIST.len() as u32)) as usize;
    String::from(WORDLIST[index])
}


// -------- Handle --------

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::GuessLetter { letter } => try_guess_letter(deps, env, letter),
        HandleMsg::Restart {} => try_restart(deps, env),
    }
}

pub fn try_guess_letter<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    letter: u32,
) -> StdResult<HandleResponse> {
    let sender_address_raw = deps.api.canonical_address(&env.message.sender)?;
    config(&mut deps.storage).update(|mut state| {
        if sender_address_raw != state.player {
            return Err(StdError::Unauthorized { backtrace: None });
        }

        if state.remaining_guesses <= 0 {
            return Err(StdError::GenericErr { 
                msg: String::from("You're out of guesses"),
                backtrace: None,
            });
        }

        let letter_char = char::from_u32(letter).unwrap();
        if !state.word.contains(letter_char) {
            state.remaining_guesses -= 1;
        } else {
            for (i, c) in state.word.chars().enumerate() {
                if c == letter_char {
                    state.word_reveal.push(LetterReveal {
                        letter: c as u8,
                        position: i as u8,
                    });
                }
            }

            if (state.word_reveal.len() as u8) == state.word_length {
                state.winner = true;
            }
        }

        Ok(state)
    })?;

    Ok(HandleResponse::default())
}

pub fn try_restart<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
) -> StdResult<HandleResponse> {
    let sender_address_raw = deps.api.canonical_address(&env.message.sender)?;
    config(&mut deps.storage).update(|mut state| {
        if sender_address_raw != state.player {
            return Err(StdError::Unauthorized { backtrace: None });
        }

        if !state.winner {
            return Err(StdError::GenericErr { 
                msg: String::from("Can't start a new round before guessing the word"),
                backtrace: None,
            });
        }

        let seed = generate_seed(&env);
        let new_word = random_word(seed);
        let word_length = new_word.chars().count();
        state.word_length = word_length as u8;
        state.word_reveal = vec![];
        state.remaining_guesses = 5;
        state.winner = false;

        Ok(state)
    })?;

    Ok(HandleResponse::default())
}


// -------- Query --------

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetStatus {} => to_binary(&query_status(deps)?)
    }
}

fn query_status<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>
) -> StdResult<StatusResponse> {
    let state = config_read(&deps.storage).load()?;
    Ok(StatusResponse {
        word_length: state.word.chars().count() as u8,
        remaining_guesses: state.remaining_guesses as u8,
        word_reveal: state.word_reveal,
    })
}

// -------- Tests --------

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies(20, &[]);

        let msg = InitMsg {};
        let mut env = mock_env("creator", &coins(1000, "earth"));
        // generate seed for random word: daybed
        env.block.height = 1;
        env.block.time = 2;

        // we can just call .unwrap() to assert this was a success
        let res = init(&mut deps, env, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // it worked, let's query the state
        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(6, value.word_length);
    }

    #[test]
    fn test_query_status() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let mut env = mock_env("creator", &coins(2, "token"));
        // generate seed for random word: daybed
        env.block.height = 1;
        env.block.time = 2;
        let _res = init(&mut deps, env, msg).unwrap();

        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(6, value.word_length);
        assert_eq!(5, value.remaining_guesses);
        assert_eq!(vec![] as Vec<LetterReveal>, value.word_reveal);
    }

    #[test]
    fn test_handle_guess_letter() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let mut env = mock_env("creator", &coins(2, "token"));
        // generate seed for random word: daybed
        env.block.height = 1;
        env.block.time = 2;
        let _res = init(&mut deps, env, msg).unwrap();

        // should block other people from sending commands
        let msg = HandleMsg::GuessLetter { letter: 'd' as u32 };
        let env = mock_env("another", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::Unauthorized { .. }) => {},
            _ => panic!("Only the original player can guess"),
        }

        // should maintain number of remaining guesses if write
        let msg = HandleMsg::GuessLetter { letter: 'd' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(5, value.remaining_guesses);
        assert_eq!(2, value.word_reveal.len());

        // should decrease remaining guesses if wrong
        let msg = HandleMsg::GuessLetter { letter: 'c' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(4, value.remaining_guesses);

        // should block guesses if no remaining guess
        let msg = HandleMsg::GuessLetter { letter: 'f' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let msg = HandleMsg::GuessLetter { letter: 'g' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let msg = HandleMsg::GuessLetter { letter: 'h' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let msg = HandleMsg::GuessLetter { letter: 'i' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::GenericErr { .. }) => panic!("User should have one more guess"),
            _ => {},
        };

        let msg = HandleMsg::GuessLetter { letter: 'j' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::GenericErr { .. }) => {},
            _ => panic!("User shouldn't have any more guesses"),
        };
        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(0, value.remaining_guesses);
    }

    #[test]
    fn test_random_word() {
        assert_eq!("harvest", random_word(1));
    }

    #[test]
    fn test_restart() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let mut env = mock_env("creator", &coins(2, "token"));
        // generate seed for random word: daybed
        env.block.height = 1;
        env.block.time = 2;
        let _res = init(&mut deps, env, msg).unwrap();

        // should block other people from sending restart commands
        let msg = HandleMsg::Restart {};
        let env = mock_env("another", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::Unauthorized { .. }) => {},
            _ => panic!("Only the original player can guess"),
        }

        // should allow to restart only if has guessed previous word
        let msg = HandleMsg::Restart {};
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::GenericErr { .. }) => {},
            _ => panic!("User shouldn't be allowed to restart"),
        }

        // should allow to restart after guess
        let msg = HandleMsg::GuessLetter { letter: 'd' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let msg = HandleMsg::GuessLetter { letter: 'a' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let msg = HandleMsg::GuessLetter { letter: 'y' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let msg = HandleMsg::GuessLetter { letter: 'b' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let msg = HandleMsg::GuessLetter { letter: 'x' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let msg = HandleMsg::GuessLetter { letter: 'e' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(4, value.remaining_guesses);

        let msg = HandleMsg::Restart {};
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);
        let res = query(&deps, QueryMsg::GetStatus {}).unwrap();
        let value: StatusResponse = from_binary(&res).unwrap();
        assert_eq!(5, value.remaining_guesses);
    }
}
