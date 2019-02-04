pragma solidity ^0.5.2;

contract Token{
    address owner;
    
    constructor() public{
        owner = msg.sender;
    }
    
    function getOwner() external view returns(address){
        return owner;
    }

}