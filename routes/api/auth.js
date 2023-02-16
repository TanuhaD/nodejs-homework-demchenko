const express = require("express");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.post("/register");

module.exports = router;
