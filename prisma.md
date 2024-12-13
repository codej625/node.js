# Prisma

<br />
<br />

- Prisma (ORM)

---

```
가장 근래에 제작된 Node 진영의 ORM이고,
타 ORM이 겪는 많은 문제를 겪지 않는다고 Docs에 명시되어 있다.

1) Prisma Client
Node.js 와 Typescript를 위한 쿼리 빌더(자동생성, 타입 안정성)

2) Prisma Migrate
마이그레이션 시스템

3) Prisma Studio
데이터베이스의 데이터를 보고 수정할 수 있는 GUI툴
```

<br />
<br />
<br />
<br />

- 설치 순서

---

<br />

1. NestJS 프로젝트 생성

```
$ nest new nest-prisma-demo
$ cd nest-prisma-demo
```

<br />
<br />

2. Prisma와 Prisma CLI를 설치

```
$ npm install @prisma/client
$ npm install prisma --save-dev
```

<br />
<br />

3. Prisma 초기화

```
$ npx prisma init
```

```
prisma 디렉토리와 schema.prisma 파일이 생성된다.
schema.prisma 파일에서 데이터베이스 연결을 설정할 수 있다.

예를 들어, PostgreSQL을 사용하는 경우 아래와 같이 연결 문자열을 설정한다.
```

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

<br />
<br />

4. Prisma 스키마 정의

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 테이블 정의
model user {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

```
위와 같은 모델을 정의하고 나면,
Prisma가 이 모델을 바탕으로 데이터베이스 스키마를 자동으로 생성할 수 있다.
```

<br />
<br />

5. 데이터베이스 마이그레이션 실행

```
// 마이그레이션은 Prisma가 정의한 스키마를 실제 데이터베이스에 반영한다.

$ npx prisma migrate dev --name init
```

<br />
<br />

6. Prisma Client 생성

```
Prisma를 사용하려면 Prisma Client를 생성해야 한다.
아래 명령어로 Prisma Client를 생성한다.
```

```
$ npx prisma generate
```

<br />
<br />

7. PrismaService 생성

```
// NestJS에서는 Prisma와의 상호작용을 위한 서비스를 작성해야 한다.
```

```ts
// src/prisma/prisma.service.ts

import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// 이 PrismaService는 Prisma Client를 초기화하고, 모듈이 종료될 때 연결을 끊어준다.
```

<br />
<br />

8. PrismaService 모듈에 등록

```ts
// src/prisma/prisma.module.ts

import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

```ts
// app.module에도 PrismaModule을 import한다.

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({

  ...

  imports: [PrismaModule],
})
export class AppModule {}
```

<br />
<br />

9. PrismaService 사용

```
이제 다른 서비스에서 PrismaService를 사용하여 데이터베이스 작업을 수행할 수 있다.
예를 들어, UsersService를 만들어 사용자 데이터를 처리할 수 있다.
```

```ts
// src/users/users.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string, email: string) {
    return this.prisma.users.create({
      data: {
        name,
        email,
      },
    });
  }

  async findAllUsers() {
    return this.prisma.users.findMany();
  }
}
```

<br />
<br />

10. Controller에서 사용

```
컨트롤러에서 UsersService를 사용하여 API 엔드포인트를 만들어 테스트 해보자.

src/users/users.controller.ts 파일을 생성하고 다음과 같이 작성한다.
```

```ts
// src/users/users.controller.ts

import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
    return this.usersService.createUser(body.name, body.email);
  }

  @Get()
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
```

<br />
<br />

11. 모듈에 서비스 및 컨트롤러 등록

```ts
// src/users/users.module.ts 파일을 생성하고 UserService와 UserController를 등록한다.

import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

```ts
// 그리고 app.module.ts에서 UserModule을 import한다.

import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule {}
```

<br />
<br />

12. 애플리케이션 실행 및 테스트

```
$ npm run start:dev
```

```json
// Postman -> POST http://localhost:3000/users
{
  "name": "codej625",
  "email": "codej625@gmail.com"
}
```

<br />
<br />
<br />
<br />

- 마이그레이션(모델 변경)

---

```
1) 모델 변경
2) 마이그레이션 생성
3) 마이그레이션 적용
```

<br />
<br />

1. 모델 변경 (schema.prisma 파일)

```
schema.prisma 파일을 수정하여 새로운 모델을 추가하거나 기존 모델을 변경한다.
(예를 들어, user 모델에 age 필드를 추가한다고 가정)
```

```prisma
model users {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int      // 새로운 필드 추가
  createdAt DateTime @default(now())
}
```

<br />
<br />

2. 마이그레이션 생성

```
모델을 수정한 후, 변경 사항을 데이터베이스에 반영하려면 마이그레이션 파일을 생성해야 한다.
다음 명령어를 실행하여 마이그레이션을 생성한다.
```

```
// 예시로 add-age-to-user 이라는 이름 사용

$ npx prisma migrate dev --name <add-age-to-user>
```

```
새로운 마이그레이션 파일을 prisma/migrations/ 폴더에 생성한다.
(데이터베이스 스키마를 업데이트하여 새로운 필드를 반영)
```

<br />
<br />

3. 마이그레이션 적용

```
마이그레이션을 생성한 후, 마이그레이션이 데이터베이스에 반영된다.

prisma migrate dev 명령어는 자동으로 마이그레이션을 적용하는데,
만약 프로덕션 환경에서 마이그레이션을 적용할 때는 아래와 같은 명령어를 사용할 수 있다.
```

```
$ npx prisma migrate deploy
```

<br />
<br />

4. Prisma Client 재생성

```
마이그레이션을 적용하고 나면 Prisma Client를 재생성해야 변경된 모델을 코드에서 사용할 수 있다.
다음 명령어를 실행하여 Prisma Client를 다시 생성한다.
```

```
$ npx prisma generate
```
