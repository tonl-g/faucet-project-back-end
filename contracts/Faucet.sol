// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Tonton.sol";

contract Faucet is Ownable {
    using Address for address payable;

    // State variables
    Tonton private _tonton;
    address private _tontonOwner;
    uint256 private _nbTonton;
    uint256 private _amountReceived;

    // Events

    // constructor
    constructor(
        address tontonAddress,
        address tontonOwner_,
        uint256 nbTonton_,
        uint256 amountReceived_
    ) {
        _tonton = Tonton(tontonAddress);
        _tontonOwner = tontonOwner_;
        _nbTonton = nbTonton_;
        _amountReceived = amountReceived_;
    }

    // modifiers

    // functions

    function getTonton() public {
        _tonton.transferFrom(_tontonOwner, msg.sender, _amountReceived);
    }

    function tontonOwner() public view returns (address) {
        return _tontonOwner;
    }

    function tontonContractAddress() public view returns (address) {
        return address(_tonton);
    }

    function nbTonton() public view returns (uint256) {
        return _nbTonton;
    }

    function amountReceived() public view returns (uint256) {
        return _amountReceived;
    }

    function remainingSupply() public view returns (uint256) {
        return _tonton.allowance(tontonOwner(), address(this));
    }

}


