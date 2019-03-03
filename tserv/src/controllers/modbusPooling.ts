import {broadcast} from './clientsCommunication';
import {ZMIANA_REJESTRU_WYJSCIA, ZMIANA_REJESTRU_WYSATEL, 
    ZMIANA_REJESTRU_WYTEMP, ZMIANA_REJESTRU_WYTEMPNAST} from '../utils/types'
import { tempParser, buildTempBuff } from '../utils/tempHandler';
import {registerWyjscia, registerSatel, 
        registerTempNast, registerTemp}  from '../registers/PLCRegisters';
import {itemToWrite, writes} from '../Registers/WritesRegister';

export async function modbusPooling (client: any) {
    if (writes.anyWrites()){
        const writePromises = buildWritePromisses(writes.takeCycleWrites(), client);
        const writeRes = await Promise.all(writePromises);
        console.log("writes :", writeRes);
    }
        const odczytyWy = await client.readHoldingRegisters(
                registerWyjscia.adres, registerWyjscia.howMany)
        const odczytySatel = await client.readHoldingRegisters(
                registerSatel.adres, registerSatel.howMany);
        const odczytyTempWy = await client.readHoldingRegisters(
                registerTemp.adres, registerTemp.howMany*2);
        const odczytyTempNast = await client.readHoldingRegisters(
                registerTempNast.adres, registerTempNast.howMany*2);

        handleOdczytWyjscia(odczytyWy);    
        handleOdczytSatel(odczytySatel);
        handleOdczytTemp(odczytyTempWy)
        handleOdczytTempNast(odczytyTempNast);
}

function handleOdczytWyjscia(odczyt: any) {
        const zmiany = registerWyjscia.whatChanged(odczyt.data);
        console.log(zmiany)
        if (zmiany.length>0){
        broadcast( ZMIANA_REJESTRU_WYJSCIA, zmiany);
                registerWyjscia.readOdczyt(odczyt.data);
        }      
}    
function handleOdczytSatel(odczyt: any) {
        const zmiany = registerSatel.whatChanged(odczyt.data);
        console.log(zmiany)
        if (zmiany.length>0){
        broadcast(ZMIANA_REJESTRU_WYSATEL, zmiany);
                registerSatel.readOdczyt(odczyt.data);
        }      
}    
function handleOdczytTemp(odczyt: any){
        const zmiany = registerTemp.whatChanged(tempParser(odczyt.buffer));
        if (zmiany.length>0){
            broadcast(ZMIANA_REJESTRU_WYTEMP, zmiany);
            registerTemp.readOdczyt(tempParser(odczyt.buffer));
        }
    }
 
function handleOdczytTempNast(odczyt: any){
    const zmiany = registerTempNast.whatChanged(tempParser(odczyt.buffer));
    if (zmiany.length>0){
        broadcast(ZMIANA_REJESTRU_WYTEMPNAST, zmiany);
        registerTempNast.readOdczyt(tempParser(odczyt.buffer));
    }
}

function buildWritePromisses(writeRequests: itemToWrite[], client: any): any{
    const writePromises: Promise<number>[]=[];
    writeRequests.map((x)=>{
        if (x.temp) {
            writePromises.push(client.writeRegisters(
                x.address, buildTempBuff(x.value)));
        } else {
            writePromises.push(client.writeRegister(
                x.address, x.value))
        }
    })
    return writePromises;
}