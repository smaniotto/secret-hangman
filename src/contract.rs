use std::char;

use cosmwasm_std::{
    to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier, StdError,
    StdResult, Storage,
};

use crate::msg::{
    HandleMsg, InitMsg, QueryMsg, WordLengthResponse, RemainingGuessesResponse
};
use crate::state::{config, config_read, State};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> StdResult<InitResponse> {
    let state = State {
        player: deps.api.canonical_address(&env.message.sender)?,
        word: String::from("banana"),
        remaining_guesses: 5,
    };

    config(&mut deps.storage).save(&state)?;

    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleResponse> {
    match msg {
        HandleMsg::GuessLetter { letter } => try_guess_letter(deps, env, letter)
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
        }

        Ok(state)
    })?;

    Ok(HandleResponse::default())
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetWordLength {} => to_binary(&query_word_length(deps)?),
        QueryMsg::GetRemainingGuesses {} => to_binary(&query_remaining_guesses(deps)?),
    }
}

fn query_word_length<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>
) -> StdResult<WordLengthResponse> {
    let state = config_read(&deps.storage).load()?;
    Ok(WordLengthResponse { word_length: state.word.chars().count() as u8 })
}

fn query_remaining_guesses<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>
) -> StdResult<RemainingGuessesResponse> {
    let state = config_read(&deps.storage).load()?;
    Ok(RemainingGuessesResponse { remaining_guesses: state.remaining_guesses as u8 })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies(20, &[]);

        let msg = InitMsg {};
        let env = mock_env("creator", &coins(1000, "earth"));

        // we can just call .unwrap() to assert this was a success
        let res = init(&mut deps, env, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // it worked, let's query the state
        let res = query(&deps, QueryMsg::GetWordLength {}).unwrap();
        let value: WordLengthResponse = from_binary(&res).unwrap();
        assert_eq!(6, value.word_length);
    }

    #[test]
    fn test_query_word_length() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        let res = query(&deps, QueryMsg::GetWordLength {}).unwrap();
        let value: WordLengthResponse = from_binary(&res).unwrap();
        assert_eq!(6, value.word_length);
    }

    #[test]
    fn test_query_remaining_guesses() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        let res = query(&deps, QueryMsg::GetRemainingGuesses {}).unwrap();
        let value: RemainingGuessesResponse = from_binary(&res).unwrap();
        assert_eq!(5, value.remaining_guesses);
    }

    #[test]
    fn test_handle_guess_letter() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        // should block other people from sending commands
        let msg = HandleMsg::GuessLetter { letter: 'e' as u32 };
        let env = mock_env("another", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::Unauthorized { .. }) => {},
            _ => panic!("Only the original player can guess"),
        }

        // should maintain number of remaining guesses if write
        let msg = HandleMsg::GuessLetter { letter: 'b' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let res = query(&deps, QueryMsg::GetRemainingGuesses {}).unwrap();
        let value: RemainingGuessesResponse = from_binary(&res).unwrap();
        assert_eq!(5, value.remaining_guesses);

        // should decrease remaining guesses if wrong
        let msg = HandleMsg::GuessLetter { letter: 'c' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let res = query(&deps, QueryMsg::GetRemainingGuesses {}).unwrap();
        let value: RemainingGuessesResponse = from_binary(&res).unwrap();
        assert_eq!(4, value.remaining_guesses);

        // should block guesses if no remaining guess
        let msg = HandleMsg::GuessLetter { letter: 'd' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let msg = HandleMsg::GuessLetter { letter: 'f' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let msg = HandleMsg::GuessLetter { letter: 'g' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let _res = handle(&mut deps, env, msg);

        let msg = HandleMsg::GuessLetter { letter: 'h' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::GenericErr { .. }) => panic!("User should have one more guess"),
            _ => {},
        };

        let msg = HandleMsg::GuessLetter { letter: 'c' as u32 };
        let env = mock_env("creator", &coins(100_000_000, "uscrt"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(StdError::GenericErr { .. }) => {},
            _ => panic!("User shouldn't have any more guesses"),
        };
        let res = query(&deps, QueryMsg::GetRemainingGuesses {}).unwrap();
        let value: RemainingGuessesResponse = from_binary(&res).unwrap();
        assert_eq!(0, value.remaining_guesses);
    }
}
