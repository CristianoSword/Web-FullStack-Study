import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const initialSupply = hre.ethers.parseUnits("1000000", 18);
  const rewardRatePerSecond = hre.ethers.parseUnits("0.1", 18);
  const rewardFunding = hre.ethers.parseUnits("100000", 18);

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

  console.log(
    JSON.stringify(
      {
        deployer: deployer.address,
        stakingToken: await stakingToken.getAddress(),
        rewardToken: await rewardToken.getAddress(),
        pool: await pool.getAddress(),
        rewardRatePerSecond: rewardRatePerSecond.toString(),
        rewardFunding: rewardFunding.toString()
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
