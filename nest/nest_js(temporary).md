# Nest(NestJS)

<br /><br />

* NestJS에 대해
---

<br />

```
Kamil Mysliwiec이 개발하였다.

Nest(NestJS)는 효율적이고 확장 가능한
Node.js 서버 사이드 애플리케이션을 구축하기 위한 프레임워크이다.
```

```
JavaScript를 사용하고 TypeScript를 완벽하게 지원한다.
(순수 JavaScript로 코딩할 수 있음)

기본적으로 Express 프레임워크를 활용하고 (NestJS 자체는 독립적인 프레임워크가 아니다.)
Express에 비해 제어의 역전성(IOC)을 가지는 프레임워크적 성향이 더욱 강하다.
```

<br />
<br />
<br />
<br />

* NestJS와 Spring의 유사점
---

<br />

1. 모듈화 (Module)

```
Spring과 NestJS 모두 모듈 기반 아키텍처를 사용 가능하며,
애플리케이션의 각 기능을 독립적인 모듈로 나눠 관리할 수 있다.
```

<br />
<br />

2. 의존성 주입 (DI, Dependency Injection)

```
NestJS와 Spring 모두 의존성 주입을 통해 코드의 결합도를 낮추고,
테스트를 용이하게 만든다.
```

<br />
<br />

3. 컨트롤러와 서비스 (Layered architecture)

```
NestJS에서 컨트롤러와 서비스의 역할은 Spring에서의 Controller와 Service와 매우 유사하다.
컨트롤러는 HTTP 요청을 처리하고, 서비스는 비즈니스 로직을 담당한다.
```

<br />
<br />

4. 데코레이터와 어노테이션

```
데코레이터를 사용하여 Spring의 어노테이션과 비슷한 방식으로 구성 요소를 정의한다.
예를 들어, @Controller(), @Injectable() 등의 데코레이터는 Spring의 @Controller, @Service와 유사하다.
```
