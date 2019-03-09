import Modbus from "modbus-serial";
import {homeConfig} from '../config';
import {registerWyjscia, registerSatel, registerTempNast, registerTemp}  from '../registers/PLCRegisters';
import {writes, ItemToWrite} from '../registers/WritesRegister';
import {handleOdczytWyjscia, handleOdczytSatel, handleOdczytTemp, handleOdczytTempNast} from './handleReads';
import { buildTempBuff, tempParser } from '../utils/tempHandler';

enum MBS_STATE {
    NEXT, 
    CONNECTED,
    FAIL_CONNECT,
    FAIL_READ_WRITE
};
let mbsState = MBS_STATE.NEXT;
const modbusClient = new Modbus(); // create an empty modbus client

export const runModbus = ()=> {
    switch (mbsState) {
        case MBS_STATE.NEXT:
        case MBS_STATE.FAIL_CONNECT:
            connectClient();
            break;        
        case MBS_STATE.FAIL_READ_WRITE:
            if (!modbusClient.isOpen)  { connectClient(); }
            break;
        case MBS_STATE.CONNECTED:
            modbusReadWrite();
            break;
        default:
            break;
    }
    setTimeout (runModbus, 2000);
};

const connectClient = () => {
    if(modbusClient.isOpen){
        modbusClient.close(); // close port in order not to create multiple connections
    }        
    modbusClient.setID(1);
    modbusClient.connectTCP(homeConfig.modbus.host, homeConfig.modbus.port)
        .then(()=> {
            mbsState  = MBS_STATE.CONNECTED;
            console.log("Modbus connected");
        })
        .catch((e: Error)=> {
            mbsState  = MBS_STATE.FAIL_CONNECT;
            console.log(e.message);
        });
};

const modbusReadWrite =  async () => {
    if (writes.anyWrites()){
        const writePromises = buildWritePromisses(writes.takeCycleWrites());
        try {
            const writeRes = await Promise.all(writePromises);
            console.log("writes :", writeRes);
        } catch (e) {
            mbsState  = MBS_STATE.FAIL_READ_WRITE;
            console.log(e.message);
        }
    }
    let odczytyWy, odczytySatel, odczytyTempWy, odczytyTempNast;
    try{
        odczytyWy = await modbusClient.readHoldingRegisters(
                registerWyjscia.adres, registerWyjscia.howMany)
        odczytySatel = await modbusClient.readHoldingRegisters(
                registerSatel.adres, registerSatel.howMany);
        odczytyTempWy = await modbusClient.readHoldingRegisters(
                registerTemp.adres, registerTemp.howMany*2);
        odczytyTempNast = await modbusClient.readHoldingRegisters(
                registerTempNast.adres, registerTempNast.howMany*2);
    } catch (e){
        mbsState  = MBS_STATE.FAIL_READ_WRITE;
        console.log(e.message);
    }
        handleOdczytWyjscia(odczytyWy);    
        handleOdczytSatel(odczytySatel);
        handleOdczytTemp(tempParser(odczytyTempWy.buffer))
        handleOdczytTempNast(tempParser(odczytyTempNast.buffer));
}

const buildWritePromisses = (writeRequests: ItemToWrite[]): any => {
    const writePromises: Promise<number>[]=[];
    writeRequests.map((x)=>{
        if (x.temp) {
            writePromises.push(modbusClient.writeRegisters(
                x.address, buildTempBuff(x.value)));
        } else {
            writePromises.push(modbusClient.writeRegister(
                x.address, x.value))
        }
    })
    return writePromises;
}