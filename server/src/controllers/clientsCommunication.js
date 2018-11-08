import {writeToModbus} from './modbusCommunication'
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

    websocket.on('message', (data) => {
        try {
            data = JSON.parse(data);
            console.log(data);
            // writeToModbus(...data)
        } catch (e) {
            data = {};
        }
        // broadcast('dane', infoToBroadcast);
        
        // if (data.key === 'STATUS') {
        //     setTimeout(() => {
        //         broadcast('STATUS');
        //     }, 250);
        // }
    });

    websocket.on('close', () => {
        delete connections[id];
    });
}

// const infoToBroadcast = {
//     adres: 12999,
//     wartosc: 14
// };
