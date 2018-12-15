import {broadcast} from './clientsCommunication';
import {ZMIANA_REJESTRU_WYJSCIA, ZMIANA_REJESTRU_WYSATEL, 
    ZMIANA_REJESTRU_WYTEMP, ZMIANA_REJESTRU_WYTEMPNAST} from '../utils/types'
import { tempParser, buildTempBuff } from '../utils/tempHandler';
import register  from '../Registers/PLCRegister';
import writes from '../Registers/WritesRegister';
    
export async function modbusPooling (client) {
    if (writes.anyWrites()){
        const writePromises = buildWritePromisses(writes.takeCycleWrites(), client);
        const writeRes = await Promise.all(writePromises);
        console.log("writes :", writeRes);
    }
    const odczytyWy = await client.readHoldingRegisters(
        register.getRej('wyjscia').adres, register.getRej('wyjscia').howMany)
    const odczytySatel = await client.readHoldingRegisters(
        register.getRej('wySatel').adres, register.getRej('wySatel').howMany);
    const odczytyTempWy = await client.readHoldingRegisters(
        register.getRej('wyTemp').adres, register.getRej('wyTemp').howMany*2);
    const odczytyTempNast = await client.readHoldingRegisters(
        register.getRej('tempNast').adres, register.getRej('tempNast').howMany*2);
            
    handleOdczyt('wyjscia', odczytyWy);    
    handleOdczyt('wySatel', odczytySatel);
    handleOdczytTemp('wyTemp', odczytyTempWy)
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