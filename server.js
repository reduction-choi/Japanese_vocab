// server.js
const axios = require("axios");
const express = require("express");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const vocabSchema = require("./models/Vocab");
const cors = require("cors");
// import mongoose from 'mongoose';
// import express from 'express';
// import cors from 'cors'
// import User from './models/User.js'
const SECRET_KEY = "MY_SECRET_KEY_12345";
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
app.get("/api/verify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ user: decoded });
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
});
app.post("/api/login", async (req, res) => {
  const id = req.body.id;
  const passwd = req.body.passwd;
  try {
    const user = await User.findOne({ username: id, password: passwd });
    if (user) {
      const token = jwt.sign(
        { id: id, role: "user" }, // payload
        SECRET_KEY,                // 서명 비밀키
        { expiresIn: "1h" }        // 옵션
      );
      res.json({ success: true, message: "로그인 성공!", token: token });
    } else {
      res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
})
app.post("/api/register", async (req, res) => {
  const {id, passwd, number} = req.body;
  try {
    const user = await User.findOne({username: id});
    if(user){
      res.status(401).json({success: false, message: "이미 존재하는 아이디입니다."});
    }
    await User.create({ username: id, password: passwd, id: number, maxLevel: 1 });
    createUserCollection(id);
    res.json({ success: true, message: "회원가입 성공!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
})
const createUserCollection = async (id) => {
  try{
    const Vocab = mongoose.model("vocab_"+id, vocabSchema, "vocab_"+id);
    await Vocab.createCollection();
    const token = 'acd4892e-0f94-4d49-ab83-e15049ea0f96';
    for(let level = 1 ; level <= 60 ; level++){
      let apidata = await axios('https://api.wanikani.com/v2/subjects?types=vocabulary&levels='+level.toString(),{
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      for(const wordinfo of apidata.data["data"]){
        const object = {
          meaning: wordinfo["data"]["meanings"][0]["meaning"],
          hiragana: wordinfo["data"]["readings"][0]["reading"],
          level: wordinfo["data"]["level"],
          num_shown: 0,
          num_correct: 0
        };
        await Vocab.create(object);
      }
    }
  }
  catch(e){
    console.err(e);
  }
}
const startServer = async () => {
  try{
    await mongoose.connect('mongodb+srv://hanwon0713:5RSaziBn69sxqyje@japanese-vocab.wuczewm.mongodb.net/japanese_vocab?retryWrites=true&w=majority&appName=Japanese-vocab')
    app.listen(3001, console.log("Server running on port 3001"));
  }
  catch(e){
    console.log(e);
  }
}
startServer(); 
// must set port -> public
// node server.js