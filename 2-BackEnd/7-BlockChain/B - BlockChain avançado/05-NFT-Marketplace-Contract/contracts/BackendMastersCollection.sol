// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BackendMastersCollection is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    string public baseTokenURI;

    constructor(string memory name_, string memory symbol_, string memory baseTokenURI_)
        ERC721(name_, symbol_)
        Ownable(msg.sender)
    {
        baseTokenURI = baseTokenURI_;
    }

    function mintTo(address to, string calldata tokenUriSuffix) external onlyOwner returns (uint256 tokenId) {
        tokenId = nextTokenId;
        nextTokenId += 1;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, string.concat(baseTokenURI, tokenUriSuffix));
    }
}
