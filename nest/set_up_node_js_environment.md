# Set up Node.js

<br />
<br />

```
Nest 프로젝트를 세팅하기에 앞서
권장되는 노드 버전과 필요한 패키지를 알아보자.
```

<br />
<br />
<br />

1. node.js

```
Node.js의 버전은 공식홈페이지에서
LTS (Long term support) 버전으로 설치한다.
지원이 다른 버전에 비해 길어서 가장 안정적인 버전이라고 할 수 있다.
```

<br />
<br />

2. nodemon

```
nodemon은 코드가 변경될 때마다 자동으로 서버를 재시작해 주는 기능을 제공한다.

즉, 개발 중에 코드 수정 후 서버를 수동으로 재시작할 필요 없이,
파일이 변경되면 nodemon이 실시간으로 애플리케이션을 다시 실행시켜 준다.
(Spring 진영에는 Spring Boot DevTools이 있다.)
```

```npm
// Install nodemon
npm install nodemon
혹은
npm intall --global nodemon (전역 설치)

// Usage example
nodemon app.js

// Terminate nodemon
Control + C
```
