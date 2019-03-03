// import "@babel/polyfill";
// import Modbus from "modbus-serial";
import {Server as WebSocketServer} from 'ws';
import {runModbus} from './controllers/modPooling';


// import {modbusPooling} from './controllers/modbusPooling';
import {onNewConnection} from './controllers/clientsCommunication';
// import {verifyRules} from './controllers/rulesEngine';

import {homeConfig} from './config';

// const modbusRun = (): void =>{
//     modbusClient.setID(1);
//     console.log("modbus is connected and rules engine is working ...")
//     setInterval(()=>{
//         modbusPooling(modbusClient);
//         verifyRules();
//     }, 2000);
//     modbusClient.close();
// }
// const modbusClient = new Modbus();
// modbusClient.connectTCP(homeConfig.modbus.host, homeConfig.modbus.port)
//     .then(modbusRun)
//     .catch((e: Error)=>{
//         console.log(e)
//     });
runModbus();

const wss = new WebSocketServer(homeConfig.webSocketsServer);
wss.on('connection', onNewConnection);
console.log("websocket running at port 8080 \n");
