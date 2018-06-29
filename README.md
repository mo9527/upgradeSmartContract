# upgradeSmartContract


Smart contracts for key-value storage and proxy delegate upgradability pattern.



## Contracts

### KeyValueStorage.sol

A contract that can store up all data for the main contract.

### UpgradeProxy.sol

Proxy contract, there is no any logical code in this contract, it only for upgrade.

### MainContractV1.sol, MainContractV2.sol

Logical contract version 1 and version2.

## Usage
1. deploy KeyValueStorage.sol.
2. deploy UpgradeProxy.sol.
3. deploy MainContractV1.sol.
4. call upgradeTo(MainContractV1.address) to upgrade the contract to version 1.
5. deploy MainContractV2.sol.
4. call upgradeTo(MainContractV2.address) to upgrade the contract to version 2.

### Setup


### Compile

Recompile contracts and build artifacts.

```
$ truffle complie
```

### Test

```
$ truffle test
```