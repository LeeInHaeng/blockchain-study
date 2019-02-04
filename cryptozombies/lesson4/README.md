# 배운 내용
- 보내는 이더 결정 : payable 제어자
```
contract OnlineStore {
  function buySomething() external payable {
    // 함수 실행에 0.001이더가 보내졌는지 확실히 하기 위해 확인:
    require(msg.value == 0.001 ether);
    // 보내졌다면, 함수를 호출한 자에게 디지털 아이템을 전달하기 위한 내용 구성:
    transferThing(msg.sender);
  }
}
```
```
// `OnlineStore`는 자네의 이더리움 상의 컨트랙트를 가리킨다고 가정하네:
OnlineStore.buySomething({from: web3.eth.defaultAccount, value: web3.utils.toWei(0.001)})
```
- 이더 출금 : Ownable 컨트랙트를 import 했다고 가정
```
contract GetPaid is Ownable {
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }
}
```
- 0~99 사이의 난수 생성
```
// Generate a random number between 1 and 100:
uint randNonce = 0;
uint random = uint(keccak256(now, msg.sender, randNonce)) % 100;
randNonce++;
uint random2 = uint(keccak256(now, msg.sender, randNonce)) % 100;
```
  - 해당 방법은 안전하지 않은 방법 ---> 안전한 방법은 오라클 사용
  - https://ethereum.stackexchange.com/questions/191/how-can-i-securely-generate-a-random-number-in-my-smart-contract

