#!/bin/bash

set +xe

CONTAINER_NAME="secret-network"
STORE_GAS=2000000

# Check if local network is running (uses docker-compose config)
if [[ -z "$(docker ps -f name=$CONTAINER_NAME)" ]]; then
    echo "Secret network not running"
    return 1
fi

# Build
echo "[1] Build wasm..."
cargo wasm

# Optimize build
echo "[2] Optimizing wasm..."
docker run --rm -v "$(pwd)":/contract \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    enigmampc/secret-contract-optimizer

# Deploy to local network
function secretcli() {
  docker exec -w /root/code "$CONTAINER_NAME" secretcli "$@";
}

echo "[3] Storing contract wasm on network..."
secretcli tx compute store contract.wasm.gz --from a --gas $STORE_GAS -y --keyring-backend test
sleep 5

CODE_ID="$(secretcli query compute list-code | jq '.[-1]."id"')"

echo "[4] Instantiate secret contract..."
TX_HASH=$(secretcli tx compute instantiate "$CODE_ID" "{}" --from a --label "secret-hangman-$CODE_ID" -y --keyring-backend test | jq -r .txhash)
sleep 5

export CONTRACT_ADDRESS=$(secretcli query compute list-contract-by-code "$CODE_ID" | jq '.[-1].address')

echo "Contract address: $CONTRACT_ADDRESS"

return 0
