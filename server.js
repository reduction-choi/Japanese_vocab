// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["https://crispy-space-acorn-5666vwggqg4hvjj9-3000.app.github.dev","https://reduction-choi.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API" });
});
app.get("/api/connect", async (req, res) => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb+srv://hanwon0713:5RSaziBn69sxqyje@japanese-vocab.wuczewm.mongodb.net/?retryWrites=true&w=majority&appName=Japanese-vocab')
    .then(() => res.json({message: "MogoDB가 연결되었다...!"}))
    .catch((err) => console.log(err))
});
app.post("/api/login", async (req, res) => {
  const id = req.body.id;
  const passwd = req.body.passwd;
  const mongoose = require('mongoose');
  const User = require("./models/User");
  try {
    await mongoose.connect(
      "mongodb+srv://hanwon0713:5RSaziBn69sxqyje@japanese-vocab.wuczewm.mongodb.net/japanese_vocab?retryWrites=true&w=majority&appName=Japanese-vocab"
    );
    const user = await User.findOne({ username: id, password: passwd });

    if (user) {
      res.json({ success: true, message: "로그인 성공!" });
    } else {
      res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  } finally {
    mongoose.connection.close(); // 연결 종료 (선택적)
  }
})
app.listen(3001, () => console.log("Server running on port 3001"));
// must set port -> public
// node server.js