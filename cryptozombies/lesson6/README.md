# 배운 내용
- Call : view와 pure 함수를 위해 사용
```
myContract.methods.myMethod(123).call()
```
- Send : 트랜잭션을 만들고 블록체인 상의 데이터를 변경 (view와 pure가 아닌 모든 함수)
```
myContract.methods.myMethod(123).send()
```
- 솔리디티에서 public으로 변수를 선언하면 같은 이름의 getter 함수를 만들어 줌
```
Zombie[] public zombies;
zombies(15);
```
- Web3.js 1.0 버전부터는 콜백 대신 Promise 문법을 사용
```
function getZombieDetails(id) {
  return cryptoZombies.methods.zombies(id).call()
}

// 함수를 호출하고 결과를 가지고 무언가를 처리:
getZombieDetails(15)
.then(function(result) {
  console.log("Zombie 15: " + JSON.stringify(result));
});
```
- 메타마스크에서 현재 활성화된 계정을 지속적으로 확인
```
var accountInterval = setInterval(function() {
  // 계정이 바뀌었는지 확인
  if (web3.eth.accounts[0] !== userAccount) {
    userAccount = web3.eth.accounts[0];
    // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
    updateInterface();
  }
}, 100);
```
- send 함수에서의 트랜잭션
  - 함수를 호출 한 사람의 from 주소가 필요 (gas도 설정 가능)
  - 이벤트 리스너 receipt : 트랜잭션이 이더리움의 블록에 포함될 때 발생 (컨트랙트에 저장)
  - 이벤트 리스터 error : 트랜잭션이 블럭에 포함되지 못했을 때 발생
```
        return CryptoZombies.methods.createRandomZombie(name)
        .send({ from: userAccount })
        .on("receipt", function(receipt) {
          $("#txStatus").text("Successfully created " + name + "!");
          // 블록체인에 트랜잭션이 반영되었으며, UI를 다시 그려야 함
          getZombiesByOwner(userAccount).then(displayZombies);
        })
        .on("error", function(error) {
          // 사용자들에게 트랜잭션이 실패했음을 알려주기 위한 처리
          $("#txStatus").text(error);
        });
```
  - value를 통해 보낼 이더의 양을 설정하는 것도 가능
```
// 0.001 이더 전송
CryptoZombies.methods.levelUp(zombieId)
.send({ from: userAccount, value: web3js.utils.toWei("0.001") })
```

- event 구독하기
```
event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

// `filter`를 사용해 `_to`가 `userAccount`와 같을 때만 코드를 실행
cryptoZombies.events.Transfer({ filter: { _to: userAccount } })
.on("data", function(event) {
  let data = event.returnValues;
  // 현재 사용자가 방금 좀비를 받았네!
  // 해당 좀비를 보여줄 수 있도록 UI를 업데이트할 수 있도록 여기에 추가
}).on("error", console.error);
```

- 지난 이벤트에 대해 질의하기
  - getPastEvents를 이용해 지난 이벤트에 대해 질의하고, fromBlock과 toBlock 필터를 이용해 이벤트 로그에 대한 시간 범위를 전달할 수 있음.
```
cryptoZombies.getPastEvents("NewZombie", { fromBlock: 0, toBlock: "latest" })
.then(function(events) {
  // `events`는 우리가 위에서 했던 것처럼 반복 접근할 `event` 객체들의 배열이네.
  // 이 코드는 생성된 모든 좀비의 목록을 우리가 받을 수 있게 할 것이네.
});
```
