import dotenv from "dotenv"
dotenv.config()

export default {
  modbus: {
    host: process.env.MODBUS_SERVER,
    port: {port : process.env.MODBUS_PORT}
  },
  webSocketsServer: {
    host:'192.168.0.205',
    port: "8080"
  }
}

// autoReconnect     : true,
// reconnectTimeout  : 1000,
// timeout           : 5000,
// unitId            : 0