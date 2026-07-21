import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import hre from "hardhat";

describe("StudyVault", function () {
  async function deployFixture() {
    const [owner, alice] = await hre.ethers.getSigners();
    const minimumDeposit = hre.ethers.parseEther("0.01");
    const platformFeeBps = 50n;
    const StudyVault = await hre.ethers.getContractFactory("StudyVault");
    const vault = await StudyVault.deploy(owner.address, minimumDeposit, platformFeeBps);
    await vault.waitForDeployment();

    return { vault, owner, alice, minimumDeposit, platformFeeBps };
  }

  it("creates a locked deposit", async function () {
    const { vault, alice, minimumDeposit } = await deployFixture();
    const unlockAt = (await time.latest()) + 3600;

    await expect(vault.connect(alice).createDeposit(unlockAt, { value: minimumDeposit }))
      .to.emit(vault, "DepositCreated")
      .withArgs(0n, alice.address, minimumDeposit, unlockAt);

    const record = await vault.getDeposit(0);
    expect(record.depositor).to.equal(alice.address);
    expect(record.amount).to.equal(minimumDeposit);
    expect(record.claimed).to.equal(false);
  });

  it("rejects deposits below the minimum", async function () {
    const { vault, alice } = await deployFixture();
    const unlockAt = (await time.latest()) + 3600;

    await expect(
      vault.connect(alice).createDeposit(unlockAt, {
        value: hre.ethers.parseEther("0.001")
      })
    ).to.be.revertedWithCustomError(vault, "DepositTooSmall");
  });

  it("releases funds after unlock time with fee split", async function () {
    const { vault, owner, alice, minimumDeposit } = await deployFixture();
    const unlockAt = (await time.latest()) + 60;

    await vault.connect(alice).createDeposit(unlockAt, { value: minimumDeposit });
    await time.increaseTo(unlockAt + 1);

    const ownerBefore = await hre.ethers.provider.getBalance(owner.address);
    await expect(vault.connect(alice).claimDeposit(0))
      .to.emit(vault, "DepositClaimed")
      .withArgs(0n, alice.address, minimumDeposit);

    const record = await vault.getDeposit(0);
    expect(record.claimed).to.equal(true);

    const ownerAfter = await hre.ethers.provider.getBalance(owner.address);
    expect(ownerAfter).to.be.greaterThan(ownerBefore);
  });
});
