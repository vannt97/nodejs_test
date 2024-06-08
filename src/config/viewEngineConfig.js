const path = require("path");
const express = require("express");
const viewEngineConfig = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
  console.log("__dirname: ", __dirname);
  app.use(express.static(path.resolve(__dirname, "../public")));
};

module.exports = viewEngineConfig;
