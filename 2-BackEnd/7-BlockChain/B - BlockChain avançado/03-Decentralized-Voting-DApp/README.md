# Decentralized Voting DApp

Hardhat project with an on-chain voting contract and a browser-based Web3 interface for election participation.

## Stack

- Solidity `0.8.28`
- Hardhat
- OpenZeppelin Ownable
- Browser `ethers.js` UI

## What Is Included

- `VotingElection` contract with:
  - election start/end window
  - candidate registration on deploy
  - voter authorization by owner
  - one-wallet-one-vote protection
- `scripts/deploy.js` for local deployment
- `app/` static frontend for wallet connection, loading candidates, and casting votes

## Commands

```bash
npm install
npm run compile
npm test
npm run deploy:local
```

Then open `app/index.html`, connect MetaMask, and fill in the deployed contract address.

## Validated Scenarios

- proposal bootstrapping at deploy
- authorized voting during active window
- duplicate vote rejection
- unauthorized voter rejection
- closed-election rejection

## Notes

- Candidate names and title live in `config/election.config.json`.
- Local validation completed successfully with `hardhat test` in this workspace.
