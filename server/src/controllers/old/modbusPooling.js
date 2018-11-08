import {readModbusRegistry, readModbusRegistryTemp } from "./modbusHandler"
import {whatChanged, whatChangedTemp} from "../readingsHandler"
import StateRegister from "./state";

const register = new StateRegister;

export function modbusPooling (broadcast) {
    readModbusRegistry(register.wyjscia.adres, register.wyjscia.howMany)
        .then(result =>{
            broadcast('wyjscia', whatChanged(result, register.wyjscia.adres, register.wyjscia.rej_last));
            register.wyjscia.rej_last=[...result];
        })
    readModbusRegistry(register.wySatel.adres, register.wySatel.howMany)
        .then(result =>{
            broadcast('wySatel', whatChanged(result, register.wySatel.adres, register.wySatel.rej_last));
            register.wySatel.rej_last=[...result];
        })    
    readModbusRegistryTemp(register.tempNast.adres, register.tempNast.howMany)
        .then(result =>{
            broadcast('tempNast', whatChangedTemp(result, register.tempNast.adres, register.tempNast.rej_last, null, null));
            register.tempNast.rej_last = [...result];
        })    
    readModbusRegistryTemp(register.wyTemp.adres, register.wyTemp.howMany)
        .then(result =>{
            broadcast('wyTemp', whatChangedTemp(result, register.wyTemp.adres, register.wyTemp.rej_last1, register.wyTemp.rej_last2, register.wyTemp.rej_last2));
            register.wyTemp.rej_last1 = [...result];
            register.wyTemp.rej_last2 = [...register.wyTemp.rej_last1];
            register.wyTemp.rej_last3 = [...register.wyTemp.rej_last2];
        }) 
}   

// const infoToBroadcast = {
//     adres: 129987,
//     wartosc: 22
// };

// module.exports = function updateToClients (broadcast) {
//     setInterval(() => {
//         infoToBroadcast.wartosc+=1;
//         broadcast('Update', infoToBroadcast);
//     }, 1000);
// }