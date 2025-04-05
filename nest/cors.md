# CORS

<br />
<br />

* CORS (Cross-Origin Resource Sharing)
---

```
CORS는 웹 브라우저에서 다른 도메인 간에 자원을 공유할 수 있도록 허용하는 보안 메커니즘이다.

기본적으로,
웹 브라우저는 동일 출처 정책 (Same-Origin Policy)에 따라 다른 도메인에서 오는 요청을 차단한다.

CORS는 이 정책을 완화하여 특정 조건 하에 다른 출처의 자원에 접근할 수 있도록 허용한다.
```

<br />
<br />
<br />
<br />

1. 전역으로 CORS 설정하기

```ts
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 기본적인 CORS 활성화
  app.enableCors();

  // 또는 상세 옵션 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://yourapp.com'
    ], // 허용할 도메인
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS', // 허용할 HTTP 메서드
    credentials: true, // 쿠키 포함 여부
    allowedHeaders: 'Content-Type, Accept, Authorization', // 허용할 헤더
    maxAge: 3600, // preflight 요청 캐시 시간
  });

  await app.listen(3000);
}
bootstrap();
```

<br />
<br />
<br />

2. 특정 컨트롤러에만 CORS 설정하기

```ts
import { Controller, Get } from '@nestjs/common';
import { EnableCors } from '@nestjs/common';

@Controller('api')
@EnableCors({
  origin: 'http://localhost:3000',
  credentials: true,
})

export class ApiController {
  @Get()
  findAll() {
    return ['item1', 'item2'];
  }
}
```

<br />
<br />
<br />

3. 특정 라우트에만 CORS 설정하기

```ts
import { Controller, Get } from '@nestjs/common';
import { EnableCors } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  @EnableCors({ origin: 'http://localhost:3000' })
  findAll() {
    return ['item1', 'item2'];
  }
}
```

<br />
<br />
<br />

4. 주요 CORS 옵션 설명

```
1) origin
허용할 도메인을 지정 (문자열, 배열, 정규식, 함수로 설정 가능)
개발 환경에서는 origin: '*'로 설정하여 모든 도메인을 허용할 수 있다.

2) methods
허용할 HTTP 메서드를 지정

3) credentials
true로 설정하면 쿠키와 인증 헤더를 포함할 수 있음

4) allowedHeaders
클라이언트가 보낼 수 있는 헤더를 지정

5) exposedHeaders
클라이언트가 읽을 수 있는 헤더를 지정

6) maxAge
preflight 요청 결과를 캐시하는 시간(초)
```
