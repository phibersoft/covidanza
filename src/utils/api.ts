import {getDayCountBetweenCoronaAndToday, timestampToDate} from "./time";
import {
  CovidItem_Country,
  CovidItem_General,
  CovidItem_Historical,
} from "../../types/custom.interface";
import axios from "axios";
import { ApiResponse, failureResult, successResult } from "./api.helper";

export const apiUrls = {
  general: `https://corona.lmao.ninja/v2/countries?yesterday=false&sort`,
  country: (ct: string) =>
    `https://corona.lmao.ninja/v2/historical/${ct}?lastdays=${getDayCountBetweenCoronaAndToday()}`,
};

/**
 * @description Tüm ülkelerin en son güncellenmiş verilerini döndürür.
 */
export const getGeneralData = async () => {
  try {
    const results = await axios.get<CovidItem_General[]>(apiUrls.general);
    if (results.data.length !== 0) {
      return successResult<CovidItem_General[]>(
        results.data.filter((d) => d.countryInfo.iso2 !== null).map((d) => {
          return {...d, updated: timestampToDate(d.updated)}
        })
      );
    }
    throw new Error("No Data Found");
  } catch (e) {
    return failureResult(e.message);
  }
};

/**
 * @description Bir ülkenin bugünden geriye doğru karantinanın başlangıcına kadar ki her günün verisini döndürür.
 * @param country Ülkenin Tam İsmi
 * @example _getCountryData("Turkey");
 */
const _getCountryData = async (country: string) => {
  try {
    const results = await axios.get<CovidItem_Historical>(
      apiUrls.country(country)
    );

    window.localStorage.setItem(
      `data_${country}`,
      JSON.stringify(results.data)
    );
    return successResult<CovidItem_Historical>(results.data);
  } catch (e) {
    return failureResult(e.message);
  }
};

/**
 * @description Bir ülkenin geçmiş verilerini REST API'den çeker ve elimizde halihazırda bulunan genel verisi ile birleştirir.
 * @param country Ülkenin Tam İsmi
 * @param generalData Tüm Ülkelerin Genel Bilgisi
 */
export const getCountryData = async (
  country: string,
  generalData: CovidItem_General[]
): Promise<ApiResponse<CovidItem_Country>> => {
  const cache = window.localStorage.getItem(`data_${country}`);
  var ct: CovidItem_Historical;

  if (cache) {
    ct = JSON.parse(cache);
  } else {
    const historicalData = await _getCountryData(country);

    if (historicalData.success === false) {
      return historicalData;
    }

    ct = historicalData.data;
  }

  const found = generalData.find((gd) => gd.country === ct.country);

  if (found) {
    return successResult<CovidItem_Country>({
      ...found,
      timeline: ct.timeline,
    });
  } else {
    return failureResult("No data found.");
  }
};
