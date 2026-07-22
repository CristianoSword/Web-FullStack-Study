// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IStakingPool {
    struct UserStake {
        uint256 amount;
        uint256 rewardDebt;
        uint256 pendingRewards;
    }

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
}
