import { createSelector } from 'reselect'

export default function ustawienia(state={}, action={}) {
  switch (action.type) {
    case 'ODCZYT_USTAWIEN':
      return {...state, ...action.data};
    default:
      return state;
  }
}

const konfigHashSelector = state => !state.ustawienia.konfig ? [] : state.ustawienia.konfig
export const konfigSelector = createSelector(konfigHashSelector, hash =>
  hash
)

const konfigTempHashSelector = state => !state.ustawienia.konfigTemp ? [] : state.ustawienia.konfigTemp
export const konfigTempSelector = createSelector(konfigTempHashSelector, hash =>
  hash
)