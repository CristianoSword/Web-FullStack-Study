// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IStudyToken} from "./interfaces/IStudyToken.sol";

contract StudyToken is ERC20, ERC20Capped, Ownable, IStudyToken {
    address public treasuryWallet;

    error InvalidTreasuryWallet();
    error MintReasonRequired();

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 cap_,
        uint256 initialSupply_,
        address treasuryWallet_
    ) ERC20(name_, symbol_) ERC20Capped(cap_) Ownable(msg.sender) {
        if (treasuryWallet_ == address(0)) revert InvalidTreasuryWallet();

        treasuryWallet = treasuryWallet_;
        _mint(treasuryWallet_, initialSupply_);
    }

    function mint(address to, uint256 amount, string calldata reason) external onlyOwner {
        if (bytes(reason).length == 0) revert MintReasonRequired();
        _mint(to, amount);
        emit TokensMinted(to, amount, reason);
    }

    function updateTreasuryWallet(address newTreasuryWallet) external onlyOwner {
        if (newTreasuryWallet == address(0)) revert InvalidTreasuryWallet();

        address previousTreasury = treasuryWallet;
        treasuryWallet = newTreasuryWallet;

        emit TreasuryWalletUpdated(previousTreasury, newTreasuryWallet);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Capped)
    {
        super._update(from, to, value);
    }
}
