import {ODCZYT_REJESTRU, ODCZYT_REGUL} from '../utils/types';
import {getCurrentState}  from '../registers/PLCRegisters';
import {writeToModbus, ItemToWrite} from '../registers/WritesRegister';
import {getAllRules, addRule, modifyRule, deleteRule} from './rulesEngine';
import {RuleT} from '../registers/RuleRegister';

const connections: any [] = [];

export function broadcast (key: string, value: object) {
    for (let id in connections) {
        connections[id].send(
            JSON.stringify({ key, value })
        );
    }
}

export function onNewConnection (websocket: any) {
    const id = Math.random();
    connections[id] = websocket;
    broadcast(ODCZYT_REJESTRU, getCurrentState());
    broadcast(ODCZYT_REGUL, getAllRules());

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
                    addRule(data.value);
                    broadcast(ODCZYT_REGUL, getAllRules());
                    break;
                case 'zmienRegula':
                    modifyRule(data.value);
                    broadcast(ODCZYT_REGUL, getAllRules());
                    break;
                case 'usunRegula':
                    deleteRule(data.value);
                    broadcast(ODCZYT_REGUL, getAllRules());
                    break;
                default:
                    console.log("dziwna wiadomość :", data.key);
            } 
            // if (data.key=='zmianaSwiatla' || data.key=='zmianaTemperatury'){
            //     writeToModbus(data.value)
            // }
            // if (data.key == 'nowaRegula'){
            //     console.log(data.key, data.value)
            //     addRule(data.value)
            // }
        } catch (err) {
            console.error(err);
        }
    });

    websocket.on('close', () => {
        delete connections[id];
    });
}
