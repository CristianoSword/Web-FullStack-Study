# Solidity Smart Contract

Hardhat project for developing, testing, and deploying a time-locked ETH vault contract on Ethereum-compatible networks.

## Stack

- Solidity `0.8.28`
- Hardhat
- Ethers.js
- Chai + Hardhat Network Helpers

## Contract Summary

`StudyVault` allows a depositor to lock ETH until a future timestamp and later claim the funds. A configurable platform fee is paid to the contract owner on withdrawal.

## Commands

```bash
npm install
npm run compile
npm test
npm run deploy:local
CONTRACT_ADDRESS=0xYourAddress npx hardhat run scripts/inspect.js --network hardhat
```

## Validated Scenarios

- Creates locked deposits with event emission
- Rejects deposits below the configured minimum
- Prevents immediate withdrawal before unlock time
- Releases the locked amount after unlock with fee distribution

## Notes

- The deployment parameters live in `config/deployment.config.json` and can be extended for real networks such as Sepolia.
- Local validation was executed with `hardhat test` successfully in this workspace.
