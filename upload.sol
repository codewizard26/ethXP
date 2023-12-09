// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract SubmissionNFT is ERC721, ERC721URIStorage, Ownable, ERC721Enumerable, ERC721Burnable {

    uint256 public mintAmt;

    // Mapping to store user types
    mapping(address => bool) public researchers;
    mapping(address => bool) public reviewers;

    constructor(
        string memory _name,
        string memory _symbol,
        address _owner
    )
    ERC721(_name, _symbol)
    Ownable(_owner)
    {
    }

    function _mintNFT(
        address _to,
        string memory _tokenURI
    )
    external payable onlyOwner
    {
        require(msg.value >= mintAmt, "Insufficient funds");
        uint256 tokenId = totalSupply();
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function transfer(address receiver, uint256 amount)
    public
    virtual
    {
        _transfer(msg.sender, receiver, amount);
    }

    function setMintNFTAmt(uint256 _amt) external onlyOwner {
        mintAmt = _amt;
    }

    // Function to check if the user is a researcher
    function checkResearcher() public view returns (bool) {
        return researchers[msg.sender];
    }

    // Function to check if the user is a reviewer
    function checkReviewer() public view returns (bool) {
        return reviewers[msg.sender];
    }

    // Function to choose a role if not a researcher or reviewer
    function chooseRole(bool _isResearcher) public {
        require(!researchers[msg.sender] && !reviewers[msg.sender], "Already assigned a role");

        if (_isResearcher) {
            researchers[msg.sender] = true;
        } else {
            reviewers[msg.sender] = true;
        }
    }

    // Override tokenURI function
    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Override supportsInterface function
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721URIStorage, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Override _update function
    function _update(address to, uint256 tokenId, address auth)
    internal
    virtual
    override(ERC721, ERC721Enumerable)
    returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    // Override _increaseBalance function
    function _increaseBalance(address account, uint128 value)
    internal
    virtual
    override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }
}
