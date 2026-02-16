# NestJS 요청 처리 순서

<br />
<br />

* NestJS에도 Spring처럼 요청 처리에 대한 유사한 개념이 있을까?

---

```
NestJS 에서도 용어는 조금 다르지만, 비슷한 개념들이 존재한다.

표와 예시로 자세히 알아보자.
```

<br />
<br />
<br />
<br />

1. Spring vs NestJS 비교

| Spring | NestJS | 역할 |
|---------|--------|-----|
| Filter |	Middleware | 요청 전처리 (로깅, CORS, 인증 등) |
| Interceptor	| Interceptor	| 요청/응답 전후 처리 (AOP 구현) |
| AOP (@Aspect)	| Interceptor	| 횡단 관심사 분리 (로깅, 캐싱, 성능 측정) |
| @ControllerAdvice |	Exception Filter | 예외 처리 및 응답 변환 |

<br />
<br />
<br />

2. NestJS 요청 처리 순서

```zsh
1. Middleware (필터)
   
2. Guards (인증/인가)
   
3. Interceptors (inbound) - 요청 전
   
4. Pipes (검증/변환)
   
5. Route Handler (컨트롤러 메서드)
   
6. Interceptors (outbound) - 응답 후
   
7. Exception Filters (예외 처리)
```
