const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: `Working.`
  });
});

router.use("/actions", require("./actions"));
router.use("/projects", require("./projects"));

module.exports = router;
