# 필요 모듈
- npm install web3 --save
- npm install ethereumjs-testrpc --save
- npm install socket.io --save

# 소스 코드
- index.ejs 와 nodejs 서버 간 socketio 통신
- index.ejs에서 베팅할 계좌번호, 팀 선택(1 or 2), 베팅 금액(기준 : ether)를 입력 후 nodejs에 넘김
- nodejs에서 베팅자가 3명이 될 경우 1팀이 승리한다고 가정 (random 구현 X)
- nodejs에서 승리팀에 대해 ether을 전송 후 베팅 정보를 초기화

# 발생 문제
- 함수 수행 시 'out of gas' 와 'base fee exceeds gas limit' 오류 문구 발생
  - send() 호출 전에 estimateGas()를 통해 예상 gas 측정
  - 위의 예상 gas로 send 호출 시 gas 속성 입력하여 gas limit을 조절

- solidity에서 mapping 의 경우 return 불가능
  - 배열로 대체

- 동적 배열 return 불가능
  - 얼만큼의 배열이 필요한지 미리 카운트 후 new를 이용해 size가 정해진 배열 선언

- float 타입이 없음
  - solidity에서 값을 넘겨 받아 nodejs에서 계산