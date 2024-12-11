# The Request Lifecycle

<br />
<br />

* The request lifecycle
---

```
일반적으로 요청은
미들웨어를 거쳐 가드, 인터셉터, 파이프로 이동한 다음 마지막으로 반환 경로의 인터셉터로 돌아갑니다(응답이 생성됨)

조금 더 자세히 알아보자.
```

<br />
<br />
<br />
<br />

1. Incoming request

<br />

2. Middleware

```
2.1. Globally bound middleware
2.2. Module bound middleware
```

<br />

3. Guards

```
3.1 Global guards
3.2 Controller guards
3.3 Route guards
```

<br />

4. Interceptors (pre-controller)

```
4.1 Global interceptors
4.2 Controller interceptors
4.3 Route interceptors
```

<br />

5. Pipes

```
5.1 Global pipes
5.2 Controller pipes
5.3 Route pipes
5.4 Route parameter pipes
```

<br />

6. Controller (method handler)

<br />

7. Service (if exists)

<br />

8. Interceptors (post-request)

```
8.1 Route interceptor
8.2 Controller interceptor
8.3 Global interceptor
```

<br />

9. Exception filters

```
9.1 route
9.2 controller
9.3 global
```

<br />

10. Server response
