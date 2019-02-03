import { ODCZYT_REGUL} from "./types"

export const pobraneReguly = data => ({
  type: ODCZYT_REGUL,
  data
});