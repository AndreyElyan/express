const express = require("express");

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = {"name" : "Andrey", "email: "a.elyan.s@gmail.com"}

const users = ["Thanos", "Thor", "Hulk", "Galactus"];

checkUserExist = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "User not found on request body" });
  }

  return next();
};

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post("/users", checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
