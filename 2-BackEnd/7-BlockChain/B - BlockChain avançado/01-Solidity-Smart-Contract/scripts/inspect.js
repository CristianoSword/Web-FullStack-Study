import hre from "hardhat";

async function main() {
  const address = process.env.CONTRACT_ADDRESS;

  if (!address) {
    throw new Error("Set CONTRACT_ADDRESS before running inspect.");
  }

  const contract = await hre.ethers.getContractAt("StudyVault", address);
  const config = await contract.vaultConfig();

  console.log(
    JSON.stringify(
      {
        contractAddress: address,
        owner: config.owner,
        minimumDeposit: config.minimumDeposit.toString(),
        platformFeeBps: config.platformFeeBps.toString()
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
