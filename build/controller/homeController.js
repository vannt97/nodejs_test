"use strict";

var getHomeController = function getHomeController(req, res) {
  res.render("sample", {
    title: "Hello, EJS!",
    message: "Welcome to EJS with Node.js!"
  });
};
var getABCController = function getABCController(req, res) {
  res.render("sample", {
    title: "Hello, EJS! link abc",
    message: "Welcome to EJS with Node.js! - link abc"
  });
};
module.exports = {
  getHomeController: getHomeController,
  getABCController: getABCController
};