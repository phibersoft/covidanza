import {
  CovidItem_Country,
  CovidItem_General,
  CovidItem_Historical,
} from "../../types/custom.interface";

// Sadece testing işlemlerinde kullanacağımız veriler.

export const ExampleCovidItem_Generals: CovidItem_General[] = [
  {
    updated: 1629690079696,
    country: "Afghanistan",
    countryInfo: {
      _id: 4,
      iso2: "AF",
      iso3: "AFG",
      lat: 33,
      long: 65,
      flag: "https://disease.sh/assets/img/flags/af.png",
    },
    cases: 152583,
    todayCases: 0,
    deaths: 7076,
    todayDeaths: 0,
    recovered: 108262,
    todayRecovered: 0,
    active: 37245,
    critical: 1124,
    casesPerOneMillion: 3822,
    deathsPerOneMillion: 177,
    tests: 748284,
    testsPerOneMillion: 18743,
    population: 39924312,
    continent: "Asia",
    oneCasePerPeople: 262,
    oneDeathPerPeople: 5642,
    oneTestPerPeople: 53,
    activePerOneMillion: 932.89,
    recoveredPerOneMillion: 2711.68,
    criticalPerOneMillion: 28.15,
  },
  {
    updated: 1629690079705,
    country: "Albania",
    countryInfo: {
      _id: 8,
      iso2: "AL",
      iso3: "ALB",
      lat: 41,
      long: 20,
      flag: "https://disease.sh/assets/img/flags/al.png",
    },
    cases: 139324,
    todayCases: 0,
    deaths: 2478,
    todayDeaths: 0,
    recovered: 131273,
    todayRecovered: 0,
    active: 5573,
    critical: 3,
    casesPerOneMillion: 48474,
    deathsPerOneMillion: 862,
    tests: 1003079,
    testsPerOneMillion: 348993,
    population: 2874212,
    continent: "Europe",
    oneCasePerPeople: 21,
    oneDeathPerPeople: 1160,
    oneTestPerPeople: 3,
    activePerOneMillion: 1938.97,
    recoveredPerOneMillion: 45672.69,
    criticalPerOneMillion: 1.04,
  },
];

export const ExampleCovidItem_Historical: CovidItem_Historical = {
  country: "Afghanistan",
  province: ["mainland"],
  timeline: {
    cases: { "8/20/21": 152448, "8/21/21": 152448 },
    deaths: { "8/20/21": 7054, "8/21/21": 7054 },
    recovered: { "8/20/21": 0, "8/21/21": 0 },
  },
};

export const ExampleCovidItem_Country: CovidItem_Country = {
  ...ExampleCovidItem_Historical,
  ...ExampleCovidItem_Generals[0],
};
