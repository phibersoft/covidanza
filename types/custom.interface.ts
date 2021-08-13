export type FilterIds =
  | "cases"
  | "recovered"
  | "deaths"
  | "critical"
  | "tests"
  | "active";
// Kıta tipleri Rest API'den gelen verilere uygun yazılmıştır.
export type ContinentTypes =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Australia-Oceania"
  | "";

export interface CovidItem_General {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  tests: number;
  population: number;
  testsPerOneMillion: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  continent: ContinentTypes;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
}

export interface CovidItem_Historical {
  country: string;
  province: string[];
  timeline: Record<"cases" | "deaths" | "recovered", Record<string, number>>;
}

export interface CovidItem_Country
  extends CovidItem_General,
    Pick<CovidItem_Historical, "timeline"> {}

export type ACTION_GeneratorInterface<T = string, X = any> = {
  type: T;
  payload: X;
};
