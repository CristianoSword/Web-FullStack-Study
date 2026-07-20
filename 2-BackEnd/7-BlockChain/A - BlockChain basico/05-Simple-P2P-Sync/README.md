# Simple P2P Sync

WebSocket-based Node.js project that simulates blockchain peers syncing chain state, announcing new blocks, and reconciling longer valid chains.

## Features

- Real WebSocket transport with the `ws` library
- Local peer server startup on configurable ports
- Peer discovery handshake with `HELLO`
- Chain snapshot request and response flow
- New block broadcast and synchronization
- Demo mode that spins up 3 peers, exchanges blocks, and stops cleanly

## Commands

```bash
npm install
npm run demo -- --json
node src/index.js start-node --name "Node A" --port 7001 --json
node src/index.js start-node --name "Node B" --port 7002 --peer "ws://127.0.0.1:7001" --json
```

## Message Types

- `HELLO`: identifies a newly connected peer
- `CHAIN_REQUEST`: asks for the current chain snapshot
- `CHAIN_RESPONSE`: sends the full chain to a peer
- `NEW_BLOCK`: broadcasts a locally mined/appended block

## Validation Rules

- Peer names must have at least 2 characters.
- Ports must be integers between `1024` and `65535`.
- Candidate chains are accepted only when they are valid and longer than the local chain.
- Duplicate peers are ignored and malformed protocol payloads are rejected.
