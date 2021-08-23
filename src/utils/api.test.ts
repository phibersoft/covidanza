import { getCountryData, getGeneralData } from "./api";
import { CovidItem_Country } from "../../types/custom.interface";

describe("Rest API Testing", () => {
  test("General Data", async () => {
    const results = await getGeneralData();
    expect(Object.keys(results)).toContain("success");
    if (results.success == true) {
      expect(Array.isArray(results.data)).toBeTruthy();
    }
  });

  test("Country Data: Turkey", async () => {
    const results = await getGeneralData();

    if (results.success == true) {
      const c_results = await getCountryData("Turkey", results.data);
      expect(Object.keys(c_results)).toContain("success");

      if (c_results.success == true) {
        const keys = Object.keys(c_results.data);
        const required_keys: Array<keyof CovidItem_Country> = [
          "timeline",
          "country",
          "countryInfo",
        ];

        required_keys.forEach((k) => {
          expect(keys).toContain(k);
        });
      }
    }
  });
});

export {};
