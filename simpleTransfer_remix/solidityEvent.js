const Web3 = require('web3');
const contractAddress = '0x48fa6f18e16d5ac15bf3c8ace05f50c45e93a37c';
const abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getOwner",
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
const Voting = new web3js.eth.Contract(abi, contractAddress);

function getOwner(){
  return Voting.methods.getOwner().call();
}

function transferEther(_from, _amount){
  const owner = getOwner();
  owner.then(ownerAddress => {
    web3js.eth.sendTransaction({to : ownerAddress, from: _from, value: web3js.utils.toWei(_amount.toString(), "ether")})
    .on('receipt', receipt => {
      web3js.eth.getAccounts().then(accounts => {
        accounts.forEach(account => {
          web3js.eth.getBalance(account).then(amount => {
            console.log(account + " : " + web3js.utils.fromWei(amount, 'ether'));
          });
        });
      });
    });
  });
}

web3js.eth.getAccounts().then(accounts => {
  transferEther(accounts[1], 0.5);
});

web3js.eth.getAccounts().then(accounts => {
  accounts.forEach(account => {
    console.log(account);
  })
});