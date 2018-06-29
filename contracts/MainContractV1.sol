pragma solidity ^0.4.17;

import "./StorageStateful.sol";


contract MainContractV1 is StorageStateful {

    function MainContractV1(KeyValueStorage myStorage) public {
        _storage = myStorage;
    }


    function getN() public view returns (uint256){
        return _storage.getUint('n');
    }

    function setN(uint256 newN) public{
        _storage.setUint('n', newN);
    }

}