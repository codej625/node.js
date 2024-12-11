# Pipe

<br />
<br />

* Pipe
---

```
Pipe를 사용할 때 크게 두 가지의 경우가 있다.

변환 -> 입력 데이터를 원하는 형태로 변환한다.(예: 문자열에서 정수로)
검증 -> 입력 데이터를 평가하고 유효한 경우 변경하지 않고 그대로 전달하고 그렇지 않으면 예외를 발생시킨다.

메서드가 호출되기 직전에 파이프를 삽입하고,
파이프는 메서드에 지정된 인수를 수신하여 이를 처리한다.

모든 변환 또는 검증 작업은 그 시점에 수행되고,
그 후 라우트 핸들러는 (잠재적으로) 변환된 인수와 함께 호출된다.
```

<br />
<br />
<br />
<br />

1. 내장 파이프의 종류

| 파이프 이름             | 설명                                                         | 사용 예시                           |
|---------------------|------------------------------------------------------------|----------------------------------|
| `ValidationPipe`     | 요청 데이터의 유효성 검사를 수행합니다. DTO에 정의된 유효성 검사 규칙을 기준으로 유효성 검사를 합니다. | `@Body() dto: CreateCatDto`      |
| `ParseIntPipe`       | 문자열을 정수(`number`)로 변환합니다. 변환이 불가능한 값은 예외를 발생시킵니다. | `@Param('id', ParseIntPipe)`     |
| `ParseFloatPipe`     | 문자열을 부동소수점 숫자(`float`)로 변환합니다. 변환이 불가능한 값은 예외를 발생시킵니다. | `@Param('price', ParseFloatPipe)`|
| `ParseBoolPipe`      | 문자열을 boolean(`true`/`false`) 값으로 변환합니다. 변환이 불가능한 값은 예외를 발생시킵니다. | `@Query('isActive', ParseBoolPipe)` |
| `ParseArrayPipe`     | 문자열을 배열로 변환합니다. 일반적으로 배열 값이 `,`로 구분된 경우 사용됩니다. | `@Query('tags', ParseArrayPipe)` |
| `ParseUUIDPipe`      | 문자열을 UUID 형식으로 변환합니다. 형식이 맞지 않으면 예외를 발생시킵니다. | `@Param('uuid', ParseUUIDPipe)`  |
| `ParseEnumPipe`      | 문자열을 열거형(`enum`) 값으로 변환합니다. 값이 열거형에 정의되지 않으면 예외를 발생시킵니다. | `@Query('status', ParseEnumPipe)`|
| `DefaultValuePipe`   | 값이 없을 때 기본값을 지정합니다. 값이 없을 경우 지정된 기본값을 반환합니다. | `@Query('page', DefaultValuePipe)` |
| `ParseFilePipe`      | 파일 업로드를 처리하는 파이프입니다. 파일의 유효성 검사를 하고 파일을 변환합니다. | `@Body('file', ParseFilePipe)`   |

<br />
<br />
<br />

2. 파이프 바인딩

```ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

```
이렇게 하면 다음 두 조건 중 하나가 참이 된다.

즉, findOne()메서드에서 수신하는 매개변수가 숫자이거나
아니라면 핸들러가 호출되기 전에 예외가 발생한다.
```

<br />

```
// 1) Client Requset

GET localhost:3000/abc // id값이 예상하는 타입과 다르게 string이라면
```

```
// 2) 예외가 발생한다.

{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```
