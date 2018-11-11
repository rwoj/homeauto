const tempParser = require('../readingsHandler').tempParser;
// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// open connection to a tcp line
client.connectTCP("192.168.0.100", { port: 502 });
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function() {
    client.readHoldingRegisters(16387, 10*2, function(err, data) {
        // console.log(data);
        tempParser(data.buffer);
    });
}, 3000);