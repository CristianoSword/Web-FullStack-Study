import { expect } from "chai";
import hre from "hardhat";

describe("StudyNFTMarketplace", function () {
  async function deployFixture() {
    const [owner, seller, buyer] = await hre.ethers.getSigners();
    const price = hre.ethers.parseEther("1");

    const BackendMastersCollection = await hre.ethers.getContractFactory("BackendMastersCollection");
    const collection = await BackendMastersCollection.deploy(
      "Backend Masters Collection",
      "BMC",
      "ipfs://backend-masters/"
    );
    await collection.waitForDeployment();

    const StudyNFTMarketplace = await hre.ethers.getContractFactory("StudyNFTMarketplace");
    const marketplace = await StudyNFTMarketplace.deploy(500);
    await marketplace.waitForDeployment();

    await collection.mintTo(seller.address, "1.json");

    return { collection, marketplace, owner, seller, buyer, price };
  }

  it("mints nft to seller", async function () {
    const { collection, seller } = await deployFixture();

    expect(await collection.ownerOf(0)).to.equal(seller.address);
    expect(await collection.tokenURI(0)).to.equal("ipfs://backend-masters/1.json");
  });

  it("lists nft in marketplace", async function () {
    const { collection, marketplace, seller, price } = await deployFixture();

    await collection.connect(seller).approve(await marketplace.getAddress(), 0);
    await expect(
      marketplace.connect(seller).listItem(await collection.getAddress(), 0, price)
    ).to.emit(marketplace, "Listed");

    const listing = await marketplace.listings(0);
    expect(listing.active).to.equal(true);
    expect(listing.seller).to.equal(seller.address);
  });

  it("purchases listed nft and transfers ownership", async function () {
    const { collection, marketplace, seller, buyer, price } = await deployFixture();

    await collection.connect(seller).approve(await marketplace.getAddress(), 0);
    await marketplace.connect(seller).listItem(await collection.getAddress(), 0, price);

    await expect(
      marketplace.connect(buyer).purchase(0, { value: price })
    ).to.emit(marketplace, "Purchased");

    expect(await collection.ownerOf(0)).to.equal(buyer.address);
    const listing = await marketplace.listings(0);
    expect(listing.active).to.equal(false);
  });
});
