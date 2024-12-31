# NPM & NPX

<br />
<br />

```
NPM와 NPX의 차이는 무엇일까?
무심코 사용했던 명령어의 차이를 알아보자.

* NPM Node Package Manager
* NPX Node Package eXecute
```

<br />
<br />
<br />
<br />

1. npm과 npx의 차이점 정리

| 구분 | npm | npx |
|------|-----|-----|
| 패키지 설치 방법 | package.json에 해당 패키지를 지정하고 로컬에 설치해야 함 | 패키지를 설치하지 않고도 실행할 수 있으며, npm 패키지 레지스트리에서 아직 설치되지 않은 패키지가 있으면 자동으로 설치됨 |
| create-react-app 사용법 | `npm install create-react-app` 후 `create-react-app myApp`(설치 필요) 명령을 사용 | `npx create-react-app myApp`처럼 설치하지 않고 한 번만 실행 가능 |
| 용도 | 패키지를 설치하는 데 사용하는 도구 | 패키지를 실행하는 데 사용하는 도구 |
| 패키지 설치 범위 | 전역적(Globally)으로 설치(--save 옵션)되므로 장기적으로 관리에 주의해야 함 | 전역적으로 설치되지 않으므로 장기적인 관리에 주의할 필요 없음 |
