# �ʿ� ���
- npm install web3 --save
- npm install ethereumjs-testrpc --save
- npm install socket.io --save

# �ҽ� �ڵ�
- index.ejs �� nodejs ���� �� socketio ���
- index.ejs���� ������ ���¹�ȣ, �� ����(1 or 2), ���� �ݾ�(���� : ether)�� �Է� �� nodejs�� �ѱ�
- nodejs���� �����ڰ� 3���� �� ��� 1���� �¸��Ѵٰ� ���� (random ���� X)
- nodejs���� �¸����� ���� ether�� ���� �� ���� ������ �ʱ�ȭ

# �߻� ����
- �Լ� ���� �� 'out of gas' �� 'base fee exceeds gas limit' ���� ���� �߻�
  - send() ȣ�� ���� estimateGas()�� ���� ���� gas ����
  - ���� ���� gas�� send ȣ�� �� gas �Ӽ� �Է��Ͽ� gas limit�� ����

- solidity���� mapping �� ��� return �Ұ���
  - �迭�� ��ü

- ���� �迭 return �Ұ���
  - ��ŭ�� �迭�� �ʿ����� �̸� ī��Ʈ �� new�� �̿��� size�� ������ �迭 ����

- float Ÿ���� ����
  - solidity���� ���� �Ѱ� �޾� nodejs���� ���