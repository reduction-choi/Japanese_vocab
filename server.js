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
app.listen(3001, () => console.log("Server running on port 3001"));
// must set port -> public
// node server.js