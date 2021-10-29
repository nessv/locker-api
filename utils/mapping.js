const { decimalToHex } = require("./utils");

module.exports = {
  getHexForLockerOpening: function (group, locker) {
    var hex = "AAEB2202";
    //id number
    var idNumber = decimalToHex(group);
    //bin number
    var binNumber = decimalToHex(locker);
    //check sum
    var checkSum = decimalToHex(185 + group + locker);

    return hex + idNumber + binNumber + checkSum + "55";
  },

  getHexForGroupStatus: function (group) {
    var hex = "AAEB2301";
    //id number
    var idNumber = decimalToHex(group);
    //check sum
    var checkSum = decimalToHex(185 + group);

    return hex + idNumber + checkSum + "55";
  },
};
