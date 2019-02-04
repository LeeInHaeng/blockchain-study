pragma solidity ^0.5.1;

contract Voting{
    // constructor to initialize candidates
    // vote for candidates
    // get count of votes for each candidates
    
    bytes32[] public candidateList;
    mapping (bytes32 => uint8) public votesReceived;
    constructor() public {
        candidateList = [stringToBytes32("Rama"), stringToBytes32("Nick"), stringToBytes32("Jose")];
    }
    
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }
    
    function totalVotesFor(bytes32 candidate) view public returns(uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }
    
    function validCandidate(bytes32 candidate) view public returns(bool) {
        for(uint i=0; i<candidateList.length; i++){
            if(candidateList[i]==candidate){
                return true;
            }
        }
        return false;
    }
    
    function stringToBytes32(string memory source) view public returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }
}