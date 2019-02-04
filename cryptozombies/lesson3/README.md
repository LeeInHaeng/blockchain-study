# 배운 내용
- 소유 가능한 컨트랙트
  - OpenZeppelin 솔리디티 라이브러리의 Ownable 컨트랙트
  - 생성자
  - 함수 제어자(modifier) : 보통 함수 실행 전의 요구사항 충족 여부를 확인하기 위해 사용 (직접 호출 불가능)
```
/**
 * @dev Throws if called by any account other than the owner.
 */
modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}

modifier 사용

contract MyContract is Ownable {
  event LaughManiacally(string laughter);

  // 아래 `onlyOwner`의 사용 방법을 잘 보게:
  function likeABoss() external onlyOwner {
    LaughManiacally("Muahahahaha");
  }
}
```
- 가스
  - 밖에서 uint32,64 등의 사용은 가스 소모를 줄이는데 영향이 없지만, 구조체 안에서는 작은 크기의 uint를 사용

- 시간 단위

```
uint lastUpdated;

// lastUpdated를 now로 설정
function updateTimestamp() public {
  lastUpdated = now;
}

// 마지막으로 updateTimestamp가 호출된 뒤 5분이 지났으면 true를, 5분이 아직 지나지 않았으면 false를 반환
function fiveMinutesHavePassed() public view returns (bool) {
  return (now >= (lastUpdated + 5 minutes));
}
```
- view 함수는 가스를 소모하지 않는다.
  - storage는 비싸다. ---> memory를 사용해 비효율적인 코딩을 해야될 수도 있음.
  - 읽기 전용 : external view
  - 메모리 배열 사용
```
function getArray() external pure returns(uint[]) {
  // 메모리에 길이 3의 새로운 배열을 생성한다.
  uint[] memory values = new uint[](3);
  // 여기에 특정한 값들을 넣는다.
  values.push(1);
  values.push(2);
  values.push(3);
  // 해당 배열을 반환한다.
  return values;
}
```


