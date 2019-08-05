const express = require("express");
const router = express.Router();

const projects = require("../controllers/projects");

router.get("/", projects.all);
router.get("/:id", projects.one);
router.get("/:id/actions", projects.actions);
router.post("/", projects.new);
router.delete("/:id", projects.rm);
router.put("/:id", projects.update);

module.exports = router;
