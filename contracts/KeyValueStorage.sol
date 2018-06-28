pragma solidity ^0.4.18;

contract KeyValueStorage {

    mapping(address => mapping(bytes32 => uint256)) _uintStorage;
    mapping(address => mapping(bytes32 => address)) _addressStorage;
    mapping(address => mapping(bytes32 => bool)) _boolStorage;
    mapping(address => mapping(bytes32 => mapping(address => uint256))) _addrUintMapStorage;
    mapping(address => mapping(bytes32 => mapping(address => bool))) _addrBoolMapStorage;

    /**** Get Methods ***********/

    function getAddress(bytes32 key) public view returns (address) {
        return _addressStorage[msg.sender][key];
    }

    function getUint(bytes32 key) public view returns (uint) {
        return _uintStorage[msg.sender][key];
    }

    function getBool(bytes32 key) public view returns (bool) {
        return _boolStorage[msg.sender][key];
    }

    function getAddrUintMap(bytes32 paramName, address key) public view returns(uint256){
        return _addrUintMapStorage[msg.sender][paramName][key];
    }

    function getAddrBoolMap(bytes32 paramName, address key) public view returns(bool){
        return _addrBoolMapStorage[msg.sender][paramName][key];
    }

    /**** Set Methods ***********/

    function setAddress(bytes32 key, address value) public {
        _addressStorage[msg.sender][key] = value;
    }

    function setUint(bytes32 key, uint value) public {
        _uintStorage[msg.sender][key] = value;
    }

    function setBool(bytes32 key, bool value) public {
        _boolStorage[msg.sender][key] = value;
    }

    function setAddrUintMap(bytes32 paramName, address key, uint256 value) public {
        _addrUintMapStorage[msg.sender][paramName][key] = value;
    }

    function setAddrBoolMap(bytes32 paramName, address key, bool value) public {
        _addrBoolMapStorage[msg.sender][paramName][key] = value;
    }

    /**** Delete Methods ***********/

    function deleteAddress(bytes32 key) public {
        delete _addressStorage[msg.sender][key];
    }

    function deleteUint(bytes32 key) public {
        delete _uintStorage[msg.sender][key];
    }

    function deleteBool(bytes32 key) public {
        delete _boolStorage[msg.sender][key];
    }

}
