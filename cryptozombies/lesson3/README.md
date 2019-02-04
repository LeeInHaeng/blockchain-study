# ��� ����
- ���� ������ ��Ʈ��Ʈ
  - OpenZeppelin �ָ���Ƽ ���̺귯���� Ownable ��Ʈ��Ʈ
  - ������
  - �Լ� ������(modifier) : ���� �Լ� ���� ���� �䱸���� ���� ���θ� Ȯ���ϱ� ���� ��� (���� ȣ�� �Ұ���)
```
/**
 * @dev Throws if called by any account other than the owner.
 */
modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}

modifier ���

contract MyContract is Ownable {
  event LaughManiacally(string laughter);

  // �Ʒ� `onlyOwner`�� ��� ����� �� ����:
  function likeABoss() external onlyOwner {
    LaughManiacally("Muahahahaha");
  }
}
```
- ����
  - �ۿ��� uint32,64 ���� ����� ���� �Ҹ� ���̴µ� ������ ������, ����ü �ȿ����� ���� ũ���� uint�� ���

- �ð� ����

```
uint lastUpdated;

// lastUpdated�� now�� ����
function updateTimestamp() public {
  lastUpdated = now;
}

// ���������� updateTimestamp�� ȣ��� �� 5���� �������� true��, 5���� ���� ������ �ʾ����� false�� ��ȯ
function fiveMinutesHavePassed() public view returns (bool) {
  return (now >= (lastUpdated + 5 minutes));
}
```
- view �Լ��� ������ �Ҹ����� �ʴ´�.
  - storage�� ��δ�. ---> memory�� ����� ��ȿ������ �ڵ��� �ؾߵ� ���� ����.
  - �б� ���� : external view
  - �޸� �迭 ���
```
function getArray() external pure returns(uint[]) {
  // �޸𸮿� ���� 3�� ���ο� �迭�� �����Ѵ�.
  uint[] memory values = new uint[](3);
  // ���⿡ Ư���� ������ �ִ´�.
  values.push(1);
  values.push(2);
  values.push(3);
  // �ش� �迭�� ��ȯ�Ѵ�.
  return values;
}
```


