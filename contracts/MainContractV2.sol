pragma solidity ^0.4.17;

import "./StorageStateful.sol";


contract MainContractV2 is StorageStateful {
    function MainContractV2(KeyValueStorage myStorage) public {
        _storage = myStorage;

    }


    function newSetFunction(uint256 n) public{
        _storage.setUint("newSet", n);
    }

    function newGetFunction() public view returns(uint256){

        return _storage.getUint("newSet");
    }
}