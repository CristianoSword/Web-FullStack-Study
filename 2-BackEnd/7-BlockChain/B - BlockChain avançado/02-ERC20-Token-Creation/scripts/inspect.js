import hre from "hardhat";

async function main() {
  const tokenAddress = process.env.TOKEN_ADDRESS;

  if (!tokenAddress) {
    throw new Error("Set TOKEN_ADDRESS before running inspect.");
  }

  const token = await hre.ethers.getContractAt("StudyToken", tokenAddress);

  console.log(
    JSON.stringify(
      {
        tokenAddress,
        name: await token.name(),
        symbol: await token.symbol(),
        totalSupply: (await token.totalSupply()).toString(),
        cap: (await token.cap()).toString(),
        treasuryWallet: await token.treasuryWallet()
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
