import {broadcast} from './clientsCommunication';
import {ZMIANA_REJESTRU_WYJSCIA, 
    ZMIANA_REJESTRU_WYSATEL, ZMIANA_REJESTRU_WYTEMP, 
    ZMIANA_REJESTRU_WYTEMPNAST} from '../utils/types'
import { tempParser, buildTempBuff } from '../utils/tempHandler';
import register  from '../Registers/StateRegister';
import {verifyRules} from './rulesEngine';

const cycleWrites=[];

// {address: 16517, value: 0, temp: false}
// {address: 16401, value: 0, temp: true}
export function writeToModbus(someChange){
    return cycleWrites.push(someChange);
}

function buildWritePromisses(writeRequests, client){
    const writePromises=[];
    writeRequests.map((x)=>{
        if (x.temp) {
            writePromises.push(client.writeRegisters(
                x.address, buildTempBuff(x.value)));
        } else {
            writePromises.push(client.writeRegister(
                x.address, parseInt(x.value, 10)))
        }
    })
    return writePromises;
}
    
export async function modbusPooling (client) {
    if (cycleWrites.length > 0){
        const writePromises = buildWritePromisses(cycleWrites, client);
        cycleWrites.splice(0,cycleWrites.length);
        const writeRes = await Promise.all(writePromises);
        console.log(writeRes);
    }
    const odczytyWy = await client.readHoldingRegisters(
        register.getRej('wyjscia').adres, register.getRej('wyjscia').howMany)
    handleOdczyt('wyjscia', odczytyWy);    

    const odczytySatel = await client.readHoldingRegisters(
        register.getRej('wySatel').adres, register.getRej('wySatel').howMany);
    handleOdczyt('wySatel', odczytySatel);

    const odczytyTempWy = await client.readHoldingRegisters(
        register.getRej('wyTemp').adres, register.getRej('wyTemp').howMany*2);
    handleOdczytTemp('wyTemp', odczytyTempWy)

    const odczytyTempNast = await client.readHoldingRegisters(
        register.getRej('tempNast').adres, register.getRej('tempNast').howMany*2);
    handleOdczytTemp('tempNast', odczytyTempNast);
}

function handleOdczyt(table, odczyt) {
    const zmiany = register.whatChanged(table, odczyt.data);
    if (zmiany.length>0){
        broadcast(
            table==='wyjscia'?ZMIANA_REJESTRU_WYJSCIA:ZMIANA_REJESTRU_WYSATEL,
            zmiany);
        register.readOdczyt(table, odczyt.data);
    }      
}    
function handleOdczytTemp(table, odczyt){
    const zmiany = register.whatChangedTemp(table, 
                    tempParser(odczyt.buffer));
    if (zmiany.length>0){
        broadcast(
            table==='wyTemp'?ZMIANA_REJESTRU_WYTEMP:ZMIANA_REJESTRU_WYTEMPNAST,
            zmiany);
        register.readOdczyt(table, tempParser(odczyt.buffer));
    }
}