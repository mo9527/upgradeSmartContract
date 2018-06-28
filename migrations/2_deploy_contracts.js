var KeyValueStorage = artifacts.require("./KeyValueStorage.sol");
var MainContract = artifacts.require("./MainContract.sol");
var MainContractV1 = artifacts.require("./MainContractV1.sol");
var MainContractV2 = artifacts.require("./MainContractV2.sol");
// var UpgradeTest = require("../src/UpgradeToTest");

const storageAddr = '0x5e0a67baf5b0305946b9138234029d8f440103cc';

module.exports = function(deployer) {
    deployer.deploy(MainContract, storageAddr).then(function () {
        deployer.deploy(MainContractV1, storageAddr).then(function () {
            deployer.deploy(MainContractV2, storageAddr)
        })
    });

};