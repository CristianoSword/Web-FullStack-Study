import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import hre from "hardhat";

describe("VotingElection", function () {
  async function deployFixture() {
    const [owner, alice, bob] = await hre.ethers.getSigners();
    const now = await time.latest();
    const startsAt = now + 60;
    const endsAt = startsAt + 3600;

    const VotingElection = await hre.ethers.getContractFactory("VotingElection");
    const election = await VotingElection.deploy(
      "Backend Study Council Election",
      startsAt,
      endsAt,
      ["Alice Validator", "Bob Builder", "Carol Architect"]
    );

    await election.waitForDeployment();

    return { election, owner, alice, bob, startsAt, endsAt };
  }

  it("registers initial proposals", async function () {
    const { election } = await deployFixture();

    expect(await election.proposalCount()).to.equal(3n);
    const proposal = await election.getProposal(0);
    expect(proposal.name).to.equal("Alice Validator");
  });

  it("allows authorized voter to cast one vote during election window", async function () {
    const { election, owner, alice, startsAt } = await deployFixture();

    await election.connect(owner).authorizeVoter(alice.address);
    await time.increaseTo(startsAt + 1);

    await expect(election.connect(alice).vote(1))
      .to.emit(election, "VoteCast")
      .withArgs(alice.address, 1n, 1n);

    const proposal = await election.getProposal(1);
    expect(proposal.voteCount).to.equal(1n);
  });

  it("blocks duplicate votes", async function () {
    const { election, owner, alice, startsAt } = await deployFixture();

    await election.connect(owner).authorizeVoter(alice.address);
    await time.increaseTo(startsAt + 1);
    await election.connect(alice).vote(0);

    await expect(election.connect(alice).vote(1)).to.be.revertedWithCustomError(
      election,
      "DuplicateVote"
    );
  });

  it("blocks unauthorized voters", async function () {
    const { election, bob, startsAt } = await deployFixture();

    await time.increaseTo(startsAt + 1);
    await expect(election.connect(bob).vote(0)).to.be.revertedWithCustomError(
      election,
      "VoterNotAllowed"
    );
  });

  it("blocks voting after election closes", async function () {
    const { election, owner, alice, endsAt } = await deployFixture();

    await election.connect(owner).authorizeVoter(alice.address);
    await time.increaseTo(endsAt + 1);

    await expect(election.connect(alice).vote(0)).to.be.revertedWithCustomError(
      election,
      "ElectionClosed"
    );
  });
});
