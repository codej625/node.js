# Exception Filter

<br />
<br />

* Exception Filter
---

```
예외처리를 하다보면, 예외 계층에 대한 전체 제어가 필요할 수 있다.

예를 들어 로깅을 추가하거나 일부 동적 요인에 따라 다른 JSON 스키마를 사용하는 등
이를 통해 제어의 정확한 흐름과 클라이언트로 다시 전송되는 응답의 내용을 제어할 수 있다.
```

<br />
<br />
<br />
<br />

1. 예외 필터 생성

```ts
// http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

<br />
<br />
<br />

2. 단일 핸들러에만 적용(1번 방법)

```ts
// cats.controller.ts

@Post()
// @UseFilters(new HttpExceptionFilter()) Instance 방식
@UseFilters(HttpExceptionFilter) // 클래스를 사용
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

<br />

```
가능하면 인스턴스 대신 클래스를 사용하여 필터를 적용하는 것을 추천한다.
Nest가 전체 모듈에서 동일한 클래스의 인스턴스를 쉽게 재사용할 수 있으므로 메모리 사용량이 줄어든다.
```

<br />
<br />
<br />

3. 컨트롤러 범위 또는 글로벌 범위 적용(2번 방법)

```ts
// cats.controller.ts

@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

<br />

```ts
// main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 추가
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```
