// server.js
const axios = require("axios");
const express = require("express");
const mongoose = require('mongoose');
const User = require("./models/User");
const vocabSchema = require("./models/Vocab");
const cors = require("cors");
// import mongoose from 'mongoose';
// import express from 'express';
// import cors from 'cors'
// import User from './models/User.js'
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
app.post("/api/login", async (req, res) => {
  const id = req.body.id;
  const passwd = req.body.passwd;
  try {
    const user = await User.findOne({ username: id, password: passwd });
    if (user) {
      const Vocab = mongoose.model("vocab_"+id, vocabSchema, "vocab_"+id);
      const vocabs = await Vocab.find({ level: 1 });
      console.log('Users found:', vocabs);
      res.json({ success: true, message: "로그인 성공!", vocabs: vocabs });
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
    await User.create({ username: id, password: passwd, id: number });
    const Vocab = mongoose.model("vocab_"+id, vocabSchema, "vocab_"+id);
    await Vocab.createCollection();
    const token = 'acd4892e-0f94-4d49-ab83-e15049ea0f96';
    let apidata = await axios('https://api.wanikani.com/v2/subjects?types=vocabulary&levels=1',{
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
    for(const wordinfo of apidata.data["data"]){
      const object = {
        meaning: wordinfo["data"]["meanings"][0]["meaning"],
        hiragana: wordinfo["data"]["readings"][0]["reading"],
        level: 1,
        num_shown: 0,
        num_correct: 0
      };
      await Vocab.create(object);
    }
    res.json({ success: true, message: "회원가입 성공!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
})
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