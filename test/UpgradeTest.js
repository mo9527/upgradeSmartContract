
var KeyValueStorage = artifacts.require("KeyValueStorage");
var MainContract = artifacts.require("UpgradeProxy");
var MainContractV1 = artifacts.require("MainContractV1");
var MainContractV2 = artifacts.require("MainContractV2");
var _  = require('lodash');
var Web3 = require('web3');
var web3 = new Web3();

describe('Storage and upgradability example', async function () {
    // const keyValueStorage = '0xb0eb843e2bbcd9535b9ffcf6319e76c35c76e58e';
    const testAccount = '0xF59E7ccc2445f5641930E20DCb59115b4F0235D2';

    it('upgrade MainContract', async function() {
        this.timeout(1000 * 20);

        let newStorage = await KeyValueStorage.new();
        let keyValueStorage = newStorage.address;


        let storage = await KeyValueStorage.at(keyValueStorage);

        // await storage.setBool(web3.utils.sha3(web3.utils.toHex('contract.storage.initialised')), true);
        let storageAdmin = web3.utils.soliditySha3('access.address', '0x7355f48ad49f356353a52e02342c47ae452ff04e');
        console.log('storageAdmin hex: ' + storageAdmin);
        let checkOwner = await storage.getBool(storageAdmin.substring(2));
        console.log('access.address owner: ' + checkOwner)

        // Deploy the main contract
        let mainContract = await MainContract.new(keyValueStorage);
        console.log("MainContract deploy success : " + mainContract.address);


        // Deploy contract v1
        let contractV1 = await MainContractV1.new(keyValueStorage);
        console.log("MainContractV1 deploy success : " + contractV1.address);

        // Upgrade the main contract to version 1
        await mainContract.upgradeTo(contractV1.address);

        mainContract = await _.extend(mainContract, MainContractV1.at(mainContract.address));

        // set a number in the contract v1
        await mainContract.setN(10);
        let v1NValue = await mainContract.getN();
        console.log('The n value of version 1 :' + v1NValue);

        /**********************************************************************/

        // Deploy contract v2
        let contractV2 = await MainContractV2.new(keyValueStorage);
        console.log("MainContractV2 deploy success : " + contractV2.address);


        // Upgrade the main contract to version 2
        mainContract = await MainContract.at(mainContract.address);
        await mainContract.upgradeTo(contractV2.address);

        mainContract = await _.extend(mainContract, MainContractV2.at(mainContract.address));

        // call the new Function in the contract v2
        await mainContract.newSetFunction(20);
        let v2NValue = await mainContract.newGetFunction();
        console.log('The newFunction result of version 2 :' + JSON.stringify(v2NValue));

        let oldV1N = await mainContract.getN();
        console.log('N of Version 1 value : '+oldV1N.toNumber());


    });
});