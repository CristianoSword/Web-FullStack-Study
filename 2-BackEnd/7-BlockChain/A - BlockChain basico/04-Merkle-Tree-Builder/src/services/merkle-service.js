import crypto from "node:crypto";
import { MerkleNode } from "../models/merkle-node.js";
import { MerkleProof } from "../models/merkle-proof.js";
import { MerkleTree } from "../models/merkle-tree.js";

export class MerkleService {
  hashValue(value) {
    return crypto.createHash("sha256").update(String(value)).digest("hex");
  }

  combineHashes(leftHash, rightHash) {
    return this.hashValue(`${leftHash}${rightHash}`);
  }

  buildTree(values) {
    const leaves = values.map(
      (value) =>
        new MerkleNode({
          data: value,
          hash: this.hashValue(value),
          level: 0
        })
    );

    const levels = [leaves];
    let currentLevel = leaves;
    let levelIndex = 0;

    while (currentLevel.length > 1) {
      const nextLevel = [];

      for (let index = 0; index < currentLevel.length; index += 2) {
        const left = currentLevel[index];
        const right = currentLevel[index + 1] ?? currentLevel[index];

        nextLevel.push(
          new MerkleNode({
            hash: this.combineHashes(left.hash, right.hash),
            left,
            right,
            level: levelIndex + 1
          })
        );
      }

      levels.push(nextLevel);
      currentLevel = nextLevel;
      levelIndex += 1;
    }

    return new MerkleTree({
      leaves,
      levels,
      root: currentLevel[0] ?? null
    });
  }

  getRoot(values) {
    return this.buildTree(values).root?.hash ?? null;
  }

  createProof(values, targetLeaf) {
    const tree = this.buildTree(values);
    const leafHash = this.hashValue(targetLeaf);
    let currentIndex = tree.leaves.findIndex((leaf) => leaf.hash === leafHash);

    if (currentIndex === -1) {
      throw new Error("Target leaf was not found in the tree.");
    }

    const siblings = [];

    for (let level = 0; level < tree.levels.length - 1; level += 1) {
      const levelNodes = tree.levels[level];
      const isRightNode = currentIndex % 2 === 1;
      const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;
      const siblingNode = levelNodes[siblingIndex] ?? levelNodes[currentIndex];

      siblings.push({
        direction: isRightNode ? "left" : "right",
        hash: siblingNode.hash
      });

      currentIndex = Math.floor(currentIndex / 2);
    }

    return new MerkleProof({
      leaf: targetLeaf,
      leafHash,
      root: tree.root?.hash ?? null,
      siblings
    });
  }

  verifyProof({ leaf, root, siblings }) {
    let currentHash = this.hashValue(leaf);

    for (const sibling of siblings) {
      currentHash =
        sibling.direction === "left"
          ? this.combineHashes(sibling.hash, currentHash)
          : this.combineHashes(currentHash, sibling.hash);
    }

    return currentHash === root;
  }
}
