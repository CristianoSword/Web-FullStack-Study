import hre from "hardhat";
import collectionConfig from "../config/collection.config.json" with { type: "json" };

async function main() {
  const BackendMastersCollection = await hre.ethers.getContractFactory("BackendMastersCollection");
  const collection = await BackendMastersCollection.deploy(
    collectionConfig.name,
    collectionConfig.symbol,
    collectionConfig.baseTokenURI
  );
  await collection.waitForDeployment();

  const StudyNFTMarketplace = await hre.ethers.getContractFactory("StudyNFTMarketplace");
  const marketplace = await StudyNFTMarketplace.deploy(collectionConfig.royaltyBps);
  await marketplace.waitForDeployment();

  console.log(
    JSON.stringify(
      {
        collection: await collection.getAddress(),
        marketplace: await marketplace.getAddress(),
        name: collectionConfig.name,
        symbol: collectionConfig.symbol,
        royaltyBps: collectionConfig.royaltyBps
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
