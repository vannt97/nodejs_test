const path = require("path");
const express = require("express");
const viewEngineConfig = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
  app.use("/images", express.static(path.resolve(__dirname, "../public/images")));
  app.use("/css", express.static(path.resolve(__dirname, "../public/css")));
  app.use("/js", express.static(path.resolve(__dirname, "../public/js")));

};

module.exports = viewEngineConfig;
