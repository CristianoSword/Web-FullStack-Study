// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library AgreementTypes {
    struct VaultConfig {
        address owner;
        uint256 minimumDeposit;
        uint256 platformFeeBps;
    }
}
