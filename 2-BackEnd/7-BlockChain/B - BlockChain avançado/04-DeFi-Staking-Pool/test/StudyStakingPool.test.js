import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import hre from "hardhat";

describe("StudyStakingPool", function () {
  async function deployFixture() {
    const [owner, alice] = await hre.ethers.getSigners();
    const initialSupply = hre.ethers.parseUnits("1000000", 18);
    const rewardRatePerSecond = hre.ethers.parseUnits("1", 18);
    const rewardFunding = hre.ethers.parseUnits("50000", 18);
    const stakeAmount = hre.ethers.parseUnits("100", 18);

    const StudyStakeToken = await hre.ethers.getContractFactory("StudyStakeToken");
    const stakingToken = await StudyStakeToken.deploy("Stake Token", "STK", initialSupply);
    const rewardToken = await StudyStakeToken.deploy("Reward Token", "RWD", initialSupply);
    await stakingToken.waitForDeployment();
    await rewardToken.waitForDeployment();

    const StudyStakingPool = await hre.ethers.getContractFactory("StudyStakingPool");
    const pool = await StudyStakingPool.deploy(
      await stakingToken.getAddress(),
      await rewardToken.getAddress(),
      rewardRatePerSecond
    );
    await pool.waitForDeployment();

    await rewardToken.approve(await pool.getAddress(), rewardFunding);
    await pool.fundRewards(rewardFunding);
    await stakingToken.mint(alice.address, stakeAmount);
    await stakingToken.connect(alice).approve(await pool.getAddress(), stakeAmount);

    return { pool, stakingToken, rewardToken, owner, alice, stakeAmount };
  }

  it("accepts stake and updates totals", async function () {
    const { pool, alice, stakeAmount } = await deployFixture();

    await expect(pool.connect(alice).stake(stakeAmount))
      .to.emit(pool, "Staked")
      .withArgs(alice.address, stakeAmount);

    expect(await pool.totalStaked()).to.equal(stakeAmount);
    const userStake = await pool.userStakes(alice.address);
    expect(userStake.amount).to.equal(stakeAmount);
  });

  it("accrues rewards over time and pays them on claim", async function () {
    const { pool, rewardToken, alice, stakeAmount } = await deployFixture();

    await pool.connect(alice).stake(stakeAmount);
    await time.increase(120);

    const pending = await pool.pendingRewards(alice.address);
    expect(pending).to.be.greaterThan(0n);

    const balanceBefore = await rewardToken.balanceOf(alice.address);
    await expect(pool.connect(alice).claimRewards()).to.emit(pool, "RewardClaimed");
    const balanceAfter = await rewardToken.balanceOf(alice.address);

    expect(balanceAfter).to.be.greaterThan(balanceBefore);
  });

  it("allows unstake after staking", async function () {
    const { pool, stakingToken, alice, stakeAmount } = await deployFixture();

    await pool.connect(alice).stake(stakeAmount);
    const partialUnstake = hre.ethers.parseUnits("40", 18);

    await expect(pool.connect(alice).unstake(partialUnstake))
      .to.emit(pool, "Unstaked")
      .withArgs(alice.address, partialUnstake);

    expect(await stakingToken.balanceOf(alice.address)).to.equal(partialUnstake);
  });
});
