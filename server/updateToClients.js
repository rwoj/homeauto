const infoToBroadcast = {
    adres: 129987,
    wartosc: 22
};

module.exports = function updateToClients (broadcast) {
    setInterval(() => {
        infoToBroadcast.wartosc+=1;
        broadcast('Update', infoToBroadcast);
    }, 1000);
}
