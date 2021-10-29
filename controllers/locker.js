const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");

var formatUtils = require("../utils/utils");
const { byteToBitArray } = require("../utils/utils");
const {
  getHexForGroupStatus,
  getHexForLockerOpening,
} = require("../utils/mapping");

var port;
var parser;

SerialPort.list().then((ports) => {
  let serports = [];
  ports.forEach(function (port) {
    if (typeof port["manufacturer"] != "undefined") {
      serports.push(port.path);
    }
  });

  port = new SerialPort(serports[1], {
    baudRate: 19200,
    parity: "even",
    stopBits: 1,
    dataBits: 8,
  });

  parser = port.pipe(new Delimiter({ delimiter: [0x55] }));

  port.on("open", function () {
    console.log("Conexión establecida con el puerto: ", serports[1]);
  });
});

//GET - Return status of all lockers in a certain group
exports.getLockerStatus = function (req, res) {
  console.log("GET /lockerStatus");
  console.log("Se recibió pedido de status para el grupo %d", req.params.group);
  var hexValue = getHexForGroupStatus(req.params.group);
  console.log("Valor en Hexadecimal: ", hexValue);

  sendSync(formatUtils.hexToBytes(hexValue)).then((data) => {
    console.log(data);
    res.status(200).jsonp(processOutput(data));
  });
};

//GET - Return status of locker by id
exports.getLockerStatusById = function (req, res) {
  console.log("GET /lockerStatusById");
  console.log(
    "Se recibió pedido de status para el grupo %d, locker %d",
    req.params.group,
    req.params.id
  );
  var hexValue = getHexForGroupStatus(req.params.group);
  console.log("Valor en Hexadecimal: ", hexValue);
  sendSync(formatUtils.hexToBytes(hexValue)).then((data) => {
    let result = processOutput(data);
    res.status(200).jsonp(result.lockers[req.params.id]);
  });
};

//POST - Trigger locker
exports.postTriggerLocker = function (req, res) {
  console.log("POST /triggerLocker");
  console.log(
    "Se recibió pedido de apertura para el grupo %d, locker %d",
    req.query.group,
    req.query.id
  );
  var hexValue = getHexForLockerOpening(req.query.group, req.query.id);
  console.log("Valor en Hexadecimal: ", hexValue);
  sendSync(formatUtils.hexToBytes(hexValue)).then((data) => {
    res.sendStatus(200);
  });
};

//POST - Trigger locker Hex
exports.postTriggerLockerHex = function (req, res) {
  console.log("POST /triggerLockerHex");
  console.log("Se recibió comando Hexadecimal: ", req.query.hex);
  sendSync(formatUtils.hexToBytes(req.query.hex)).then((data) => {
    res.sendStatus(200);
  });
};

function sendSync(src) {
  return new Promise((resolve, reject) => {
    port.write(src);
    parser.once("data", function (data) {
      resolve(data);
    });

    parser.once("error", function (err) {
      reject(err);
    });
  });
}

function processOutput(data) {
  var resultBitArray = [];

  for (let i = 5; i < 8; i++) {
    resultBitArray.push(byteToBitArray(data[i]).reverse());
  }

  var singleArrayResult = [].concat.apply([], resultBitArray);
  let resultArray = [];

  for (let i = 0; i < 20; i++) {
    if (singleArrayResult[i] !== undefined) {
      let arrayElement = {
        id: i,
        state: singleArrayResult[i],
      };

      resultArray.push(arrayElement);
    }
  }
  return {
    lockers: resultArray,
  };
}
