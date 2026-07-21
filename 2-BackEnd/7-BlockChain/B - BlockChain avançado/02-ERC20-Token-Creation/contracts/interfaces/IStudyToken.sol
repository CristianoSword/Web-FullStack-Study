// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IStudyToken {
    event TokensMinted(address indexed to, uint256 amount, string reason);
    event TreasuryWalletUpdated(address indexed previousTreasury, address indexed newTreasury);

    function mint(address to, uint256 amount, string calldata reason) external;
    function treasuryWallet() external view returns (address);
    function cap() external view returns (uint256);
}
