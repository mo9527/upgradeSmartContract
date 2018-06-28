var KeyValueStorage = artifacts.require("KeyValueStorage");
var MainContract = artifacts.require("MainContract");
var MainContractV1 = artifacts.require("MainContractV1");
var MainContractV2 = artifacts.require("MainContractV2");
var _  = require('lodash');

describe('Storage and upgradability example', async function () {

    const keyValueStorage = '0x5e0a67baf5b0305946b9138234029d8f440103cc';
    const testAccount = '0xF59E7ccc2445f5641930E20DCb59115b4F0235D2';

    it('upgrade MainContract', async function() {
        this.timeout(1000 * 20);


        // Deploy the main contract
        MainContract = await MainContract.new(keyValueStorage);
        console.log("MainContract deploy success : " + MainContract.address);


        // Deploy contract v1
        let contractV1 = await MainContractV1.new(keyValueStorage);
        console.log("MainContractV1 deploy success : " + contractV1.address);

        // Upgrade the main contract to version 1
        await MainContract.upgradeTo(contractV1.address);

        MainContract = await _.extend(MainContract, MainContractV1.at(MainContract.address));

        // add amount in the contract v1
        await MainContract.addAmount(testAccount, 10);
        let v1Balance = await MainContract.getAmount(testAccount);
        console.log('The balance of version 1 :' + v1Balance);

        /**********************************************************************/

        // Deploy contract v1
        let contractV2 = await MainContractV2.new(keyValueStorage);
        console.log("MainContractV2 deploy success : " + contractV2.address);


        // Upgrade the main contract to version 2
        await MainContract.upgradeTo(contractV2.address);

        MainContract = await _.extend(MainContract, MainContractV2.at(MainContract.address));

        // add amount in the contract v2
        await MainContract.addAmount(testAccount, 20);
        let v2Balance = await MainContract.getAmount(testAccount);
        console.log('The balance of version 2 :' + v2Balance);



    });
});