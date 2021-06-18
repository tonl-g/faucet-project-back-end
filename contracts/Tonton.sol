// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Tonton
/// @author Ton LY-GONNEVILLE
/// @notice Tonton is a basic ERC20
/// @dev A function to return token owner's address has been added

contract Tonton is ERC20 {
    constructor(address owner_, uint256 initialSupply) ERC20("Tonton", "TON") {
        _mint(owner_, initialSupply);
    }
}
