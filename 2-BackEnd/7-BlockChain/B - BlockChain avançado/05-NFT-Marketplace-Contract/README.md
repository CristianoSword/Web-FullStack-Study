# NFT Marketplace Contract

Hardhat project with an ERC721 collection contract and a marketplace contract for listing and purchasing NFTs on an Ethereum-compatible network.

## Stack

- Solidity `0.8.28`
- Hardhat
- OpenZeppelin ERC721 + Ownable

## Components

- `BackendMastersCollection`
  - owner-controlled minting
  - token URI storage
  - base URI + suffix composition
- `StudyNFTMarketplace`
  - NFT custody during listing
  - fixed-price purchase flow
  - marketplace fee distribution to owner

## Commands

```bash
npm install
npm run compile
npm test
npm run deploy:local
COLLECTION_ADDRESS=0xCollection MARKETPLACE_ADDRESS=0xMarketplace npx hardhat run scripts/mint-and-list.js --network hardhat
```

## Validated Scenarios

- NFT mint to seller
- listing approved NFT in marketplace
- purchase transfers ownership to buyer
- listing deactivates after sale

## Notes

- Collection defaults live in `config/collection.config.json`.
- Example metadata lives in `metadata/sample-token.json`.
- Local validation completed successfully with `hardhat test` in this workspace.
