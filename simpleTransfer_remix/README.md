# �ʿ� ���
- npm install web3 --save
- npm install ethereumjs-testrpc --save

# 8545 port listen
- ./node_modules/.bin/testrpc
- �� �Ŀ� nodejs���� new Web3.providers.HttpProvider("http://localhost:8545"); ��� ����

# �ҽ� ����
- solidityEvent.js : �ָ���Ƽ ���� �̺�Ʈ �ۼ�
- app.js : require�� �̿��� solidityEvent.js�� �ҷ���
- remix���� ������ �� �ش� abi�� contractAddress�� �̿��Ͽ� Instance ����
- owner���� ���ϴ� ��ŭ�� ether�� ������, ���µ��� ���� �̴��� ����ϵ��� ����
![1](https://user-images.githubusercontent.com/20277647/50417159-0b41e680-0868-11e9-9929-62fd633ec248.PNG)
