const express = require("express");

const ctrl = require("../../controllers/shops");

const router = express.Router();

router.get("/", ctrl.getAllShops);

module.exports = router;
