# front-end 및 solidity 참고 URL
- https://kr.zastrin.com/courses/22/lessons/1-1

# 필요 모듈
- npm install web3 --save
- npm install ethereumjs-testrpc --save
- npm install socket.io --save

# 소스 코드
- index.ejs 와 nodejs 서버 간 socketio 통신
- index.ejs 에서 누구에게 투표할지 nodejs로 넘김
- nodejs에서 투표자에 대해 solidity 함수 호출 후 front 업데이트 (io.js 파일에서 처리)