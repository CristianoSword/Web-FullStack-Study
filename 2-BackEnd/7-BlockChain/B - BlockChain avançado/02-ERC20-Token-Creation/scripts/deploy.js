import hre from "hardhat";
import tokenConfig from "../config/token.config.json" with { type: "json" };

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const config = tokenConfig[hre.network.name] ?? tokenConfig.hardhat;

  const StudyToken = await hre.ethers.getContractFactory("StudyToken");
  const token = await StudyToken.deploy(
    config.name,
    config.symbol,
    config.cap,
    config.initialSupply,
    deployer.address
  );

  await token.waitForDeployment();

  console.log(
    JSON.stringify(
      {
        network: hre.network.name,
        deployer: deployer.address,
        tokenAddress: await token.getAddress(),
        name: config.name,
        symbol: config.symbol,
        cap: config.cap,
        initialSupply: config.initialSupply
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
