const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  let sprint = {
    message: `Working.`,
    success: true
  };

  res.status(200).json(sprint);
});

server.use("/api", require("./routes"));

module.exports = server;
