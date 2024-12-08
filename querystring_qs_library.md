# qs 설치

<br/><br/>

- qs

---

```
Node.js에서 URL 쿼리 문자열을 파싱하고,
문자열화하는 데 사용되는 라이브러리이다.
```

<br/>
<br/>
<br/>
<br/>

1. qs 설치

```npm
$ npm i qs
```

<br/>
<br/>

2. 문자열 형태의 쿼리 스트링을 객체의 형태로 변환. parse() 함수를 사용한다.

```javascript
const obj = qs.parse("mode=dark&active=true&nums=1&nums=2&nums=3");
console.log(obj);

// ex)
{
  mode: "dark",
  active: "true",
  nums: ["1", "2", "3"],
}
```

<br/>
<br/>

3. 자바스크립트 객체 형태의 쿼리 스트링을 문자열로 변환.

```javascript
const str = qs.stringify({
  mode: "dark",
  active: "true",
  nums: ["1", "2", "3"],
});
console.log(str);

// ex) mode=dark&active=true&nums%5B0%5D=1&nums%5B1%5D=2&nums%5B2%5D=3
```

<br/>
<br/>

4. 자바스크립트 객체 형태의 쿼리 스트링을 문자열로 변환(2) 옵션추가

```javascript
const str = qs.stringify(
  {
    mode: "dark",
    active: "true",
    nums: ["1", "2", "3"],
  },
  { arrayFormat: "repeat" }
);
console.log(str);

// ex) mode=dark&active=true&nums=1&nums=2&nums=3
```
