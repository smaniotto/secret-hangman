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
        HandleMsg::Increment {} => try_increment(deps, env),
        HandleMsg::Reset { count } => try_reset(deps, env, count),
    }
}

pub fn try_increment<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    _env: Env,
) -> StdResult<HandleResponse> {
    config(&mut deps.storage).update(|mut state| {
        state.remaining_guesses -= 1;
        Ok(state)
    })?;

    Ok(HandleResponse::default())
}

pub fn try_reset<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    count: i32,
) -> StdResult<HandleResponse> {
    let sender_address_raw = deps.api.canonical_address(&env.message.sender)?;
    config(&mut deps.storage).update(|mut state| {
        if sender_address_raw != state.player {
            return Err(StdError::Unauthorized { backtrace: None });
        }
        state.remaining_guesses = count as u8;
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
    fn test_remaining_guesses() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = InitMsg {};
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        let res = query(&deps, QueryMsg::GetRemainingGuesses {}).unwrap();
        let value: RemainingGuessesResponse = from_binary(&res).unwrap();
        assert_eq!(5, value.remaining_guesses);
    }
}
