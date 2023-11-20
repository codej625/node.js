# node.js에서 쿼리스트링을 다루기 위한 라이브러리를 설치해보자!

<br/>

1. qs library
```javascript
$ npm i qs
```

<br/>

2-1. 문자열 형태의 쿼리 스트링을 객체의 형태로 변환. parse() 함수를 사용한다.
```javascript
const obj = qs.parse("mode=dark&active=true&nums=1&nums=2&nums=3");
console.log(obj);

ex)
{
  mode: "dark",
  active: "true",
  nums: ["1", "2", "3"],
}
```

<br/>

2-2. 자바스크립트 객체 형태의 쿼리 스트링을 문자열로 변환.
```javascript
const str = qs.stringify({
  mode: "dark",
  active: "true",
  nums: ["1", "2", "3"],
});
console.log(str);

ex) mode=dark&active=true&nums%5B0%5D=1&nums%5B1%5D=2&nums%5B2%5D=3
```

2-3. 자바스크립트 객체 형태의 쿼리 스트링을 문자열로 변환(2) 옵션추가
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

ex) mode=dark&active=true&nums=1&nums=2&nums=3
```
