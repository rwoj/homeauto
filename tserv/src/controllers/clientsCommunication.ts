import * as WebSocket from 'ws';
import {homeConfig} from '../config';
import {ODCZYT_REJESTRU, ODCZYT_REGUL} from '../utils/types';
import {getCurrentState}  from '../registers/PLCRegisters';
import {writeToModbus, ItemToWrite} from '../registers/WritesRegister';
import {getAllRules, handleRules} from './rulesEngine'
import {RuleT} from '../registers/RuleRegister';

class WebSocketServ {
    connections: any [] = [];  
    connLastId: number = 0;
    wss: WebSocket.Server;   
    constructor () {
        this.wss = new WebSocket.Server(homeConfig.webSocketsServer);
        this.wss.on('connection', this.onConnection);
    }
    public broadcast = (key: string, value: object): void => {
        for (let id in this.connections) {
            this.connections[id].send(
                JSON.stringify({ key, value })
            );
        }
    }
    private onConnection = (websocket: WebSocket) => {
        let connId = this.connLastId++;
        this.connections[connId] = websocket;
        this.broadcast(ODCZYT_REJESTRU, getCurrentState());
        this.broadcast(ODCZYT_REGUL, getAllRules());
    
        websocket.on('message', (_data: string) => {
            try {
                const data: {key: string, value: ItemToWrite | RuleT | any} = JSON.parse(_data);
                // console.log(data.key, data.value);
                switch (data.key){
                    case 'zmianaSwiatla':
                    case 'zmianaTemperatury':
                        writeToModbus(data.value);
                        break;
                    case 'nowaRegula':
                    case 'zmienRegula':
                    case 'usunRegula':
                        handleRules(data.key, data.value);
                        break;
                    default:
                        console.log("dziwna wiadomość :", data.key);
                } 
            } catch (err) {
                console.error(err);
            }
        });
    
        websocket.on('close', () => {
            delete this.connections[connId];
        });
    }
}

const webSocketsServer = new WebSocketServ;
export const runWebSocketServer = ():void =>{
    console.log("websocket running at port 8080 \n");
};
export const broadcast = webSocketsServer.broadcast;


  
