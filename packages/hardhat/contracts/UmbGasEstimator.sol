pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@umb-network/toolbox/dist/contracts/IRegistry.sol";
import "@umb-network/toolbox/dist/contracts/IChain.sol";

contract SomeOtherContract {
  uint256 public currentCounter = 0;

  function increment() public returns (uint256) {
    currentCounter += 1;
    return currentCounter;
  }
}

contract UmbGasEstimator {
  IRegistry contractRegistry = IRegistry(0x059FDd69e771645fe91d8E1040320DbB845cEaFd);

  bytes32 ETH_USD_KEY = 0x000000000000000000000000000000000000000000000000004554482d555344;
  bytes32 UMB_USD_KEY = 0x00000000000000000000000000000000000000000000000000554d422d555344;

  event EstimatedGasInUMB(
    address indexed sender,
    address indexed contractAddress,
    bytes data,
    uint256 gasUsedInUmb,
    uint256 gasUsed,
    uint256 gasPrice,
    uint256 etherPriceInUSD,
    uint256 umbPriceInUSD
  );

  function getChainContract() public view returns (IChain) {
    return IChain(contractRegistry.getAddressByString("Chain"));
  }

  function getEthUsdPrice() public view returns (uint256) {
    (uint256 price, ) = getChainContract().getCurrentValue(ETH_USD_KEY);
    return price;
  }

  function getUmbUsdPrice() public view returns (uint256) {
    (uint256 price, ) = getChainContract().getCurrentValue(UMB_USD_KEY);
    return price;
  }

  function estimateArbitraryCallGasInUMB(address contractAddress, bytes memory data) public returns (uint256) {
    uint256 gasLeftBeforeCall = gasleft();

    (bool success, ) = contractAddress.call(data);
    require(success, "call was not successful");

    uint256 gasLeftAfterCall = gasleft();

    uint256 gasUsed = gasLeftBeforeCall - gasLeftAfterCall;
    uint256 etherUsed = tx.gasprice * gasUsed;

    uint256 etherUsd = getEthUsdPrice();
    uint256 umbUsd = getUmbUsdPrice();

    uint256 gasUsedInUsd = etherUsd * etherUsed;
    uint256 gasUsedInUmb = gasUsedInUsd / umbUsd;

    emit EstimatedGasInUMB(
      msg.sender,
      contractAddress,
      data,
      gasUsedInUmb,
      gasUsed,
      tx.gasprice,
      etherUsd,
      umbUsd
    );
    return gasUsedInUmb;
  }
}
/**
0x07DbeBeeE6057a982c83a53EdE8f05264eeA07E8
1000000000
0xd09de08a
 */
