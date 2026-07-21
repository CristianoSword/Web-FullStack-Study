import hre from "hardhat";
import tokenConfig from "../config/token.config.json" with { type: "json" };

async function main() {
  const tokenAddress = process.env.TOKEN_ADDRESS;
  const recipient = process.env.RECIPIENT;
  const reason = process.env.MINT_REASON ?? "Study mint";
  const config = tokenConfig[hre.network.name] ?? tokenConfig.hardhat;

  if (!tokenAddress || !recipient) {
    throw new Error("Set TOKEN_ADDRESS and RECIPIENT before running mint.");
  }

  const token = await hre.ethers.getContractAt("StudyToken", tokenAddress);
  const tx = await token.mint(recipient, config.mintAmount, reason);
  const receipt = await tx.wait();

  console.log(
    JSON.stringify(
      {
        tokenAddress,
        recipient,
        amount: config.mintAmount,
        reason,
        transactionHash: receipt.hash
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
