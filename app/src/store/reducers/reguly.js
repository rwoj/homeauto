import { WEBSOCKET_MESSAGE } from '@giantmachines/redux-websocket'
import { ODCZYT_REGUL } from "../actions/types";
import { createSelector } from 'reselect'

export default function reguly(state={}, action={}) {
  let type, dane;
  if (action.type === WEBSOCKET_MESSAGE){
    let payload = JSON.parse(action.payload.data);
    type = payload.key;
    dane = payload.value;
  } 
  switch (type) {
    case ODCZYT_REGUL:
      console.log(type, dane);
      return {...state, ...dane};
    default:
      return state;
  }
}

const regulyHashSelector = state => !state.reguly ? [] : state.reguly
export const regulySelector = createSelector(regulyHashSelector, hash =>
  hash
)