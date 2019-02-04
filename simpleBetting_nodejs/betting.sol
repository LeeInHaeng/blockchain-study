pragma solidity ^0.5.2;

import "./safemath.sol";
import "./ownable.sol";

contract Betting is Ownable{
    uint private minimumBet;
    uint private totalBetOne;
    uint private totalBetTwo;
    
    address[] private players;
    
    using SafeMath for uint256;
    
    /// amountBet : player's betting value
    /// teamSelected : select 1 or 2
    struct Player{
        uint256 amountBet;
        uint16 teamSelected;
    }
    
    mapping(address => Player) playerInfo;
    
    constructor() public {
        minimumBet = 1; // ether
    }
    
    function setMinimumBet(uint256 _minimumBet) public onlyOwner {
        minimumBet = _minimumBet;
    }
    
    function checkPlayerExist(address _playerAddress) public view returns(bool){
        for(uint i=0; i<players.length; i++){
            if(players[i]==_playerAddress){
                return true;
            }
        }
        return false;
    }
    
    function bet(uint8 _teamSelected, uint256 _amount) public {
        /// already betting player denied
        require(!checkPlayerExist(msg.sender));
        /// player must pay more than minimumBet
        require(_amount >= minimumBet);
        
        playerInfo[msg.sender].amountBet = _amount;
        playerInfo[msg.sender].teamSelected = _teamSelected;
        players.push(msg.sender);
        
        if(_teamSelected == 1){
            totalBetOne = totalBetOne.add(_amount);
        }
        else{
            totalBetTwo = totalBetTwo.add(_amount);
        }
    }
    
    function getWinners(uint16 _winnerTeam) external view returns(address[] memory, uint[] memory, uint[] memory) {
        uint winnerCount = 0;
        uint winnerBet = 0;
        uint lossBet = 0;

        if(_winnerTeam==1){
            winnerBet = totalBetOne;
            lossBet = totalBetTwo;
        }
        else{
            winnerBet = totalBetTwo;
            lossBet = totalBetOne;
        }
        
        for(uint i=0; i<players.length; i++){
            if(playerInfo[players[i]].teamSelected == _winnerTeam){
                winnerCount = winnerCount.add(1);
            }
        }
        
        /// impossible dynamic array return
        address[] memory winnerPlayers = new address[](winnerCount);
        uint[] memory betMoney = new uint[](winnerCount);
        uint[] memory transferMoney = new uint[](winnerCount);
        
        uint tmpCnt = 0;
        for(uint i=0; i<players.length; i++){
            if(playerInfo[players[i]].teamSelected == _winnerTeam){
                winnerPlayers[tmpCnt] = players[i];
                tmpCnt = tmpCnt.add(1);
            }
        }
        
        if(winnerCount != 0){
            for(uint j=0; j<winnerCount; j++){
                betMoney[j] = playerInfo[winnerPlayers[j]].amountBet;
                transferMoney[j] = betMoney[j].mul(lossBet).mul(1000).div(winnerBet);
            }
        }
        
        /// impossible float calculate. so, pass to nodejs
        return(winnerPlayers, betMoney, transferMoney);
        
    }
    
    function initBetting() public {
        /// init var
        /*
        totalBetOne = 0;
        totalBetTwo = 0;
        */
        delete totalBetOne;
        delete totalBetTwo;
        for(uint k=0; k<players.length; k++){
            delete playerInfo[players[k]];
        }
        delete players;
    }
    
    function getTotalBetOne() external view returns(uint){
        return totalBetOne;
    }
    function getTotalBetTwo() external view returns(uint){
        return totalBetTwo;
    }
    function getPlayerLength() external view returns(uint){
        return players.length;
    }
}