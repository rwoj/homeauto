import dotenv from "dotenv"
dotenv.config()

interface modbusT { host: string | undefined, port: {port: string | undefined}}; 
interface webSocketsServerT {host: string | undefined, port: number | undefined}; 

export const homeConfig : {modbus: modbusT, webSocketsServer: webSocketsServerT} = {
  modbus: {
    host: process.env.MODBUS_SERVER,
    port: {port : process.env.MODBUS_PORT}
  },
  webSocketsServer: {
    host: process.env.WEBSOCKET_SERVER,
    port: parseInt(process.env.WEBSOCKET_PORT = '8080')
  }
}

// autoReconnect     : true,
// reconnectTimeout  : 1000,
// timeout           : 5000,
// unitId            : 0

// 