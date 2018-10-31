'use strict';
const WebSocketServer = require('ws').Server;
const updateToClients = require("./updateToClients")
//const homeConfig = require('home-config');

const connections = {};

const infoToBroadcast = {
    adres: 12999,
    wartosc: 14
};

// Broadcast key-value pair to all connections
function broadcast (key, value) {
    for (let id in connections) {
        connections[id].send(
            JSON.stringify({
                key,
                value
            })
        );
    }
}

function onNewConnection (socket) {
    const id = Math.random();
    connections[id] = socket;

    socket.on('message', (data) => {
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = {};
        }

        broadcast('dane', infoToBroadcast);

        if (data.key === 'STATUS') {
            setTimeout(() => {
                broadcast('STATUS');
            }, 250);
        }
    });

    socket.on('close', () => {
        delete connections[id];
    });
}

const wss = new WebSocketServer({
    host:'192.168.0.205',
    port: "8080"
});
wss.on('connection', onNewConnection);

updateToClients(broadcast);

console.log("Running at port 8080\n");
