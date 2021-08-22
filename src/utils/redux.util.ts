import {
  CovidItem_Country,
  CovidItem_General,
  FilterIds,
} from "../../types/custom.interface";
import { ACTIONS_General } from "../redux/actions/generalActions";
import store from "../redux/store";
import { ACTIONS_Country } from "../redux/actions/countryActions";
/*
Normal şartlarda Redux'ta bu kullanım tipi yoktur. mapDispatchToProps nesnesiyle işlemler halledilir.
Detaylı bilgi: https://react-redux.js.org/using-react-redux/connect-mapdispatch

Bizim kullanmamızın amacı Redux Store'umuzun bazı cihazlarda Material UI Theme Provider'ımız ile çakışmasından dolayı.
Herhangi bir riske girmemek için "dispatch işlemlerini" manual yolla hallediyoruz.
*/


export const setGeneralData = (data: CovidItem_General[]) => {
  const act: ACTIONS_General = {
    type: "SET_GENERAL_DATA",
    payload: data,
  };

  store.dispatch(act);
};

export const setFilterType = (filterId: FilterIds) => {
  const act: ACTIONS_General = {
    type: "SET_FILTER_TYPE",
    payload: filterId,
  };

  store.dispatch(act);
};

export const setToday = (val: boolean) => {
  const act: ACTIONS_General = {
    type: "SET_TODAY",
    payload: val,
  };

  store.dispatch(act);
};

export const setCountry = (ct: CovidItem_Country | null) => {
  const act: ACTIONS_Country = {
    type: "SET_COUNTRY",
    payload: ct,
  };

  store.dispatch(act);
};
