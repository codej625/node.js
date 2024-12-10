# ESLint & Prettier

<br />
<br />

* ESLint, Prettier
---

```
eslint는 코드 퀄리티를 보장하도록 도와주고,
prettier는 코드 스타일을 깔끔하게 혹은 통일되도록 도와준다.

밑에서 자세한 예시를 알아보자.
```

<br />
<br />
<br />

1. ESLint

```javascript
function func() {
 ...
}

// arrow function
const func = () => {
 ...
}
```

<br />

```
예를 들어 함수 정의할 때,
일반 function 키워드의 함수로 정의할 수도 있고, arrow function을 쓸 수도 있다.

이처럼 여러 방식의 코드 작성법이 있는데,
이러한 방식을 일관성 있는 방식으로 구현할 수 있도록 잡아주는 것이 eslint가 하는 역할이다.
```

<br />
<br />

2. Prettier

```
prettier는 eslint처럼 '코드 구현 방식'이 아닌,
줄 바꿈, 공백, 들여 쓰기 등 에디터에서 '텍스트'를 일관되게 작성되도록 도와주는 역할이다.
```

<br />

```javascript
const func = () => {
  // 스코프 내부 작성 시 들여쓰기 적용
  const a = [1, 2, 3];
}
// 빈 줄이 한 줄 이상 허용 안 함
func();
```

<br />
<br />
<br />
<br />

* Nest 프로젝트에 포함된 ESLint(Prettier) 기본설정 변경
---

```
기본 설정에서 조금 더 편리하게 설정을 바꿔보자.

- VSC에서 formatter로 Prettier가 기본설정 되어있다는 전제
(계속 업데이트 중)
```

<br />
<br />
<br />

1. .eslintrc.js

```json
// 기준 버전 참고
"devDependencies": {
  "eslint": "^8.0.0",
  "eslint-config-prettier": "^9.0.0",
}
```

<br />

```javascript
module.exports = {

  ...

  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // prettier 유용한 설정들
    'prettier/prettier': [
      'error',
      {
        useTabs: false, // 탭 문자로 들여쓰기하기
        endOfLine: 'auto', // endOfLine이라는 에러가 발생했을 때 운영체제 별로 알맞은 값을 사용
      },
    ],
    'no-console': 'warn', // 콘솔 사용 시 경고
    'no-unused-vars': 'off', // 사용하지 않는 변수 체크 해제
    '@typescript-eslint/no-unused-vars': 'warn', // 타입스크립트에서 사용하지 않는 변수 경고

    ...
    
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

<br />
<br />

2. .prettierrc

```json
// 기준 버전 참고
"devDependencies": {
  "prettier": "^3.0.0"
}
```

<br />

```json
{
  "singleQuote": true, // "이 아닌 '사용
  "semi": true, // ;자동 사용
  "useTabs": false, // 탭 문자로 들여쓰기하기
  "tabWidth": 2, // 탭 사이즈 2로 고정
  "trailingComma": "all", // 배열이나 객체에 마지막에 ,(콤마) 사용
  "printWidth": 120 // line의 총 넓이 제한
}
```
