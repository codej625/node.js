const userDao = require('../dao/user-dao');

exports.getItVarAge = async (age) => {
  const user = await userDao.getItVarAge(age);

  // 비즈니스 로직 수행

  return user;
};

exports.createUser = async (userData) => {
  // 새 사용자 생성 로직
};