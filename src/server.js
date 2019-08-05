const express = require("express");
const errorHandler = require("./middleware/errorHandler");

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

server.use(errorHandler);

module.exports = server;
