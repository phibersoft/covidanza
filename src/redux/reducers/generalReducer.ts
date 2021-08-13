import { ACTIONS_General, INITIAL_General } from "../actions/generalActions";

const initial: INITIAL_General = {
  items: [],
  filterType: "cases",
  today: true,
};

const generalReducer = (
  state = initial,
  action: ACTIONS_General
): INITIAL_General => {
  switch (action.type) {
    case "SET_GENERAL_DATA":
      return { ...state, items: action.payload };
    case "SET_FILTER_TYPE":
      return { ...state, filterType: action.payload };
    case "SET_TODAY":
      return { ...state, today: action.payload };
    default:
      return state;
  }
};

export default generalReducer;
