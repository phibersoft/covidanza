import {
  CovidItem_Country,
  CovidItem_Translated,
} from "../../types/custom.interface";

/**
 * @description Makarna Kod yazımından kaçmak için düzenli yazılması gereken (Kullanıcıya client-side'da gösterilecek olan) anahtarları dönüştürüyoruz.
 */
export const translate: Partial<
  Record<keyof CovidItem_Country, keyof CovidItem_Translated>
> = {
  updated: "Update Time",
  cases: "Cases",
  critical: "Critical",
  active: "Active",
  deaths: "Deaths",
  population: "Population",
  recovered: "Recovered",
  tests: "Tests",

  testsPerOneMillion: "Tests Per One Million",
  casesPerOneMillion: "Cases Per One Million",
  activePerOneMillion: "Active Per One Million",
  criticalPerOneMillion: "Critical Per One Million",
  deathsPerOneMillion: "Deaths Per One Million",
  recoveredPerOneMillion: "Recovered Per One Million",

  oneCasePerPeople: "One Case Per People",
  oneDeathPerPeople: "One Death Per People",
  oneTestPerPeople: "One Test Per People",

  todayDeaths: "Today Deaths",
  todayCases: "Today Cases",
  todayRecovered: "Today Recovered",
};
