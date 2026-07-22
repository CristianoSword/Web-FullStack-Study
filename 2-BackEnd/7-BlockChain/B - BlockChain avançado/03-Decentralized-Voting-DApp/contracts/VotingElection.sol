// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IVotingElection} from "./interfaces/IVotingElection.sol";

contract VotingElection is Ownable, IVotingElection {
    string public electionTitle;
    uint64 public startsAt;
    uint64 public endsAt;
    uint256 public proposalCount;

    mapping(uint256 => Proposal) private proposals;
    mapping(address => bool) public allowedVoters;
    mapping(address => bool) public hasVoted;

    error ElectionNotStarted();
    error ElectionClosed();
    error VoterNotAllowed();
    error DuplicateVote();
    error ProposalNotFound();
    error InvalidElectionWindow();
    error InvalidVoter();

    event VoterAuthorized(address indexed voter);

    constructor(
        string memory title_,
        uint64 startsAt_,
        uint64 endsAt_,
        string[] memory candidateNames
    ) Ownable(msg.sender) {
        if (endsAt_ <= startsAt_) revert InvalidElectionWindow();

        electionTitle = title_;
        startsAt = startsAt_;
        endsAt = endsAt_;

        for (uint256 index = 0; index < candidateNames.length; index++) {
            proposals[index] = Proposal({
                id: index,
                name: candidateNames[index],
                voteCount: 0,
                active: true
            });

            emit ProposalRegistered(index, candidateNames[index]);
        }

        proposalCount = candidateNames.length;
    }

    function authorizeVoter(address voter) external onlyOwner {
        if (voter == address(0)) revert InvalidVoter();
        allowedVoters[voter] = true;
        emit VoterAuthorized(voter);
    }

    function vote(uint256 proposalId) external {
        if (block.timestamp < startsAt) revert ElectionNotStarted();
        if (block.timestamp > endsAt) revert ElectionClosed();
        if (!allowedVoters[msg.sender]) revert VoterNotAllowed();
        if (hasVoted[msg.sender]) revert DuplicateVote();
        if (proposalId >= proposalCount || !proposals[proposalId].active) revert ProposalNotFound();

        hasVoted[msg.sender] = true;
        proposals[proposalId].voteCount += 1;

        emit VoteCast(msg.sender, proposalId, 1);
    }

    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        if (proposalId >= proposalCount) revert ProposalNotFound();
        return proposals[proposalId];
    }

    function getResults() external view returns (Proposal[] memory result) {
        result = new Proposal[](proposalCount);

        for (uint256 index = 0; index < proposalCount; index++) {
          result[index] = proposals[index];
        }
    }
}
