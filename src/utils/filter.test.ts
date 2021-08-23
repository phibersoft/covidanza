import {canShowToday, filterData, getMinMax} from "./filter";
import { ExampleCovidItem_Generals } from "./api.example-datas";

describe("Filtering Tests", () => {
  test("Filter ISO", () => {
    const filtered = filterData(ExampleCovidItem_Generals, "cases");
    const mustBe = {
      [ExampleCovidItem_Generals[0].countryInfo.iso2]:
        ExampleCovidItem_Generals[0].cases,
      [ExampleCovidItem_Generals[1].countryInfo.iso2]:
        ExampleCovidItem_Generals[1].cases,
    };

    expect(filtered).toMatchObject(mustBe);
  });

  test("Min Max", () => {
    const minMax = getMinMax(ExampleCovidItem_Generals, "cases");
    var mustBe: typeof minMax;

    if (
      ExampleCovidItem_Generals[0].cases > ExampleCovidItem_Generals[1].cases
    ) {
      mustBe = {
        min: ExampleCovidItem_Generals[1].cases,
        max: ExampleCovidItem_Generals[0].cases,
      };
    } else {
      mustBe = {
        min: ExampleCovidItem_Generals[0].cases,
        max: ExampleCovidItem_Generals[1].cases,
      };
    }

    expect(minMax).toMatchObject(mustBe);
  });

  test('Can Show Today', () => {
      expect(canShowToday("cases")).toBeTruthy();
      expect(canShowToday('critical')).not.toBeTruthy();
  })
});
