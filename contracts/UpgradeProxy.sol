pragma solidity ^0.4.17;

import "./StorageConsumer.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 The Main contract has no any usage code, it's only for upgrade
 */
contract UpgradeProxy is StorageConsumer,Ownable {

    function UpgradeProxy(KeyValueStorage mystorage) public StorageConsumer(mystorage){
        version = 1;
    }

    event Upgraded(address indexed implementation);

    address internal _implementation;
    uint version;


    function getVersion() public view returns (uint){
        return version;
    }

    function implementation() public view returns (address) {
        return _implementation;
    }

    function upgradeTo(address impl) public onlyOwner {
        require(_implementation != impl);

        //remove the access rights for the old contract
        if(_implementation != 0x0 && _storage.getBool(keccak256("access.address", _implementation)) == true){
            _storage.setBool(keccak256("access.address", _implementation), false);
        }


        _implementation = impl;
        version = version + 1;

        //let the new contract can access the storage
        _storage.setBool(keccak256("access.address", impl), true);

        Upgraded(impl);
    }

    function () payable public {
        address _impl = implementation();
        require(_impl != address(0));
        bytes memory data = msg.data;

        assembly {
            let result := delegatecall(gas, _impl, add(data, 0x20), mload(data), 0, 0)
            let size := returndatasize
            let ptr := mload(0x40)
            returndatacopy(ptr, 0, size)
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

}