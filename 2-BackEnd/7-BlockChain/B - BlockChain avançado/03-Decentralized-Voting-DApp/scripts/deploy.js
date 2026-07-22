import hre from "hardhat";
import electionConfig from "../config/election.config.json" with { type: "json" };

async function main() {
  const now = Math.floor(Date.now() / 1000);
  const startsAt = now + 60;
  const endsAt = startsAt + 86400;

  const VotingElection = await hre.ethers.getContractFactory("VotingElection");
  const election = await VotingElection.deploy(
    electionConfig.title,
    startsAt,
    endsAt,
    electionConfig.candidates
  );

  await election.waitForDeployment();

  console.log(
    JSON.stringify(
      {
        contractAddress: await election.getAddress(),
        title: electionConfig.title,
        startsAt,
        endsAt,
        candidates: electionConfig.candidates
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
