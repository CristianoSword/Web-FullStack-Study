// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface INFTMarketplace {
    struct Listing {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool active;
    }

    event Listed(uint256 indexed listingId, address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event Purchased(uint256 indexed listingId, address indexed buyer, uint256 price);
}
