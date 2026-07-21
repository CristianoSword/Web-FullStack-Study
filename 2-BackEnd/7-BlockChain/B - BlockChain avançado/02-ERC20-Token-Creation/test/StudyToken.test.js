import { expect } from "chai";
import hre from "hardhat";

describe("StudyToken", function () {
  async function deployFixture() {
    const [owner, alice, bob] = await hre.ethers.getSigners();
    const cap = hre.ethers.parseUnits("1000000", 18);
    const initialSupply = hre.ethers.parseUnits("250000", 18);
    const mintAmount = hre.ethers.parseUnits("1000", 18);

    const StudyToken = await hre.ethers.getContractFactory("StudyToken");
    const token = await StudyToken.deploy(
      "StudyToken",
      "STDY",
      cap,
      initialSupply,
      owner.address
    );

    await token.waitForDeployment();

    return { token, owner, alice, bob, cap, initialSupply, mintAmount };
  }

  it("mints the initial supply to treasury", async function () {
    const { token, owner, initialSupply } = await deployFixture();

    expect(await token.treasuryWallet()).to.equal(owner.address);
    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("allows owner minting with reason", async function () {
    const { token, alice, mintAmount } = await deployFixture();

    await expect(token.mint(alice.address, mintAmount, "Rewards distribution"))
      .to.emit(token, "TokensMinted")
      .withArgs(alice.address, mintAmount, "Rewards distribution");

    expect(await token.balanceOf(alice.address)).to.equal(mintAmount);
  });

  it("rejects minting by non-owner", async function () {
    const { token, alice, mintAmount } = await deployFixture();

    await expect(
      token.connect(alice).mint(alice.address, mintAmount, "Unauthorized")
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("supports transfer and allowance flow", async function () {
    const { token, owner, alice, bob } = await deployFixture();
    const transferAmount = hre.ethers.parseUnits("200", 18);
    const delegatedAmount = hre.ethers.parseUnits("50", 18);

    await token.transfer(alice.address, transferAmount);
    await token.connect(alice).approve(bob.address, delegatedAmount);
    await token.connect(bob).transferFrom(alice.address, bob.address, delegatedAmount);

    expect(await token.balanceOf(alice.address)).to.equal(transferAmount - delegatedAmount);
    expect(await token.balanceOf(bob.address)).to.equal(delegatedAmount);
    expect(await token.balanceOf(owner.address)).to.be.lessThan(
      hre.ethers.parseUnits("250000", 18)
    );
  });

  it("does not allow minting above cap", async function () {
    const { token, alice, cap, initialSupply } = await deployFixture();
    const overflowAmount = cap - initialSupply + 1n;

    await expect(
      token.mint(alice.address, overflowAmount, "Cap overflow")
    ).to.be.revertedWithCustomError(token, "ERC20ExceededCap");
  });
});
