const path = require("path");
const express = require("express");
const viewEngineConfig = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
  app.use(express.static(path.join("./src", "public")));
};

module.exports = viewEngineConfig;
