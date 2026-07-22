# DeFi Staking Pool

Hardhat project for a staking pool that accepts stake deposits, accrues rewards over time, and supports reward claims plus unstaking.

## Stack

- Solidity `0.8.28`
- Hardhat
- OpenZeppelin ERC20 + Ownable

## Components

- `StudyStakeToken`: mock ERC20 used as staking and reward assets
- `StudyStakingPool`: pool contract with:
  - stake and unstake flows
  - accumulated rewards per share accounting
  - owner-funded reward treasury
  - per-user pending reward tracking

## Commands

```bash
npm install
npm run compile
npm test
npm run deploy:local
```

## Validated Scenarios

- stake updates user and pool balances
- rewards accrue over elapsed time
- reward claim transfers accrued tokens
- partial unstake returns staked assets

## Notes

- `scripts/deploy.js` deploys stake token, reward token, pool, and initial reward funding in one flow.
- Local validation completed successfully with `hardhat test` in this workspace.
