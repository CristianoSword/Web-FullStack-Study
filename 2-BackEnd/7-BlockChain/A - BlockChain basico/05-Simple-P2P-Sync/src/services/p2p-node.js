import crypto from "node:crypto";
import { WebSocket, WebSocketServer } from "ws";
import { ChainBlock } from "../models/chain-block.js";
import { PeerNode } from "../models/peer-node.js";
import { SyncMessage } from "../models/sync-message.js";

export class P2PNode {
  constructor({ id = crypto.randomUUID(), name, port }) {
    this.peer = new PeerNode({
      id,
      name,
      port,
      knownPeers: []
    });
    this.chain = [this.createGenesisBlock()];
    this.server = null;
    this.sockets = new Map();
  }

  createGenesisBlock() {
    const block = {
      index: 0,
      previousHash: "0".repeat(64),
      data: "genesis-block",
      timestamp: "2026-01-01T00:00:00.000Z"
    };

    return new ChainBlock({
      ...block,
      hash: this.hashBlock(block)
    });
  }

  hashBlock(block) {
    return crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          data: block.data,
          index: block.index,
          previousHash: block.previousHash,
          timestamp: block.timestamp
        })
      )
      .digest("hex");
  }

  createBlock(data) {
    const previous = this.chain.at(-1);
    const blockData = {
      index: previous.index + 1,
      previousHash: previous.hash,
      data,
      timestamp: new Date().toISOString()
    };

    return new ChainBlock({
      ...blockData,
      hash: this.hashBlock(blockData)
    });
  }

  addLocalBlock(data) {
    const block = this.createBlock(data);
    this.chain.push(block);
    this.broadcast("NEW_BLOCK", { block });
    return block;
  }

  validateChain(candidateChain) {
    if (!Array.isArray(candidateChain) || candidateChain.length === 0) {
      return false;
    }

    for (let index = 0; index < candidateChain.length; index += 1) {
      const block = candidateChain[index];
      const recalculated = this.hashBlock(block);

      if (block.hash !== recalculated) {
        return false;
      }

      if (index === 0) {
        continue;
      }

      const previous = candidateChain[index - 1];
      if (block.previousHash !== previous.hash || block.index !== previous.index + 1) {
        return false;
      }
    }

    return true;
  }

  maybeReplaceChain(candidateChain) {
    if (
      candidateChain.length > this.chain.length &&
      this.validateChain(candidateChain)
    ) {
      this.chain = candidateChain.map((block) => new ChainBlock(block));
      return true;
    }

    return false;
  }

  start() {
    return new Promise((resolve) => {
      this.server = new WebSocketServer({ port: this.peer.port }, () => resolve(this));

      this.server.on("connection", (socket, request) => {
        const peerUrl = request.socket.remoteAddress;
        this.registerSocket(socket, peerUrl);
      });
    });
  }

  registerSocket(socket, peerUrl = "unknown-peer") {
    this.sockets.set(peerUrl, socket);

    socket.on("message", (raw) => {
      const message = JSON.parse(raw.toString());
      this.handleMessage(socket, message);
    });

    socket.on("close", () => {
      this.sockets.delete(peerUrl);
    });
  }

  async connectToPeer(peerUrl) {
    if (this.sockets.has(peerUrl)) {
      return;
    }

    await new Promise((resolve, reject) => {
      const socket = new WebSocket(peerUrl);

      socket.on("open", () => {
        this.registerSocket(socket, peerUrl);
        this.peer.knownPeers.push(peerUrl);
        this.send(socket, "HELLO", {
          id: this.peer.id,
          name: this.peer.name,
          port: this.peer.port
        });
        this.send(socket, "CHAIN_REQUEST", {});
        resolve();
      });

      socket.on("error", reject);
    });
  }

  handleMessage(socket, messageInput) {
    const message = new SyncMessage(messageInput);

    if (message.type === "HELLO") {
      const peerUrl = `ws://127.0.0.1:${message.payload.port}`;
      if (!this.peer.knownPeers.includes(peerUrl)) {
        this.peer.knownPeers.push(peerUrl);
      }
      return;
    }

    if (message.type === "CHAIN_REQUEST") {
      this.send(socket, "CHAIN_RESPONSE", { chain: this.chain });
      return;
    }

    if (message.type === "CHAIN_RESPONSE") {
      this.maybeReplaceChain(message.payload.chain);
      return;
    }

    if (message.type === "NEW_BLOCK") {
      const candidate = [...this.chain, message.payload.block];
      if (this.validateChain(candidate)) {
        this.chain = candidate.map((block) => new ChainBlock(block));
      } else {
        this.send(socket, "CHAIN_REQUEST", {});
      }
    }
  }

  send(socket, type, payload) {
    socket.send(
      JSON.stringify(
        new SyncMessage({
          type,
          senderId: this.peer.id,
          payload
        })
      )
    );
  }

  broadcast(type, payload) {
    for (const socket of this.sockets.values()) {
      if (socket.readyState === WebSocket.OPEN) {
        this.send(socket, type, payload);
      }
    }
  }

  snapshot() {
    return {
      peer: this.peer,
      chain: this.chain,
      peerCount: this.sockets.size
    };
  }

  async stop() {
    for (const socket of this.sockets.values()) {
      socket.close();
    }

    if (!this.server) {
      return;
    }

    await new Promise((resolve) => this.server.close(() => resolve()));
  }
}
