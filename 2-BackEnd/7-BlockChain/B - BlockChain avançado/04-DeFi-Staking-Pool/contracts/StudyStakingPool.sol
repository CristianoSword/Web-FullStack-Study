// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IStakingPool} from "./interfaces/IStakingPool.sol";

contract StudyStakingPool is Ownable, IStakingPool {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardToken;
    uint256 public immutable rewardRatePerSecond;
    uint256 public constant REWARD_PRECISION = 1e18;

    mapping(address => UserStake) public userStakes;

    uint256 public totalStaked;
    uint256 public accRewardPerShare;
    uint256 public lastRewardTimestamp;

    error InvalidAmount();
    error InsufficientStake();

    constructor(
        address stakingToken_,
        address rewardToken_,
        uint256 rewardRatePerSecond_
    ) Ownable(msg.sender) {
        stakingToken = IERC20(stakingToken_);
        rewardToken = IERC20(rewardToken_);
        rewardRatePerSecond = rewardRatePerSecond_;
        lastRewardTimestamp = block.timestamp;
    }

    function stake(uint256 amount) external {
        if (amount == 0) revert InvalidAmount();

        _updatePool();
        UserStake storage user = userStakes[msg.sender];

        if (user.amount > 0) {
            user.pendingRewards += _pending(user);
        }

        stakingToken.transferFrom(msg.sender, address(this), amount);
        user.amount += amount;
        totalStaked += amount;
        user.rewardDebt = (user.amount * accRewardPerShare) / REWARD_PRECISION;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        if (amount == 0) revert InvalidAmount();

        _updatePool();
        UserStake storage user = userStakes[msg.sender];
        if (user.amount < amount) revert InsufficientStake();

        user.pendingRewards += _pending(user);
        user.amount -= amount;
        totalStaked -= amount;
        user.rewardDebt = (user.amount * accRewardPerShare) / REWARD_PRECISION;

        stakingToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external {
        _updatePool();
        UserStake storage user = userStakes[msg.sender];

        uint256 rewardAmount = user.pendingRewards + _pending(user);
        user.pendingRewards = 0;
        user.rewardDebt = (user.amount * accRewardPerShare) / REWARD_PRECISION;

        rewardToken.transfer(msg.sender, rewardAmount);
        emit RewardClaimed(msg.sender, rewardAmount);
    }

    function pendingRewards(address account) external view returns (uint256) {
        UserStake storage user = userStakes[account];
        uint256 updatedAccRewardPerShare = accRewardPerShare;

        if (block.timestamp > lastRewardTimestamp && totalStaked > 0) {
            uint256 elapsed = block.timestamp - lastRewardTimestamp;
            uint256 reward = elapsed * rewardRatePerSecond;
            updatedAccRewardPerShare += (reward * REWARD_PRECISION) / totalStaked;
        }

        return user.pendingRewards + ((user.amount * updatedAccRewardPerShare) / REWARD_PRECISION) - user.rewardDebt;
    }

    function fundRewards(uint256 amount) external onlyOwner {
        rewardToken.transferFrom(msg.sender, address(this), amount);
    }

    function _updatePool() internal {
        if (block.timestamp <= lastRewardTimestamp) {
            return;
        }

        if (totalStaked == 0) {
            lastRewardTimestamp = block.timestamp;
            return;
        }

        uint256 elapsed = block.timestamp - lastRewardTimestamp;
        uint256 reward = elapsed * rewardRatePerSecond;
        accRewardPerShare += (reward * REWARD_PRECISION) / totalStaked;
        lastRewardTimestamp = block.timestamp;
    }

    function _pending(UserStake storage user) internal view returns (uint256) {
        return ((user.amount * accRewardPerShare) / REWARD_PRECISION) - user.rewardDebt;
    }
}
