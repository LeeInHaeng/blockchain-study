# ��� ����
- Call : view�� pure �Լ��� ���� ���
```
myContract.methods.myMethod(123).call()
```
- Send : Ʈ������� ����� ���ü�� ���� �����͸� ���� (view�� pure�� �ƴ� ��� �Լ�)
```
myContract.methods.myMethod(123).send()
```
- �ָ���Ƽ���� public���� ������ �����ϸ� ���� �̸��� getter �Լ��� ����� ��
```
Zombie[] public zombies;
zombies(15);
```
- Web3.js 1.0 �������ʹ� �ݹ� ��� Promise ������ ���
```
function getZombieDetails(id) {
  return cryptoZombies.methods.zombies(id).call()
}

// �Լ��� ȣ���ϰ� ����� ������ ���𰡸� ó��:
getZombieDetails(15)
.then(function(result) {
  console.log("Zombie 15: " + JSON.stringify(result));
});
```
- ��Ÿ����ũ���� ���� Ȱ��ȭ�� ������ ���������� Ȯ��
```
var accountInterval = setInterval(function() {
  // ������ �ٲ������ Ȯ��
  if (web3.eth.accounts[0] !== userAccount) {
    userAccount = web3.eth.accounts[0];
    // �� ������ ���� UI�� ������Ʈ�ϱ� ���� �Լ� ȣ��
    updateInterface();
  }
}, 100);
```
- send �Լ������� Ʈ�����
  - �Լ��� ȣ�� �� ����� from �ּҰ� �ʿ� (gas�� ���� ����)
  - �̺�Ʈ ������ receipt : Ʈ������� �̴������� ��Ͽ� ���Ե� �� �߻� (��Ʈ��Ʈ�� ����)
  - �̺�Ʈ ������ error : Ʈ������� ���� ���Ե��� ������ �� �߻�
```
        return CryptoZombies.methods.createRandomZombie(name)
        .send({ from: userAccount })
        .on("receipt", function(receipt) {
          $("#txStatus").text("Successfully created " + name + "!");
          // ���ü�ο� Ʈ������� �ݿ��Ǿ�����, UI�� �ٽ� �׷��� ��
          getZombiesByOwner(userAccount).then(displayZombies);
        })
        .on("error", function(error) {
          // ����ڵ鿡�� Ʈ������� ���������� �˷��ֱ� ���� ó��
          $("#txStatus").text(error);
        });
```
  - value�� ���� ���� �̴��� ���� �����ϴ� �͵� ����
```
// 0.001 �̴� ����
CryptoZombies.methods.levelUp(zombieId)
.send({ from: userAccount, value: web3js.utils.toWei("0.001") })
```

- event �����ϱ�
```
event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

// `filter`�� ����� `_to`�� `userAccount`�� ���� ���� �ڵ带 ����
cryptoZombies.events.Transfer({ filter: { _to: userAccount } })
.on("data", function(event) {
  let data = event.returnValues;
  // ���� ����ڰ� ��� ���� �޾ҳ�!
  // �ش� ���� ������ �� �ֵ��� UI�� ������Ʈ�� �� �ֵ��� ���⿡ �߰�
}).on("error", console.error);
```

- ���� �̺�Ʈ�� ���� �����ϱ�
  - getPastEvents�� �̿��� ���� �̺�Ʈ�� ���� �����ϰ�, fromBlock�� toBlock ���͸� �̿��� �̺�Ʈ �α׿� ���� �ð� ������ ������ �� ����.
```
cryptoZombies.getPastEvents("NewZombie", { fromBlock: 0, toBlock: "latest" })
.then(function(events) {
  // `events`�� �츮�� ������ �ߴ� ��ó�� �ݺ� ������ `event` ��ü���� �迭�̳�.
  // �� �ڵ�� ������ ��� ������ ����� �츮�� ���� �� �ְ� �� ���̳�.
});
```
