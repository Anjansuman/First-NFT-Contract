//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTToken is ERC721Enumerable, Ownable {

    uint256 tokenPrice = 0.01 ether;
    uint256 public tokenSupply;
    uint256 public nextTokenId = 1;

    constructor() ERC721("NFTToken", "NT") Ownable(msg.sender) {}

    function mintTokens(uint256 supply) public onlyOwner {
        require(supply > 0, "must add atleast 1");
        tokenSupply += supply;
    }

    function purchaseTicket() public payable {
        require(msg.value == tokenPrice, "Incorret ETH amount");
        require(nextTokenId <= tokenSupply, "All tickets sold");

        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    function ticketsOfOwner(address user) public view returns(uint256[] memory) {
        uint256 count = balanceOf(user);
        uint256[] memory ids = new uint256[](count);

        for(uint i = 0; i < count; i++) {
            ids[i] = tokenOfOwnerByIndex(user, i);
        }

        return ids;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

}