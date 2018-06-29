var KeyValueStorage = artifacts.require("./KeyValueStorage.sol");
var UpgradeProxy = artifacts.require("./UpgradeProxy.sol");
var MainContractV1 = artifacts.require("./MainContractV1.sol");
var MainContractV2 = artifacts.require("./MainContractV2.sol");
// var UpgradeTest = require("../src/UpgradeToTest");

var storageAddr = '0xb0eb843e2bbcd9535b9ffcf6319e76c35c76e58e';

module.exports = function(deployer) {
    /*deployer.deploy(KeyValueStorage).then(function () {
        // storageAddr = KeyValueStorage.address;
        console.log('The KeyValueStorage address is : ' + storageAddr)

        deployer.deploy(UpgradeProxy, storageAddr).then(function () {
            deployer.deploy(MainContractV1, storageAddr).then(function () {
                deployer.deploy(MainContractV2, storageAddr)
            })
        })
    });*/

};