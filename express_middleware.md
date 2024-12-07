# Middleware

<br /><br />

* 미들웨어란?
---

<br />

```
Express.js 애플리케이션에서 HTTP 요청과 응답을 처리하는 중간 단계의 함수들을 의미한다.
Middleware는 요청이 서버에 도달한 후,
최종 응답이 클라이언트에게 전달되기 전에 처리되는 다양한 작업들을 담당한다.

이러한 작업에는 요청의 유효성 검사, 인증, 로깅, 에러 처리 등 여러 가지가 포함될 수 있다.
```

<br />
<br />
<br />
<br />

* Middleware의 종류
---

<br />

1. 전역 미들웨어

```
애플리케이션의 모든 요청에 대해 실행되는 미들웨어이다.
예를 들어, 로그 기록, 요청 본문 파싱 등과 같은 작업이 해당됩니다.
```

<br />

```node
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  // 다음 미들웨어로 이동
  next();
});
```

<br />
<br />
<br />

2. 라우트 미들웨어

```
특정 라우트에만 적용되는 미들웨어이다.
예를 들어, 특정 API 경로에 대해서만 인증을 요구할 때 사용할 수 있다.
```

<br />

```node
app.get('/protected', (req, res, next) => {
  // ... 인증 로직 처리

  // 인증 성공 시 다음 미들웨어로 이동
  next();
}, (req, res) => {
  res.send('Protected Resource');
});
```

<br />
<br />
<br />

3. 에러처리 미들웨어

```
Express에서 에러를 처리하는 특별한 형태의 미들웨어이다.
기본적으로 네 개의 인자 (err, req, res, next)를 받아 처리한다.
```

<br />

```node
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send('404 page not found');
});
```

<br />
<br />
<br />

4. 내장 미들웨어

```
Express는 몇 가지 유용한 내장 미들웨어를 제공한다.
예를 들어 express.json()은 JSON 본문을 파싱하는 미들웨어이다.
```

<br />

```node
app.use(express.json());
```

<br />
<br />
<br />

5. 서드파티 미들웨어

```
Express 외부의 라이브러리나 패키지가 제공하는 미들웨어도 많이 사용된다.
예를 들어, morgan(HTTP 요청 로그 기록),
cors(Cross-Origin Resource Sharing 설정) 등이 있다.
```

<br />

```node
const morgan = require('morgan');
// 요청에 대한 로그 출력
app.use(morgan('dev'));
```

<br />
<br />
<br />
<br />

* Middleware의 동작 흐름
---

<br />

1. 클라이언트가 요청을 보내면, 해당 요청은 Express 서버에 전달된다.

<br />

2. 요청은 미들웨어 체인을 따라가며 처리된다.

```
각 미들웨어는 요청을 수정하거나,
처리한 후 next()를 호출하여 다음 미들웨어로 전달한다.
```

<br />

3. 미들웨어 체인의 마지막에서 라우트 핸들러가 실행되고, 응답이 클라이언트로 전송된다.

<br />

4. 에러가 발생하면, Express는 에러 처리 미들웨어로 제어를 넘긴다.
