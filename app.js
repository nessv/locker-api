var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var LockerCtrl = require("./controllers/locker");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
var locker = express.Router();

router.get("/", function (req, res) {
  res.send("Hello world");
});

app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});

locker.route("/status").get(LockerCtrl.getLockerStatus);
locker.route("/open").post(LockerCtrl.postTriggerLocker);

app.use("", locker);
