"use strict";

var path = require("path");
var express = require("express");
var viewEngineConfig = function viewEngineConfig(app) {
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
  app.use("/images", express["static"](path.resolve(__dirname, "../public/images")));
  app.use("/css", express["static"](path.resolve(__dirname, "../public/css")));
  app.use("/js", express["static"](path.resolve(__dirname, "../public/js")));
};
module.exports = viewEngineConfig;