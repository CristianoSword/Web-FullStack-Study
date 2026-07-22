import hre from "hardhat";

async function main() {
  const collectionAddress = process.env.COLLECTION_ADDRESS;
  const marketplaceAddress = process.env.MARKETPLACE_ADDRESS;
  const price = process.env.PRICE ?? hre.ethers.parseEther("0.5").toString();

  if (!collectionAddress || !marketplaceAddress) {
    throw new Error("Set COLLECTION_ADDRESS and MARKETPLACE_ADDRESS before running the script.");
  }

  const [owner] = await hre.ethers.getSigners();
  const collection = await hre.ethers.getContractAt("BackendMastersCollection", collectionAddress);
  const marketplace = await hre.ethers.getContractAt("StudyNFTMarketplace", marketplaceAddress);

  const mintTx = await collection.mintTo(owner.address, "1.json");
  await mintTx.wait();

  const tokenId = Number(await collection.nextTokenId()) - 1;
  await collection.approve(marketplaceAddress, tokenId);
  const listTx = await marketplace.listItem(collectionAddress, tokenId, price);
  await listTx.wait();

  console.log(
    JSON.stringify(
      {
        collectionAddress,
        marketplaceAddress,
        tokenId,
        price
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
