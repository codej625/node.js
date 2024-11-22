# Node.js

<br /><br />

* Project setup
---

```
Node.js에서 웹 개발을 시작할 때 
패키지 매니저, 번들러, 트랜스파일러 등의 개념이 나온다.

밑에서 자세한 설명을 알아보자.
```

<br /><br /><br />

1. 패키지 매니저 (Package Manager)

```
패키지 매니저는 프로젝트에서 필요한 라이브러리나 패키지를 쉽게 관리할 수 있도록 도와주는 도구이다.

주로 npm과 yarn이 많이 사용되고 그 밖에도 여러 가지 패키지 매니저가 존재한다.
```

<br />

```node
// 예시
npm init // package.json 파일 생성
npm install <패키지명> // 패키지 설치
npm install --save-dev <패키지명> // 개발 의존성 패키지 설치
```

```
npm install --save-dev <패키지명> 커맨드는
개발 환경에서만 사용되는 도구(예: 테스트 라이브러리, 빌드 도구 등)를 설치한다.

예를들어 테스트 도구인 Jest나 ESLint와 같은 도구는 개발 환경에서만 사용되므로
--save-dev 옵션을 사용하여 설치한다.
```

<br /><br /><br />

2. 번들러 (Bundler)

```
번들러는 여러 개의 자바스크립트 파일, CSS, 이미지 등을 하나의 파일(또는 최소화된 여러 파일)로 묶어주는 도구이다.
웹 애플리케이션의 성능을 개선하고, 여러 파일을 효율적으로 관리할 수 있도록 도와준다.

주로 Webpack과 Vite를 많이 사용한다.
```

<br />

```javascript
// 기본적인 Webpack 설정 파일 (webpack.config.js) 예시

const path = require('path');

module.exports = {
  entry: './src/index.js', // 진입점 파일
  output: {
    filename: 'bundle.js', // 번들된 파일 이름
    path: path.resolve(__dirname, 'dist'), // 번들된 파일 경로
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 자바스크립트 파일을 처리하는 룰
        use: 'babel-loader',
      },
    ],
  },
};
```

<br /><br /><br />

3. 트랜스파일러 (Transpiler)

```
트랜스파일러는 최신 자바스크립트 문법이나 
다른 언어로 작성된 코드를 호환성 문제 없이 사용할 수 있도록 변환해주는 도구이다.

주로 Babel을 많이 사용한다.
```

<br />

```javascript
// Webpack 설정에 Babel을 추가한 예시

npm install --save-dev babel-loader @babel/core @babel/preset-env

module.exports = {

  ...

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
```

<br /><br /><br />

4. 테스트 도구 (Testing)

```
테스트 도구는 코드의 품질을 보장하고, 버그를 미리 잡을 수 있도록 도와주는 도구이다.
(Java 진영의 JUnit과 같은 개념)

주로 Mocha와 Jest를 많이 사용한다.
```

<br />

```node
// Jest 인스톨 예시

npm install --save-dev jest
```
