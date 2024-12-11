# Configuration

<br />
<br />

* Configuration 사용 이유
---

```
애플리케이션은 종종 환경에 따라 다른 구성 설정을 사용해야 한다.

예를 들어, 일반적으로 로컬 환경은 로컬 DB 인스턴스에만 유효한 특정 데이터베이스 로그인 정보가 있는데,
프로덕션 환경은 별도의 DB 로그인 정보를 사용한다.

구성 변수는 변경되고 중요한 정보이기 때문에 노출되지 않게 별도로 관리해야 한다.
```

<br />
<br />
<br />
<br />

1. configuration 설치

```npm
$ npm i --save @nestjs/config

* @nestjs/config패키지는 내부적으로 dotenv를 사용한다.
```

<br />
<br />

2. Module에 추가

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 추가

@Module({
  imports: [
    ConfigModule.forRoot({ // 이런식으로 여러개 추가도 가능하다.
      envFilePath: ['.env', '.env.local', '.env.dev', '.env.prod'],
    })
  ],
})
export class AppModule {}
```

<br />
<br />

3. 프로젝트 가장 최상위 경로에 .env 파일 생성

```
// .env

DATABASE_USER=test
DATABASE_PASSWORD=test
```

<br />
<br />

4. 구성 변수 사용

```
// ex)
process.env.DATABASE_USER // test
```
