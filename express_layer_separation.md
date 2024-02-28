# express의 기본적인 구조를 잡아보자!

<br />

```
node.js의 프레임워크인 express를 사용해서
백엔드를 구축할 수는 있지만,
정해진 구조가 없으므로 레이어를 분리해주는 작업이 필요하다.
```
```
node.js를 사용하여 백엔드를 구축할 때는 일반적으로 소문자와 하이픈 사용한다.
```

<br />

install command
```
npm install express
npm install cors
npm install dotenv
npm install mysql
npm install pg
```

<br />

1) 파일 구조
```
{project-name}/
│
├── router.js
├── controller/
│   └── user-controller.js
├── service/
│   └── user-service.js
├── dao/
│   └── user-dao.js
├── .env
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── img/
│       └── logo.png
└── package.json
```

<br />

2) router.js -> express 애플리케이션의 진입점이며, 라우팅과 미들웨어 설정이 이루어진다.
```javascript
const express = require('express');
const path = require('path');
const cors = require('cors');
const userController = require('./controller/user-controller');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* root */
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', '{html-name}.html'));
  } catch (error) {
    console.error('GET 요청에 대한 처리 중 오류가 발생했습니다:', error);
    res.status(500).send('서버 오류 발생');
  }
});

/* 정적 파일 제공을 위한 미들웨어 설정 */
app.use(express.static(path.join(__dirname, 'public')));

/* CORS 미들웨어 추가 */
app.use(cors());

/* 사용자 라우팅을 컨트롤러에게 위임 */
app.use('/user', userController);
```

<br />

3) user-controller.js -> controller 로직을 정의.
```javascript
const express = require('express');
const userService = require('../service/user-service');

const router = express.Router();

/* 사용자 조회 라우트 */
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* 사용자 생성 라우트 */
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```
```
:id는 동적 할당을 의미한다.
ex) user/123 이렇게 요청이 온다면 id의 값은 123이 된다.
```

<br />

4) user-service.js -> 비즈니스 로직을 구현한 서비스 레이어.
```javascript
const userDao = require('../dao/user-dao');

exports.getUser = async (userId) => {
  const user = await userDao.getUserById(userId);

  /* 비즈니스 로직 수행 */ 

  return user;
};

exports.createUser = async (userData) => {
  /* 새 사용자 생성 로직 */
};
```

<br />

5) user-dao.js -> 데이터베이스와 상호 작용을 담당하는 DAO(Data Access Object) 로직을 정의.
```javascript
const mysql = require('mysql');
require('dotenv').config(); /* dotenv 라이브러리 사용 */

/* MySQL 데이터베이스 연결 설정 */
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

/* MySQL 데이터베이스 연결 */
const db = mysql.createConnection(dbConfig);

/* 데이터베이스 연결 */
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

/* 사용자 ID를 기반으로 사용자 정보를 조회하는 함수 */
exports.getUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  try {
    const [rows] = await db.query(query, [userId]);
    return rows[0];
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
};

/* ... 기타 다른 데이터베이스 작업 함수들 */
```

*postgreSQL 버전
```javascript
const { Pool } = require('pg');
require('dotenv').config(); /* dotenv 라이브러리 사용 */

/* PostgreSQL 데이터베이스 연결 설정 */
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

/* PostgreSQL 데이터베이스 연결 */
const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

/* 사용자 ID를 기반으로 사용자 정보를 조회하는 함수 예시 */
exports.getUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = $1'; /* $1의 뜻은 첫번째로 바인딩 되는 파리미터이다. */
  try {
    const { rows } = await pool.query(query, [userId]); /* 파라미터가 두개라면 ex) [userId, userEmail] 이런식이다. */
    return rows[0];
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
};

/* ... 기타 다른 데이터베이스 작업 함수들 */
```

<br />

6) .env -> dotenv 라이브러리에서 사용 되는 환경변수 파일
```env
# Port
PORT=8080

# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=dbname
```

<br />

6) public/css/style.css -> css file. 
```javascript
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: blue;
}

/* 추가적인 CSS 스타일 지정 */
```

<br />

7) public/js/script.js -> JavaScript file.
```javascript
/* 자바스크립트 코드 작성 */
```

<br />

8) public/img/logo.png -> image file.
```javascript
/* 여러가지 이미지 파일 */
```

<br />

9) SQL
```sql
ex) pg
/* database -> data */

/* table */ 
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INTEGER,
  email VARCHAR(255)
);
