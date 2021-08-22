// Programda kullanacağımız filtreleme tipleri.
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

// Tüm ülkelerin genel bilgisinin döndüğü veri.
export interface CovidItem_General {
  updated: number | string;
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
  continent: ContinentTypes;

  testsPerOneMillion: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;

  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
}

// Seçilmiş ülkenin geçmişe dönük verileri.
export interface CovidItem_Historical {
  country: string;
  province: string[];
  timeline: Record<"cases" | "deaths" | "recovered", Record<string, number>>;
}

// General + Historical şeklinde bir birleştirme yapıp kullandığımız Custom Data.
export interface CovidItem_Country
  extends CovidItem_General,
    Pick<CovidItem_Historical, "timeline"> {}

// Redux kullanımında bir Action oluşturduğumuzda yardımcı olması için yazdığımız tip.
export type ACTION_GeneratorInterface<T = string, X = any> = {
  type: T;
  payload: X;
};

// utils/translate.util.ts dosyasında kullandığımız "çeviri" işlemleri için gerekli arayüz.
export interface CovidItem_Translated {
  "Update Time": number;
  "Population": number;

  Cases: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Critical: number;
  Tests: number;

  "One Case Per People": number;
  "One Death Per People": number;
  "One Test Per People": number;

  "Tests Per One Million": number;
  "Cases Per One Million": number;
  "Deaths Per One Million": number;
  "Active Per One Million": number;
  "Recovered Per One Million": number;
  "Critical Per One Million": number;

  "Today Cases": number;
  "Today Deaths": number;
  "Today Recovered": number;
}
