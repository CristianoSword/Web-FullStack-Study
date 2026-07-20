// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IStudyVault {
    struct DepositRecord {
        address depositor;
        uint256 amount;
        uint256 unlockAt;
        bool claimed;
    }

    event DepositCreated(uint256 indexed depositId, address indexed depositor, uint256 amount, uint256 unlockAt);
    event DepositClaimed(uint256 indexed depositId, address indexed depositor, uint256 amount);

    function createDeposit(uint256 unlockAt) external payable returns (uint256 depositId);
    function claimDeposit(uint256 depositId) external;
    function getDeposit(uint256 depositId) external view returns (DepositRecord memory);
}
