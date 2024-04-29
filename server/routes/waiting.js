const express = require("express");
const router = express.Router();

const controller = require("../controller/Cwaiting");

// GET /waiting
router.get("/", controller.getWaiting);
// POST /waiting
router.post("/", controller.postWaiting);

module.exports = router;
