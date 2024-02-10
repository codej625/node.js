# express의 기본적인 구조를 잡아보자!

<br />

```
node.js의 프레임워크인 express를 사용해서
백엔드를 구축할 수는 있지만,
정해진 구조가 없으므로 레이어를 분리해주는 작업이 필요하다.
```

<br />

1) 파일 구조
```
project/
│
├── router.js
├── controllers/
│   └── userController.js
├── services/
│   └── userService.js
├── daos/
│   └── userDao.js
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
const controller = require('./controllers/userController');

const app = express();
const port = '3000';

/* 정적 파일 제공을 위한 미들웨어 설정 */
app.use(express.static(path.join(__dirname, 'public')));

/* 사용자 라우팅을 컨트롤러에게 위임 */
app.use('/users', userController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

<br />

3) userController.js -> controller 로직을 정의.
```javascript
const express = require('express');
const userService = require('../services/userService');

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

<br />

4) userService.js -> 비즈니스 로직을 구현한 서비스 레이어.
```javascript
const userDao = require('../daos/userDao');

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

5) userDao.js -> 데이터베이스와 상호 작용을 담당하는 DAO(Data Access Object) 로직을 정의.
```javascript
const mysql = require('mysql');

/* MySQL 데이터베이스 연결 설정 */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'dbname',
});

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
