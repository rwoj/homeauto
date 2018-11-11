import {ODCZYT_REJESTRU, ZMIANA_REJESTRU_WYJSCIA, 
    ZMIANA_REJESTRU_WYSATEL, ZMIANA_REJESTRU_WYTEMP, 
    ZMIANA_REJESTRU_WYTEMPNAST} from "./types"

export const odczytRejestru = (dane) => ({type: ODCZYT_REJESTRU, dane})
export const zmianaRejestruWyjscia = (dane) => ({type: ZMIANA_REJESTRU_WYJSCIA, dane})
export const zmianaRejestruWySatel = (dane) => ({type: ZMIANA_REJESTRU_WYSATEL, dane})
export const zmianaRejestruWyTemp = (dane) => ({type: ZMIANA_REJESTRU_WYTEMP, dane})
export const zmianaRejestruWyTempNast = (dane) => ({type: ZMIANA_REJESTRU_WYTEMPNAST, dane})

export const initRejestr = dane => dispatch => dispatch(odczytRejestru(dane));

export const zmienRejestr = dane => dispatch => {
    console.log("heja :", dane.key, dane.value);
    if (dane.key==='wyjscia'){
        dispatch(zmianaRejestruWyjscia(dane.value))
    }
    if (dane.key==='wySatel'){
        dispatch(zmianaRejestruWySatel(dane.value))
    }
    if (dane.key==='wyTemp'){
        dispatch(zmianaRejestruWyTemp(dane.value))
    }
    if (dane.key==='wyTempNast'){
        dispatch(zmianaRejestruWyTempNast(dane.value))
    }
}