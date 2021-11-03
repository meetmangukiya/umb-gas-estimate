# ⛽ $UMB Gas Estimator

## What is this?
This is a dApp to get the cost of executing a transaction in $UMB.
Just provide the contract address, the gas price to consider, and input data.

## How does it work?

With the given contract address, the gas price, and input data:
1. The smart contract is executed, and the gas used by the execution is tracked.
2. Current ETH/USD and UMB/USD price is retrieved using Umbrella network oracles.
3. Current ETH and $UMB prices along with gas used, and gas price is used to compute cost in $UMB.
