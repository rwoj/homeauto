import { ODCZYT_USTAWIEN} from "./types"

export const pobraneUstawienia = data => ({
  type: ODCZYT_USTAWIEN,
  data
});