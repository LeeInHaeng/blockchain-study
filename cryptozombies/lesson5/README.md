# 배운 내용
- ERC20 토큰 : 분할 가능, 가치 동일
- ERC721 토큰 : 교체 불가능(유일), 분할 불가능---> 하나의 전체 단위로만 거래 가능
  - 사용 : import "./erc721.sol";
  - ERC721 컨트랙트를 상속 ( ~ is ERC721 )
- 컨트랙트 보안 : 오버플로우, 언더플로우 방지 ( +, -, *, / )
  - OpenZeppelin에서 SafeMath 라이브러리 제공 (contract와 달리 library는 using으로 사용)
  - safemeth.sol 을 import해서 사용
  - using SafeMath for uint256; 선언
- assert
  - require와 동일하게 조건을 만족하지 않으면 에러를 발생
  - 차이점 : require는 실행에 실패하면 가스를 사용자에게 되돌려 주지만, assert는 돌려주지 않음
- natspec 주석
```
/// @title 기본적인 산수를 위한 컨트랙트
/// @author H4XF13LD MORRIS
/// @notice 지금은 곱하기 함수만 추가한다.
contract Math {
  /// @notice 2개의 숫자를 곱한다.
  /// @param x 첫 번쨰 uint.
  /// @param y 두 번째 uint.
  /// @return z (x * y) 곱의 값
  /// @dev 이 함수는 현재 오버플로우를 확인하지 않는다.
  function multiply(uint x, uint y) returns (uint z) {
    // 이것은 일반적인 주석으로, natspec에 포함되지 않는다.
    z = x * y;
  }
}
```