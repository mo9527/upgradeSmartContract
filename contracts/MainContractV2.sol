pragma solidity ^0.4.17;

import "./StorageStateful.sol";


contract MainContractV2 is StorageStateful {
    function MainContractV2(KeyValueStorage myStorage) public {
        _storage = myStorage;

    }

    function getN() public view returns (uint256){
        return _storage.getUint('n');
    }

    function setN(uint256 newN) public{
        _storage.setUint('n', newN);
    }

    function newSetFunction(uint256 n) public{
        _storage.setUint("newSet", n);
    }

    function newGetFunction() public view returns(uint256){

        return _storage.getUint("newSet");
    }
}