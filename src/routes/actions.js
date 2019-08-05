const express = require("express");
const router = express.Router();

const actions = require("../controllers/actions");

router.get("/", actions.all);
router.get("/:id", actions.one);
router.post("/", actions.new);
router.delete("/:id", actions.rm);
router.put("/:id", actions.update);

module.exports = router;
