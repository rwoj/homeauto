import {ODCZYT_REJESTRU} from '../utils/types';
import {getCurrentState}  from '../Registers/PLCRegister';
import {writeToModbus} from '../Registers/WritesRegister';
import {addRule} from './rulesEngine';

const connections = {};

export function broadcast (key, value) {
    for (let id in connections) {
        connections[id].send(
            JSON.stringify({ key, value })
        );
    }
}

export function onNewConnection (websocket) {
    const id = Math.random();
    connections[id] = websocket;
    broadcast(ODCZYT_REJESTRU, getCurrentState());

    websocket.on('message', (data) => {
        try {
            data = JSON.parse(data);
            console.log(data.key, data.value);
            if (data.key=='zmianaSwiatla' || data.key=='zmianaTemperatury'){
                writeToModbus(data.value)
            }
            if (data.key == 'ADDRULE'){
                addRule(data.value)
            }
        } catch (e) {
            data = {};
        }
    });

    websocket.on('close', () => {
        delete connections[id];
    });
}
