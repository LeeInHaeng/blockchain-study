# ���� URL
- https://dzone.com/articles/ethereum-hello-world-example-using-solc-and-web3

# �ʿ� ���
- npm install web3 --save
- npm install abi-decoder --save
- npm install ethereumjs-testrpc --save
- npm install solc@0.4.25 --save

# 8545 port listen
- ./node_modules/.bin/testrpc
- �� �Ŀ� nodejs���� new Web3.providers.HttpProvider("http://localhost:8545"); ��� ����

# �ҽ� ����
- solidityEvent.js : �ָ���Ƽ ���� �̺�Ʈ �ۼ�
- app.js : require�� �̿��� solidityEvent.js�� �ҷ���
- metamask�� remix�� ������� �ʰ� ���� nodejs�� ���