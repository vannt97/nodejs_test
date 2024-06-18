"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controller/homeController"),
  getHomeController = _require.getHomeController,
  getABCController = _require.getABCController;
router.get("/", getHomeController);
router.get("/abc", getABCController);
module.exports = router;