pragma solidity ^0.4.17;

import "./StorageStateful.sol";


contract MainContractV2 is StorageStateful {
    uint256 n = 20;

    function MainContractV2(KeyValueStorage myStorage) public {
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

    function newSetFunction(uint256 n) public returns(bool){
        _storage.setAddrUintMap("testAddrUintStorage", msg.sender, n);
    }

    function newGetFunction() public returns (uint256){

        return _storage.getAddrUintMap("testAddrUintStorage", msg.sender);
    }
}