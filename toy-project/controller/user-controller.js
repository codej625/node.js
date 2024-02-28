const express = require("express");

const userService = require("../service/user-service.js");
const router = express.Router();

/* 사용자 조회 라우트 */
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* 사용자 조회 라우트 */
router.get("/age/:age", async (req, res) => {
  try {
    const user = await userService.getItVarAge(req.params.age);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* 사용자 생성 라우트 */
// router.post("/", async (req, res) => {
//   try {
//     const newUser = await userService.createUser(req.body);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;