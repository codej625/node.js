const { Pool } = require('pg');
require('dotenv').config(); // dotenv 라이브러리 사용

// PostgreSQL 데이터베이스 연결 설정
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// PostgreSQL 데이터베이스 연결
const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// 사용자 ID를 기반으로 사용자 정보를 조회하는 함수 예시
exports.getItVarAge = async (age) => {
  const query = 'SELECT * FROM users WHERE age < $1'; // $1의 뜻은 첫번째로 바인딩 되는 파리미터
  try {
    const { rows } = await pool.query(query, [age]); // 파라미터가 두개라면 ex) [userId, userEmail]
    return rows;
  }
  catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
  finally {
    // 모든 작업이 끝난 후 커넥션 Close
    await pool.end();
    console.log('PostgreSQL connection closed');
  }
};