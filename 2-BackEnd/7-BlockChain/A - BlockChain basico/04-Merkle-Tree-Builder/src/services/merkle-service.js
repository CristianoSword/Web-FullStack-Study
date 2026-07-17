import crypto from "node:crypto";
import { MerkleNode } from "../models/merkle-node.js";
import { MerkleProof } from "../models/merkle-proof.js";
import { MerkleTree } from "../models/merkle-tree.js";

export class MerkleService {
  assertValues(values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error("Values must be a non-empty array.");
    }

    values.forEach((value, index) => {
      if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Leaf at position ${index} must be a non-empty string.`);
      }
    });
  }

  assertLeaf(leaf) {
    if (typeof leaf !== "string" || leaf.trim().length === 0) {
      throw new Error("Leaf must be a non-empty string.");
    }
  }

  assertProof(proof) {
    this.assertLeaf(proof?.leaf);

    if (typeof proof?.root !== "string" || !/^[a-f0-9]{64}$/i.test(proof.root)) {
      throw new Error("Proof root must be a 64-character hexadecimal hash.");
    }

    if (!Array.isArray(proof?.siblings)) {
      throw new Error("Proof siblings must be an array.");
    }

    proof.siblings.forEach((sibling, index) => {
      if (!["left", "right"].includes(sibling?.direction)) {
        throw new Error(`Sibling at index ${index} must define direction as left or right.`);
      }

      if (typeof sibling?.hash !== "string" || !/^[a-f0-9]{64}$/i.test(sibling.hash)) {
        throw new Error(`Sibling hash at index ${index} must be a 64-character hexadecimal hash.`);
      }
    });
  }

  hashValue(value) {
    return crypto.createHash("sha256").update(String(value)).digest("hex");
  }

  combineHashes(leftHash, rightHash) {
    return this.hashValue(`${leftHash}${rightHash}`);
  }

  buildTree(values) {
    this.assertValues(values);

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
    this.assertValues(values);
    this.assertLeaf(targetLeaf);

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
    this.assertProof({ leaf, root, siblings });

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
