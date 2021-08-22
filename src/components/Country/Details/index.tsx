import React from "react";
import { C_STATE } from "../../../redux/reducers/rootReducer";
import { translate } from "../../../utils/translate.util";

interface CountryDetailsProps extends Partial<Pick<C_STATE, "country">> {}

/**
 * @description Seçili ülkenin tablodaki değerlerini gösterir.
 * @param country Seçili Ülke
 * @constructor
 */
export default function CountryDetails({ country }: CountryDetailsProps) {
  if (country) {
    return (
      <div className={"wrapper"}>
        <table className={"country-details"}>
          <tbody>
            {
              /**
               * @description "translate" nesnesini baz almamızın sebebi, her anahtarı bastırmak istemiyoruz.
               * @example Örneğin "updated: 13" şeklinde bir görünüm yerine "Update Time: 13" baskısını istiyoruz.
               */
              Object.keys(translate).map((k) => {
                return (
                  <tr key={`country-details-${k}`}>
                    <th>{translate[k]}</th>
                    <td>{country[k]}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
