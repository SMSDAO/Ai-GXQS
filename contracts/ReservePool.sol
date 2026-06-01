// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReservePool {
    address public admin;
    uint256 public adminAllocation = 33; // 33%

    event ReserveDistributed(uint256 amount, uint256 adminShare);

    constructor() {
        admin = msg.sender;
    }

    function deposit() public payable {}

    function distribute() public {
        require(msg.sender == admin, "Only admin can distribute");
        uint256 balance = address(this).balance;
        uint256 adminShare = (balance * adminAllocation) / 100;
        
        payable(admin).transfer(adminShare);
        // Rest goes to community/development pool
        emit ReserveDistributed(balance, adminShare);
    }
}
