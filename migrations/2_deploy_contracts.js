var LotteryStorage = artifacts.require("./lottery.sol");

module.exports = function(deployer) {
  deployer.deploy(LotteryStorage);
};
