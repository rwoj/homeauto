import {Server as WebSocketServer} from 'ws'
import modbus from 'jsmodbus'
import net from 'net'
import {modbusComm} from './controllers/modbusCommunication'
import {onNewConnection} from './controllers/clientsCommunication';
import homeConfig from '../config';

const modbusSocket = new net.Socket()
const client = new modbus.client.TCP(modbusSocket)

modbusSocket.on('connect', 
                ()=>setInterval(()=>modbusComm(client, modbusSocket)
                ,2500))
modbusSocket.on('error', console.error);
modbusSocket.connect(homeConfig.modbus);
console.log("modbus is connected ...");

const wss = new WebSocketServer(homeConfig.webSocketsServer);
wss.on('connection', onNewConnection);
console.log("Websocket running at port 8080 \n");
