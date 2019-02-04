const fs = require("fs"),
      abiDecoder = require('abi-decoder'),
      Web3 = require('web3'),
      solc = require('solc');

const source = fs.readFileSync('contracts/mySolidity.sol','UTF-8');
const compiled = solc.compile(source, 1);
const bytecode = compiled.contracts[':Token'].bytecode;
const abi = JSON.parse(compiled.contracts[':Token'].interface);

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3js = new Web3(provider);
let Voting = new web3js.eth.Contract(abi);
abiDecoder.addABI(abi);

web3js.eth.getAccounts().then(accounts => {
  accounts.forEach(account => {
    console.log(account);
  })
});

var allAccounts;
web3js.eth.getAccounts().then(account => {
  allAccounts = account;
  Voting.deploy({data: bytecode}).send({
    from: account[0],
    gas: 1500000,
    gasPrice: '30000000000000'
  }).on('receipt', receipt => {
    Voting.options.address = receipt.contractAddress;
    ////// solidity methods start ////////
    Voting.methods.transfer(account[1], 10).send({from: account[0]}).then(transaction => {
      console.log("transaction id : " + transaction.transactionHash);
      let blockHash = transaction.blockHash;
      return web3js.eth.getBlock(blockHash,true);
    }).then(block => {
      block.transactions.forEach(transaction => {
        console.log(abiDecoder.decodeMethod(transaction.input));
      });

      allAccounts.forEach(account => {
        Voting.methods.balances(account).call()
        .then(amount => {
          console.log(account + ": " + amount);
        });
      });
    });
    ////// solidity methods end ////////
  });
});