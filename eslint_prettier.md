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
