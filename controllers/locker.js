const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const { lockerCode } = require("../utils/mapping");

var formatUtils = require("../utils/utils");

const port = new SerialPort("/dev/cu.usbserial-A50285BI", {
  baudRate: 19200,
  parity: "even",
  stopBits: 1,
  dataBits: 8,
  parser: new Readline({ delimiter: "\n" }),
});

port.on("open", function () {
  console.log("Conexión establecida con el puerto");
});

//GET - Return status of all lockers
exports.getLockerStatus = function (req, res) {
  console.log("GET /lockerStatus");
  sendSync(port, formatUtils.hexToBytes("AAEB230100B955")).then((data) => {
    console.log(data.toString("hex"));
    res.status(200).jsonp(formatUtils.bytesToHex(data));
  });
};

//POST - Trigger locker
exports.postTriggerLocker = function (req, res) {
  console.log("POST /triggerLocker");
  sendSync(port, formatUtils.hexToBytes(lockerCode[req.query.id])).then(
    (data) => {
      res.status(200).jsonp(formatUtils.bytesToHex(data));
    }
  );
};

function sendSync(port, src) {
  return new Promise((resolve, reject) => {
    port.write(src);
    port.once("data", function (data) {
      resolve(data);
    });

    port.once("error", function (err) {
      reject(err);
    });
  });
}
