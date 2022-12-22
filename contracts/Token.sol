// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token {
    address public owner;
    string public name = "BLOCK";
    string public symbol = "BLK";
    mapping(address => uint256) public balances;
    uint256 public totalSupply = 10000;

constructor(){
    owner = msg.sender;
    balances[owner] = totalSupply;
    }

function transfer(address to, uint256 tokens) public {
    require(balances[msg.sender] >= tokens,"Insufficient balance");
    balances[msg.sender] -= tokens;
    balances[to] += tokens;
    }

function balanceOf(address account) public view returns (uint256){
    return balances[account];
    }
    
}