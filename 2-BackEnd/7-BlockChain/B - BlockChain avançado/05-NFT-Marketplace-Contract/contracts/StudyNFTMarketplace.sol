// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {INFTMarketplace} from "./interfaces/INFTMarketplace.sol";

contract StudyNFTMarketplace is Ownable, INFTMarketplace {
    uint256 public nextListingId;
    uint256 public immutable feeBps;
    mapping(uint256 => Listing) public listings;

    error InvalidPrice();
    error ListingNotActive();
    error IncorrectPayment();

    constructor(uint256 feeBps_) Ownable(msg.sender) {
        feeBps = feeBps_;
    }

    function listItem(address nftContract, uint256 tokenId, uint256 price) external returns (uint256 listingId) {
        if (price == 0) revert InvalidPrice();

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listingId = nextListingId;
        nextListingId += 1;

        listings[listingId] = Listing({
            listingId: listingId,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            active: true
        });

        emit Listed(listingId, nftContract, tokenId, msg.sender, price);
    }

    function purchase(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        if (!listing.active) revert ListingNotActive();
        if (msg.value != listing.price) revert IncorrectPayment();

        listing.active = false;

        uint256 fee = (listing.price * feeBps) / 10_000;
        uint256 sellerAmount = listing.price - fee;

        (bool sellerPaid, ) = payable(listing.seller).call{value: sellerAmount}("");
        require(sellerPaid, "Failed seller transfer");

        if (fee > 0) {
            (bool ownerPaid, ) = payable(owner()).call{value: fee}("");
            require(ownerPaid, "Failed fee transfer");
        }

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        emit Purchased(listingId, msg.sender, listing.price);
    }
}
