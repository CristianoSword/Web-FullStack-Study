# ERC20 Token Creation

Hardhat project for a capped ERC20 token with controlled minting, treasury allocation, and deploy/mint utility scripts.

## Stack

- Solidity `0.8.28`
- Hardhat
- OpenZeppelin Contracts
- Ethers.js

## Contract Summary

`StudyToken` is an ERC20-compatible token with:

- capped total supply
- initial treasury allocation at deploy time
- owner-controlled minting with explicit reason logging
- treasury wallet update support
- normal transfer, approve, and `transferFrom` flows

## Commands

```bash
npm install
npm run compile
npm test
npm run deploy:local
TOKEN_ADDRESS=0xYourToken RECIPIENT=0xRecipient npx hardhat run scripts/mint.js --network hardhat
TOKEN_ADDRESS=0xYourToken npx hardhat run scripts/inspect.js --network hardhat
```

## Validated Scenarios

- initial supply minted to treasury
- owner mint with event emission
- non-owner mint blocked
- transfer and allowance flow
- cap enforcement on minting

## Notes

- Runtime parameters live in `config/token.config.json`.
- Local validation completed successfully with `hardhat test` in this workspace.
