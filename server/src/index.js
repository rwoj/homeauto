import Modbus from "modbus-serial";
import {Server as WebSocketServer} from 'ws';

import {modbusPooling} from './controllers/modbusPooling';
import {onNewConnection} from './controllers/clientsCommunication';
import homeConfig from '../config';

const modbusClient = new Modbus();
modbusClient.connectTCP(homeConfig.modbus.host, homeConfig.modbus.port);
modbusClient.setID(1);
setInterval(()=>modbusPooling(modbusClient), 2000);
console.log("modbus is connected ...");

const wss = new WebSocketServer(homeConfig.webSocketsServer);
wss.on('connection', onNewConnection);
console.log("websocket running at port 8080 \n");
