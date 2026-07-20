import hre from "hardhat";
import deploymentConfig from "../config/deployment.config.json" with { type: "json" };

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;
  const config = deploymentConfig[networkName] ?? deploymentConfig.hardhat;

  const StudyVault = await hre.ethers.getContractFactory("StudyVault");
  const contract = await StudyVault.deploy(
    deployer.address,
    config.minimumDepositWei,
    config.platformFeeBps
  );

  await contract.waitForDeployment();

  console.log(
    JSON.stringify(
      {
        network: networkName,
        deployer: deployer.address,
        address: await contract.getAddress(),
        minimumDepositWei: config.minimumDepositWei,
        platformFeeBps: config.platformFeeBps
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
