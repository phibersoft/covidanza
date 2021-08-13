import { ACTIONS_Country, INITIAL_Country } from "../actions/countryActions";

const initial: INITIAL_Country = null;

const countryReducer = (
  state = initial,
  action: ACTIONS_Country
): INITIAL_Country => {
  switch (action.type) {
    case "SET_COUNTRY":
      return action.payload;
    default:
      return state;
  }
};

export default countryReducer;
