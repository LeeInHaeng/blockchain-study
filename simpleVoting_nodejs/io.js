module.exports = function(server){
    var io = require('socket.io')(server);
    var Web3 = require('web3');
    var contractAddress = '0x29de0ff0c5b39d445e218cb94b888d58e8134928';
    var abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "voteForCandidate",
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
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidateList",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "source",
                    "type": "string"
                }
            ],
            "name": "stringToBytes32",
            "outputs": [
                {
                    "name": "result",
                    "type": "bytes32"
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
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "totalVotesFor",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
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
                    "name": "candidate",
                    "type": "bytes32"
                }
            ],
            "name": "validCandidate",
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
            "inputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "votesReceived",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const web3js = new Web3(provider);
    const simpleVoting = new web3js.eth.Contract(abi, contractAddress);

    io.on('connection',function(socket){
        console.log('a user socketio connected');

        socket.on('disconnect',function(){
            console.log('user disconnected');
        });

        socket.on('index start',function(){
            var candidateInfo = {
                Rama : 0,
                Nick : 0,
                Jose : 0
            };

            simpleVoting.methods.stringToBytes32("Rama").call()
            .then(rama => {
                simpleVoting.methods.totalVotesFor(rama).call()
                .then(ramaCnt => {
                    candidateInfo["Rama"] = ramaCnt;

                    simpleVoting.methods.stringToBytes32("Nick").call()
                    .then(nick => {
                        simpleVoting.methods.totalVotesFor(nick).call()
                        .then(nickCnt => {
                            candidateInfo["Nick"] = nickCnt;

                            simpleVoting.methods.stringToBytes32("Jose").call()
                            .then(jose => {
                                simpleVoting.methods.totalVotesFor(jose).call()
                                .then(joseCnt => {
                                    candidateInfo["Jose"] = joseCnt;

                                    socket.emit("index start res",candidateInfo);
                                });
                            });
                        });
                    });
                });
            });
        });

        socket.on('index vote',candidator => {
            web3js.eth.getAccounts().then(accounts => {
                simpleVoting.methods.stringToBytes32(candidator).call()
                .then(bcandidator => {
                    simpleVoting.methods.voteForCandidate(bcandidator)
                    .send({ from : accounts[0] })
                    .on("receipt", receipt => {
                        simpleVoting.methods.totalVotesFor(bcandidator).call()
                        .then(voteCnt => {
                            var candidateInfo = {
                                candidator: candidator,
                                voteCnt: voteCnt
                            };
                            io.emit('index success vote',candidateInfo);
                        });
                    });
                });
            });
        });
    });
    return io;
}