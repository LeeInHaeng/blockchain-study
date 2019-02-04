module.exports = function(server){
    var io = require('socket.io')(server);
    var Web3 = require('web3');
    
    var contractAddress = '0x2ea5021aa92b11d0610964f38ff95a51037e8ed4';
    var abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_teamSelected",
                    "type": "uint8"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "bet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "initBetting",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_minimumBet",
                    "type": "uint256"
                }
            ],
            "name": "setMinimumBet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_playerAddress",
                    "type": "address"
                }
            ],
            "name": "checkPlayerExist",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getPlayerLength",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getTotalBetOne",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getTotalBetTwo",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_winnerTeam",
                    "type": "uint16"
                }
            ],
            "name": "getWinners",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                },
                {
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const web3js = new Web3(provider);
    const simpleBetting = new web3js.eth.Contract(abi, contractAddress);

    io.on('connection',function(socket){
        console.log('a user socketio connected');

        socket.on('disconnect',function(){
            console.log('user disconnected');
        });

        function refreshBetting(){
            var curBettingInfo = {
                bettingCnt : 0,
                oneTeamAmount : 0,
                twoTeamAmount : 0
            }
    
            simpleBetting.methods.getPlayerLength().call()
            .then(res1 => {
                curBettingInfo['bettingCnt'] = res1;
                simpleBetting.methods.getTotalBetOne().call()
                .then(res2 => {
                    curBettingInfo['oneTeamAmount'] = res2;
                    simpleBetting.methods.getTotalBetTwo().call()
                    .then(res3 => {
                        curBettingInfo['twoTeamAmount'] = res3;
                        socket.emit('refreshBetting', curBettingInfo);
                    });
                });
            });
        }

        socket.on('index start',function(){
            refreshBetting();
        });

        socket.on('index betting',data => {
            web3js.eth.getAccounts()
            .then(accounts => {
                simpleBetting.methods.bet(data.selectedTeam, data.sendEther).estimateGas()
                .then(betGas => {
                    simpleBetting.methods.bet(data.selectedTeam, data.sendEther)
                    .send({from : accounts[data.accountNumber], gas : betGas})
                    .on('error', error => {
                        console.log(error);
                    })
                    .on('receipt', receipt => {
                        simpleBetting.methods.owner().call()
                        .then(owner => {
                            web3js.eth.sendTransaction({to : owner, from: accounts[data.accountNumber], 
                                value: web3js.utils.toWei(data.sendEther.toString(), "ether")})
                            .on('receipt', receipt => {
                                refreshBetting();
                                simpleBetting.methods.getPlayerLength().call()
                                .then(userCnt => {
                                    // 3명 참가 후 상금 분배
                                    if(userCnt == 3){
                                        // 1팀이 이겼다고 가정
                                        simpleBetting.methods.getWinners(1).call()
                                        .then(winnerInfo => {
                                            // winnerInfo['0'] is address of winners
                                            // winnerInfo['1'] is betting ether of winners
                                            // winnerInfo['2'] is transfer*1000 ether of winners
                                            var lastPersonAddress = winnerInfo['0'][winnerInfo['0'].length-1];
                                            var lastPersonBetMoney = (winnerInfo['1'][winnerInfo['0'].length-1]).toString();
                                            var lastPersonEther = (winnerInfo['2'][winnerInfo['0'].length-1]).toString();
                                            lastPersonEther = (parseFloat(lastPersonBetMoney) + parseFloat(lastPersonEther)/1000).toString();
                                            var transactionError = false;
                                            // 마지막 사람 빼고 전송
                                            for(var i=0; i<winnerInfo['0'].length-1; i++){
                                                // solidity에서 float 계산이 불가능 하므로 nodejs에서 계산
                                                var transferMoney = (parseFloat(winnerInfo['1'][i].toString()) + parseFloat(winnerInfo['2'][i].toString())/1000).toString();
                                                console.log(winnerInfo['0'][i]);
                                                console.log(transferMoney);
                                                web3js.eth.sendTransaction({to: winnerInfo['0'][i], from: owner, 
                                                value: web3js.utils.toWei(transferMoney, "ether")})
                                                .on('error',error => {
                                                    transactionError = true;
                                                });
                                            }
                                            // 마지막 사람까지 전송 확인
                                            console.log(lastPersonAddress);
                                            console.log(lastPersonEther);
                                            web3js.eth.sendTransaction({to: lastPersonAddress, from: owner,
                                            value: web3js.utils.toWei(lastPersonEther, "ether")})
                                            .on('error',error => {
                                                transactionError = true;
                                            })
                                            .on('receipt', receipt => {
                                                if(!transactionError){
                                                    simpleBetting.methods.initBetting().estimateGas()
                                                    .then(initGas => {
                                                        simpleBetting.methods.initBetting().send({from: owner, gas: initGas*10})
                                                        .on('receipt', receipt => {
                                                            var curBettingInfo = {
                                                                winnerTeam : 1,
                                                                bettingCnt : 0,
                                                                oneTeamAmount : 0,
                                                                twoTeamAmount : 0
                                                            };
                                                            socket.emit('distributePrize', curBettingInfo);
                                                        })
                                                        .on('error', error => {
                                                            console.log(error);
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });

        socket.on('balance confirm',function(){
            web3js.eth.getAccounts()
            .then(accounts => {
                accounts.forEach(account => {
                    web3js.eth.getBalance(account)
                    .then(amount => {
                        console.log(account + " : " + web3js.utils.fromWei(amount, 'ether'));
                    });
                });
            });
        });
    });

    return io;
}