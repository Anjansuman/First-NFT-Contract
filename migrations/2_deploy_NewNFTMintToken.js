// const NFTToken = artifacts.require("NFTToken");

// module.exports = async function(deployer, network, accounts) {
//   await deployer.deploy(NFTToken, {from: accounts[0]});
//   const instance = await NFTToken.deployed();
//   console.log("Contract deployed at:", instance.address);
// };

const NewNFTMintToken = artifacts.require("NewNFTMintToken");

module.exports = function(deployer) {
    deployer.deploy(NewNFTMintToken);
}