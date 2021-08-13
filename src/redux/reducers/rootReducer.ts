import { combineReducers } from "redux";
import generalReducer from "./generalReducer";
import { INITIAL_General } from "../actions/generalActions";
import countryReducer from "./countryReducer";
import { INITIAL_Country } from "../actions/countryActions";

export const rootReducer = combineReducers({
  general: generalReducer,
  country: countryReducer,
});

export interface C_STATE {
  general: INITIAL_General;
  country: INITIAL_Country;
}
