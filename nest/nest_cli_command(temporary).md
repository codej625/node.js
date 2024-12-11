# NestJS CLI

<br />
<br />

* NestJS CLI
---

```
NestJS는 CLI를 지원한다.
여러 명령어를 통해 세팅과 생산성을 크게 향상 시켜준다.
```

<br />
<br />
<br />
<br />

1. Creates a new (standard mode) Nest project

```npm
nest new <name> [options] // ex) nest new nestjs-project
nest n <name> [options] // 약어 버전
```

<br />
<br />

2. Generates and/or modifies files based on a schematic

```npm
nest generate <schematic> <name> [options] // ex) nest generate co cats
nest g <schematic> <name> [options] // 약어 버전
```

<br />

| Command     | Abbreviation | Description                                                   |
|-------------|--------------|---------------------------------------------------------------|
| library     | lib          | Generate a new library within a monorepo (converting to monorepo if it's a standard structure). |
| class       | cl           | Generate a new class.                                          |
| controller  | co           | Generate a controller declaration.                             |
| decorator   | d            | Generate a custom decorator.                                   |
| filter      | f            | Generate a filter declaration.                                 |
| gateway     | ga           | Generate a gateway declaration.                                |
| guard       | gu           | Generate a guard declaration.                                  |
| interface   | itf          | Generate an interface.                                         |
| interceptor | itc          | Generate an interceptor declaration.                           |
| middleware  | mi           | Generate a middleware declaration.                             |
| module      | mo           | Generate a module declaration.                                 |
| pipe        | pi           | Generate a pipe declaration.                                   |
| provider    | pr           | Generate a provider declaration.                               |
| resolver    | r            | Generate a resolver declaration.                               |
| resource    | res          | Generate a new CRUD resource. See the CRUD (resource) generator for more details. (TS only) |
| service     | s            | Generate a service declaration.                                |
