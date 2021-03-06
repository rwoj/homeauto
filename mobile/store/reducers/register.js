import { createSelector } from "reselect";
import { WEBSOCKET_MESSAGE } from '@giantmachines/redux-websocket'
import {ODCZYT_REJESTRU, ZMIANA_REJESTRU_WYJSCIA, 
  ZMIANA_REJESTRU_WYSATEL, ZMIANA_REJESTRU_WYTEMP, 
  ZMIANA_REJESTRU_WYTEMPNAST} from "../actions/types";

export default function register(state={}, action={}) {
  let type, dane;
  if (action.type === WEBSOCKET_MESSAGE){
    let payload = JSON.parse(action.payload.data);
    type = payload.key;
    dane = payload.value;
    // console.log(type, typeof(type), dane);
  } 
  switch (type) {
    case ODCZYT_REJESTRU:
    // console.log(dane)
      return {wyjscia: [...dane.wyjscia], wyTemp: [...dane.wyTemp], 
        wyTempNast: [...dane.wyTempNast], wySatel: initSatel()};
    case ZMIANA_REJESTRU_WYJSCIA:
      return {...state, 
        wyjscia: tableWithChanges([...state.wyjscia], dane)}
    case ZMIANA_REJESTRU_WYSATEL:
      return {...state, 
        wySatel: tableWithChanges([...state.wySatel], dane)}
    case ZMIANA_REJESTRU_WYTEMP:
      return {...state, 
        wyTemp: tableWithChanges([...state.wyTemp], dane)}
    case ZMIANA_REJESTRU_WYTEMPNAST:
      return {...state, 
        wyTempNast: tableWithChanges([...state.wyTempNast], dane)}
    default:
      return state;
  }
}
function tableWithChanges (current, changes){
  return current.map(x => {
    let found = changes.find(y=>x.id===y.id); 
    if (found){
      // console.log(found);
      return found;
    }
    return x;
  })
}
function initSatel(){
  const initSatel=[];
  for (let i=0; i<40; i+=1){
    initSatel.push({id: 17100+i, value: 0})
  }
  return initSatel
}

export const wyjsciaHashSelector = state => 
      state.register.wyjscia && state.register.wyjscia.length>0 ? state.register.wyjscia : []
export const wyjsciaSelector = createSelector(wyjsciaHashSelector, hash =>
  hash
)

export const wySatelHashSelector = state =>  
    state.register.wySatel && state.register.wySatel.length>0 ? state.register.wySatel : [];
export const wySatelSelector = createSelector(wySatelHashSelector, hash =>
  hash
)

export const wyTempHashSelector = state => 
    state.register.wyTemp && state.register.wyTemp.length>0 ? state.register.wyTemp : [];
export const wyTempSelector = createSelector(wyTempHashSelector, hash =>
  hash
)
export const wyTempNastHashSelector = state => 
  state.register.wyTempNast && state.register.wyTempNast.length>0 ?state.register.wyTempNast:[];
export const wyTempNastSelector = createSelector(wyTempNastHashSelector, hash =>
  hash
)
