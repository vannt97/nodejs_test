const express = require("express");
const router = express.Router();
const {
  getHomeController,
  getABCController,
} = require("../controller/homeController");
router.get("/", getHomeController);
router.get("/abc", getABCController);
module.exports = router;
