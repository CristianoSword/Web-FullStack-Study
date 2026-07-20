// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IStudyVault} from "./interfaces/IStudyVault.sol";
import {AgreementTypes} from "./libraries/AgreementTypes.sol";

contract StudyVault is IStudyVault {
    mapping(uint256 => DepositRecord) private deposits;
    uint256 private nextDepositId;

    AgreementTypes.VaultConfig public vaultConfig;

    error DepositTooSmall();
    error UnlockTimeMustBeInFuture();
    error NotDepositOwner();
    error DepositAlreadyClaimed();
    error DepositStillLocked();

    constructor(address owner_, uint256 minimumDeposit_, uint256 platformFeeBps_) {
        vaultConfig = AgreementTypes.VaultConfig({
            owner: owner_,
            minimumDeposit: minimumDeposit_,
            platformFeeBps: platformFeeBps_
        });
    }

    function createDeposit(uint256 unlockAt) external payable returns (uint256 depositId) {
        if (msg.value < vaultConfig.minimumDeposit) revert DepositTooSmall();
        if (unlockAt <= block.timestamp) revert UnlockTimeMustBeInFuture();

        depositId = nextDepositId;
        nextDepositId += 1;

        deposits[depositId] = DepositRecord({
            depositor: msg.sender,
            amount: msg.value,
            unlockAt: unlockAt,
            claimed: false
        });

        emit DepositCreated(depositId, msg.sender, msg.value, unlockAt);
    }

    function claimDeposit(uint256 depositId) external {
        DepositRecord storage deposit = deposits[depositId];

        if (deposit.depositor != msg.sender) revert NotDepositOwner();
        if (deposit.claimed) revert DepositAlreadyClaimed();
        if (deposit.unlockAt > block.timestamp) revert DepositStillLocked();

        deposit.claimed = true;

        uint256 fee = (deposit.amount * vaultConfig.platformFeeBps) / 10_000;
        uint256 payout = deposit.amount - fee;

        (bool ownerPaid, ) = payable(vaultConfig.owner).call{value: fee}("");
        require(ownerPaid, "Failed to transfer owner fee");

        (bool depositorPaid, ) = payable(msg.sender).call{value: payout}("");
        require(depositorPaid, "Failed to transfer payout");

        emit DepositClaimed(depositId, msg.sender, deposit.amount);
    }

    function getDeposit(uint256 depositId) external view returns (DepositRecord memory) {
        return deposits[depositId];
    }
}
