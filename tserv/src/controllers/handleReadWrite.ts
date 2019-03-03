import {broadcast} from './clientsCommunication';
import {ZMIANA_REJESTRU_WYJSCIA, ZMIANA_REJESTRU_WYSATEL, 
    ZMIANA_REJESTRU_WYTEMP, ZMIANA_REJESTRU_WYTEMPNAST} from '../utils/types'
import { tempParser, buildTempBuff } from '../utils/tempHandler';
import {registerWyjscia, registerSatel, registerTempNast, registerTemp}  from '../registers/PLCRegisters';

export function handleOdczytWyjscia(odczyt: any) {
    const zmiany = registerWyjscia.whatChanged(odczyt.data);
    console.log(zmiany)
    if (zmiany.length>0){
        broadcast( ZMIANA_REJESTRU_WYJSCIA, zmiany);
        registerWyjscia.readOdczyt(odczyt.data);
    }      
}    
export function handleOdczytSatel(odczyt: any) {
    const zmiany = registerSatel.whatChanged(odczyt.data);
    console.log(zmiany)
    if (zmiany.length>0){
        broadcast(ZMIANA_REJESTRU_WYSATEL, zmiany);
        registerSatel.readOdczyt(odczyt.data);
    }      
}    
export function handleOdczytTemp(odczyt: any){
    const zmiany = registerTemp.whatChanged(tempParser(odczyt.buffer));
    if (zmiany.length>0){
        broadcast(ZMIANA_REJESTRU_WYTEMP, zmiany);
        registerTemp.readOdczyt(tempParser(odczyt.buffer));
    }
}

export function handleOdczytTempNast(odczyt: any){
    const zmiany = registerTempNast.whatChanged(tempParser(odczyt.buffer));
    if (zmiany.length>0){
        broadcast(ZMIANA_REJESTRU_WYTEMPNAST, zmiany);
        registerTempNast.readOdczyt(tempParser(odczyt.buffer));
    }
}