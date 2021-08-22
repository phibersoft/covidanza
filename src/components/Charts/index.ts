import { INITIAL_Country } from "../../redux/actions/countryActions";
import store from "../../redux/store";

export interface ChartValueItem {
  name: string;
  [key: string]: string | number;
}

export interface ChartKeyItem {
  dataKey: string;
  fill: string;
}

export interface ChartProps {
  title: (country: INITIAL_Country) => string;
  dataHandler: (country: INITIAL_Country) => ChartValueItem[];
  dataKeys: ChartKeyItem[];
  hasTimeFiltering?: boolean;
}

/**
 * @description BarChartlarımız için renk seçimleri burada belirleniyor.
 */
const defaultDataKeys: ChartKeyItem[] = [
  {
    dataKey: "Cases",
    fill: "#FF0000",
  },
  {
    dataKey: "Deaths",
    fill: "#001300",
  },
  {
    dataKey: "Recovereds",
    fill: "#3a9100",
  },
];

/**
 * @description Herhangi bir BarChart oluşturmak istediğimizde bu diziye eklememiz yeterli.
 * @param title String döndüren bir fonksiyon verilir. Chartımızın başlığıdır.
 * @param dataHandler country nesnesini parametre olarak alır. Bu fonksiyonun amacı gerekli veriyi işleyip geri döndürmesidir.
 * @param hasTimeFiltering Charts/Buttons/index.tsx kısmındaki butonlara ihtiyaç varsa true işaretlenir. Default: false.
 */
export const Charts: ChartProps[] = [
  {
    title: () => "Timeline",
    dataHandler: (country) => {
      var willReturn: ChartValueItem[] = [];
      if (country) {
        const dates = Object.keys(country.timeline.cases); // dates = ["1/1/1970", "1/2/1970", ...];
        for (var i = 0; i < dates.length; i++) {
          const willPush: ChartValueItem = {
            name: dates[i],
            Deaths: country.timeline.deaths[dates[i]],
            Cases: country.timeline.cases[dates[i]],
            Recovereds: country.timeline.recovered[dates[i]],
          };

          willReturn.push(willPush);
        }
      }

      return willReturn;
    },
    dataKeys: defaultDataKeys,
    hasTimeFiltering: true,
  },
  {
    title: (ct) =>
      `Compared To Countries On The Same Continent: ${ct?.continent}`,
    dataHandler: (country) => {
      var willReturn: ChartValueItem[] = [];
      if (country) {
        const allCountries = store.getState().general.items;
        const sameContinentCountries = allCountries.filter(
          (aC) => aC.continent === country.continent
        );

        for (var i = 0; i < sameContinentCountries.length; i++) {
          willReturn.push({
            name: sameContinentCountries[i].country,
            Cases: sameContinentCountries[i].cases,
            Deaths: sameContinentCountries[i].deaths,
            Recovereds: sameContinentCountries[i].recovered,
          });
        }

        willReturn.push({
          name: country.country,
          Cases: country.cases,
          Deaths: country.deaths,
          Recovereds: country.recovered,
        });
      }

      return willReturn;
    },
    dataKeys: defaultDataKeys,
  },
  {
    title: () => "Compared To The Highest Countries (Today)",
    dataHandler: (country) => {
      var willReturn: ChartValueItem[] = [];

      if (country) {
        const allCountries = store
          .getState()
          .general.items.filter((c) => c.todayCases);
        allCountries.sort((a, b) => b.todayCases - a.todayCases);

        const topTen = allCountries.slice(0, 10);

        topTen.forEach((tT) => {
          willReturn.push({
            name: tT.country,
            Cases: tT.todayCases,
            Deaths: tT.todayDeaths,
            Recovereds: tT.todayRecovered,
          });
        });

        return [
          ...willReturn,
          {
            name: country.country,
            Cases: country.todayCases,
            Deaths: country.todayDeaths,
            Recovereds: country.todayRecovered,
          },
        ];
      }

      return willReturn;
    },
    dataKeys: defaultDataKeys,
  },
  {
    title: () => "Compared To The Highest Countries (Total)",
    dataHandler: (country) => {
      var willReturn: ChartValueItem[] = [];

      if (country) {
        const allCountries = store
          .getState()
          .general.items.filter((c) => c.cases);
        allCountries.sort((a, b) => b.cases - a.cases);

        const topTen = allCountries.slice(0, 10);

        topTen.forEach((tT) => {
          willReturn.push({
            name: tT.country,
            Cases: tT.cases,
            Deaths: tT.deaths,
            Recovereds: tT.recovered,
          });
        });

        return [
          ...willReturn,
          {
            name: country.country,
            Cases: country.cases,
            Deaths: country.deaths,
            Recovereds: country.recovered,
          },
        ];
      }

      return willReturn;
    },
    dataKeys: defaultDataKeys,
  },
  {
    title: () => "Compared To The Lowest Countries (Today)",
    dataHandler: (country) => {
      var willReturn: ChartValueItem[] = [];

      if (country) {
        const allCountries = store
          .getState()
          .general.items.filter((c) => c.todayCases);
        allCountries.sort((a, b) => a.todayCases - b.todayCases);

        const lowTen = allCountries.slice(0, 10);

        lowTen.forEach((lT) => {
          willReturn.push({
            name: lT.country,
            Cases: lT.todayCases,
            Deaths: lT.todayDeaths,
            Recovereds: lT.todayRecovered,
          });
        });

        return [
          ...willReturn,
          {
            name: country.country,
            Cases: country.todayCases,
            Deaths: country.todayDeaths,
            Recovereds: country.todayRecovered,
          },
        ];
      }

      return willReturn;
    },
    dataKeys: defaultDataKeys,
  },
  {
    title: () => "Compared To The Lowest Countries (Total)",
    dataHandler: (country) => {
      var willReturn: ChartValueItem[] = [];

      if (country) {
        const allCountries = store
          .getState()
          .general.items.filter((c) => c.cases);
        allCountries.sort((a, b) => a.cases - b.cases);

        const lowTen = allCountries.slice(0, 10);

        lowTen.forEach((lT) => {
          willReturn.push({
            name: lT.country,
            Cases: lT.cases,
            Deaths: lT.deaths,
            Recovereds: lT.recovered,
          });
        });

        return [
          ...willReturn,
          {
            name: country.country,
            Cases: country.cases,
            Deaths: country.deaths,
            Recovereds: country.recovered,
          },
        ];
      }

      return willReturn;
    },
    dataKeys: defaultDataKeys,
  },
];
