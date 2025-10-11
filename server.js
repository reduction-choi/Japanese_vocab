// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://crispy-space-acorn-5666vwggqg4hvjj9-3000.app.github.dev",
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

app.listen(3001, () => console.log("Server running on port 3001"));
// must set port -> public
// node server.js