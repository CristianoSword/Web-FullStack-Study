// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library TokenTypes {
    struct TokenConfig {
        string name;
        string symbol;
        uint256 cap;
        uint256 initialSupply;
        address treasuryWallet;
    }
}
