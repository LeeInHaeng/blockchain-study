# 필요 모듈
- npm install web3 --save
- npm install ethereumjs-testrpc --save

# 8545 port listen
- ./node_modules/.bin/testrpc
- 이 후에 nodejs에서 new Web3.providers.HttpProvider("http://localhost:8545"); 사용 가능

# 소스 파일
- solidityEvent.js : 솔리디티 관련 이벤트 작성
- app.js : require을 이용해 solidityEvent.js를 불러옴
- remix에서 컴파일 후 해당 abi와 contractAddress를 이용하여 Instance 생성
- owner에게 원하는 만큼의 ether를 보내고, 계좌들의 보유 이더를 출력하도록 동작
![1](https://user-images.githubusercontent.com/20277647/50417159-0b41e680-0868-11e9-9929-62fd633ec248.PNG)
