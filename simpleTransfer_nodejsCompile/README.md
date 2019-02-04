# 강의 URL
- https://dzone.com/articles/ethereum-hello-world-example-using-solc-and-web3

# 필요 모듈
- npm install web3 --save
- npm install abi-decoder --save
- npm install ethereumjs-testrpc --save
- npm install solc@0.4.25 --save

# 8545 port listen
- ./node_modules/.bin/testrpc
- 이 후에 nodejs에서 new Web3.providers.HttpProvider("http://localhost:8545"); 사용 가능

# 소스 파일
- solidityEvent.js : 솔리디티 관련 이벤트 작성
- app.js : require을 이용해 solidityEvent.js를 불러옴
- metamask와 remix를 사용하지 않고 순수 nodejs만 사용