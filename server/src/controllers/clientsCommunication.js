import {getCurrentState, writeToModbus} from './modbusPooling'
const connections = {};

export function broadcast (key, value) {
    for (let id in connections) {
        connections[id].send(
            JSON.stringify({ key, value })
        );
    }
    // console.log(key, value);
}

export function onNewConnection (websocket) {
    const id = Math.random();
    connections[id] = websocket;
    // console.log(getCurrentState());
    broadcast('initRejestr', getCurrentState());

    websocket.on('message', (data) => {
        try {
            data = JSON.parse(data);
            console.log(data.key, data.value.address, data.value.value);
            // writeToModbus({address: 16401, value: 20.5, temp: true})
            writeToModbus(data.value)
        } catch (e) {
            data = {};
        }
        
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
