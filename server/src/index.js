import {Server as WebSocketServer} from 'ws';
import Modbus from "modbus-serial";

// import modbus from 'jsmodbus'
// import net from 'net'
// import {modbusComm} from './controllers/modbusCommunication'
import {onNewConnection} from './controllers/clientsCommunication';
import homeConfig from '../config';
import {modbusPooling} from './controllers/modbusPooling';

// const modbusSocket = new net.Socket()
// const client = new modbus.client.TCP(modbusSocket)
const modbusClient = new Modbus();
modbusClient.connectTCP(homeConfig.modbus.host, homeConfig.modbus.port);
modbusClient.setID(1);
setInterval(()=>modbusPooling(modbusClient), 3000);
console.log("modbus is connected ...");

const wss = new WebSocketServer(homeConfig.webSocketsServer);
wss.on('connection', onNewConnection);
console.log("Websocket running at port 8080 \n");
