import {
  ACTION_GeneratorInterface,
  CovidItem_General,
  FilterIds,
} from "../../../types/custom.interface";

type setGeneralDataInterface = ACTION_GeneratorInterface<
  "SET_GENERAL_DATA",
  CovidItem_General[]
>;

type setFilterTypeInterface = ACTION_GeneratorInterface<
  "SET_FILTER_TYPE",
  FilterIds
>;

type setTodayInterface = ACTION_GeneratorInterface<"SET_TODAY", boolean>;

export type ACTIONS_General = setGeneralDataInterface | setFilterTypeInterface | setTodayInterface;
export type INITIAL_General = {
  items: CovidItem_General[];
  filterType: FilterIds;
  today: boolean;
};
