# Configure ESLint

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
