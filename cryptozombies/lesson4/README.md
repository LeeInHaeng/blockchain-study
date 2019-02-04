# ��� ����
- ������ �̴� ���� : payable ������
```
contract OnlineStore {
  function buySomething() external payable {
    // �Լ� ���࿡ 0.001�̴��� ���������� Ȯ���� �ϱ� ���� Ȯ��:
    require(msg.value == 0.001 ether);
    // �������ٸ�, �Լ��� ȣ���� �ڿ��� ������ �������� �����ϱ� ���� ���� ����:
    transferThing(msg.sender);
  }
}
```
```
// `OnlineStore`�� �ڳ��� �̴����� ���� ��Ʈ��Ʈ�� ����Ų�ٰ� �����ϳ�:
OnlineStore.buySomething({from: web3.eth.defaultAccount, value: web3.utils.toWei(0.001)})
```
- �̴� ��� : Ownable ��Ʈ��Ʈ�� import �ߴٰ� ����
```
contract GetPaid is Ownable {
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }
}
```
- 0~99 ������ ���� ����
```
// Generate a random number between 1 and 100:
uint randNonce = 0;
uint random = uint(keccak256(now, msg.sender, randNonce)) % 100;
randNonce++;
uint random2 = uint(keccak256(now, msg.sender, randNonce)) % 100;
```
  - �ش� ����� �������� ���� ��� ---> ������ ����� ����Ŭ ���
  - https://ethereum.stackexchange.com/questions/191/how-can-i-securely-generate-a-random-number-in-my-smart-contract

