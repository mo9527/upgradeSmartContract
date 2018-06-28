pragma solidity ^0.4.17;

import "./StorageStateful.sol";
import "./Proxy.sol";
import "./StorageConsumer.sol";


/**
    The Main contract has no any usage code, it's only for upgrade
*/
contract MainContract is StorageConsumer, Proxy {

    function MainContract(KeyValueStorage mystorage) public StorageConsumer(mystorage){
        mystorage.setAddress("owner", msg.sender);
    }

}