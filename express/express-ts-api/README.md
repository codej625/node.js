# API

<br />
<br />

- API 설명

---

```
API 기능별 http method, url, json(body)값의 예제이다.
npm run start:dev 명령어를 통해 실행할 수 있다.
```

<br />
<br />
<br />
<br />

1. Create

```
METHOD POST
URL http://localhost:8000/cats
```

```json
{
  "name": "Ogolgae",
  "age": 1,
  "species": "Dog",
  "isCute": true,
  "friends": "Henny, Maknae"
}
```

<br />
<br />

2. Read all

```
METHOD GET
URL http://localhost:8000/cats
```

<br />
<br />

3. Read one

```
METHOD GET
URL http://localhost:8000/cats/{1} 예시
```

<br />
<br />

4. Update all

```
METHOD PUT
URL http://localhost:8000/cats/{1} 예시
```

```json
{
  "name": "Maknae",
  "age": 1,
  "species": "Dog",
  "isCute": true,
  "friends": "Henny, Ogolgae"
}
```

<br />
<br />

5. Update one

```
METHOD PATCH
URL http://localhost:8000/cats/{1} 예시
```

```json
{
  "age": 2,
  "species": "Angel"
}
```

<br />
<br />

6. Delete one

```
METHOD DELETE
URL http://localhost:8000/cats/{1}
```
