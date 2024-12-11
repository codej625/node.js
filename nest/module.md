# Module

<br />
<br />

* NestJS Module
---

```
모듈은 데코레이터로 주석이 달린 클래스이다.
(@Module() 데코레이터는 Nest가 애플리케이션 구조를 구성하는 데 사용하는 메타데이터를 제공)

각 애플리케이션에는 최소 하나의 모듈, 즉 루트 모듈이 있다. ex) 프로젝트의 app.module.ts 참고
(루트 모듈은 Nest가 애플리케이션 그래프를 빌드하는 데 사용하는 시작점)

매우 작은 애플리케이션은 이론적으로 루트 모듈만 있을 수 있지만 이는 일반적인 경우가 아니다.
따라서 대부분의 애플리케이션의 경우 여러 모듈을 사용하며 밀접하게 관련된 기능들을 캡슐화합니다.
```

<br />
<br />
<br />
<br />

1. Module의 구조

```ts
// Module 구성 예시

@Module({
  imports: [SomeOtherModule], // App 모듈에서 필요한 다른 모듈을 가져옴
  controllers: [AppController], // App 모듈에서 정의한 컨트롤러들
  providers: [AppService], // 의존성 주입이 필요한 서비스들
  exports: [AppService], // 다른 모듈에서 사용할 수 있도록 내보낼 서비스
})
export class AppModule {}
```

<br />

| **속성**       | **설명**                                                                                       | **예시**                                        |
|----------------|------------------------------------------------------------------------------------------------|-------------------------------------------------|
| **`imports`**   | 다른 모듈을 가져와서 해당 모듈에서 제공하는 기능을 사용할 수 있도록 합니다.                        | `imports: [SomeOtherModule]`                    |
| **`controllers`** | HTTP 요청을 처리하는 **컨트롤러**들을 인스턴스화합니다.                                         | `controllers: [AppController]`                  |
| **`providers`** | **서비스**와 같은 의존성 주입이 필요한 객체들을 인스턴스화하고 모듈 내에서 공유됩니다.             | `providers: [AppService]`                       |
| **`exports`**   | 모듈 내에서 제공하는 일부 **provider**를 다른 모듈에서 사용할 수 있도록 내보냅니다.              | `exports: [AppService]`                         |

<br />
<br />
<br />

2. Module의 Import와 Export

```
App module(Root module)을 기준으로
여러 가지 모듈을 조합하여 Module간 Service등을 공유할 수 있다.
```

<br />

```ts
// app.module.ts

@Module({
  imports: [CatsModule], // App module에서 Cats module을 Import.
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
```

```ts
// cats.module.ts

@Module({
  imports: [],
  exports: [CatsService], // Cats module에서 CatsService를 Export.
  controllers: [CatsController],
  providers: [CatsService],
})
```

<br />

```
App module에서는 Cats module을 Import하고,
Cats module에서는 CatsService를 Export 함으로써
App module에서 CatsService를 사용할 수 있게 된다.

특정 Module을 Import 한다고 해서 해당 Module의 서비스를 사용할 수 있는 게 아니라
해당 Module에서 Service 등을 Export까지 해줘야 사용이 가능하다.
```
