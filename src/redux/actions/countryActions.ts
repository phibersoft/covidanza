import {
  ACTION_GeneratorInterface,
  CovidItem_Country,
} from "../../../types/custom.interface";

type setCountryInterface = ACTION_GeneratorInterface<
  "SET_COUNTRY",
  CovidItem_Country | null
>;

export type ACTIONS_Country = setCountryInterface;
export type INITIAL_Country = CovidItem_Country | null;
