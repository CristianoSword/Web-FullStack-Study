// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IVotingElection {
    struct Proposal {
        uint256 id;
        string name;
        uint256 voteCount;
        bool active;
    }

    event ProposalRegistered(uint256 indexed proposalId, string name);
    event VoteCast(address indexed voter, uint256 indexed proposalId, uint256 weight);

    function vote(uint256 proposalId) external;
    function getProposal(uint256 proposalId) external view returns (Proposal memory);
}
