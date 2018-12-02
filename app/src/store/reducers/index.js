import { combineReducers } from "redux";
import register from "./register";
import ustawienia from "./ustawienia";
import reguly from "./reguly";

export default combineReducers ({
  register,
  ustawienia,
  reguly,
});
