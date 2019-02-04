# ��� ����
- ERC20 ��ū : ���� ����, ��ġ ����
- ERC721 ��ū : ��ü �Ұ���(����), ���� �Ұ���---> �ϳ��� ��ü �����θ� �ŷ� ����
  - ��� : import "./erc721.sol";
  - ERC721 ��Ʈ��Ʈ�� ��� ( ~ is ERC721 )
- ��Ʈ��Ʈ ���� : �����÷ο�, ����÷ο� ���� ( +, -, *, / )
  - OpenZeppelin���� SafeMath ���̺귯�� ���� (contract�� �޸� library�� using���� ���)
  - safemeth.sol �� import�ؼ� ���
  - using SafeMath for uint256; ����
- assert
  - require�� �����ϰ� ������ �������� ������ ������ �߻�
  - ������ : require�� ���࿡ �����ϸ� ������ ����ڿ��� �ǵ��� ������, assert�� �������� ����
- natspec �ּ�
```
/// @title �⺻���� ����� ���� ��Ʈ��Ʈ
/// @author H4XF13LD MORRIS
/// @notice ������ ���ϱ� �Լ��� �߰��Ѵ�.
contract Math {
  /// @notice 2���� ���ڸ� ���Ѵ�.
  /// @param x ù ���� uint.
  /// @param y �� ��° uint.
  /// @return z (x * y) ���� ��
  /// @dev �� �Լ��� ���� �����÷ο츦 Ȯ������ �ʴ´�.
  function multiply(uint x, uint y) returns (uint z) {
    // �̰��� �Ϲ����� �ּ�����, natspec�� ���Ե��� �ʴ´�.
    z = x * y;
  }
}
```