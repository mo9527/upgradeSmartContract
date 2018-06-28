var config = require('./util/config');
var Web3 = require('web3');
var TruffleContract = require('truffle-contract');
var abi = require('../build/contracts/MainContract.json').abi;
var abiv1 = require('../build/contracts/MainContractV1.json').abi;
var abiv2 = require('../build/contracts/MainContractV2.json').abi;
var hdProvider = require('./util/DefaultProvider').provider();
var web3 = new Web3(hdProvider);
var ethUtil = require('./util/EthUtils');
var _  = require('lodash');

var contract = TruffleContract({
    abi: abi
});

contract.setProvider(hdProvider);
contract.defaults({
    from: config.account.owner //this address should be lowercase
});

const main = '0xac2700987ed5a84be54d6cf0f9c47a96358c6631';
const v1 = '0x35432e951b81e1dcb6377da0675d0a02dc58b702';
const v2 = '0xe2be043891a223ea4b3895051b28802d4054fdbb';
const testAccount = '0xf59e7ccc2445f5641930e20dcb59115b4f0235d2';


async function upgradeContract(newContract) {
    contract.abi = abi;
    var mainContract = await contract.at(main);

    await mainContract.upgradeTo(newContract);

    console.log('success upgrade to ' + newContract)
}


async function version1() {

    contract.abi = abiv1;
    var mainContract = await contract.at(main);



    await mainContract.setN(8);

     mainContract.getN().then(function (result) {
         console.log("v1 n is : " + result);
     })


}

_main();

async function _main() {
    await upgradeContract(v1);
    await version1();
}


module.exports.upgradeContract = upgradeContract;