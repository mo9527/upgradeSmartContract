pragma solidity ^0.4.17;

import "./StorageStateful.sol";


contract MainContractV1 is StorageStateful {

    function MainContractV1(KeyValueStorage myStorage) public {
        _storage = myStorage;
    }

    function addAmount(address _addr, uint256 _addAmount) public view returns (bool){
        uint256 amount = _storage.getAddrUintMap('banlance', _addr);

        _storage.setAddrUintMap("balance", _addr, amount + _addAmount);

        return true;
    }

    function getAmount(address _addr) public view returns (uint256){
        return _storage.getAddrUintMap('balance', _addr);
    }


    function getN() public view returns (uint256){
        return _storage.getUint('n');
    }

    function setN(uint256 newN) public{
        _storage.setUint('n', newN);
    }

}