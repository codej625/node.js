# Middleware

<br />
<br />

* NestJS Middleware
---

```
NestJS에는 Express.js와 마찬가지로 미들웨어가 존재한다.
Controller(Router) 앞에 단에서도 사용할 수 있다.

ex) Client Request -> <Middleware> -> Controller 이런 흐름의 설계가 가능하다.

예시로 Logger 기능을 하는 Middleware를 만드는 과정을 살펴보자.
```

<br />
<br />
<br />
<br />

1. NestJS CLI를 사용해 Middleware를 생성한다.

```
// cats라는 이름을 가진 Middleware를 생성
$ nest g mo logger

* 물론 직접 파일을 생성해도 아무 상관 없다.
```

<br />
<br />

2. 코드를 작성한다.

```ts
// logger.middleware.ts

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // Logger Module Import
  private logger = new Logger('HTTP'); // Constructor에는 로그에 출력되는 원하는 문구를 넣을수 있다.

  use(req: Request, res: Response, next: NextFunction) { // 세번째 인자를 Express에 NextFunction으로 변경
    res.on('finish', () => {
      this.logger.log(`${req.method} ${req.path} ${req.ip} ${res.statusCode}`);
    });
    next();
  }
}
```

```ts
// app.module.ts

@Module({
  imports: [],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
// AppModule Class에서 NestModule Interface를 구현한다.
export class AppModule implements NestModule {
  // configure 메서드를 상속받는다.
  configure(consumer: MiddlewareConsumer) {
    // consumer에 Middleware를 등록하고 forRoutes()으로 Router path를 기입한다.
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```
